const db = require("../database/config");

async function add(user) {
  const [id] = await db("users").insert(user);
  return findByID(id);
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filer) {
  return db("users").select("id", "username", "password");
}

function findByID(id) {
  return db("users").select("id", "username").where({ id }).first();
}

module.exports = {
  add,
  find,
  findBy,
  findByID,
};
