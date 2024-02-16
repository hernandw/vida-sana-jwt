const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const {
  getConsultas,
  deleteEventos,
  updateEventos,
} = require("../consultas/consultas");

const { verificarCredencial } = require("../middleware/midleware");

router.get("/", (req, res) => {
  res.send("Hello World! desde servidor");
});

router.get("/users", async (req, res) => {
  try {
    const consultas = await getConsultas();
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/token", async (req, res) => {
  const token = null;
  res.json({ token });
});

router.get("/public", (req, res) => {
  res.send(" soy una ruta publica");
});

router.get("/private", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //acceder al paylod
    jwt.verify(token, process.env.SECRET);

    res.send("soy una ruta privada");
  } catch (error) {
    res.status(404).json({
      message: "acceso no autorizado",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredencial(email, password);
    const token = jwt.sign({ email }, process.env.SECRET, {
      expiresIn: "1m",
    });

    res.json({ token });
  } catch (error) {
    res.status(404), res.json({ message: error.message });
  }
});

router.delete("/evento/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    //acceder al paylod
    jwt.verify(token, process.env.SECRET);
    const { email } = jwt.decode(token);
    await deleteEventos(id);
    res.send(`El usuario ${email} elimino el evento ${id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/evento/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, descripcion, fecha, lugar } = req.body
    const token = req.headers.authorization.split(" ")[1];
    //acceder al paylod
    jwt.verify(token, process.env.SECRET);
    const { email } = jwt.decode(token);
    await updateEventos({ titulo, descripcion, fecha, lugar, id })
    res.send(`El usuario con ${email} modificó el evento con id ${id}`)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

module.exports = router;
