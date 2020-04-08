import React from 'react';
import { Text, View, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import FaqData from '../components/FaqData'
import ErrorComponent from '../components/ErrorComponent'
import StatusBarComponent from '../components/StatusBar'

export default function FaqView(props) {
  const [isError, setIsError] = React.useState(null)

  if (isError) {
    return (
      <ErrorComponent error={isError} />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBarComponent />
      <Text style={{alignSelf: 'center'}}>All the information here is WHO verified</Text>
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <FlatList
          style={{ top: 0 }}
          data={FaqData}
          renderItem={({ item }) => (
            <View style={styles.paper, { height: 'auto', cursor: 'pointer' }}>
              <View style={styles.paperElement}>
                <Text style={styles.countryHeading}>{item.H}</Text>
                <Text style={{ fontSize: 13, marginTop: 5 }}>{item.D}</Text>
              </View>
            </View>
          )}
          keyExtractor={item => item.ID.toString()}
        />
      </View>
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