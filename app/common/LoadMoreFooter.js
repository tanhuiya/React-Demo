import React ,{Component} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
}from 'react-native';

export default class LoadMoreFooter extends Component {
  render (){
    return (
      <View style = {styles.foot}>
        <ActivityIndicator
        />
        <Text style = {styles.text}>正在加载更多...</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  foot:{
    alignItems:'center',
    justifyContent:'center',
    height : 40,
    flexDirection:'row',
  },
  text:{
    marginLeft : 10,
    fontSize : 15,
    color : 'grey',
  }
})
