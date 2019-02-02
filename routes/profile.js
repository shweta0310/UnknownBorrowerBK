const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../controllers/loginController').AuthorizationMiddleware;

/* GET user profile */
profileRouter.get('/getProfile', authMiddleware, profileController.getProfile);

/* PUT request for adding wallet money*/
profileRouter.put('/addMoney', authMiddleware, profileController.addMoney);

/* PUT request to update the Profile */
profileRouter.put('/editProfile/', authMiddleware, profileController.updateProfile);

/* POST request to create the Profile */
profileRouter.post('/createProfile', authMiddleware, profileController.createProfile);

module.exports = profileRouter;
