import React from 'react';
import { Text, View, Image, Modal, ScrollView } from 'react-native';
import { Linking } from 'expo';
import { Config } from '../data-access/config'
import { Ionicons } from '@expo/vector-icons';

const newPublicApiPress = () => {
    Linking.openURL("https://ed9d54g0q3.execute-api.ap-south-1.amazonaws.com/def")
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
export default function NewReleaseComponent() {
    return (
        <View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: '#309afc', alignSelf: 'center' }}>New Release 0.0.24b</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 20 }}>Whats new in this release?</Text>
                </View>
                <View style={{ margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}> -- We have moved our news API from 3rd party to internal api, This api will fetch data every 2 hours</Text>
                    <Text style={{ fontSize: 15 }}> -- Our website is now available and can be accessed by clicking on the status bar logo</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: '#309afc', alignSelf: 'center' }}>New Release 0.0.23b</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 20 }}>Whats new in this release?</Text>
                </View>
                <View style={{ margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}> -- You can now access state wise data by clicking on the country card on your homescreen</Text>
                    <Text style={{ fontSize: 15 }}> -- A new option to share the app to your friends is now available in about section of the app</Text>
                    <Text style={{ fontSize: 15 }}> -- A new api to get covid cases of states of a country is now available, You can access it from about section > Changelogs</Text>
                </View>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, color: '#309afc', alignSelf: 'center' }}>New Release 0.0.22b</Text>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 20 }}>Whats new in this release?</Text>
                </View>
                <View style={{ margin: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 15 }}>You can now read news by clicking on the their tiles</Text>
                    <Image style={{ alignSelf: 'center', margin: 10 }} source={{ uri: `https://mymainbucketmum.s3.ap-south-1.amazonaws.com/release0022b/2.png`, width: 300, height: 200 }} />
                    <Text style={{ fontSize: 15 }}>A new section is now available called (FAQ), This section contains some common frequently asked questions. The content is verified by World Health Organisation </Text>
                    <Image style={{ alignSelf: 'center', margin: 10 }} source={{ uri: `https://mymainbucketmum.s3.ap-south-1.amazonaws.com/release0022b/3.png`, width: 300, height: 350 }} />
                    <Text style={{ fontSize: 15 }}> -- Errors will now display a proper error message ( Api Failures, Network issue ), Navigation will now still work even if there is an error</Text>
                    <Image style={{ alignSelf: 'center', margin: 10 }} source={{ uri: `https://mymainbucketmum.s3.ap-south-1.amazonaws.com/release0022b/4.png`, width: 300, height: 350 }} />
                    <Text style={{ fontSize: 15 }}>You can now acces app changelogs from about section</Text>
                    <Image style={{ alignSelf: 'center', margin: 10 }} source={{ uri: `https://mymainbucketmum.s3.ap-south-1.amazonaws.com/release0022b/1.png`, width: 300, height: 350 }} />
                    <Text style={{ fontSize: 15 }}> -- Various User Interface Enhancements including Normal UI as well as Error UI</Text>
                    <Text style={{ fontSize: 15 }}> -- Social media buttons are now available in About section as well as on error screens</Text>
                    <Text style={{ fontSize: 15 }}> -- We have also released our public API to track live status of coronavirus. The api is available for everyone <Text onPress={newPublicApiPress} style={{ color: '#309afc' }}>You can access it from here</Text></Text>
                </View>
                <Text style={{ marginTop: 40 }}>Connect with us at</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center", margin: 60, marginTop: 10 }}>
                    <Ionicons onPress={handleInstaClick} name='logo-instagram' style={{ padding: 20 }} size={65} color='blue' />
                    <Ionicons onPress={handleTwitterClick} name='logo-twitter' style={{ padding: 20 }} size={65} color='blue' />
                    <Ionicons onPress={handleFacebookClick} name='logo-facebook' style={{ padding: 20 }} size={65} color='blue' />
                </View>
            </View>
        </View>
    )
}