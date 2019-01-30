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

        // let userFinal = {
        //     'userId' :userProfile.get('userId'),
        //     'name' :userProfile.get('name'),
        //     'city' :userProfile.get('city'),
        //     'state' :userProfile.get('state'),
        //     'org' :userProfile.get('org'),
        //     'country' :userProfile.get('country'),
        //     'contactNum' :userProfile.get('contactNum'),
        //     'email' :userProfile.get('email'),
        //     'ratings' :userProfile.get('ratings'),
        //     'age' :userProfile.get('age'),
        //     'gender' :userProfile.get('gender'),
        //     'occupation' :userProfile.get('occupation'),
        //     'balance' :userProfile.get('balance'),
        // };

        response(res,null,userProfile,null,200);

    }

    catch(err)
    {
        console.log(err);
        response(res, null, 'No such user exists', null, 404);
    }

});

module.exports = profileRouter;
