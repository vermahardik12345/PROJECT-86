import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      requestedItemList: [],
    };
    this.requestRef = null;
  }

  getRequestedItemList = () => {
    this.requestRef = db.collection('requesteditems').onSnapshot((snapshot) => {
      var requestedItemList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestedItemList: requestedItemList,
      });
    });
  };

  componentDidMount() {
    this.getRequestedItemList();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.reason_To_Request}
        titleStyle={{
          color: 'black',
          fontWeight: 'bold',
         
        }}
        rightElement={
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{
              this.props.navigation.navigate('ReciverDetails',{'details':item})
            }}
           >
          
            <Text style={styles.bText}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
  <MyHeader title="BarterItems" navigation ={this.props.navigation}/>
        <View style={{ flex: 1 }}>
          {this.state.requestedItemList.length === 0 ? (
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontSize: 25,
                 
                  padding: 15,
                }}>
               
                  Sorry, no item available at the moment...
                
              </Text>
            </View>
          ) : (
            <FlatList
              style={styles.flatList}
              keyExtractor={this.keyExtractor}
              data={this.state.requestedItemList}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerT: {
   
    fontSize: 28,
    textAlign: 'center',
    alignSelf: 'center',
    height: 30,
    marginTop: 11,
  },
  headerB: {
    backgroundColor: 'orange',
    height: 55,
  },
  button: {
    width: 90,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    borderRadius: 17,
    shadowColor: '#808080',
    marginTop:40,
    shadowOffset: { width: 0, height: 5 },
  },
  bText: {
    
    color: 'white',
  },
});
