import { StyleSheet, Text, View,TouchableOpacity ,TextInput,Image} from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import Menu  from './barMenu';
import {createDrawerNavigator} from 'react-navigation-drawer'
import TabNavigator from './TabNavigator';
import settings from '../screens/settings';
import {Icon} from 'react-native-elements';
import React from 'react';
import myBarters from '../screens/myBarters';
import Notification from '../screens/notification';
import MyReceivedItems from '../screens/myRecievedItems';
export const SideDrawer=createDrawerNavigator({

   Home:{
       screen:TabNavigator,
       navigationOptions:{
        drawerIcon:()=>  <Icon name="home" style={{fontSize:24,color:"green"}}/>
          
    }
   },
   MyBarters:{
    screen:myBarters,
    navigationOptions:{
        drawerIcon:()=>(
            <Icon name="user" type="font-awesome" color="#000000" alignSelf="flex-start"  />
        )
          
    }
},
Notifications:{
    screen:Notification,
    navigationOptions:{
       drawerIcon:()=>  <Icon name="bell" type="font-awesome" style={{fontSize:24,color:"green"}}/>
    }
   },
   MyReceivedItems:{
    screen:MyReceivedItems,
    navigationOptions:{
        drawerIcon:()=>  <Icon name="truck" type="font-awesome"/>
     }

},
   Settings:{
       screen:settings,
       navigationOptions:{
        drawerIcon:()=>  <Icon name="settings" style={{fontSize:24,color:"green"}}/>
          
    }
       
   }
},
{
    contentComponent:Menu
},
{
    initialRouteName:'Home'
}


)