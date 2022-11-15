const cors = require("cors");
const express = require("express");
const { param } = require("express-validator");
const { parseComplete } = require("pg-protocol/dist/messages");
const { paramsHaveRequestBody } = require("request/lib/helpers");
const service = express();
const port = 1339;
const name = "Julian";

//setup to read JSON , form data , cors
service.use(express.json());
service.use(express.urlencoded ({extended: true}));
//let corsOption = {
//  origin :"*" , 
//  methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
//  allowedHeaders : "Authorization , Origin , Content-Type , Accept , X-Requested-With" ,
//  maxAge: 0
//};

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