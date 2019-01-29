let esClient = require('../config/elasticsearchConfig');
let { response } = require('../helpers/response');
module.exports = {
    'get': async (req,res) => {
        let searchString = req.query.searchString;
        let city = req.query.city;
        let org = req.query.org;

        if(searchString===null || searchString===undefined){
          // Throw error
        }
        else{
            let esRes = await esClient.search({
                'index':'user_index',
                'type':'user',
                'body':{
                    'query':{
                        'bool':{
                            'should':[
                                { 'term' : {'name':searchString }},
                                { 'term' : {'city': city} },
                                { 'term' : {'organization': org }}
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
        }
    }
};