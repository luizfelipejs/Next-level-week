import knex from 'knex';


export async function up(knex: knex) {
    return knex.schema.createTable('classes_schedule', table => {
        table.increments("id").primary();

        table.integer("week_day").notNullable();
        table.integer("from").notNullable();
        table.integer("to").notNullable();

        table.integer("class_id").notNullable()
        
        table.foreign("class_id").references("id").inTable("classes").onUpdate("CASCADE").onDelete("CASCADE")


    })
}

export async function down (knex: knex) {
    return knex.schema.dropTable("classes_schedule");
}
