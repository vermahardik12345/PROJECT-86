
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/header';

export default class MyReceivedItems extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      receivedItemList : []
    }
  this.requestRef= null
  }

  getReceivedItemList =()=>{
    this.requestRef = db.collection("requesteditems")
    .where('user_id','==',this.state.userId)
    .where("request_status", '==','received')
    .onSnapshot((snapshot)=>{
      var receivedItemList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        receivedItemList : receivedItemList
      });
    })
  }

  componentDidMount(){
    this.getReceivedItemList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.book_name);
    return (
      <ListItem
        key={i}
        title={item.item_name}
        subtitle={item.request_status}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received items" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedItemList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Items</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedItemList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})