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
    saveVideo(filepath, originalName, userId, lat, lng) {
		if(!userId) userId = 'public';
        return new Promise((fulfill, reject) => {
            let video = { _id: uuid.v4(), 
                filepath: filepath, 
                originalName: originalName,
                userId: userId,
				lat: lat,
				lng: lng
                //locationId: locationId
            };
            videoCollection().then((collection) => {
                collection.insertOne(video).then(() => {
                    fulfill(video._id);
                });
            });
        });
    },
    getVideosByUserId(userId) {
		return videoCollection().then((collection) => {
			return collection.find({userId: userId}).toArray().then((videos) => {
				return videos;
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
    deleteVideosById(id, userId) {
        return new Promise((fulfill, reject) => {
            videoCollection().then((collection) => {
                collection.find({_id: id}).toArray().then((videos) => {
                    if(videos) {
                        videos.forEach((video) => {
							if(video.userId != userId){
								reject("you can only delete ur videos");
							}
                            fs.unlinkSync(video.filepath);
                        });
                        collection.remove({_id: id}).then((info) => {
                            fulfill(id);
                        });
                    } else {
                        fulfill("no videos with the location id");
                    }
                });
                
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
