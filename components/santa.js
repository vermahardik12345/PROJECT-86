import * as React from 'react';
import LottieView from 'lottie-react-native';
 

export default class Santaanimation extends React.Component{
    render(){
        return(
                <LottieView
                    source={require('../assets/santa.json')}
                    style={{width:"60%",height:"60%"}}
                    autoPlay loop
                />
        )
    }
}