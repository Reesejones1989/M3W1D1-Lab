const express = require('express');
const app = express();
const jsxEngine = require('jsx-view-engine')

//data
const fruits = require("./models/fruits")
const vegetables = require("./models/vegetables")

//view engine setup
app.set('view engine', 'jsx');
// app.engine('jsx', require('jsx-view-engine'));
app.engine('jsx', jsxEngine())

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

//routes of all
//INDEX 
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    res.render('fruits/Index', { fruits: fruits });
});

app.get('/vegetables/', (req, res) => {
    // res.send(vegetables);
    res.render('vegetables/Index', { vegetables: vegetables });
});

//NEW- Get the Form to add a new fruit

app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});

//DELETE
//UPDATE
//CREATE
app.post('/fruits', (req, res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    // console.log(req.body)
    fruits.push(req.body);
    console.log(fruits)
    // res.send('data received');
    res.redirect('/fruits'); //send the user back to /fruits

});

app.post('/vegetables', (req, res) => {
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    // console.log(req.body)
    vegetables.push(req.body);
    console.log(vegetables)
    // res.send('data received');
    res.redirect('/vegetables'); //send the user back to /vegetables

});

//EDIT


//SHOW 
//Show route singular
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('fruits/Show', {
        fruit: fruits[req.params.indexOfFruitsArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
});
});

app.get('/vegetables/:indexOfVegetablesArray', (req, res) => {
    // res.send(fruits[req.params.indexOfVegetablesArray]);
    res.render('vegetables/Show', {
        vegetable: vegetables[req.params.indexOfVegetablesArray] //there will be a variable available inside the ejs file called fruit, its value is fruits[req.params.indexOfFruitsArray]
});
});

app.listen(3000, () => {
    console.log('listening');
});