// const means never changes - short for constant
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

// give me a new instance of an express application
// the `app` variable shouldn't be changed
const app = express();

// setup the view engine
app.set('view engine', 'hbs');
app.use(express.static('public'));

// setup wax on so that it will works with hbs
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

// ROUTES HERE

// END ROUTES

app.listen(3000, ()=>{console.log("Server started")});
