const sequalize= require('../config/dbConfig');

var User = sequalize.define('user',{
    userId:{
        type:Sequalize.INT,
        allowNull:false,
        unique:true
    },
    emailId:{
        type:Sequalize.STRING,
        allowNull:false,
        unique:true
    },
    contactNum:{
        type:Sequalize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequalize.STRING,
        allowNull:false
    }
});

module.exports=User;