const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadDir = 'uploads/';
const upload = multer({ dest: uploadDir});
const fs = require('fs');
const data = require('../data');
const reviewsData = data.reviews;
const jwtauth = data.jwtauth;
const uuid = require("uuid");

const exec = require('child_process').exec;


router.post("/add", (req, res) => {
    let locationId = req.body.locationId;
    let userId = req.user._id;
    let rating = req.body.rating;
    let comment = req.body.comment;

    reviewsData.addReview(locationId, userId, rating, comment).then(newId=>{
        console.log(newId);
        res.json({newId:newId});
    }).catch(err=>{
        res.json({error: err});
    });
});

module.exports = router;
