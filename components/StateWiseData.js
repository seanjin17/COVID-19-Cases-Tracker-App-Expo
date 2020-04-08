import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Divider } from 'react-native';
import { Linking } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { GetStatsByCountry } from '../data-access/request-layer'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import ErrorComponent from './ErrorComponent'
import ErrorBoundary from './ErrorBoundry'
const newPublicApiPress = () => {
    Linking.openURL("https://ed9d54g0q3.execute-api.ap-south-1.amazonaws.com/def/countrywise/india")
}

const handleInstaClick = () => {
    Linking.openURL(Config.Social.Instagram)
}
const handleTwitterClick = () => {
    Linking.openURL(Config.Social.Twitter)
}
const handleFacebookClick = () => {
    Linking.openURL(Config.Social.Facebook)
}
export default function StateWiseData(props) {
    // const [StateWIseData, setStateWiseData] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isError, setIsError] = React.useState(null)
    // React.useEffect(() => {
    //     const getData = () => {
    //         // Only India State Wise Results are available for now
    //         if (props.country[0].Country.toLowerCase() == 'india') {
    //             GetStatsByCountry(props.country[0].Country).then(ResponseData => {
    //                 if (ResponseData.hasOwnProperty("statusCode")) {
    //                     setStateWiseData(sort_by_key(ResponseData.body, "TotalConfirmedcases(IndianNational)"))
    //                     setIsLoading(false)
    //                 }
    //             }).catch((e) => {
    //                 setIsError(e.message)
    //             })
    //         } else {
    //             setIsLoading(false)
    //         }
    //     }
    //     getData()
    // }, [setIsLoading, setStateWiseData])

    if (isError) {
        return (
            <ErrorComponent error={isError} />
        );
    }
    const closeStateWiseComponent = () => {
        props.setStateWiseComponent(false)
    }
    return (
        <ErrorBoundary>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableNativeFeedback onPress={closeStateWiseComponent} >
                    <View style={styles.backBar} >
                        <Ionicons name='md-arrow-back' style={{ paddingLeft: 15, paddingRight: 10 }} size={35} color='#fff' />
                        <Text style={styles.statusBarHeading}>Go Back</Text>
                    </View>
                </TouchableNativeFeedback>
                {
                        props.country
                            ? <>
                                <FlatList
                                    style={{ top: 10 }}
                                    data={props.country}
                                    renderItem={({ item }) => (
                                        item.NameofStateUT
                                            ? <TouchableNativeFeedback>
                                                <View style={styles.paper}>
                                                    <View style={{ justifyContent: 'center' }}>
                                                        <Text style={{ fontSize: 20, alignSelf: 'center' }}>{item.NameofStateUT}  </Text>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                                                    <View style={styles.paperElement}>
                                                            <Text>Cases : {item["TotalConfirmedcases(IndianNational)"]}</Text>
                                                            <Text>Recovered : {item["CuredDischargedMigrated"]}</Text>
                                                            <Text>Deaths : {item["Death"]}</Text>
                                                        </View>
                                                        <View style={styles.paperElement}>
                                                            <Text>Active : {item["Active"]}</Text>
                                                            <Text>Updated : {item["LastUpdated"]}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableNativeFeedback>
                                            : <View></View>
                                    )}
                                    keyExtractor={item => `${item.NameofStateUT}${String(parseInt(Math.random() * 100))}`} // Api sometimes gives same country code for 2 country
                                />
                            </>
                            : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', margin: 30 }}>
                                <Ionicons name='md-battery-charging' size={150} color='#888' />
                                <Text style={{ fontSize: 20 }}>There is no power here!</Text>
                                <Text style={{ fontSize: 14, alignSelf: 'center', padding: 20 }}>Unfortunately State wise data is not available for you country yet. Send us a message and we will add it right away!</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", paddingBottom: 20 }}>
                                    <Ionicons onPress={handleInstaClick} name='logo-instagram' style={{ padding: 20 }} size={50} color='#000' />
                                    <Ionicons onPress={handleTwitterClick} name='logo-twitter' style={{ padding: 20 }} size={50} color='#000' />
                                    <Ionicons onPress={handleFacebookClick} name='logo-facebook' style={{ padding: 20 }} size={50} color='#000' />
                                </View>
                            </View>
                }
            </View>
        </ErrorBoundary>
    )
}

const styles = StyleSheet.create({
    paper: {
        padding: 20,
        marginTop: 4,
        marginBottom: 4,
        height: 160,
        backgroundColor: '#fff',
        borderBottomWidth: 0.2,
    },
    paperElement: {
        justifyContent: 'center'
        // padding: 20,
    }, backBar: {
        // flex: 5,
        flexDirection: 'row',
        // justifyContent: 'space-around',
        backgroundColor: "#0e83e3",
        height: 55,
        alignItems: 'center',
        // justifyContent: "center"
    }, statusBarHeading: {
        fontSize: 20,
        color: '#fff',
    }, statusBarSubInfo: {
        margin: 8,
        color: '#000'
    }
});