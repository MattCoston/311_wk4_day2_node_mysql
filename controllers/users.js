const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  let id = req.params.id
  
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = "SELECT * FROM users WHERE ID = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  let body = req.body
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users SET ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [body])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let first_name = req.body.first_name
  let last_name = req.body.last_name
  let id = req.params.id
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  let sql = "UPDATE users SET first_name = ?, last_name = ? WHERE id = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name, last_name, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  let first_name = req.body.first_name
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM users WHERE first_name = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}