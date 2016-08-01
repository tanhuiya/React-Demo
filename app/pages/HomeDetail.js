import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
}from 'react-native';
import Common from '../common/common';

export default class HomeDetail extends React.Component{
  render(){
    console.log(this.props);
    const {rowDate} = this.props;
    return (
      <View>
        <Image
        source = {{uri:'http://img.hb.aicdn.com/'+rowDate.file.key+'_fw658'}}
        style = {styles.thumbnail}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  thumbnail : {
    width : Common.window.width,
    height : Common.window.height,
  },
});
