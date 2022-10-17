const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  // here we got multiple review ==> One to many relationship
  // connect review with campground
});

module.exports = mongoose.model("Review", reviewSchema);
