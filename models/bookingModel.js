const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "Booking must belong to a tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "Booking must have a price"],
  },
  startDate: {
    type: Date,
    required: [true, "Booking must have a date"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingSchema.index({ tour: 1, user: 1, startDate: 1 }, { unique: true });

// Populate user and tour data on find queries
bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "tour",
    select: "name slug startLocation imageCover",
  });
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
