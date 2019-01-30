const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');

const Profile = sequelize.define('profile',{
    userId : { type: Sequelize.INTEGER, primaryKey: true },
    name : { type: Sequelize.STRING(45), allowNull: false },
    city : { type: Sequelize.STRING(45), allowNull: false },
    state : { type: Sequelize.STRING(45), allowNull: false },
    org : { type: Sequelize.STRING(45), allowNull: false },
    country : { type: Sequelize.STRING(45), allowNull: false },
    contactNum : { type: Sequelize.STRING, unique: true},
    emailId : { type: Sequelize.STRING(128), unique: true},
    ratings : { type: Sequelize.DOUBLE },
    age : { type: Sequelize.INTEGER, allowNull: false},
    gender : { type: Sequelize.INTEGER, allowNull: false},
    occupation : { type: Sequelize.STRING(128), allowNull: false},
    balance : { type: Sequelize.DOUBLE, allowNull: false, defaultValue: 0.0 },
});

// Data seeding and setup

// Profile.sync().then(() => {
//     Profile.create({
//         userId: 1,
//         name: 'Nisarg',
//         city: 'Vadodara',
//         state: 'Gujarat',
//         org: 'IEEE',
//         country: 'INDIA',
//         contactNum: '9773237954',
//         emailId: 'NJnisarg@gmail.com',
//         ratings: 4.75,
//         age: 19,
//         gender: 0,
//         occupation: 'Technical Team Lead',
//         balance: 100000.00
//     });
//     Profile.create({
//         userId: 2,
//         name: 'Yash',
//         city: 'Vadodara',
//         state: 'Gujarat',
//         org: 'IRIS',
//         country: 'INDIA',
//         contactNum: '1234567890',
//         emailId: 'yashmagarwal@gmail.com',
//         ratings: 4.25,
//         age: 19,
//         gender: 0,
//         occupation: 'Backend Developer',
//         balance: 50000.00
//     });
//
//     console.log("Data seeded")
// });

module.exports = Profile;