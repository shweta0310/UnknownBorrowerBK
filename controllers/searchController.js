let esClient = require('../config/elasticsearchConfig');
let { response } = require('../helpers/response');

module.exports = {
    'get': async (req,res) => {
        let searchString = req.query.searchString;

        let esRes = await esClient.search({
            'index':'user_index',
            'type':'user',
            'body':{
                'query':{
                    'bool':{
                        'should':[
                            { 'term' : {'name':searchString }},
                            { 'term' : {'city': searchString} },
                            { 'term' : {'organization': searchString }}
                        ]
                    }
                }
            }
        });

        console.log(esRes);

        esRes = esRes['hits']['hits'];
        let finalResponse = [];

        esRes.forEach((obj) => {
            finalResponse.push(obj['_source'])
        });

        response(res,null,finalResponse,"Successful Search",200)
    },

    'insert': async (userObject) => {
        let esRes = await esClient.create({
            index: 'user_index',
            type: 'user',
            id : userObject.userId,
            body: {
                city: userObject.city,
                contactNum: userObject.contactNum,
                name: userObject.name,
                organization: userObject.org
            }
        });

        try{
            console.log(esRes);
        }
        catch(err){
            console.log(err);
        }
    },

    'update': async (userObject) => {
        let esRes = await esClient.update({
            index: 'user_index',
            type: 'user',
            id : userObject.userId,
            body: {
                doc: userObject
            }
        });

        try{
            console.log(esRes);
        }
        catch(err){
            console.log(err);
        }
    }
};