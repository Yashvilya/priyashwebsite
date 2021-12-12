const express = require("express");
const path = require("path");
const app = express();
// const bodyparser=require ("body-parser")
var mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/' ,{useNewUrlParser:true});
const port = 8000;
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String

  });
  const Contact = mongoose.model('Contact', contactSchema);

// For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Set the template engine as pug
app.set('view engine', 'pug')
// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
app.get('/' , ( req,res) =>{
    const params={}
res.status(200).render( 'home.pug' ,params)
})
// app.post('/contact' , ( req,res) =>{
    app.get("/contact", (req, res)=>{ 
        
// var myData=new Contact(req.body);
// myData.save(),then(()=>{
//  res.send("the item has been saved to database")
// }).catch(()=>{
//     res.status(400).send("Item has been saved");
// })
    const params={}
res.status(200).render( 'contact.pug' ,params)
});
app.post("/contact", (req, res)=>{ 
        
    var myData=new Contact(req.body);
    myData.save().then(()=>{
     res.send("the item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item has been saved");
    })
        
    // res.status(200).render( 'contact.pug' ,params)
    });
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
