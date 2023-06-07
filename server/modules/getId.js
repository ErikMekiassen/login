const sql = require("mssql")

async function getId(email, token) {
    await sql.connect({
        user: `${process.env.DB_USERNAME}`,
        password: `${process.env.DB_PASSWORD}`,
        server: `${process.env.DB_URL}`, 
        database: `${process.env.DB_NAME}`,
        encrypt: false
      });
      const query = await sql.query(`SELECT Id FROM LoginInfo WHERE Email = '${email}' AND Token = '${token}'`);
      const id = query.recordset[0].Id
      return id
}
module.exports = getId