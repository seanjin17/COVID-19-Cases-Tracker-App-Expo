import React from 'react';
import { Text, View, Image } from 'react-native';
import { Config } from '../data-access/config'
import { PushLogToServer } from '../data-access/request-layer'
import { Ionicons } from '@expo/vector-icons';

export default function ErrorComponent(props) {

    const handleInstaClick = () => {
        Linking.openURL(Config.Social.Instagram)
    }
    const handleTwitterClick = () => {
        Linking.openURL(Config.Social.Twitter)
    }
    const handleFacebookClick = () => {
        Linking.openURL(Config.Social.Facebook)
    }

    React.useEffect(() => {
        const PushLog = () => {
            PushLogToServer("error", props.error)
        }
        PushLog()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='md-thunderstorm' size={150} color='#000' />
            {/* <Image source={{ uri: `https://xerobit.in/logoe.png`, width: 150, height: 150 }} /> */}
            <Text style={{ fontSize: 16 }}>Oops! We ran into an issue</Text>
            <Text style={{ fontSize: 16, padding: 20 }}>Send the screenshot of the screen at one of our social media pages to get the issue fixed immidiately</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", paddingBottom: 20 }}>
                <Ionicons onPress={handleInstaClick} name='logo-instagram' style={{ paddingRight: 15 }} size={35} color='#000' />
                <Ionicons onPress={handleTwitterClick} name='logo-twitter' style={{ paddingRight: 15 }} size={35} color='#000' />
                <Ionicons onPress={handleFacebookClick} name='logo-facebook' size={35} color='#000' />
            </View>
            {props.error ? <Text style={{ color: 'red' }}>{props.error}</Text> : ""}
        </View>
    )
}