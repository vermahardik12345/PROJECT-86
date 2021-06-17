import * as React from 'react';
import LottieView from 'lottie-react-native';
 

export default class Introanimation extends React.Component{
    render(){
        return(
                <LottieView
                    source={require('../assets/intro.json')}
                    style={{width:"40%",height:"60%",marginLeft:60,marginTop:20}}
                    autoPlay loop
                />
        )
    }
}