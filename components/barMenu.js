import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import {DrawerItems} from 'react-navigation-drawer';
import React from 'react';
import firebase from 'firebase';

export default class Menu extends React.Component{
    
    render(){
        return(
            <View>
                <DrawerItems {...this.props}/>
               <TouchableOpacity
               
               style={styles.button}
               onPress={()=>{
                this.props.navigation.navigate('logIn')
                firebase.auth().signOut()
               }
                 

               
               }
               
               ><Text style={styles.text}>LogOut</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    button:{
        width:80,
        height:90,
       
        marginTop:400
        
    },
    text:{
fontSize:20,
fontWeight:"bold",
color:"black"
    }
})