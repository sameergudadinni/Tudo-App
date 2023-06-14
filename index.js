const express = require('express');
const { write } = require('fs');
//require path for files
const path = require('path');
//define port number
const port = 5000;

//require database 
const db = require('./config/mongoose');
const Task = require('./models/task');
const app = express();

//setting ejs file (view engine)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'./views'));
app.use(express.urlencoded());


//home page 
app.get('/',async function(req,res){
    
    
    // Task.find({},function(err,task){
    //     if(err){
    //         console.log('Error in fetching tasks from db');
    //         return;
    //     }

    //     return res.render('home',{
    //         tittle: "Home",
    //         task: task
    //     });

    const task = await Task.find();
   // console.log("task",task);

     return res.render('home',{
            tittle: "Home",
            task: task
    })
});

//create task which gives by user
app.post('/create-task',async function(req,res){
    // Task.create({
    //     description: req.body.description,
    //     category: req.body.category,
    //     date: req.body.date
    // },function(err,newtask){
    //     if(err){
    //         console.log('error in creating task',err);
    //         return;
    //     }
    //     return res.redirect('back');

    const task = await Task.create({
        description: req.body.description,
            category: req.body.category,
            date: req.body.date
    });
    return res.redirect('back');
    });
//});

//delete task if need
app.get('/delete-task', async function(req, res){
    const id = req.query;

    const count = Object.keys(id).length;
    try {
        for(let i=0; i < count ; i++){
            await Task.findByIdAndDelete(Object.keys(id)[i]);
        }
        return res.redirect('back');
    } catch (err) {
        console.log('error in deleting task', err);
        return res.status(500).send('Internal server error');
    }
});
        


//server starting 
app.listen(port, (err)=>{
    if(err){
     console.log('OOps something is wrong change that and try again.',err);
    }
    console.log('now its working you can go at port :',port);
});