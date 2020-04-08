import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
export default function ReadNews(props) {
  React.useEffect(() => {

  })
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>{props.routes.params.title}</Text>
        <Text>{props.routes.params.description}</Text>
        <Text>{props.routes.params.content}</Text>
        <Text>{props.routes.params.publishedAt}</Text>
                </View>
  )
}

const styles = StyleSheet.create({
  top: {
      backgroundColor: 'black',
      color: 'white'
  },
  paper: {
      flex: 1,
      flexDirection: 'row',
      marginLeft: 10,
      marginRight: 10,
      shadowColor: '#888',
      shadowRadius: 20,
      height: 120,
      backgroundColor: '#fff',
      marginTop: 10,
      borderRadius: 10
  },
  paperElement: {
      padding: 30,
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
      // position: 'absolute',
      // alignItems: 'flex-start',
      // margin: 20,
      // marginTop: 30,
      // marginLeft: 15
  }, statusBar: {
      backgroundColor: "#0e83e3",
      height: 55,
      alignItems: 'center',
      justifyContent: "center"
  }, statusBarHeading: {
      fontSize: 20,
      color: '#fff',
  }, statusBarSubInfo: {
      margin: 8,
      color: '#000'
  }
});