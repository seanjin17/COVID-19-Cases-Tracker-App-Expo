import React from 'react';
import { Text, View, FlatList, StyleSheet, Image, ActivityIndicator, Button, TouchableNativeFeedback } from 'react-native';
import { GetNews } from '../data-access/request-layer'
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import ErrorComponent from '../components/ErrorComponent'
import StatusBarComponent from '../components/StatusBar'

export default function NewsView(props) {
  const [newsData, setNewsData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isError, setIsError] = React.useState(null)
  const [ReadNewsData, setReadNewsData] = React.useState(null)
  React.useEffect(() => {
    if (Object.keys(props.route.params).length) {
      setReadNewsData(props.route.params)
    }
    const GetData = async () => {
      await GetNews("world").then(responseJson => {
        setNewsData(responseJson.body.articles)
      }).catch(e => {
        setIsError(e)
      })
    }
    GetData()
  }, [setNewsData, setReadNewsData])

  const closeReadingNews = () => {
    props.route.params = {}
    props.navigation.navigate('News', {})
  }
  const handleNewsSitePress = (url) => {
    Linking.openURL(url)
  }
  const handleNewsPress = item => {
    props.navigation.navigate('News', item)
  }

  if (Object.keys(props.route.params).length) {
    return (
      <View>
        <TouchableNativeFeedback onPress={closeReadingNews} >
          <View style={styles.backBar} >
            <Ionicons name='md-arrow-back' style={{ paddingLeft: 15, paddingRight: 10 }} size={35} color='#fff' />
            <Text style={styles.statusBarHeading}>Go Back</Text>
          </View>
        </TouchableNativeFeedback>
        <ScrollView>
          <Image source={{ uri: `${props.route.params.urlToImage}`, width: 'auto', height: 200 }} style={styles.images} />
          <View style={{ padding: 12, paddingBottom: 50 }}>
            <Text>Published : {new Date(props.route.params.publishedAt).toDateString()} on <Text>{props.route.params.source.name}</Text></Text>
            <Text style={{ fontSize: 20, paddingBottom: 15 }}>{props.route.params.title}</Text>
            <Text>{props.route.params.content}</Text>
            <Text>{props.route.params.author}</Text>
            <Text style={{marginTop: 10}}>Read the full story at : </Text>
            <Text onPress={(e) => handleNewsSitePress(props.route.params.url)} style={{ color: '#309afc' }}>{props.route.params.url}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
  if (isError) {
    return (
      <ErrorComponent error={isError} />
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <StatusBarComponent />
      {!newsData ? <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={60} color="#0e83e3" />
      </View>
        : <FlatList
          style={{ marginTop: 0 }}
          data={newsData}
          renderItem={({ item }) => (
            <TouchableNativeFeedback onPress={(e) => handleNewsPress(item)}>
              <View style={styles.paper, { height: 'auto', cursor: 'pointer' }}>
                <View style={styles.imageView}>
                  <Image source={{ uri: `${item.urlToImage}`, width: 'auto', height: 156 }} style={styles.images} />
                </View>
                <View style={styles.paperElement}>
                  <Text style={styles.countryHeading}>{item.title}</Text>
                  <Text style={{ fontSize: 13, marginTop: 5 }}>{item.description}</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          )}
          keyExtractor={item => `${item.source.id}${String(parseInt(Math.random() * 10000))}`}
        />}
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
    // marginLeft: 10,
    // marginRight: 10,
    // position: 'absolute',
    // alignItems: 'flex-start',
    // margin: 20,
    // marginTop: 30,
    // marginLeft: 15
  }, statusBar: {
    // flex: 2,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: "#0e83e3",
    height: 55,
    alignItems: 'center',
    justifyContent: "center"
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