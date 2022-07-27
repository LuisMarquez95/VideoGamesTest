const { Int32 } = require('bson');
const mongoose = require('mongoose');
const {Schema}  = mongoose;
/* Esquema de consolas */
const ConsoleSchema  = mongoose.Schema({
    title: {type : String, required: true}
})
/* Esquema de Desarrollador */

const DevSchema  = mongoose.Schema({
    title: {type : String, required: true}
})
/* Esquema de Video juego */
const GameSchema  = mongoose.Schema({
    title: {type : String, required: true},
    description: {type: String, required: true},
    desarrollador: {type: String, required: true},
    anu: {type: String, required: true},
    consolas: {type: String, required: true},
    imagen: {type: String, required: true},
    activo: {type: String, required: true}
})
const Console = mongoose.model('Console', ConsoleSchema);
const Develop = mongoose.model('Developer', DevSchema);
const Game = mongoose.model('Games', GameSchema);
module.exports = {
    Console: Console,
    Develop: Develop,
    Game: Game
}
//module.exports  = mongoose.model('Console', ConsoleSchema);
//module.exports = mongoose.model('Dev',  DevSchema);
//module.exports = mongoose.model('Game', GameSchema);
