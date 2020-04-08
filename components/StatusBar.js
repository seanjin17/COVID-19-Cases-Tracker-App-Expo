import React from 'react';
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Linking } from 'expo';

const openWebsite = () => {
    Linking.openURL("https://covid-19.elewat.com/")
  }

export default function StatusBarComponent() {
    return (
        <TouchableNativeFeedback onPress={openWebsite}>
            <View style={styles.statusBar} >
                <Image source={{ uri: `https://mymainbucketmum.s3.ap-south-1.amazonaws.com/staticcontent/elelogonewwhsd.png`, width: 100, height: 45 }} />
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        flexDirection: 'row',
        backgroundColor: "#0e83e3",
        height: 55,
        alignItems: 'center',
        justifyContent: "space-around"
    }
});