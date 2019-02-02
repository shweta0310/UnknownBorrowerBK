const express = require('express');
const profileRouter = express.Router();
const profile = require('../models/profile');
const { response } = require('../helpers/response');

/* GET home page. */
profileRouter.get('/:id', async (req, res, next) =>  {

    let userId = req.params.id;

    try {
        let userProfile = await profile.findOne({
            where:{
                userId:userId
            }
        });

        console.log(userProfile);

        if(userProfile===null)
        {
            response(res, null, 'No such user exists', null, 404);
        }

        response(res,null,userProfile,null,200);

    }

    catch(err)
    {
        console.log(err);
        response(res, null, 'No such user exists', null, 404);
    }

});

/* PUT request for adding wallet money*/

profileRouter.put('/addMoney/:id', async (req, res, next) => {
    let userProfile = await profile.findOne({
        where:{
            userId:req.params.id
        }
    });
    profile.update({ 'balance' : userProfile.get('balance') + req.body.amount },{ where : { userId: req.params.id }}).then(count => {
        console.log('Rows updated' + count)
    });

    response(res, null, "Done man!",null, 202);
});

/* PUT request to update the Profile */

profileRouter.put('/editProfile/:id', async (req, res, next) => {
   profile.update({
       'name' : req.body.name,
       'city' : req.body.city,
       'state' : req.body.state,
       'org' : req.body.org,
       'country' : req.body.country,
       'age' : req.body.age,
       'gender' : req.body.gender,
       'occupation' : req.body.occupation}, { where : { userId: req.params.id }}).then(count => {
           console.log('Rows updated' + count)
   });

   response(res, null, "Profile updated", null, 202);

});

/* POST request to create the Profile */

profileRouter.post('/createProfile', async (req, res, next) => {

    const {
        name,
        city,
        state,
        org,
        country,
        contactNum,
        emailId,
        ratings,
        age,
        gender,
        occupation,
        balance
    } = req.body;

   profile.create({
       name : name,
       city : city,
       state : state,
       org : org,
       country : country,
       contactNum : contactNum,
       emailId : emailId,
       ratings : ratings,
       age : age,
       gender : gender,
       occupation : occupation,
       balance : balance})
       .then(user => {
           response(res,null,user,null,201);
   })
    .catch(err => {
        response(res,null, err,null,500);
    });

});

module.exports = profileRouter;
