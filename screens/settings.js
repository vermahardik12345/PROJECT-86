import React, { Component } from 'react';
import { StyleSheet, Text, View,TouchableOpacity, TextInput ,Alert, ScrollView,KeyboardAvoidingView,Modal} from 'react-native';

import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/header';
export default class setttings extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            address:'',
            mobileNum:'',
            docId:'',
        }
    }
    getUserDetails=()=>{
        var email = firebase.auth().currentUser.email;
        db.collection('users').where('email_id','==',email).get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              console.log(doc.data().email_id)
          var data = doc.data()
            this.setState({
              emailId   : data.email_id,
              firstName : data.first_name,
              lastName  : data.last_name,
              address   : data.address,
              mobileNum   : data.mobile_num,
              docId     : doc.id
            })
          });
        })
      }

      updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
          "first_name": this.state.firstName,
          "last_name" : this.state.lastName,
          "address"   : this.state.address,
          "mobile_num"   : this.state.mobileNum,
        })
    
        alert("Profile Updated Successfully")
    
      }
    
    componentDidMount(){
     this.getUserDetails()
   
 }
    render(){
   
        return(
            <View>
                <MyHeader title="Settings" navigation ={this.props.navigation}/>
         
              <TextInput
              style={styles.formTextInput}
              placeholder={"first_name"}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value={this.state.firstName}

           />
            <TextInput
              style={styles.formTextInput}
           placeholder="last_name"
           maxLength={8}
           onChangeText={(text)=>
            {
            this.setState({
              lastName: text
            })
          }}
            value={this.state.lastName}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="email_address"
          keyboardType={'email-address'}
          
            value={this.state.emailId}
           />
            <TextInput
              style={styles.formTextInput}
           placeholder="mobile"
           maxLength={10}
           onChangeText={(text)=>{
            this.setState({
              mobileNum: text
            })
          }}
            value={this.state.mobileNum}
           />
            <TextInput
              style={styles.formTextInput}
              placeholder="address"
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
            value={this.state.address}
            />
             <TouchableOpacity style={styles.button}
              onPress={()=>{
                this.updateUserDetails()
              }}>
              <Text style={styles.buttonText}>Update       </Text>
            </TouchableOpacity>
            </View>
        )
         
    }
}
const styles=StyleSheet.create({
    textInput:{
   width:330,
  backgroundColor:"#84BAF4",
  height:70,
 marginLeft:100,
  marginTop:10

    },
    textInput2:{
       width:330,
       backgroundColor:"#84BAF4",
       height:70,
      marginLeft:100,
       marginTop:40
    },
    header:{
     backgroundColor:"#84BAF4",
     height:70,
     marginTop:-20,
     marginLeft:60
    },
    button:{
        backgroundColor:"#2D69DB",
        width:190,
        height:40,
        marginLeft:150,
        marginTop:40,
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        borderTopRightRadius:40,
        borderTopLeftRadius:40,
    },
    text:{
        marginTop:10,
        fontWeight:"bold",
        color:"#ff1bdd",
        fontSize:15
    },
    headerText:{
        alignSelf:"center",
        fontWeight:"bold",
        fontSize:40,
        color:"#aa33bb",
        marginTop:-20
    },
    modalTitle :{
       justifyContent:'center',
       alignSelf:'center',
       fontSize:30,
       color:'#ff5722',
       margin:50
     },
     modalContainer:{
       flex:1,
       borderRadius:20,
       justifyContent:'center',
       alignItems:'center',
       backgroundColor:"#ffff",
       marginRight:30,
       marginLeft : 30,
       marginTop:80,
       marginBottom:80,
     },
     formTextInput:{
       width:"75%",
       height:35,
       alignSelf:'center',
       borderColor:'#ffab91',
       borderRadius:10,
       borderWidth:1,
       marginTop:20,
       padding:10
     },
     registerButton:{
       width:200,
       height:40,
       alignItems:'center',
       justifyContent:'center',
       borderWidth:1,
       borderRadius:10,
       marginTop:30
     },
     cancelButton:{
       width:200,
       height:30,
       justifyContent:'center',
       alignItems:'center',
       marginTop:5,
     },
     buttonText:{
         color:"#ffffff",
        marginLeft:10,
         marginTop:9,
         fontSize:15
     }

})