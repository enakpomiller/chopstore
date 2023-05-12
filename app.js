const express = require('express');
const bodyPaser = require('body-parser');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const {Sequelize, QueryTypes, EmptyResultError} = require('sequelize');



const app = express();
//app.use = express.json();

// body parser
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine','handlebars');
app.use(bodyPaser.urlencoded({ extended : false}))

// set static folders
app.use(express.static("public"));
app.use("/uploads",express.static("uploads"));
app.get('/',(req,res) => res.render('index', {layout: 'landing'}))


// linking to our database
const sequelize = new Sequelize('chop_store','root','',{
  dialect: "mysql"
});
// testing the connection
sequelize.authenticate().then(() => {
  console.log(' connection to database was successful');
}).catch((error) =>console.log(error,' sorry an error connecting to database'));



const PORT = process.env.PORT || 4800;
app.listen(PORT, console.log(`app running at port ${PORT}`)); 