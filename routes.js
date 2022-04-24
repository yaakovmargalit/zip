
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser').json();

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'https://localhost:9200',
    auth: {
        username: 'elastic',
        password: 'cc235842'
    },
    tls: {
        //   ca: fs.readFileSync('./http_ca.crt'),
        rejectUnauthorized: false
    }
})
// async function run() {
//     // Let's search!
//     const result = await client.search({
//         index: 'bit',
//         "query": {
//             "bool": {
//                 "must": [
//                     {
//                         "match": {
//                             "LocationName": "בית שמש"
//                         }
//                     },
//                     {
//                         "match": {
//                             "StreeName": "אמרי אמת"
//                         }
//                     },
//                     {
//                         "match": {
//                             "HouseNumber": "3"
//                         }
//                     }
//                 ]
//             }
//         }

//     })

//     console.log(result.hits.hits[0]._source)
// }

// run().catch(console.log)


router.get('/zip', async (req, res) => {
    var LocationName = req.query.LocationName
    var StreeName = req.query.StreeName
    var HouseNumber = req.query.HouseNumber
    const must = [
        {
            "match": {
                "LocationName": LocationName
            }
        },
        {
            "match": {
                "StreeName": StreeName
            }
        },
        {
            "match": {
                "HouseNumber": HouseNumber
            }
        }
    ]
    const result = await client.search({
        index: 'bit',
        "query": {
            "bool": {
                "must": must
            }
        }

    })
    return res.status(200).json(result.hits.hits)
});

router.get("/search", async (req, res) => {

    const must = [
        {
            "match": {
                "HouseNumber": 19
            }
        }
    ]
    const result = await client.search({
        index: 'bit',
        // "query": {
        //     "match_phrase_prefix": {
        //       "LocationName": {
        //         "query": "ירוש"
        //       }
        //     }
        //   }
       
            "query": {
                "simple_query_string" : {
                    "query": "יפו",
                    "fields": ["LocationName"],
                    "default_operator": "and"
                },
            
              },

          
        

        

          

    });

    return res.status(200).json(result)

});

module.exports = router;