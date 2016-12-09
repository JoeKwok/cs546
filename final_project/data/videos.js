const fs = require('fs');
const fileData = require('./fileData');
const mongoCollections = require("../config/mongoCollections");
const videoCollection = mongoCollections.videos;
const uuid = require('node-uuid');

let exportedMethods = {
    getVideos() {
        return new Promise((fulfill, reject) => {
            videoCollection().then((collection) => {
                collection.find({}).toArray().then((videos) => {
                    fulfill(videos);
                });
            });
        });
    },
    saveVideo(filepath, originalName, userId, locationId) {
        return new Promise((fulfill, reject) => {
            let video = { _id: uuid.v4(), 
                filepath: filepath, 
                originalName: originalName,
                userId: userId, 
                locationId: locationId
            };
            videoCollection().then((collection) => {
                collection.insertOne(video).then(() => {
                    fulfill(video._id);
                });
            });
        });
    },
    getVideosByLocationId(locationId) {
	    return new Promise((fulfill, reject) => {
            videoCollection().then((collection) => {
                collection.find({locationId: locationId}).toArray().then((videos) => {
                    fulfill(videos);
                })
            });
        });
	},
    deleteVideosByLocationId(locationId) {
        return new Promise((fulfill, reject) => {
            videoCollection().then((collection) => {
                collection.find({locationId: locationId}).toArray().then((videos) => {
                    if(videos) {
                        videos.forEach((video) => {
                            fs.unlinkSync(video.filepath);
                        });
                        collection.remove({locationId: locationId}).then((info) => {
                            fulfill(locationId);
                        });
                    } else {
                        fulfill("no videos with the location id");
                    }
                });
                
            });
        });
    }
}

module.exports = exportedMethods;
