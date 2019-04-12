const express = require('express');

const router = require('../routes/router.js');

const server = express();

server.use(express.json());



server.get('/', async (req, res) => {
    res.status(200).json({ api: 'Skate or Die!' });
});

server.get('/games', async (req, res) => {
    const allGames = await router.getAll();
    res.status(200).json(allGames);
});



server.post('/games', async (req, res) => {
    if (!req.body.title || !req.body.genre) { 
        return res.status(400).json({ 
            message:"Please include a title and genre to create a new game" 
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


