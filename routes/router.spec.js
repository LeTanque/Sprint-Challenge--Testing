const db = require('../knexConfig.js');
const Games = require('./router.js');







describe('game route tests', () => {
    beforeEach(async () => { // 
        await db('games').truncate();
    })

    describe('insert() into games', () => {
        it('should insert the provided game, then check length', async () => {
            await Games.insert({ 
                title:'Ms. Pac-Man',
                genre:'cabinet', 
                releaseYear:1981
            });
            const games = await db('games');
            expect(games).toHaveLength(1);
        });

        it('should insert the provided game, then check title', async () => {
            const games = await Games.insert({ 
                title:'Street Fighter I',
                genre:'cabinet', 
                releaseYear:1987
            });
            expect(games.title).toBe('Street Fighter I');
        });

        it('should insert the provided game, then check year', async () => {
            const games = await Games.insert({ 
                title:'Mortal Kombat',
                genre:'cabinet', 
                releaseYear:1992
            });
            expect(games.releaseYear).toBe(1992);
        });
    });
})
