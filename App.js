import * as React from 'react';
import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import login from './screens/loginScreen';
import TabNavigator from './components/TabNavigator';
import {SideDrawer} from './components/appDrawer';
import Settings from './screens/settings'
export default class App extends React.Component{
  render(){
    return(

<AppContainer/>


    
    )
}
}
const switch1=createSwitchNavigator({
  
  logIn:{screen:login},
 
  Drawer:{screen:SideDrawer}
 

})
const AppContainer =  createAppContainer(switch1);