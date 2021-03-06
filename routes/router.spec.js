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

    describe('getAll() from games', () => {
        it('should count list of games and it should be zero', async () => {
            const games = await Games.getAll()
            const gamesLength = games.length
            expect(gamesLength).toBe(0)
        })
        it('should count list of games and it should be an empty array', async () => {
            const games = await Games.getAll()
            expect(games).toEqual(expect.arrayContaining([]))
        })
    })

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

        it('should add a 3 records to games, then remove index 2 and have 2, check genre of new index 2', async () => {
            await Games.insert({
                title:'Mortal Kombat 2',
                genre:'cabinet', 
                releaseYear:1999
            })
            await Games.insert({
                title:'Terminator 2',
                genre:'cabinet', 
                releaseYear:1991
            })
            await Games.insert({
                title:'TMNT IV: Turtles in Time',
                genre:'SNES', 
                releaseYear:1992
            })
            const games = await db('games')
            expect(games).toHaveLength(3)

            await Games.remove(2)
            const gamesAfterDelete = await db('games')
            expect(gamesAfterDelete).toHaveLength(2)
            expect(gamesAfterDelete[1].genre).toBe('SNES')
        })
    })

})

