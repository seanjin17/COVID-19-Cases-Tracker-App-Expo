const siteUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSc_2y5N0I67wDU38DjDh35IZSIS30rQf7_NYZhtYYGU1jJYT6_kDx4YpF-qw0LSlGsBYP8pqM_a1Pd/pubhtml#";
const cheerio = require("cheerio");
const axios = require('axios')
var AWS = require('aws-sdk');
AWS.config.update({region: 'YourRegion'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
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
	var TotalData = {}
	var ArrangementArr = ["NameofStateUT", "TotalConfirmedcases(IndianNational)", "CuredDischargedMigrated", "Death", "Active", "LastUpdated"]
	fetchData().then(async ($) => {
		// const ItemsArrangemant = await $('#cases .content .table-responsive table thead tr').each((index, tr) => {
		// 	$(tr).find('th strong').each((tdIndex, th) => {
		// 		ArrangementArr.push($(th).text().replace(/\//g, "").split(',')[0].replace(/ /g, "").replace(/ /g, ""))
				
		// 	})
		// })
		const NewCasesData = await  axios.get("https://api.covid19india.org/data.json")
		const CountryData = await $('#1896310216 div table tbody tr').each((index, tr) => {
			let current = []
			$(tr).find('td').each((tdIndex, td) => {
				if($(td).text().replace(/ /g, "") != '')
					current.push($(td).text().replace(/ /g, ""))		
			})
			let currJson = {}
			if(current[0] == "Total"){
				currJson.Country = "India"
				currJson.TotalCases = current[1]
				currJson.TotalRecovered = current[2]
				currJson.TotalDeaths = current[3]
				currJson.ActiveCases = current[4]
				currJson.LastUpdated = current[5]
				currJson.LastUpdated = current[5]
				currJson.NewCases = "+"+String(NewCasesData.data.statewise[0].deltaconfirmed)
				currJson.NewDeaths = "+"+String(NewCasesData.data.statewise[0].deltadeaths)
			}else{
				ArrangementArr.map((item, itemIndex) => {
					currJson[item] = current[itemIndex]
				})
			}
			StatusData.push(currJson)
		})
		StatusData.shift()
		return StatusData
	}).then(async (StatusData) => {
		var s3Response = {}
		var uploadParams = {Bucket: 'yourbucketname', Key: '', Body: ''};
		uploadParams.Body = JSON.stringify(StatusData)
		uploadParams.Key = "CovidScrappedData/CountryWise/India/current.json"
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.CurrentData = data
		  }
		});
		uploadParams.Key = `CovidScrappedData/CountryWise/India/${new Date().toDateString().replace(/ /g, "")}/${new Date().toISOString()}.json`
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
		console.log(e)
		callback({statusCode: 500,body: e.message}, null)
	})
}