const client = require("../client");
const bcrypt = require("bcrypt");

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

async function createUser(username, email, password) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

  try {
    const user = await client.query(
      `
        INSERT INTO users(username, email, password)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING  *;
    `,
      [username, email, hashedPassword]
    );
    delete user.password;
    return user;
  } catch (err) {
    console.log(err, "error");
  }
}

async function getUserById(id) {
  try {
    const user = await client.query(
      `
            SELECT *
            FROM users
            WHERE id=$1;
        `,
      [id]
    );
    return user;
  } catch (err) {
    console.log(err, "Error ");
  }
}

// async function getUserByUsername(username) {

// }

async function updateUser(username, newUsername, newPassword, newEmail) {
  try {
    const user = await client.query(
      `
            UPDATE users
            SET password=$1, username=$2, email=$3
            WHERE username=$4;
        `,
      [newPassword, newUsername, newEmail, username]
    );
    return user;
  } catch (err) {
    console.log(err, "Error my friend");
  }
}

async function deleteUser(id) {
  try {
    await client.query(
      `
            DELETE FROM users
            WHERE id=$1;
        `,
      [id]
    );
  } catch (err) {
    console.log(err, "Error deleting chief");
  }
}
