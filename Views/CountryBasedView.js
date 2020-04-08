import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { GetAllCountryStats, GetOverallStats } from '../data-access/request-layer'
import ErrorComponent from '../components/ErrorComponent'
import StatusBarComponent from '../components/StatusBar'
export default function CountryWiseResults() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [OverallStats, setOverallStats] = React.useState(null)
  const [CountryWiseStats, setCountryWiseStats] = React.useState(null)
  const [isError, setIsError] = React.useState(null)
  const sort_by_key = (array, key) => {
    return array.sort(function (a, b) {
        var x = parseInt(a[key].replace(/,/g, "")); var y = parseInt(b[key].replace(/,/g, ""));
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
  React.useEffect(() => {
    const GetData = async () => {
      try {
        await GetAllCountryStats().then(Stats => {
          setOverallStats([Stats.body[Stats.body.length - 1]])
          Stats.body.pop()
          setCountryWiseStats(sort_by_key(Stats.body, "TotalCases"))
          setIsLoading(false)
        }).catch(e => { setIsError(e) })
      } catch (e) {
        setIsError(e.message)
      }
    }
    GetData()
  }, [setIsError, setOverallStats, setCountryWiseStats])


  if (isError) {
    return (
      <ErrorComponent error={isError} />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBarComponent />
      {isLoading
        ? <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size={60} color="#0e83e3" />
        </View>
        : <>
          {/* <Text style={{ alignSelf: 'center' }}>Last Refreshed At : {new Date().toLocaleTimeString()}</Text> */}
          <FlatList
            style={{ top: 0, minHeight: 170 }}
            data={OverallStats}
            renderItem={({ item }) => (
              <>
                <View style={styles.paper}>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, alignSelf: 'center' }}>Overall Stats  <Image source={{ uri: `https://cfcdnpull-creativefreedoml.netdna-ssl.com/wp-content/uploads/2012/03/result.png`, width: 32, height: 32 }} style={styles.images} /></Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <View style={styles.paperElement}>
                      <Text>Total Cases : {item.TotalCases}</Text>
                      <Text>New Cases : {item.NewCases}</Text>
                      <Text>Deaths : {item.TotalDeaths}</Text>
                    </View>
                    <View style={styles.paperElement}>
                      <Text>New Deaths : {item.NewDeaths}</Text>
                      <Text>Recovered : {item.TotalRecovered}</Text>
                      <Text>Active Cases : {item.ActiveCases}</Text>
                    </View>
                    {/* <View style={{ padding: 15 }}>
                                    <Image source={{ uri: `https://www.countryflags.io/${item.Country.slice(0,2)}/shiny/64.png`, width: 80, height: 80 }} style={styles.images} />
                                </View> */}
                  </View>
                </View>
              </>
            )}
            keyExtractor={item => `${item.Country}${String(parseInt(Math.random() * 100))}`}
          />
          <Text style={{ alignSelf: 'center', fontSize: 14 }}>Country Wise Data</Text>
          <FlatList
            style={{ top: 20 }}
            data={CountryWiseStats}
            renderItem={({ item }) => (
                <View style={styles.paper}>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, alignSelf: 'center' }}>{item.Country}  <Image source={{ uri: `https://www.countryflags.io/${item.CountryCode ? item.CountryCode : item.Country.slice(0,2)}/shiny/64.png`, width: 30, height: 22 }} style={styles.images} /></Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <View style={styles.paperElement}>
                      <Text>Total Cases : {item.TotalCases}</Text>
                      <Text>New Cases : {item.NewCases}</Text>
                      <Text>Deaths : {item.TotalDeaths.replace(/" "/g, "") ? item.TotalDeaths : "0"}</Text>
                    </View>
                    <View style={styles.paperElement}>
                      <Text>New Deaths : {item.NewDeaths.replace(/" "/g, "") ? item.NewDeaths : "0"}</Text>
                      <Text>Recovered : {item.TotalRecovered}</Text>
                      <Text>Active Cases : {item.ActiveCases}</Text>
                    </View>
                    {/* <View style={{ padding: 15 }}>
                                    <Image source={{ uri: `https://www.countryflags.io/${item.Country.slice(0,2)}/shiny/64.png`, width: 80, height: 80 }} style={styles.images} />
                                </View> */}
                  </View>
                </View>
            )}
            keyExtractor={item => `${item.Country}${String(parseInt(Math.random() * 100))}`}
          /></>
      }
    </View>
  );

}


const styles = StyleSheet.create({
  top: {
    backgroundColor: 'black',
    color: 'white'
  },
  paper: {
    padding: 15,
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // marginLeft: 10,
    // marginRight: 10,
    shadowColor: '#888',
    shadowRadius: 15,
    height: 160,
    backgroundColor: '#fff',
    // marginTop: 7,
    marginBottom: 12
    // borderRadius: 10
  },
  paperElement: {
    // padding: 25,
  },
  heading: {
    fontSize: 20,
    margin: 10,
    display: 'flex'
  },
  progressBar: {
    marginTop: 10,
    marginLeft: 100
  },
  countryHeading: {
    fontSize: 20
  },
  images: {
  },
  imageView: {
    padding: 20,
  }, statusBar: {
    flexDirection: 'row',
    backgroundColor: "#0e83e3",
    height: 55,
    alignItems: 'center',
    justifyContent: "space-around"
  }, statusBarHeading: {
    fontSize: 20,
    color: '#fff',
  }, statusBarSubInfo: {
    margin: 8,
    color: '#000'
  }
});