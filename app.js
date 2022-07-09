const app = require('./express.config');
const utils = require('./utils');
const connectToDb = require('./database'); // import database
const Country = require('./country');
const http = require('http');
const port = Number(process.env.PORT);
database = connectToDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//  GET /countries - returns all countries
//  GET /countries?region=regionName - returns all countries in given region
app.get('/countries', (req, res) => {
    let region = req.query.region;
    if (region === undefined) {
        Country.find({}, (err, countries) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(countries);
            }
        });
    }
    else {
        if (utils.isApacCountry(region)) { // we have Apac and APAC regions in the database, so we need to check case-insensitively
            region = utils.makeParameterCaseInsensitive(region);
        }

        Country.find({ region: region }, (err, countries) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(countries);
            }
        });
    }
});

// Returns the minimum and maximum number of sales reps required for each region
app.get('/salesrep', (req, res) => {
    //send request to /countries endpoint
    http.get(`http://localhost:${port}/countries`, (response) => {
        let region = req.query.region;
        if (region === undefined) {
            //read data from response
            let body = '';
            response
                .on('data', (chunk) => {
                    body += chunk;
                })
                .on('end', () => {
                    let countries = JSON.parse(body);
                    let regions = utils.numberOfCountryPerRegions(countries);
                    let minMaxSalesReq = utils.calculateMinMaxSalesRep(regions);
                    res.send(minMaxSalesReq);
                });
        }
        else {
            //read data from response
            let body = '';
            response
                .on('data', (chunk) => {
                    body += chunk;
                })
                .on('end', () => {
                    let countries = JSON.parse(body);
                    let regions = utils.numberOfCountryPerRegions(countries);
                    let minMaxSalesReq = utils.calculateMinMaxSalesRep(regions);
                    res.send(minMaxSalesReq[region]);
                });
        }

    });
});














