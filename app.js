//express is a framework we have initially installed //import cos its in the node modulepwd
import express from 'express'; 
//require (./db/db.js);
import db from './db/db.js';
import bodyParser from 'body-parser'; //this makes us have req.body.something

//the express app
const app = express(); //using the framework
app.use(bodyParser.json()); //parsess incoming requests, makes them accessible as object properties
app.use(bodyParser.urlencoded({extended: false}));

//Getting the todos from the db
app.get('/getTodo/todos', (req, res) => { //whatever your url must be, then params (request and response)
    res.status(200).send({      //if the status of the response is 200, then
        code: 200,           //this is the payload
        success: true,       //whatever you want them to see as the response
        response:"todo successfully retrieved",
        todo: db
    })
    
});
//creating new todo.... understands body cos we have body parser
app.post('/createTodo/todos', (req, res) => {
    if(!req.body.title){    //params from my db values i.e keys
        return res.status(400).send({
            code: 400,
            success: false,
            response: "title is required"
        });
        
    };              //All of this handles failure responses
    if(!req.body.description){
        res.status(400).send({
            code: 400,
            success: false,
            response: "description is required"
        });                   
    };
    //specify what we want saved to the db
    const todo = {
        id: db.length + 1, //this increments the count in the database
        title: req.body.title, //possible cos of body parser
        description: req.body.description
    };
    db.push(todo); //this updates the database
    return res.status(201).send({
        code: 201,
        success: true,
        response: "todo successfully added"
    })

});

const PORT = 8080;
//listen here takes is a method that takes in the port and your function
app.listen(PORT, ()=> {
    console.log(`The server is running on ${PORT}`)
});