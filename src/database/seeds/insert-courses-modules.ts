import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("courses").insert([
        { name: "java" },
        { name: "js" },
        { name: "php" },
        { name: "banco de dados" },
        { name: "json" },
        ]);
};
