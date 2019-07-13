const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const port = 5678;
var app = express();

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/tasks');
app.use(express.static(__dirname + '/public/dist/public'));

//
// Helpers
//

function printHelper(data){
    console.log('.');
    console.log('..');
    console.log('...');
    console.log('....');
    console.log('.....');
    console.log(data);
    console.log('.....');
    console.log('....');
    console.log('...');
    console.log('..');
    console.log('.');
}


//
// Schemas
//
var TaskSchema = new mongoose.Schema({
    title: {type: String},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date, default: Date.now()}
});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');

//
// Routing
//
app.get('/tasks/:id', (req, res)=>{
    Task.find({_id: req.params.id}, (err, task)=>{
        if(err){
            console.log('Error in pull of all single task:', err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task})
        }
    })
})

app.get('/tasks', (req, res)=>{
    Task.find({}, (err, task_list)=>{
        if(err){
            console.log('Error in pull of all tasks:', err);
            res.json({message: "Error", error: err})
        } else {
            res.json({message: "Success", data: task_list})
        }
    })
})

app.post('/tasks', (req, res)=>{
    console.log(req)
    var task = new Task(req.body);
    newTask = task.save((err)=>{
        if(err){
            console.log('Error in post of new task:', err);
            res.json({message: "Error", error: err});
        }
        console.log(task._id)
        res.redirect('/tasks/'+task._id)
    })
})

app.put('/tasks/:id', (req, res)=>{
    req.body.updated_at = Date.now()
    Task.update({_id: req.params.id}, req.body,(err)=>{
        if(err){
            console.log('Error in update of task:', err);
            res.json({message: "Error", error: err});
        }
        res.redirect('/tasks/'+req.params.id)
    })
})

app.delete('/tasks/:id', (req, res)=>{
    Task.deleteOne({_id: req.params.id}, (err)=>{
        if(err){
            console.log('Error in delete of single task:', err);
            res.json({message: "Error", error: err});
        } 
        res.redirect('/tasks')
    })
})

//Server Port
app.listen(port, function() {
    console.log("listening on port: ",port);
})