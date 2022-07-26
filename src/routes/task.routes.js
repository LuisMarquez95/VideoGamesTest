const express = require('express');
const task = require('../models/task');
const router = express.Router();
const Game = require('../models/task')

router.get('/',  async(req, res) => {
    const games = await Game.find();
    console.log(games);
    res.json(games);
});

router.post('/', async (req, res)=>{
    
    const {title, description} = req.body;
    const game =  new Game({title, description})
    await game.save();
    res.json({status: "200"});

});

router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newGame = {title, description};
    await Game.findByIdAndUpdate(req.params.id, newGame);
    res.json({status:'200'});
})

router.delete('/:id', async (req, res) =>{
    await Game.findByIdAndRemove(req.params.id);
})

router.get('/:id', async (req, res) =>{
    const Game = Game.findById(req.params.id);
    res.json(Game);
})

module.exports = router;