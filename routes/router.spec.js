const db = require('../knexConfig.js');
const Games = require('./router.js');



describe('game route tests', () => {
    beforeEach(async () => { // Clean up db before every run
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

    describe('delete() from games', () => {
        it('games should be zero at start', async () => {
            const games = await db('games');
            expect(games).toHaveLength(0)            
        })

        it('should add a record to games, then remove index 1 and have zero', async () => {
            await Games.insert({
                title:'Mortal Kombat 2',
                genre:'cabinet', 
                releaseYear:1999
            })
            const games = await db('games')
            expect(games).toHaveLength(1)

            await Games.remove(1)
            const gamesAfterDelete = await db('games')
            expect(gamesAfterDelete).toHaveLength(0)
        })
    })

})

