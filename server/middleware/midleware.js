const pool = require("../db/config");



const verificarCredencial = async (email, password) => {

    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND password = $2";
    const values = [email, password];
    const { rowCount } = await pool.query(consulta, values);
    
    if (!rowCount)
        throw ({
            code: 404,
            message: "credenciales invalidas"
        })

    
}


module.exports = {
  verificarCredencial
};
    