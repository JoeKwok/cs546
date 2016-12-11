const express = require('express');
const router = express.Router();
const multer = require('multer'); const uploadDir = 'uploads/'; const upload = multer({ dest: uploadDir}); const fs = require('fs');
const data = require('../data');
const videosData = data.videos;
const userData = data.users;
const jwtauth = data.jwtauth;
const uuid = require("uuid");

const exec = require('child_process').exec;


router.get("/upload", (req, res) => {
	res.render("videos/upload", {
		partial: "upload-scripts"
	});
});

router.get("/delete/:id", userData.ensureLogin,(req, res) => {
    videosData.deleteVideosById(req.params.id, req.user._id).then(id=>{
        res.redirect("/users/center");
    }).catch(err=>{
        console.log(err);
        res.redirect("/users/center");
    });
});

router.post("/upload", upload.single('video'),(req, res) => {
    if(!req.body.lat){
        res.send('If no gps data provided, we cannot put a pin on the map');
    }
    console.log(uploadDir+req.file.originalname);
    console.log(req.file.path);
    let lat = req.body.lat;
    let lng = req.body.lng;
    //fs.renameSync(req.file.path, uploadDir+req.file.originalname);
    let userId = '';
    userId =  !req.user ? 'public' : req.user._id; 
	videosData.saveVideo(req.file.path, req.file.originalname, userId, lat, lng).then((videoId) => {
        exec(`echo "someone just uploaded a new video name:${req.file.originalname} lat ${req.body.latitude} lng${req.body.longitude}" | mail -s "new video uploaded" sunnyding602@gmail.com`, 
        (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });

        res.redirect('/');
        //res.send(req.file.originalname + " uploaded");
        // res.render("users/upload", {
        //         partial: "home-scripts"
        //     });
    }).catch(console.log);
});

module.exports = router;
