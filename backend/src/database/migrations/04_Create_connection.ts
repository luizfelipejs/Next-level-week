import knex from 'knex';


export async function up(knex: knex) {
    return knex.schema.createTable('connection', table => {
        table.increments("id").primary();

        table.integer("user_id")
            .notNullable()
           
        
        table.foreign("user_id")
            .references("id")
            .inTable("users")
            .onUpdate("CASCADE")
            .onDelete("CASCADE")

        table.timestamp("created_At")
            .defaultTo(knex.raw("CURRENT_TIMESTAMP"))
            .notNullable()
    })
}

export async function down (knex: knex) {
    return knex.schema.dropTable("connection");
}
