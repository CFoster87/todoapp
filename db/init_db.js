const { client } = require(".");

const {
    Users,
    List,
    Item,
} = require('./')


async function buildTables() {
    try {
        client.connect();

        console.log("Starting to drop all tables...")
        await client.query(`
            DROP TABLE IF EXISTS list_items;
            DROP TABLE IF EXISTS user_lists;
            DROP TABLE IF EXISTS users;
        `)

        console.log("Finished dropping all tables!")
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
        `)
        console.log("Finished creating tables!")
    } catch (error) {
        console.log("Error while creating Tables!")
    }
}

async function populateInitialData() {
    try {
        console.log("Creating initial users...")

        const user1 = await Users.createUser("eyolo", "fostergnomes@gmail.com", "password")
        const user2 = await Users.createUser("ashcheeks", "ashcheeks@gmail.com", "pokemon")
        const user3 = await Users.createUser("ghost", "graveyard@gmail.com", "boo!")

        console.log("Finished creating users!", user1, user2, user3)

        console.log("Creating initial user_lists...")

        const list1 = await List.createList("Groceries", 1)
        const list2 = await List.createList("Tasks", 1)
        const list3 = await List.createList("Groceries", 2)
        const list4 = await List.createList("Groceries", 3)
        const list5 = await List.createList("Haunting", 3)
        const list6 = await List.createList("Resting Places", 3)

        console.log(list1, list4, list6)

        console.log("Finished creating initial user_lists!")
        console.log("Started creating initial list items...")

        const item1 = await Item.createItem("Carrots", 1, false)
        const item2 = await Item.createItem("Eggplant", 1, false)
        const item3 = await Item.createItem("Ramen", 1, true)
        const item4 = await Item.createItem("Grocery Shopping",2, false)
        
        const item5 = await Item.createItem("Milk", 3, false)
        const item6 = await Item.createItem("Cereal", 3, false)
        const item7 = await Item.createItem("Strawberries", 3, true)

        const item8 = await Item.createItem("Graveyard", 5, false)
        const item9 = await Item.createItem("House", 5, false)
        const item10 = await Item.createItem("Creepy woods", 5, true)

        console.log("Chris GroceryLists: ", item1, item2, item3, " Chris task lists: ", item4, " Ash Grocery list: ", item5, item6, item7, " Ghost haunting locations: ", item8, item9, item10)


        console.log("Finished creating initial list items!", item1)

        console.log("Here are all of Ghosts' lists: ", await List.getAllUsersLists(3))

    } catch(err) {
        console.log(err, 'error')
    }
    }

buildTables()
    .then(populateInitialData)
    .catch(console.error)
    .finally(() => client.end)