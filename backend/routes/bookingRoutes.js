const express = require("express");
const router = express.Router();
const {
    addBooking,
    getMyBookings,
    getPendingBookings,
    updateBookingStatus
} = require("../controllers/bookingController");

router.post("/add", addBooking);
router.get("/my/:user_id", getMyBookings);
router.get("/pending", getPendingBookings);
router.put("/update/:id", updateBookingStatus);

module.exports = router;
