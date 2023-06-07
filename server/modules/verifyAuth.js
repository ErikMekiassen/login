const sql = require("mssql")

async function verifyAuth (email, token) {
  await sql.connect({
    user: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    server: `${process.env.DB_URL}`, 
    database: `${process.env.DB_NAME}`,
    encrypt: false
  });
  const answer = await sql.query(`SELECT * FROM LoginInfo WHERE Email = '${email}' AND Token = '${token}'`);
  if (answer.recordset.length > 0) {
    return true
  } else {
    return false
  }
    
}
module.exports = verifyAuth