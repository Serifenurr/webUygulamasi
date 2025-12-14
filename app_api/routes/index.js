var express = require('express');
var router = express.Router();


var ctrlVenues = require('../controllers/VenueController'); 


router
  .route('/venues')
  .get(ctrlVenues.listVenues)  
  .post(ctrlVenues.addVenue); 

router
  .route('/venues/:venueid')
  .get(ctrlVenues.getVenue)    
  .delete(ctrlVenues.deleteVenue); 
module.exports = router;