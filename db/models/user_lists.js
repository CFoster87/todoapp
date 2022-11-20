const client = require('../client')

module.exports = {
    createList,
    getListById,
    deleteList,
    getAllUsersLists,
}

async function createList(name, userId){
    try {
        const list = await client.query(`
            INSERT INTO user_lists (list_name, owner)
            VALUES ($1, $2)
            RETURNING *;
        `, [name, userId])

        return list.rows
    } catch (err) {
        console.log(err, "error")
    }
}

async function getListById(id) {

    try {
        const list = await client.query(`
        
        SELECT * FROM user_lists
        WHERE id = $1
        RETURNING *

        `, [id])
        return list
    } catch (err) {
        console.log(err, "Error")
    }

}

async function getAllUsersLists(userId) {

    try{
        const allLists = await client.query(`

        SELECT * FROM user_lists
        WHERE owner = $1
        
        `, [userId])
        console.log(allLists)
        return allLists.rows
    } catch (err) {
        console.log(err, "error")
    }

}

async function deleteList(id) {

    try {
        await client.query(`
        DELETE FROM user_lists
        WHERE id = $1
        `, [id])
    } catch (err) {
        console.log(err, "error")
    }

}