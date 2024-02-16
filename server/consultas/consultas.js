const pool = require("../db/config");

const getConsultas = async () => {
  const res = await pool.query("SELECT * FROM usuarios");
  return res.rows;
};

const deleteEventos = async (id) => {
  const consultas = "DELETE FROM eventos WHERE id = $1";
  const values = [id];
  const { rowCount } = await pool.query(consultas, values);
  if (!rowCount)
    throw {
      code: 404,
      message: "No se encontró un evento con ese ID",
    };
};

const updateEventos = async ({ titulo, descripcion, fecha, lugar, id }) => {
    const consultas = "UPDATE eventos SET titulo = $1, descripcion = $2, fecha = $3, lugar = $4 WHERE id = $5"
    const values = [titulo, descripcion, fecha, lugar, id]
    const { rowCount } = await pool.query(consultas, values)
    if (!rowCount) throw ({
        code: 404,
        message: 'No se encontró el evento con ese ID'
    })
}

module.exports = {
  getConsultas,
  deleteEventos,
  updateEventos,
};
