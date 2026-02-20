const db = require("../config/db");

// ➤ Add Resource
exports.addResource = (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).json({ message: "All fields required" });
  }

  // Correct: insert into name, type
  const query = "INSERT INTO resources (name, type) VALUES (?, ?)";
  db.query(query, [name, type], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({ message: "Resource added successfully" });
  });
};

// ➤ Get All Resources
exports.getResources = (req, res) => {
  const query = "SELECT * FROM resources";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json(results);
  });
};

// ➤ Delete Resource
exports.deleteResource = (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM resources WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });

    res.json({ message: "Resource deleted successfully" });
  });
};

// ➤ Resource Summary (Total + Names)
exports.getSummary = (req, res) => {
  const query = "SELECT id, name, type FROM resources";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });

    const summary = {};

    results.forEach(item => {
      if (!summary[item.type]) {
        summary[item.type] = {
          type: item.type,
          total: 0,
          names: []
        };
      }

      summary[item.type].total++;
      summary[item.type].names.push(item.name);
    });

    res.json(Object.values(summary));
  });
};
