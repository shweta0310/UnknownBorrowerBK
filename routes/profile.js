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

profileRouter.put('/addMoney/:id', async (req,res,next) => {
    let userProfile = await profile.findOne({
        where:{
            userId:req.params.id
        }
    });
    profile.update({ 'balance' : userProfile.get('balance') + req.body.amount },{ where : { userId: req.params.id }}).then(count => {
        console.log('Rows updated' + count)
    });

    response(res, null, "Done man!",null, 201);
});

module.exports = profileRouter;
