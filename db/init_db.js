const { client } = require("./");

async function buildTables() {
  try {
    client.connect();

    console.log("Starting to drop all tables...");
    await client.query(`
            DROP TABLE IF EXISTS list_items;
            DROP TABLE IF EXISTS user_lists;
            DROP TABLE IF EXISTS users;
        `);

    console.log("Finished dropping all tables!");

    console.log("Beginning to Create Tables...");

    await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL

                );

            CREATE TABLE user_lists (
                id SERIAL PRIMARY KEY,
                list_name VARCHAR(255) NOT NULL,
                owner INTEGER NOT NULL REFERENCES users (id)
            );

            CREATE TABLE list_items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                "listId" INTEGER NOT NULL REFERENCES user_lists (id),
                "isComplete" BOOLEAN DEFAULT false

            );
        `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.log("Error while creating Tables!");
  }
}

buildTables();
