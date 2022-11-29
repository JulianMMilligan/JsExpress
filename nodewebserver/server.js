const express = require('express');
const server = express();
const path = require('path');
const port = 1449;
let dirname = __dirname;
server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use (express.static( path.join(dirname,'/public'), {
    //index@ 'home.html' // if you wanted a=to use a different page.
    extensions:['html' , 'htm']
}));

server.listen(port , () => console.log(`The Gibson is online on port - ${port}`));

server.get('/test' , (req , res) => {
    console.log("Webserver test");
    res.send('Welcome to this awesome test');

})