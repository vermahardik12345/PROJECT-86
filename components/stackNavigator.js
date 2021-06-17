import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/barter';
import RecieverDetails from '../screens/recieverdetails';

export const AppStackNavigator=createStackNavigator({
    BarterList:{
        screen:HomeScreen,
        navigationOptions:{
            headerShown:false
        }
    },
    ReciverDetails:{
        screen:RecieverDetails,
        navigationOptions:{
            headerShown:false
        }
    },
   
},
{
    initialRouteName:'BarterList'
}
)