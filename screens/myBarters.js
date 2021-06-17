import React from "react";
import { View, Text, TouchableOpacity, StyleSheet,FlatList } from "react-native";
import {ListItem,Icon} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/header';
export default class myBarters extends React.Component{
   
    
   
    constructor(){
        super();
      this.state={
          userId:firebase.auth().currentUser.email,
          donorName:"",
          allBarters:[],
          
      }
      this.requestRef=null
    }

  
    getDonorDetails=(donorId)=>{
        db.collection("users").where("email_id","==", donorId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            this.setState({
              "donorName" : doc.data().first_name + " " + doc.data().last_name
            })
          });
        })
      }
          
sendNotification=(itemDetails,requestStatus)=>{
    var requestid=itemDetails.request_id;
    var donorid=itemDetails.donor_id;
        db.collection('all_notification')
        .where('request_id','==',requestid) 
        .where("donor_id",'==',donorid)
        .get()
        .then( snapshot =>{
            snapshot.forEach((doc)=>{
                    var message=""
                    if(requestStatus==="Item Sent"){
                        message= this.state.donorName + "Sent you the Item"
                    }
                    else{
                        message=this.state.donorName+ "Has shown interest in bartering the item"
                    }
                    db.collection("all_notification").doc(doc.id).update({
                        "message":message,
                        "notifaction_status":"unread",
                        "date":firebase.firestore.FieldValue.serverTimestamp()

                    })
            })
            
        })  
      }
      sendItem=(itemDetails)=>{
        if(itemDetails.request_status==="Item Sent"){
        var requeststatus="Donor Interested"
        db.collection("all_barters").doc(itemDetails.doc_id).update({
           "request_status":"Donor Interested"
        })
        this.sendNotification(itemDetails,requeststatus)
        }
        
        else{
        var requeststatus="Item Sent"
        db.collection("all_barters").doc(itemDetails.doc_id).update({
        "request_status":"Item Sent"
        })
    this.sendNotification(itemDetails,requeststatus)
   }
    }
   
    getAllDonations=()=>{
   
        this.requestRef=db.collection('all_barters').where('donor_id','==',this.state.userId)
        .onSnapshot((snapshot)=>{
            var allBarters=[];
            snapshot.docs.map((doc)=>{
                var barter=doc.data();
                barter["doc_id"]=doc.id;
                allBarters.push(barter)
            
            })
            this.setState({
           allBarters:allBarters
            })
        })
    }
    keyExtractor=(item,index) => index.toString()



    renderItem =({item,i}) =>(
        <ListItem
        key={i}
        title={item.item_name}
        subtitle={"Requested By:" +item.requested_by +"  " +"Status:"+item.request_status}
        subtitleStyle={{color:"black",marginLeft:20}}
        leftElement={<Icon name="book" type="font-awesome" color="#696969" alignSelf="flex-start" /> }
        titleStyle={{color:"black",fontWeight:'bold',marginLeft:20}}
        rightElement={
            <TouchableOpacity 
            onPress={()=>{
                this.sendItem(item)
            }}
            style={{ backgroundColor:"#6F84D7",width:150,height:50,borderBottomLeftRadius:10,
            borderBottomRightRadius:10,borderTopLeftRadius:10,borderTopRightRadius:10
            
            }}
          
            >
                <Text style={{color:'#fff',alignSelf:"center",fontWeight:'bold',marginTop:15}}>Send Item</Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )

    componentDidMount(){
        this.getDonorDetails(this.state.userId);
        this.getAllDonations()
    }
    
    render(){
        return(
            <View>
                  <MyHeader title="Your Barters" navigation ={this.props.navigation}/>
                <View>
                    {
                        this.state.allBarters.length===0
                        ?(
                            <View>
                                <Text style={{color:"#000000",fontWeight:'bold',fontSize:40,alignSelf:"center",marginTop:300}}>You don't have any Barters currently!</Text>
                            </View>
                        )
                        :(
                            <FlatList
                            keyExtractor={this.keyExtractor}
                            data={this.state.allBarters}
                            renderItem={this.renderItem}

                            />
                        )
                    }
                </View>
            </View>
        )
    }
}