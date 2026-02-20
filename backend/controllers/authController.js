const bcrypt = require("bcryptjs");
const db = require("../config/db");

// ✅ LOGIN CONTROLLER
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    // ✅ Compare entered password with encrypted password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Server error" });

      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      res.json({
        message: "Login successful ✅",
        id: user.id,
        name: user.name,
        role: user.role,
      });
    });
  });
};


// ✅ STUDENT REGISTRATION CONTROLLER
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email already exists
  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // ✅ Hash password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "Error encrypting password" });

      const insertQuery =
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

      db.query(insertQuery, [name, email, hashedPassword, "student"], (err) => {
        if (err) return res.status(500).json({ message: "Error creating user" });

        res.json({ message: "Registration successful ✅" });
      });
    });
  });
};
