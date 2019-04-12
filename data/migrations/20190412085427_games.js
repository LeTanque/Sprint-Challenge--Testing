


exports.up = function(knex) {
    return knex.schema.createTable('games', game => {
        game.increments();

        game.string('title', 255).notNullable();

        game.string('genre', 255).notNullable();
        
        game.integer('releaseYear');

    });
};
  


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('games');
};


