
const express=require('express');
const fs=require('fs');
const multer = require('multer');


const storage = multer.memoryStorage(); 
var upload = multer({ storage });
//const sqlRouter=require('./main');

const app=express();
const morgan=require('morgan');
const { format } = require('path');
const guest = require('./middleware/guestCookie').guest;
const auth = require('./middleware/auth').auth;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const authUtils=require('./utils/authUtils.js');


//import routes
const authRoutes= require('./routes/authenRoute.js');
const fileRoutes = require('./routes/fileRoute.js');
const serviceRoutes=require('./routes/serviceRoute.js');
const compamyRoutes=require('./routes/companyRoute.js');
const supabase =require( './main');
app.set('view engine','ejs');
app.set('views','views');
// middleWare Array
const middleWare=[
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended: true}),
    express.json(),
    cookieParser(),
    guest,
    auth,
]

app.use(middleWare);
app.use('/auth',authRoutes);
app.use('/file',fileRoutes);



app.get('/',(req,res)=>{
    
    try {
        let Logged = req.user != null;
        //res.render('basic/home.ejs');
        res.render('basic/login.ejs');
    } catch (error) {
        // Handle the error here
        console.error('Error rendering the EJS template:', error);
        // You can also send an error response to the client if needed
        res.status(500).send('Internal Server Error');
    }
    
});


app.post('/',(req,res)=>{
    let Logged=(req.user!=null);
    try {
        let Logged = req.user != null;
        res.render('basic/home.ejs');
    } catch (error) {
        // Handle the error here
        console.error('Error rendering the EJS template:', error);
        // You can also send an error response to the client if needed
        res.status(500).send('Internal Server Error');
    }
    console.log(req);
   
   
});


const PORT=4000;
app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
});