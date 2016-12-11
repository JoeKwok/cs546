const mongoCollections = require("../config/mongoCollections");
const locations = mongoCollections.locations;

var exportedMethods = {
    getAllLocations(){
        return locations().then((locationCollection) => {
            return locationCollection.find().toArray();
        });
    },
    getLocationById(id) {
        return locations().then((locationCollection) => {
            return locationCollection.findOne({ _id: id }).then((location) => {
                if (!location) throw "not found";
                return location;
            });
        });
    },
    addLocation(name, userId, lat, lon) {
        return locations().then((locationCollection) => {
            var newLocation = {
                name: name,
                userId: userId,
                lat: lat,
                lon: lon,
                _id: uuid.v4()
            };

            return locationCollection.insertOne(newLocation).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getLocationById(newId);
            });
        });
    },
    removeLocation(id) {
        return locations().then((locationCollection) => {
            return locationCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete location with id of ${id}`)
                }
            });
        });
    },
}
module.exports = exportedMethods;
