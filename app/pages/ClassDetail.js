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
import {ClassDetailAction,reset_detail_list} from '../actions/ClassDetailAction';
import LoadMoreFooter from '../common/LoadMoreFooter';
import HomeDetail from './HomeDetail';

let limit = 21;
let offset = '';
let tag = '';
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;

export default class ClassDetail extends React.Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.state = {
      dataSource : ds,
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch,rowData} = this.props;
      tag = rowData.tag_name;
      dispatch(ClassDetailAction(tag, offset, limit, isLoadMore, isRefreshing, isLoading));
    })
  }
  componentWillUnmount(){
    const {dispatch} = this.props;
    dispatch(reset_detail_list());
    console.log(this.props);
  }
  render(){
    const {ClassDetail} = this.props;
    console.log(ClassDetail);
    let detailDatas = ClassDetail.ClassDetailData;
    return (
      <View>
        <HeaderView
        leftIcon = {'angle-left'}
        title = {this.props.rowData.tag_name}
        leftAction = {this._leftAction.bind(this)}
        />
        <ListView
        dataSource = {this.state.dataSource.cloneWithRows(detailDatas)}
        renderRow = {this._renderRow.bind(this)}
        onEndReached = {this._onEndReached.bind(this)}
        onEndReachedThreshold = {10}
        renderFooter = {this._renderFooter.bind(this)}
        contentContainerStyle = {styles.list}
        initialListSize = {10}
        enableEmptySections = {true}
        style = {styles.listView}
        refreshControl = {
          <RefreshControl
          refreshing = {ClassDetail.isRefreshing}

          title = {'正在加载...'}
          color = '#ccc'
          onRefresh = {this._onRefresh.bind(this)}
          />
        }
        >
        </ListView>
      </View>
    );
  }
  _renderRow(rowData){
    return (
      <View style = {styles.container}>
        <TouchableOpacity
        activeOpacity = {0.75}
        onPress = { this._onPressItem.bind(this,rowData) }
        >
          <Image
          source = { {uri:'http://img.hb.aicdn.com/'+rowData.file.key+'_fw236'} }
          style = {styles.thumbnail}
          />
        </TouchableOpacity>
      </View>
    )
  }
  _renderFooter(){
    const {ClassDetail} = this.props;
    if (ClassDetail.isLoadMore) {
      return (<LoadMoreFooter />);
    }
  }

  // Actions
  _onEndReached(){
    InteractionManager.runAfterInteractions(()=>{
      const {ClassDetail,dispatch} = this.props;
      let detailDatas = ClassDetail.ClassDetailData;
      if (detailDatas.length) {
        isLoadMore = true;
        isLoading = false;
        offset = detailDatas[detailDatas.length-1].seq;
        dispatch(ClassDetailAction(tag, offset, limit, isLoadMore, isRefreshing, isLoading));
      }
    })
  }
  _onRefresh(){
    if(isLoadMore){
      const {ClassDetail,dispatch} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(ClassDetailAction(tag, offset, limit, isLoadMore, isRefreshing, isLoading));
    }
  }
  _onPressItem(rowDate){
    InteractionManager.runAfterInteractions(()=>{
      this.props.navigator.push({
        name : "HomeDetail",
        component : HomeDetail,
        sceneConfig : Navigator.SceneConfigs.FloatFromBottom,
        passProps : {
            rowDate : rowDate,
        }
      })
    })
  }
  _leftAction(){
    this.props.navigator.pop();
  }
}

const styles = StyleSheet.create({
  container : {
    width : (Common.window.width)/3,
    height : (Common.window.heigth)/2,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#f5fcff',
  },
  listView : {
    backgroundColor : '#f5fcff',
    height : Common.window.height - 44 - 20,
  },
  thumbnail : {
    width : Common.window.width/3-10,
    height : Common.window.width/2 -10,
  },
  list : {
    justifyContent :'center',
    flexDirection : 'row',
    flexWrap : 'wrap',
    alignItems : 'center',
  },
})
