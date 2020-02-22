exports.seed = function(knex) {
  return knex("users")
    .truncate()
    .then(function() {
      return knex("users").insert([
        { username: "tiffany25", password: "123456" },
      ])
    })
}