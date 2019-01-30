const jwt = require('jsonwebtoken');
const jwt_salt = 'asdifadlklfnasldifaodif';
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { response }= require('../helpers/response');
const { User } = require('../models/user.js');




const createToken = (mobile,role) => {
    return jwt.sign({mobile,role},jwt_salt);
};



const authenticateUser = async (req,res) => {
    let mobile = req.body.mobile;
    let password = req.body.password;

    try{

        let user = await User.findOne({mobile});
        let passMatch = await bcrypt.compare(password, user.password);

        if(passMatch)
        {
            let token = createToken(user.mobile, user.role);
            response(res,null,{ token }, null, 200)
        }
        else
        {
            response(res,'Passwords do not match', null, null, 500);
        }
    }
    catch(err)
    {
        response(res,'No such user exists',null,null,404);
    }
};


module.exports={
    authenticateUser
};