import axios from 'axios';
import {Config} from './config'
var api = axios.create({
    baseURL: "https://api.bitbucket.org/2.0/",
    timeout: 15000,
    headers: {"Content-Type": "application/json"}
})

const CatchAxiosError = ErrorObject => {
    if (ErrorObject.response) {
        console.log(ErrorObject.response.headers)
        return `'Error: Api Responded with status code ${ErrorObject.response.status} Message : ${JSON.stringify(ErrorObject.response.data)}`
    }else {
        return (`Error : ${ErrorObject.message}`)
    }
}

const GeoLocation = () => {
    return api({
        baseURL: `${Config.Gateways.GeoLocation}`,
        method: "GET",
        url: "",
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const GetAllCountryStats = () => {
    return api({
        baseURL: `${Config.Gateways.CovidScrapperPersonal}`,
        method: "GET",
        url: "def",
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const GetOverallStats = () => {
    return api({
        baseURL: `${Config.Gateways.CoronaTracker}`,
        method: "GET",
        url: "v2/stats",
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const GetStatsByCountry = CountryName => {
    return api({
        baseURL: `${Config.Gateways.CovidScrapperPersonal}`,
        method: "GET",
        url: `def/countrywise/${CountryName.toLowerCase()}`,
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const GetCountryFlagLogo = CountryCode => {
    return api({
        baseURL: `${Config.Gateways.CountryFlagsIcon}`,
        method: "GET",
        url: "v2/stats/top?limit=1009",
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const GetNews = Country => {
    return api({
        baseURL: `${Config.Gateways.CovidScrapperPersonal}`,
        method: "GET",
        url: `def/news/${Country == 'india' ? Country : 'world'}`,
        headers: {
            "Content-Type" : "application/json",
        },
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

const PushLogToServer = (type, data) => {
    return api({
        baseURL: `${Config.Gateways.PushLog}`,
        method: "POST",
        url: "",
        headers: {
            "Content-Type" : "application/json",
        },
        data: JSON.stringify({
            "ORG": "CoronaMobileAppTracker",
            "Service": "AppLogs",
            "logData" : data,
            "logType" : type
        })
    }).then(response  => {
        return response.data
    }).catch(error => {
        throw CatchAxiosError(error)
    })
}

export {GeoLocation, GetAllCountryStats, GetCountryFlagLogo, GetNews, GetOverallStats, PushLogToServer, GetStatsByCountry}