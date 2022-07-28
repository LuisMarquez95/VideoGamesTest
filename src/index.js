//Variables
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

const {moongose} = require('./database')
//Configuracion
app.set('port', process.env.PORT || 3000) //Tomar el puerto cloud

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes

app.use('/api/task', require('./routes/task.routes'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/files')));
//app.use(express.static("./public"))

//Start Server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})
