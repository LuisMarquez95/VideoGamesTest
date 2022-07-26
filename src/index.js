//Variables
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const {moongose} = require('./database')
//Configuracion
app.set('port', process.env.PORT || 3000) //Tomar el puerto cloud

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes

app.use('/api/task', require('./routes/task.routes'));


//Static files
app.use(express.static(path.join(__dirname, 'public')));


//Start Server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})