// check if it is an apac country
// need this control because we have Apac and APAC regions in the database, so i'm going to merge them for requests
function isApacCountry(str) {
    return str.toLowerCase() === 'apac';
}

function makeParameterCaseInsensitive(region) {
    return { $regex: new RegExp("^" + region.toLowerCase(), "i") };
}

function numberOfCountryPerRegions(countries) {
    // calculate how many country exist in each region
    let regions = {};
    for (let i = 0; i < countries.length; i++) {
        if(isApacCountry(countries[i].region)) {
            countries[i].region = 'Apac';
        }
        let region = countries[i].region;
        if (regions[region] === undefined) {
            regions[region] = 1;
        } else {
            regions[region]++;
        }
    }
    return regions;
}

function calculateMinMaxSalesRep(regions) {
    //each region should have at least 1 sales rep
    //each sales rep should have responsible for at least 3 and max 9 countries
    let results = {};
    for (let region in regions) {
        result = {};
        result.region = region;
        result.minSalesReq = Math.ceil(regions[region] / 7);
        result.maxSalesReq = Math.floor(regions[region] / 3);
        results[result.region]= result;       
    }
    return results;
}


//export
module.exports = { isApacCountry, makeParameterCaseInsensitive, numberOfCountryPerRegions, calculateMinMaxSalesRep };