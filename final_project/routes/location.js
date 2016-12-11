const express = require('express');
const router = express.Router();
const data = require('../data');
const locationsData = data.locations;

const exec = require('child_process').exec;


router.post("/add", (req, res) => {
    let name = req.body.name;
    let userId = req.user._id;
    let lat = req.body.lat;
    let lon = req.body.lon;
    if(!name || !userId || !lat || !lon){
        return Promise.reject("need name userid lat lon");
    }

    locationsData.addReview(name, userId, lat, lon).then(theLocation=>{
        console.log(theLocation);
        res.json(theLocation);
    }).catch(err=>{
        res.json({error: err});
    });
});

module.exports = router;
