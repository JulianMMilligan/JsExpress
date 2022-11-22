const Pool = require('pg').Pool
const pool = new Pool({
    user: 'docker',
    host: 'postgres',
    database : 'mydb',
    password: 'password',
    port: 5432 ,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "Student" ORDER BY "Id" ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log("Database read hit")
      
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM "Student" WHERE "Id" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Database read hit get by ID - ${id}`)
    })
  }

  const createUser = (request, response) => {
    const { name, age , course } = request.body
  
    pool.query('INSERT INTO "Student" ("Name", "Age" , "Course") VALUES ($1, $2 , $3)', [name, age , course], (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201).send(`User added with ID: ${results.insertid}`)
    })
  }


  const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, age , course } = request.body
  
    pool.query(
      'UPDATE "Student" SET "Name" = $1, "Age" = $2 , "Course" = $3 WHERE "Id" = $4',
      [name, age, course, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM "Student" WHERE "Id" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }


  module.exports ={
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  }