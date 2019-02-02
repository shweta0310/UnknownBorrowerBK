const profile = require('../models/profile');
const { response } = require('../helpers/response');
const searchHandler = require('./searchController');

module.exports = {
    'getProfile': async (req, res, next) =>  {

        let userId = req.userId;

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

    },

    'addMoney': async (req, res, next) => {
        let userId = req.userId;
        let userProfile = await profile.findOne({
            where:{
                userId:userId
            }
        });
        profile.update({ 'balance' : userProfile.get('balance') + req.body.amount },{ where : { userId: userId }}).then(count => {
            console.log('Rows updated' + count)
        });

        response(res, null, "Done man!",null, 202);
    },

    'updateProfile': async (req, res, next) => {
        profile.update( req.body , { where : { userId: req.userId }}).then(count => {
            console.log('Rows updated' + count);

            let userObject = {
                userId: req.userId,
                city:req.body.city,
                organization: req.body.org,
                contactNum: req.body.contactNum,
                name: req.body.name
            };

            searchHandler.update(userObject);

            response(res, null, "Profile updated", null, 202);
        });
    },

    'createProfile': async (req, res, next) => {

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

        let userId = req.userId;

        profile.create({
            userId: userId,
            name: name,
            city: city,
            state: state,
            org: org,
            country: country,
            contactNum: contactNum,
            emailId: emailId,
            ratings: ratings,
            age: age,
            gender: gender,
            occupation: occupation,
            balance: balance
        }).then(user => {
            searchHandler.insert(user);
            response(res, null, user, null, 201);
        }).catch(err => {
                response(res, null, err, null, 500);
        });

    }
};