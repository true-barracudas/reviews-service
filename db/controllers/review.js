const Reviews = require('../models/review.js');

const getReviews = (cb) => {
  Reviews.findAll((err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const getShoeReviews = (id, cb) => {
  Reviews.findOne(id, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const addReview = (review, cb) => {
  Reviews.insertOne(review, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

const getHelpful = (id, cb) => {
  Reviews.findOne(id, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      data[0].reviews = data[0].reviews.filter((d) => d.helpfulYes > 0);
      data[0].reviews.sort((a, b) => b.helpfulYes - a.helpfulYes);
      cb(null, data);
    }
  });
};

const getNewest = (id, cb) => {
  Reviews.findOne(id, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      data[0].reviews.sort((a, b) => new Date(b.reviewDate) - new Date(a.reviewDate));
      cb(null, data);
    }
  });
};

const getRelevant = (id, cb) => {
  Reviews.findOne(id, (err, data) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      data[0].reviews = data[0].reviews.filter((d) => d.verified > 0);
      cb(null, data);
    }
  });
};

module.exports = {
  getReviews,
  getShoeReviews,
  addReview,
  getHelpful,
  getNewest,
  getRelevant,
};
