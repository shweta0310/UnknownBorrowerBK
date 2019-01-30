const { response }= require('../helpers/response');
const User = require('../models/user.js');


const authenticateUser = async (req,res) => {
    let mobile = req.body.mobile;
    let password = req.body.password;

    try{
        let user = await User.findOne({
            where: {
                contactNum: mobile
            },
            attributes: ['userId','emailId','contactNum','password']
        });

        console.log(user.get('password'));
        if(user.get('password')===password)
        {
            let finalRes = {
                'userId':user.get('userId'),
                'emailId':user.get('emailId'),
                'contactNum':user.get('contactNum')
            };
            response(res,null,finalRes,null,200);
        }
        else
        {
            response(res,null,'Passwords do not match',null,401);
        }

    }
    catch(err)
    {
        response(res,null,'No such user exists',null,404);
    }
};


module.exports={
    authenticateUser
};