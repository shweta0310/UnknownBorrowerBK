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
                        'match_phrase':{
                            'name':'nisarg'
                        }
                    }
                }
            });

            console.log(esRes);
            response(res,null,esRes,"Successful Search",200)
        }
    }
};