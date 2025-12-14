var mongoose = require('mongoose');
var Venue = mongoose.model('Venue');

const createResponse = function (res, status, content) {
    res.status(status).json(content);
};


const listVenues = async function (req, res) {
    try {
        
        const venues = await Venue.find(); 
        createResponse(res, 200, venues);
    } catch (error) {
        createResponse(res, 404, { "status": "Mekanlar listelenemedi", "error": error });
    }
};


const addVenue = async function (req, res) {
    try {
        await Venue.create({
            ...req.body,
            coordinates: [req.body.lat, req.body.long],
            hours: [
                {
                    days: req.body.days1,
                    open: req.body.open1,
                    close: req.body.close1,
                    isClosed: req.body.isClosed1,
                },
                {
                    days: req.body.days2,
                    open: req.body.open2,
                    close: req.body.close2,
                    isClosed: req.body.isClosed2,
                }
            ]
        });
        createResponse(res, 201, { "status": "Başarılı" });
    } catch (error) {
        createResponse(res, 400, error);
    }
};


const getVenue = async function (req, res) {
    try {
        const venue = await Venue.findById(req.params.venueid);
        if (!venue) {
            return createResponse(res, 404, { "status": "Mekan bulunamadı" });
        }
        createResponse(res, 200, venue);
    } catch (error) {
        createResponse(res, 404, { "status": "Hata oluştu" });
    }
};


const updateVenue = async function (req, res) {
    try {
        const updatedVenue = await Venue.findByIdAndUpdate(
            req.params.venueid,
            {
                ...req.body,
                coordinates: [req.body.lat, req.body.long],
            },
            { new: true }
        );
        createResponse(res, 200, updatedVenue);
    } catch (error) {
        createResponse(res, 400, { "status": "Güncelleme başarısız" });
    }
};

const deleteVenue = async function (req, res) {
    try {
        await Venue.findByIdAndDelete(req.params.venueid);
        createResponse(res, 200, { "status": "Mekan silindi" });
    } catch (error) {
        createResponse(res, 404, { "status": "Silme başarısız" });
    }
};


module.exports = {
    listVenues,
    addVenue,
    getVenue,
    updateVenue,
    deleteVenue
};