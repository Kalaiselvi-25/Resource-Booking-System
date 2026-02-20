const db = require("../config/db");

// ➤ Add Booking
exports.addBooking = (req, res) => {
    const { user_id, resource_id, date, time } = req.body;

    if (!user_id || !resource_id || !date || !time) {
        return res.status(400).json({ message: "All fields required" });
    }

    const query = `
        INSERT INTO bookings (user_id, resource_id, date, time)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [user_id, resource_id, date, time], (err) => {
        if (err) {
            console.error("DB error in addBooking:", err);
            return res.status(500).json({
                message: "Database error",
                error: err.message
            });
        }

        res.json({ message: "Booking request submitted" });
    });
};

// ➤ Load student own bookings
exports.getMyBookings = (req, res) => {
    const { user_id } = req.params;

    const query = `
        SELECT b.id, r.name AS resource, b.date, b.time, b.status
        FROM bookings b
        JOIN resources r ON r.id = b.resource_id
        WHERE b.user_id = ?
        ORDER BY b.id DESC
    `;

    db.query(query, [user_id], (err, results) => {
        if (err) {
            console.error("DB error in getMyBookings:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        res.json(results);
    });
};

// ➤ Admin → View pending bookings
exports.getPendingBookings = (req, res) => {
    const query = `
        SELECT b.id, u.name AS student, r.name AS resource, b.date, b.time
        FROM bookings b
        JOIN users u ON u.id = b.user_id
        JOIN resources r ON r.id = b.resource_id
        WHERE b.status = 'pending'
        ORDER BY b.id ASC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("DB error in getPendingBookings:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        res.json(results);
    });
};

// ➤ Update status (approve / reject)
exports.updateBookingStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const query = `UPDATE bookings SET status = ? WHERE id = ?`;

    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error("DB error in updateBookingStatus:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json({ message: "Status updated" });
    });
};
