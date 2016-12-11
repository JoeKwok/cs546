const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadDir = 'uploads/';
const upload = multer({ dest: uploadDir});
const fs = require('fs');
const data = require('../data');
const videosData = data.videos;
const userData = data.users;
const jwtauth = data.jwtauth;
const uuid = require("uuid");

const exec = require('child_process').exec;

router.get("/", (req, res) => {
    res.render("users/home", {
            partial: "home-scripts" });
});


router.get("/upload", (req, res) => {
	res.render("users/upload", {
		partial: "upload-scripts"
	});
});

//user center, where user can manage his videos 
router.get("/center", userData.ensureLogin, (req, res) => {
    videosData.getVideosByUserId(req.user._id).then(videos=>{
        console.log(videos);
        res.render("users/center", {
            partial: "upload-scripts",
            videos: videos
        });
    }).catch(console.log);

});

router.post("/upload", upload.single('video'),(req, res) => {
    if(!req.body.latitude){
        res.send('If no gps data provided, we cannot put a pin on the map');
    }
    console.log(uploadDir+req.file.originalname);
    console.log(req.file.path);
    //fs.renameSync(req.file.path, uploadDir+req.file.originalname);
    //req.user._id
	videosData.saveVideo(req.file.path, req.file.originalname, /*req.user._id*/"my_user_id", "my_location_id").then((videoId) => {
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
    });
});


router.get("/usersystem", (req, res) => {
    console.log(req.user);
    res.render("users/usersystem",{
        partial: "home-scripts"
    });
});


router.get("/login", (req, res) => {
    console.log(req.user);
    res.render("users/login",{
        partial: "home-scripts"
    });
});


router.post("/signup", (req,res)=> {
    let name = req.body.uname;
    let password = req.body.upwd;
    let _id = uuid.v4();
    let sessionId = jwtauth.genToken(_id);

    userData.createUser(_id, sessionId, password, name).then((info)=> {
        res.cookie('sessionId', sessionId, { expires: new Date(Date.now() + 3600*24), httpOnly: true });
        console.log("signup success");
        res.redirect("/");
    }).catch((err)=> {
        res.status(401).send({success: false, message:err});
    });
});

router.post("/login", (req,res)=> {
    let name = req.body.uname;
    let password = req.body.upwd;
    userData.findOneUser(name,password).then((user) => {
        let sessionId = jwtauth.genToken(user._id);
        userData.updateSessionId(user._id,sessionId).then((user)=> {
            res.cookie('sessionId', sessionId, { expires: new Date(Date.now() + 3600*24), httpOnly: true });
            console.log("login success");
            res.redirect("/");
        });
    }).catch((err)=> {
        res.status(401).send({success: false, message:err});
    });
    
});

router.get("/logout", (req,res)=> {
    console.log("clear");
    res.clearCookie('sessionId');
    res.redirect("/");
});

module.exports = router;
