
import React,{Component} from 'react';
import Commom from './common';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
}from 'react-native';

export default class HeaderView extends Component{
  render(){
    let NavigationBar = [];
    if (this.props.leftIcon != undefined) {
      NavigationBar.push(
        <TouchableOpacity
          key = {'leftIcon'}
          activeOpacity = {0.75}
          style = {styles.leftIcon}
          onPress = {this.props.leftAction}
        >
        <Icon color="black" size={30} name={this.props.leftIcon}/>
        </TouchableOpacity>
      )
    }//end if
    if (this.props.title != undefined) {
      NavigationBar.push(
        <Text key = {'title'} style = {styles.title}>{this.props.title}</Text>
      )
    }
    if (this.props.titleView != undefined) {
      let Component = this.props.titleView;
      NavigationBar.push(
        <Component key = {'titleView'} style = {styles.titleView} {...this.props}/>
      )
    }
    return (
      <View style = {styles.navigationBarContainer}>
        {NavigationBar}
      </View>
    )
  }

}


const styles = StyleSheet.create({
  navigationBarContainer:{
    marginTop : 20,
    flexDirection : 'row',
    height : 44,
    justifyContent : 'center',
    alignItems : 'center',
    borderBottomColor : '#ccc',
    borderBottomWidth : 0.5,
    backgroundColor : 'white',
  },
  title : {
    fontSize : 15,
    marginLeft : 15,
  },
  titleView : {
    fontSize :15,
  },
  leftIcon : {
    left : 20,
    position: 'absolute',
  }
})
