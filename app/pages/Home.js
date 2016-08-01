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
import {home,} from '../actions/homeAction';
import LoadMoreFooter from '../common/LoadMoreFooter';
import HomeDetail from './HomeDetail';

let limit = 21;
let offset = '';
let tag = '';
let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;

export default class Home extends React.Component{

  constructor(props){
    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.state = {
      dataSource : ds,
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch} = this.props;
      dispatch(home(tag, offset, limit, isLoadMore, isRefreshing, isLoading));
    })
  }


  render(){
    // console.log(this.props);
    const {Home,rowDate} = this.props;
    tag = rowDate;
    let homeList = Home.HomeList;
    return (

      <View style = {{flex :  1}}>
        <HeaderView
          title = {'最新'}
          // leftIcon = {'angle-left'}
        />
        {Home.isLoading? <Loading />:
          <ListView
          dataSource = {this.state.dataSource.cloneWithRows(homeList)}
          renderRow = {this._renderRow.bind(this)}
          contentContainerStyle = {styles.list}
          enableEmptySection = {true}
          initialListSize = {10}
          onScroll = {this._onScroll}
          onEndReached = {this._onEndReached.bind(this)}
          onEndReachedThreshold = {10}
          renderFooter = {this._renderFooter.bind(this)}
          style = {styles.listView}
          refreshControl = {
            <RefreshControl
            refreshing = {Home.isRefreshing}
            onRefresh = {this._onRefresh.bind(this)}
            title = {"正在加载中"}
            color = '#ccc'

            />
          }
          >
          </ListView>
        }
      </View>
    )
  }

  _onRefresh(){
    if(isLoadMore){
      const {Home,dispatch} = this.props;
      isLoadMore = false;
      isRefreshing = true;
      dispatch(home(tag, '', limit, isLoadMore, isRefreshing, isLoading));
    }
  }
  _onEndReached(){
    InteractionManager.runAfterInteractions(()=>{
      const {Home,dispatch} = this.props;
      let homeList = Home.HomeList;
      isLoadMore = true;
      isLoading = false;
      offset = homeList[homeList.length-1].seq;
      dispatch(home(tag,offset,limit,isLoadMore,isRefreshing,isLoading));
    })
  }
  _onScroll(){

  }
  _renderRow(rowDate){
    return (
      <View style = {styles.container}>
        <TouchableOpacity
        activeOpacity = {0.75}
        onPress = { this._onPressItem.bind(this,rowDate) }
        >
          <Image
          source = { {uri:'http://img.hb.aicdn.com/'+rowDate.file.key+'_fw236'} }
          style = {styles.thumbnail}
          />
        </TouchableOpacity>
      </View>
    )
  }
  _renderFooter(){
    const {Home} = this.props;
    if (Home.isLoadMore) {
      return (<LoadMoreFooter />);
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
    height : Common.window.height - 44 - 60 - 20,
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
  header : {
    marginTop : 20,
    height : 44 ,
    alignItems : 'center',
    justifyContent : 'center',
    flexDirection : 'row',
    backgroundColor : 'white',
  },
  title : {
    color : 'black',
  }
});
