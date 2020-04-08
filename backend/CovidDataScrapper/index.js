const siteUrl = "https://www.worldometers.info/coronavirus/";
const axios = require("axios");
const cheerio = require("cheerio");
var AWS = require('aws-sdk');
AWS.config.update({region: 'YourRegion'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

const CountryJson = require('countriesData.js')
const fetchData = async () => {
	try{
		const result = await axios.get(siteUrl);
		return cheerio.load(result.data);
	}catch(e){
		throw e
	}
}

exports.handler = (event, context, callback) => {
	var StatusData = []
	var ArrangementArr = []
	fetchData().then(async ($) => {
		const ItemsArrangemant = await $('#main_table_countries_today thead tr').each((index, tr) => {
			$(tr).find('th').each((tdIndex, th) => {
				ArrangementArr.push($(th).text().replace(/\//g, "").split(',')[0].replace(/ /g, "").replace(/ /g, ""))
				
			})
		})
		const CountryData = await $('#main_table_countries_today tbody tr').each((index, tr) => {
			let current = []
			$(tr).find('td').each((tdIndex, td) => {
				current.push($(td).text().replace(/ /g, ""))		
			})
			let currJson = {}
			ArrangementArr.map((item, itemIndex) => {
				if(item == "Country"){
					for (let x of CountryJson){
						if(current[itemIndex] == x.name){
							currJson.CountryCode = x.alpha2Code
							currJson.CountryFlag = x.flag
						}
					}
				}
				currJson[item] = current[itemIndex]
			})
			StatusData.push(currJson)
		})
		StatusData.shift()
		return StatusData
	}).then(async (StatusData) => {
		var s3Response = {}
		var uploadParams = {Bucket: 'yourbucketname', Key: '', Body: ''};
		uploadParams.Body = JSON.stringify(StatusData)
		uploadParams.Key = "CovidScrappedData/current.json"
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.CurrentData = data
		  }
		});
		uploadParams.Key = `CovidScrappedData/${new Date().toDateString().replace(/ /g, "")}/${new Date().toISOString()}.json`
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.HistoricalData = data
		  }
		});
		return {
		        statusCode: 200,
		        body: "Data Added to s3"
		    };
	}).then((response) => {
		callback(null, response)
	}).catch((e) => {
		callback({statusCode: 500,body: e.message}, null)
	})
};
