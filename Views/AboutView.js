import React from 'react';
import { Text, View, Image, Modal, ScrollView, Share, TouchableNativeFeedback } from 'react-native';
import { Linking } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Config } from '../data-access/config'
import { ReleaseNotes } from '../data-access/releaseNotes'
import StatusBarComponent from '../components/StatusBar'
import NewReleaseComponent from '../components/NewReleaseComponent'

const handleDonatePress = () => {
  Linking.openURL(Config.Payment.InstaMojo)
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
const handleWorldometerClick = () => {
  Linking.openURL("https://www.worldometers.info/coronavirus/")
}
const handleWHOClick = () => {
  Linking.openURL("https://www.who.int/health-topics/coronavirus")
}
const handleMailPress = () => {
  Linking.openURL("mailto: appdev@xerobit.in")
}
const handleMOHFWclick = () => {
  Linking.openURL("https://www.mohfw.gov.in")
}
const handlecovidIndiaclick = () => {
  Linking.openURL("https://www.covid19india.org")
}


export default function AboutView() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [ChangeLogModal, setChangeLogModal] = React.useState(false);
  const [ReleaseNotesModal, setReleaseNotesModal] = React.useState(false);
  const openReleaseNotes = () => {
    setModalVisible(true)
    setReleaseNotesModal(true)
    setChangeLogModal(false)
  }
  const openChangeLog = () => {
    setModalVisible(true)
    setReleaseNotesModal(false)
    setChangeLogModal(true)
  }
  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Track Covid19 cases from all over the world with this live tracking app.\n\nI just downloaded it and its amazing.\n\nTap on the link to download https://covid-19.elewat.com/ \n\nPS: App could not be posted on play store because of google play policies on natural disaster based apps',
      });
    } catch (error) {
      // alert(error.message);
    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
      >
        <View style={{ marginTop: 30 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons onPress={() => {
              setModalVisible(false);
              setChangeLogModal(false);
              setReleaseNotesModal(false);
            }} name='ios-close-circle-outline' style={{ paddingRight: 15 }} size={35} color='#000' ></Ionicons>
          </View>
          <ScrollView style={{marginTop: 20}}>
            {ChangeLogModal ?
                ReleaseNotes.map(e => <View style={{ marginTop: 15 }}>
                  <Text style={{ fontSize: 22 }}>{` V - ${Object.keys(e)}`}</Text>
                  {e[Object.keys(e)].map(v => <Text>{` - ${v}`}</Text>)}
                </View>)
              : ReleaseNotesModal ? <NewReleaseComponent /> : <Text>No View Selected</Text>}
          </ScrollView>
        </View>
      </Modal>
      <Image source={{ uri: `https://xerobit.in/logoe.png`, width: 150, height: 150 }} />
      <Text onPress={handleMailPress}>Contact : <Text style={{ color: '#309afc' }}>appdev@xerobit.in</Text></Text>
      <Text onPress={handleDonatePress}>Support my work by <Text style={{ color: '#309afc' }} onPress={handleDonatePress}>Clicking Here</Text></Text>
      <Text>Source : <Text style={{ color: '#309afc' }} onPress={handleWorldometerClick}>Worldometers</Text>, <Text style={{ color: '#309afc' }} onPress={handleWHOClick}>WHO</Text>, <Text style={{ color: '#309afc' }} onPress={handleMOHFWclick}>MOHFW</Text>, <Text style={{ color: '#309afc' }} onPress={handlecovidIndiaclick}>Covid19India.org</Text></Text>
      <Text>App Version : 0.0.24bR1</Text>
      <Text><Text onPress={openReleaseNotes} style={{ color: '#309afc' }}>Release Notes </Text> <Text onPress={openChangeLog} style={{ color: '#309afc' }}>Changelog</Text></Text>
      <TouchableNativeFeedback onPress={shareApp}>
        <View>
          <Text onPress={shareApp} style={{ marginTop: 40 }}>If you like the app, Tap to share it with your friends!</Text>
          <Ionicons onPress={shareApp} style={{ color: '#309afc', alignSelf: 'center' }} name="ios-share-alt" size={65}></Ionicons>
        </View>
      </TouchableNativeFeedback>
      <Text onPress={handleDonatePress} style={{ marginTop: 40 }}>Connect with us</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
        <Ionicons onPress={handleInstaClick} name='logo-instagram' style={{ paddingRight: 15 }} size={35} color='#000' />
        <Ionicons onPress={handleTwitterClick} name='logo-twitter' style={{ paddingRight: 15 }} size={35} color='#000' />
        <Ionicons onPress={handleFacebookClick} name='logo-facebook' size={35} color='#000' />
      </View>
    </View>
  );
}