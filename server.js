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

//routes of all
//index 
app.get('/fruits/', (req, res) => {
    // res.send(fruits);
    res.render('fruits/Index', { fruits: fruits });
});

app.get('/vegetables/', (req, res) => {
    // res.send(vegetables);
    res.render('vegetables/Index', { vegetables: vegetables });
});

//show route singular
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