import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, Button, TouchableNativeFeedback, Modal, ScrollView, AsyncStorage } from 'react-native';
import { GeoLocation, GetAllCountryStats, GetNews, PushLogToServer, GetStatsByCountry } from '../data-access/request-layer'
import ErrorComponent from '../components/ErrorComponent'
import { Ionicons } from '@expo/vector-icons';
import NewReleaseComponent from '../components/NewReleaseComponent'
import StateWiseData from '../components/StateWiseData'
import StatusBarComponent from '../components/StatusBar'

export default function Home(props) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [UserInfo, setUserInfo] = React.useState(null)
    const [UserCountryData, setUserCountryData] = React.useState(null)
    const [UserCountryNews, setUserCountryNews] = React.useState(null)
    const [isError, setIsError] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(true);
    const [UserCountryDataAll, setUserCountryDataAll] = React.useState(null)
    const [StateWiseComponent, setStateWiseComponent] = React.useState(false)

    const sort_by_key = (array, key) => {
        return array.sort(function (a, b) {
            var x = parseInt(a[key]); var y = parseInt(b[key]);
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }

    const retriveLocalStorageData = async () => {
        try {
            const value = await AsyncStorage.getItem('ViewewdRelease0024b');
            if (value) {
                setModalVisible(false)
            } else {
                setModalVisible(true)
                storeData("ViewewdRelease0024b", "true");
            }
        } catch (error) {
            setIsError(error)
        }
    };
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            setIsError(error)
        }
    };
    React.useEffect(() => {
        retriveLocalStorageData()
        const GetData = async () => {
            try {
                GeoLocation().then(async LocationData => {
                    setUserInfo(LocationData)
                    if (LocationData.country.toLowerCase() == 'india') {
                        GetStatsByCountry(LocationData.country).then(CountryStats => {
                            let UserCountryInfo = CountryStats.body.reduce((a, c) => {
                                if (c.hasOwnProperty("Country"))
                                    a.push(c)
                                return a
                            }, [])
                            setUserCountryDataAll(sort_by_key(CountryStats.body, "TotalConfirmedcases(IndianNational)"))
                            setUserCountryData(UserCountryInfo)
                        }).catch((e) => {
                            setIsError(e.message)
                        })
                    } else {
                        await GetAllCountryStats().then(async CountryStats => {
                            let UserCountryInfo = CountryStats.body.reduce((a, c) => {
                                if (c.Country.toLowerCase().includes(LocationData.country.toLowerCase()))
                                    a.push(c)
                                return a
                            }, [])
                            setUserCountryData(UserCountryInfo)
                        }).catch(e => { setIsError(`${e} While Loading COVID Information`) })
                    }
                    await GetNews(LocationData.country.toLowerCase()).then(NewsData => {
                        if (NewsData.body.status == 'ok')
                            setUserCountryNews(NewsData.body.articles)
                        else
                            setIsError("Error while fetching news, Please try after sometime")
                    }).catch(e => { setIsError(`${e} While Loading News`) })
                    PushLogToServer("info", JSON.stringify({
                        Message: "User Logged Into App",
                        Info: LocationData,
                    }))
                }).catch(e => { setIsError(e) }).finally(() => {
                    setIsLoading(false)
                })
            } catch (e) {
                setIsError(e)
            }
        }
        GetData()
    }, [setUserCountryNews, setUserInfo, setUserCountryData])

    const handleNewsPress = item => {
        console.log(item)
        props.navigation.navigate('News', item)
    }

    if (isError) {
        return (
            <ErrorComponent error={isError} />
        );
    }

    if (StateWiseComponent) {
        return (
            <StateWiseData country={UserCountryDataAll} setStateWiseComponent={setStateWiseComponent} />
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <StatusBarComponent />
            {isLoading
                ? <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ActivityIndicator size={60} color="#0e83e3" />
                </View>
                : <>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                    >
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                <Ionicons onPress={() => {
                                    setModalVisible(false);
                                }} name='ios-close-circle-outline' style={{ paddingRight: 15 }} size={35} color='#000' ></Ionicons>
                            </View>
                            <ScrollView style={{ marginTop: 15 }}>
                                <NewReleaseComponent />
                            </ScrollView>
                        </View>
                    </Modal>
                    <FlatList
                        style={{ top: 0, minHeight: 170 }}
                        data={UserCountryData}
                        renderItem={({ item }) => (
                            <TouchableNativeFeedback onPress={() => { setStateWiseComponent(true) }}>
                                <View style={styles.paper}>
                                    <View style={{ justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 30, alignSelf: 'center' }}>{item.Country}  <Image source={{ uri: `https://www.countryflags.io/${item.Country.slice(0, 2)}/shiny/32.png`, width: 30, height: 22 }} style={styles.images} /></Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                        <View style={styles.paperElement}>
                                            <Text>Total Cases : {item.TotalCases}</Text>
                                            {item.NewCases ? <Text>New Cases : {item.NewCases}</Text> : <View></View>}
                                            <Text>Deaths : {item.TotalDeaths ? item.TotalDeaths : "0"}</Text>
                                        </View>
                                        <View style={styles.paperElement}>
                                            {item.NewDeaths ? <Text>New Deaths : {item.NewDeaths ? item.NewDeaths : "0"}</Text> : <View></View>}
                                            <Text>Recovered : {item.TotalRecovered}</Text>
                                            <Text>Active Cases : {item.ActiveCases}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 10, alignSelf: 'center', marginBottom: -9, fontStyle: 'italic', fontWeight: 'bold' }}>TAP ON THIS CARD TO GET STATE WISE RESULTS</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                        keyExtractor={item => `${item.Country}${String(parseInt(Math.random() * 100))}`} // Api sometimes gives same country code for 2 country
                    />
                    <Text style={{ alignSelf: 'center', fontSize: 14 }}>Latest News From {UserInfo.country}</Text>
                    <FlatList
                        style={{ top: 10 }}
                        data={UserCountryNews}
                        renderItem={({ item }) => (
                            <TouchableNativeFeedback onPress={(e) => handleNewsPress(item)}>
                                <View style={styles.paper, { height: 'auto', cursor: 'pointer' }}>
                                    <View style={styles.imageView}>
                                        <Image source={{ uri: `${item.urlToImage}`, width: 'auto', height: 156 }} style={styles.images} />
                                    </View>
                                    <View style={{ padding: 20, paddingTop: 25 }}>
                                        <Text style={styles.countryHeading}>{item.title}</Text>
                                        <Text style={{ fontSize: 13, marginTop: 5 }}>{item.description} Read More</Text>
                                    </View>
                                </View>
                            </TouchableNativeFeedback>
                        )}
                        keyExtractor={item => `${item.source.id}${String(parseInt(Math.random() * 10000))}`}
                    /></>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'black',
        color: 'white'
    },
    paper: {
        padding: 15,
        // marginLeft: 10,
        shadowColor: '#888',
        shadowRadius: 15,
        height: 160,
        backgroundColor: '#fff',
    },
    paperElement: {
        // padding: 20,
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
        marginLeft: 10,
        marginRight: 10,
    }
});