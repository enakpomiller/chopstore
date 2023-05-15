const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const bcrypt = require('bcrypt');
const exphbs = require('express-handlebars');
const {Sequelize, QueryTypes, EmptyResultError} = require('sequelize');



const app = express();
app.use (express.json())

// body parser
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));

app.set('view engine','handlebars');
app.use(bodyPaser.urlencoded({ extended : false}))

// set static folders
app.use(express.static("public"));
app.use("/uploads",express.static("uploads"));
app.get('/',(req,res) => res.render('index', {layout: 'landing'}));

   //app.set('views', path.join(__dirname, 'views')); // my view folder

app.get('/',(req,res) => res.render('index', {admin: 'adminlogin'}));




// linking to our database
const sequelize = new Sequelize('chop_store','root','',{
  dialect: "mysql"
});
// testing the connection
sequelize.authenticate().then(() => {
  console.log(' connection to database was successful');
}).catch((error) =>console.log(error,' sorry an error connecting to database'));

// about us routing 
app.get('/aboutus',(req,res) => {
   const title = " About Us ";
   res.render("aboutus",{title});
   
})


// gallery page 
app.get('/gallery',(req,res) => {
   const title = " Gallery ";
   res.render('gallery',{title});
})

app.get('/contact',(req,res) => {
   const title = " Contacts ";
   res.render("contact",{title});
})


app.get('/admin/login', (req, res) => {
  res.render('admin/adminLogin', { title: 'Admin Login', layout: 'AdminLoginLayout' });
});













const PORT = process.env.PORT || 4800;
app.listen(PORT, console.log(`app running at port ${PORT}`)); 