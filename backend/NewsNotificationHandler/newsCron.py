#!/usr/bin/env python3

import requests

news = requests.get('https://api.coronatracker.com/news/trending?limit=1&offset=0&countryCode=&country=&language=en')
news = news.json()
postData = {
	"title" : "NEWS - COVID-19",
	"message" : news["items"][0]["title"]
}
notify = requests.post("expoNotificationURL", json=postData)
print(notify.json())
