import { after } from "node:test";

export default{
    client: "sqlite3",
    connection: {
        filename: "./src/database/database.db"
    },
    pool:{
        afterCreate: (connection: any, done: any) => {
            connection.run("PRAGMA foreign_keys = ON");
            done();
            
        }
    },
    useNullAsDefault: true,
    migrations: {
        extension: "ts",  // Use 'extension' no singular, não 'extensions'
        directory: "./src/database/migrations"
    },
    seeds: {
        extension: "ts",
        directory: "./src/database/seeds"
    }
};

 

//colocar esse comando em scripts no package.json
//"knex":"node --import tsx ./node_modules/knex/bin/cli.js"

//depois rodar o comando
//npm run knex -- migrate:make create-courses

//depois rodar o comando
//npm run knex -- migrate:latest