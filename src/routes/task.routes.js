const express = require('express');
const router = express.Router();
const {Console} = require('../models/task');
const {Develop} = require('../models/task');
const {Game} = require('../models/task');
const cors = require('cors');
const multer = require('multer');

/* METODOS PARA GUARDAR CONSOLAS Y CONSULTARLAS */

router.post('/postConsole', async (req, res) =>{
    const {title} = req.body;
    const console = new Console({title});
    await console.save();
    res.json({status: "200"});
})

router.get('/findConsole',  async(req, res) => {
    const console = await Console.find();
    res.json(console);
});

router.get('/findConsoleByName/:title', async (req, res) =>{
    var query = req.query;
    Console.find(query, (err, doscs) => {
        res.json(doscs);
    })
    
})



/* METODO PARA GUARDAR DESARROLLADORES Y CONSULTARLOS */

router.post('/postDevel', async (req, res) =>{
    const {title} = req.body;
    const devel = new Develop({title});
    await devel.save(); 
    res.json({status: "200"});
})

router.get('/findDev',  async(req, res) => {
    const devel = await Develop.find();
    res.json(devel);
});

router.get('/findDevelByName/:title', async (req, res) =>{
    var query = req.query;
    Develop.find(query, (err, doscs) => {
        res.json(doscs);
    })
    
})

router.delete('/deleteDev/:id', async (req, res) =>{
    await Develop.findByIdAndRemove(req.params.id);
    res.json({status: "200"})
})

router.put('/UpdateDevById/:id', async (req, res) => {
    const {title} = req.body;
    const newDev = {title};
    await Develop.findByIdAndUpdate(req.params.id, newDev);
    res.json({status:'200'});
})

router.get('/searchDevById/:id', async (req, res) =>{
    const task = await Develop.findById(req.params.id);
    res.json(task);
 
})

/* METODO PARA GUARDAR VIDEO JUEGOS Y CONSULTARLOS */
router.get('/findGames',  async(req, res) => {
    const games = await Game.find();
    console.log(games);
    res.json(games);
});

router.post('/saveGame', async (req, res)=>{
    
    const {title, 
        description, 
        desarrollador,
        anu,
        consolas,
        imagen,
        activo} = req.body;

    const game =  new Game({title, 
        description, 
        desarrollador,
        anu,
        consolas,
        imagen,
        activo})
    await game.save();
    res.json({status: "200"});

});

router.put('/UpdateGamesById/:id', async (req, res) => {
    const {title, 
        description, 
        desarrollador,
        anu,
        consolas,
        imagen,
        activo} = req.body;

    const newGame = {title, 
        description, 
        desarrollador,
        anu,
        consolas,
        imagen,
        activo};

    await Game.findByIdAndUpdate(req.params.id, newGame);
    res.json({status:'200'});
})

router.delete('/deleteGame/:id', async (req, res) =>{
    await Game.findByIdAndRemove(req.params.id);
})

router.get('/searchGameById/:id', async (req, res) =>{
    const game = Game.findById(req.params.id);
    res.json(game);
})

/* UPLOAD IMAGE */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/files/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })
  
const upload = multer({ storage: storage })

router.use(cors())
  
router.post('/Game/upload',(req, res, next) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
        }
        console.log(req.body);
      /*
        const file = req.files.file;
      
        file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
      
          res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
        });*/
  })

module.exports = router;