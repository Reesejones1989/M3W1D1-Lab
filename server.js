const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine')
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const methodOverride = require('method-override');



//data
// const fruits = require("./models/fruits")
// const vegetables = require("./models/vegetables")
const Vegetable = require("./models/vegetable.js")
const Fruit = require('./models/fruit.js');
console.log(Vegetable)

//view engine setup
app.set('view engine', 'jsx');
// app.engine('jsx', require('jsx-view-engine'));
app.engine('jsx', jsxEngine())


dotenv.config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

mongoose.connection.once("open", () => {
    console.log("Connected to mongo")
})
// console.log(process.env)

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:true}));//originally false

app.use(methodOverride('_method'));


app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'


app.get('/fruits/seed', async (req, res)=>{
    try {
        await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
    ])
        res.redirect('/fruits')
    } catch (error) {
        console.error(error)
      }
});
//routes of all
//INDEX 
// app.get('/fruits/', (req, res) => {
//     // res.send(fruits);
//     res.render('fruits/Index', { fruits: fruits });
// });

app.get('/fruits/', async (req, res)=>{
    // res.render('fruits/Index');
    try{
        const fruits = await Fruit.find();
        res.render("fruits/Index", {fruits: fruits})
    }
    catch(error){
        console.error(error)
    }})

    
app.get('/vegetables/', async (req, res) => {
    // res.send(vegetables);
    try{
        const vegetables = await Vegetable.find();
        res.render('vegetables/Index', { vegetables: vegetables });
    }
    catch(error){
        console.error(error)
    }})

//NEW- Get the Form to add a new fruit

app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});

//DELETE

app.delete('/fruits/:id', async(req, res)=>{
   try {
    await Fruit.findByIdAndRemove(req.params.id)
        res.redirect('/fruits');//redirect back to fruits index
    }catch(error){
        console.error(error)
    }})


app.delete('/vegetables/:id', async(req, res)=>{
    try {
    await vegetable.findByIdAndRemove(req.params.id)
             res.redirect('/vegetables');//redirect back to vegetables index
    }catch(error){
             console.error(error)
    }})
//UPDATE

app.put("/fruits/:id",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
      }
      // fruits.push(req.body);
       await Fruit.findByIdAndUpdate(req.params.id, req.body)
  
      res.redirect("/fruits")
  
    } catch(error) {
      console.log(error)
    }
  })

  app.put("/vegetables/:id",  async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false //do some data correction
      }
      // fruits.push(req.body);
       await vegetable.findByIdAndUpdate(req.params.id, req.body)
  
      res.redirect("/vegetables")
  
    } catch(error) {
      console.log(error)
    }
  })


//CREATE
// app.post('/fruits', (req, res) => {
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true; //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//     }
//     // console.log(req.body)
//     fruits.push(req.body);
//     console.log(fruits)
//     // res.send('data received');
//     res.redirect('/fruits'); //send the user back to /fruits

// });
app.post('/fruits', async (req, res)=>{
    try{
    
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
     await Fruit.create(req.body);
     res.redirect("/fruits");
} catch(error){
    console.log(error);
}
});



app.post('/vegetables', async(req, res) => {
   try{

    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    await Vegetable.create(req.body);
    // res.send('data received');
    res.redirect('/vegetables'); //send the user back to /vegetables
   }catch(error){
    console.log(error)
   }
});

//EDIT

app.get('/fruits/:id/edit', async (req, res)=>{
    try {
        const foundFruit = await Fruit.findById(req.params.id)
        res.render('fruits/Edit', 
        {fruit: foundFruit})
    } catch(error) {
        console.log(error)
      }
})

app.get('/vegetables/:id/edit', async (req, res)=>{
    try {
        const foundVegetable = await Vegetable.findById(req.params.id)
        res.render('vegetables/Edit', 
        {vegetable : foundVegetable})
    } catch(error) {
        console.log(error)
      }
})

//SHOW 
//Show route singular
app.get('/fruits/:id', async (req, res) => {
//     // res.send(fruits[req.params.indexOfFruitsArray]);
//     res.render('fruits/Show', {
//         fruit: fruits[req.params.indexOfFruitsArray] //
// });
// });
try{
    const fruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {fruit: fruit})
}catch(error){
    console.log(error)
}
});

app.get('/vegetables/:id', async(req, res) => {
    // res.send(fruits[req.params.indexOfVegetablesArray]);
    try{
        const vegetable = await Vegetable.findById(req.params.id);
        res.render("vegetables/Show", {vegetable: vegetable})
    }catch(error){
        console.log(error)
    }
    });
        






app.listen(process.env.PORT || 3000, () => {
    console.log('listening');
});