import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
}from  'react-native';

import Common from './common';

export default class Loading extends Component{

  render(){
    return (
      <View style = {styles.loading}>
        <ActivityIndicator
          color = {'white'}
        />
        <Text
            style = {styles.text}
        >加载中...</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  loading : {
    backgroundColor:'grey',
    height : 80,
    width : 100,
    borderRadius : 10,
    justifyContent : 'center',
    alignItems : 'center',
    position : 'absolute',
    top : (Common.window.height - 80)/2,
    left : (Common.window.width - 100)/2,
  },

  text : {
    marginTop : 10,
    fontSize : 14,
    color : 'white',
  }
})
