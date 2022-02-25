const knex = require('knex')({
    client : 'mysql',
    connection :{
        host : 'localhost',
        user : 'root',
        password : 'Kavi@123',
        database : 'blogApp'
    }
});



//Register
knex.schema.hasTable('Registeration').then((exists) =>{
    if (!exists) {
      return knex.schema.createTable('Registeration', (table) =>{
        table.increments('id').primary();
        table.string('email').notNullable().unique();
        table.string('password');
      });
    }
});




//User Posts
knex.schema.hasTable('CreatePosts').then((exists) =>{
    if(!exists) { 
        return knex.schema.createTable('CreatePosts', (table)=>{
            table.increments('id').primary();
            table.integer('user_id')
            table.string('Title');
            table.string('Description');
        })
    }
});



//Like/Dislike
knex.schema.hasTable('Like_DisLike').then((exists)=>{
    if (!exists) {
        return knex.schema.createTable('Like_DisLike', (table) =>{
            table.increments('id').primary();
            table.integer('user_id');
            table.integer('post_id')
            table.boolean('Like');
            table.boolean('Dislike');
        })
    }
});



module.exports = knex;