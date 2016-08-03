import React from 'react';
import {
  View,
  Text,
  RefreshControl,
  InteractionManager,
  ListView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Navigator,
}from 'react-native';
import Common from '../common/common';
import HeaderView from '../common/HeaderView'
import Loading from '../common/Loading';
import {ClassAction,} from '../actions/ClassAction';
import LoadMoreFooter from '../common/LoadMoreFooter';
import ClassDetailContainer from '../containers/ClassDetailContainer';

let isLoading = true;

export default class Class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 !== r2,
      })
    }
  }
  componentDidMount(){
    InteractionManager.runAfterInteractions(()=>{
      const {dispatch} = this.props;
      dispatch(ClassAction(isLoading));
    })
  }
  render(){
    const {Class} = this.props;
    let ClassList = Class.ClassData;
    return (
      <View>
        <HeaderView title = '分类' />
        {Class.isLoading ?  <Loading /> :
          <ListView
          style = {styles.list}
          dataSource = { this.state.dataSource.cloneWithRows(ClassList) }
          renderRow = {this._renderRow.bind(this)}
          enableEmptySections = {true}

        />}
      </View>
    )
  }
  _renderRow(rowData){
    return (
      <TouchableOpacity
      onPress = {this._onPress.bind(this,rowData)}
      >
      <View style = {styles.row}>
      <Text style = {styles.text}>{rowData.tag_name+"共"+rowData.pin_count+"张"}</Text>
      </View>
      </TouchableOpacity>
    )

  }

  _onPress(rowData){
    this.props.navigator.push({
      name : "Detail",
      component : ClassDetailContainer,
      passProps : {
        rowData : rowData,
      }
    });
  }
}

const styles = StyleSheet.create({
  list : {
    backgroundColor : 'white',
    width : Common.window.width,
    height : Common.window.height -54-64,

  },
  row : {
    height : 50,
    width : Common.window.width,
    flexDirection : 'row',
    borderBottomWidth : 0.5,
    borderBottomColor : '#ccc',

    alignItems : 'center',
  },
  text:{
    marginLeft :20 ,
    fontSize :15 ,
  }
})
