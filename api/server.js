const express = require('express');

const router = require('../routes/router.js');

const server = express();

server.use(express.json());


// GET endpoints
server.get('/', async (req, res) => {
    res.status(200).json({ api: 'Skate or Die!' });
});

server.get('/games', async (req, res) => {
    const allGames = await router.getAll();
    res.status(200).json(allGames);
});

server.get('/games/:id', async (req, res) => {
    try {
        const targetGame = await router.getById(req.params.id);
        if (!targetGame) return res.status(404).json({ message:"Game not found" })
        res.status(200).json({ game:targetGame })
    } catch (error) {
        res.status(500).json({ error:error })
    }
})




// POST endpoints
server.post('/games', async (req, res) => {
    if (!req.body.title || !req.body.genre) { 
        return res.status(422).json({ 
            message:"Please include a title and genre to create a new game!"
        })
    }
    try {
        const game = await router.insert(req.body);
        res.status(201).json(game);
    } catch (error) {
        res.status(500).json({ message:error });
    }
})








module.exports = server;


