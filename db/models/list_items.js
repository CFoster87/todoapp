const client = require("../client");


module.exports = {
    createItem,
    updateItemById,
    deleteItem,

}

async function createItem(name, listId, isComplete) {

    try{
        const listItem = await client.query(
            `
            INSERT INTO list_items (name, "listId", "isComplete")
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, listId, isComplete])
        return listItem.rows
    } catch(err) {
        console.log(err, "Error")
    }

}

async function updateItemById(id, name, isComplete) {

    try {
        await client.query(`
        UPDATE list_items
        SET name=($2), isComplete"=($3)
        WHERE id = $1
        `, [id, name, isComplete])
    } catch (err) {
        console.log(err, "error")
    }

}

async function deleteItem(id) {

    try {
        await client.query(`
        DELETE list_items
        WHERE id = $1
        `, [id])
    } catch (err) {
        console.log(err, "error")
    }

}