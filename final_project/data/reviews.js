const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const uuid = require('node-uuid');

var exportedMethods = {
    addReview(locationId, userId, rating, comment) {
		if(!locationId || !userId || !rating || !comment){
			return Promise.reject("no locationId userId rating comment");
		}
        return reviews().then((reviewCollection) => {
            var newReview = {
                _id: uuid.v4(),
                locationId: locationId,
                userId: userId,
                rating: rating,
                comment: comment
            };

            return reviewCollection.insertOne(newReview).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).catch((err)=> {
                console.log(err+'1111');
            })
        }).catch((err) => {
            console.log(err+ '2222');
        })
    },

    getReviewsByLocationId(locationId) {
        return reviews().then((reviewsCollection) => {
            return reviewsCollection.findOne({ locationId: locationId }).then((reviewInfo) => {
                if (!reviewInfo) return Promise.reject("reviewInfo not found");
                console.log(reviewInfo);
                return reviewInfo;
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    },

    deleteReviewsByLocationId(locationId) {
        if(!locationId) return Promise.reject("LocationId not found");

        return reviews().then((reviewCollection) => {
            return reviewCollection.removeOne({locationId: locationId})
                .then((deletionInfo) => {
                    if(deletionInfo.deleteCount === 0) {
                        throw(`Sorry could not delete item with id of ${locationId}`);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        })
    },

    deleteReview(reviewId, userId) {
        if(!reviewId) return Promise.reject("reviewId not found");
        if(!userId) return Promise.reject("userId not found");

        return reviews().then((reviewCollection) => {
            return reviewCollection.remove({_id: reviewId, userId: userId})
                .then((deletionInfo) => {
                    if(deletionInfo.deleteCount === 0) {
                        throw(`Sorry could not delete item with id of ${locationId}`);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }).catch((err) => {
            console.log(err);
        })
    }
}
module.exports = exportedMethods;

