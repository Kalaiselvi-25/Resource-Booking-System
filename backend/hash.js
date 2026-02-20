const bcrypt = require("bcryptjs");

const plainPassword = "team13"; // Admin login password

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) console.log(err);
  console.log("Encrypted Password:", hash);
});
