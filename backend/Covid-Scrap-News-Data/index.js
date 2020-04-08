const axios = require('axios')
var AWS = require('aws-sdk');
AWS.config.update({region: 'YourRegion'});
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fetchData = async () => {
	try{
		let Today = new Date().toLocaleDateString().replace(/\//g, '-').split("-")
		let TodayFormatted = `${Today[2]}-${Today[1]}-${Today[0]}`
		const IndiaData = await axios.get(`http://newsapi.org/v2/top-headlines?q=corona&from=${TodayFormatted}&sortBy=publishedAt&apiKey=<key>&country=in&pagesize=100`);
		const OverallData = await axios.get(`http://newsapi.org/v2/top-headlines?q=covid&from=${TodayFormatted}&sortBy=publishedAt&apiKey=<key>&country=&pagesize=100`);
		// if(IndiaData.data["status"] == 'ok')
		// 	IndiaData.data.articles = JSON.stringify(IndiaData.data.articles)
		// if(OverallData.data["status"] == 'ok')
		// 	OverallData.data.articles = JSON.stringify(OverallData.data.articles)
		return {IndiaData : IndiaData.data, OverallData: OverallData.data}
	}catch(e){
		throw e
	}
}

exports.handler = (event, context, callback) => {
	fetchData().then(async (ResponseData) => {
		var s3Response = {}
		var uploadParams = {Bucket: 'yourbucketname', Key: '', Body: ''};
		uploadParams.Body = JSON.stringify(ResponseData.OverallData)
		uploadParams.Key = "CovidScrappedData/News/Overall/current.json"
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.CurrentData = data
		  }
		});
		uploadParams.Key = `CovidScrappedData/News/Overall/${new Date().toDateString().replace(/ /g, "")}/${new Date().toISOString()}.json`
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.HistoricalData = data
		  }
		});
		uploadParams.Body = JSON.stringify(ResponseData.IndiaData)
		uploadParams.Key = "CovidScrappedData/News/India/current.json"
		await s3.upload (uploadParams, function (err, data) {
		  if (err) {
		    throw err
		  } if (data) {
		    s3Response.CurrentData = data
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