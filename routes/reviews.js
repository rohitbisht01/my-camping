const express = require("express");
const router = express.Router({ mergeParams: true });

const catchAsync = require("../utils/catchAsync");
// const Campground = require("../models/campground");
// const Review = require("../models/review");

const { ValidateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

const reviews = require("../controllers/reviews");

router.post("/", ValidateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isReviewAuthor,
  isLoggedIn,
  catchAsync(reviews.deleteReviews)
);

module.exports = router;
