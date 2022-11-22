const cors = require("cors");
const express = require("express");
const { param } = require("express-validator");
const { parseComplete } = require("pg-protocol/dist/messages");
const service = express();
const port = 1339;
const name = "Julian";

//setup to read JSON , form data , cors
service.use(express.json());
service.use(express.urlencoded ({extended: true}));
let corsOption = {
  origin :"*" , 
  methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders : "Authorization , Origin , Content-Type , Accept , X-Requested-With" ,
  maxAge: 0
};

//service.use(cors(corsOption)); // to enable cors support 
service.use(cors()); // to enable cors support 


service.listen(port , () => console.log
(`The service is listening on port - http://localhost:${port} , have a good day ${name}`));


service.get('/message' , (req , res) => {
    res.send(`Hello , here is your message ${name}`);
});

service.get('/' , (req , res) => {
    res.send('Welcome to this awesome test');
})

service.get('/hi' , (req , res) => {
    res.send('Hello there');
})

service.get('/book/:book' , (req , res) => {
    res.send (`We can not find ${req.params.book}`);
})

service.post(`/post` , (req , res) => {
    res.send(`This is a post message !`);
})

service.post(`/json` , (req , res) => {
    res.json ({ user : "Julian"});
    res.status(202);
})

service.get(`/error` , (req , res) => {
    res.status(403).end();
})


service.post ('/dogs' , (req , res) => {
    let result = {
        id : 101 ,
        name : req.body.name,
        breed : req.body.breed,
        age : req.body.age

    };

    res.send(result);

})


//Student CRUD Stuff.


//Add Student
service.post('/student' , async (req , res) => {
    console.log ("Adding student");
    console.log (req.body.name);
    console.log (req.body.age);
    console.log (req.body.course);

    res.status(201).send({
        id : 101,
        name : req.body.name,
        age : req.body.age,
        course : req.body.course

    });


});


//Delete Student
service.delete('/student/:id' , async ( req , res) => {
    console.log (`Deleting User via ID , ID = ${req.params.id}`);

    res.status(200).send(`User id -  ${req.params.id} has been deleted.`)
});

//List all students and List student by name via query string
service.get('/student' , async ( req , res) => {
    console.log("Service hit");
    let data = [];
    if (typeof req.query.name === 'string')
    {
        console.log ("Name by query string");
        console.log (req.query.name);
        data[0] = {id : 1 , Name : req.query.name ,  Age: 45 , Course : "SE"};
        data[1] = {id : 2 , Name : req.query.name ,  Age: 35 , Course : "DA"};

    }else{
        console.log("List all students");
        data[0] = {id : 1 , Name : "Julian" ,  Age: 45 , Course : "SE"};
        data[1] = {id : 2 , Name : "Sharon" ,  Age: 35 , Course : "DA"};
        data[2] = {id : 2 , Name : "Kirsty" ,  Age: 35 , Course : "DA"};
        data[3] = {id : 2 , Name : "Sian" ,  Age: 35 , Course : "DA"};
        data[4] = {id : 2 , Name : "Kyle" ,  Age: 35 , Course : "DA"};
        data[5] = {id : 2 , Name : "Rhiannon" ,  Age: 35 , Course : "DA"};
    }

    console.table(data);
    res.send(data);
})

//List individual student
service.get('/student/:id' , async (req , res) => {
    console.log("List a certain student");
    console.log (req.params.id);
    res.send({id : req.params.id , Name : "Julian" , Age : 45 , Course : "SE"});
})

//Postgress Stuff
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

  service.get('/users', getUsers)