import React from 'react';
import TabNavigator from 'react-native-tab-navigator';

import {
  View,
  Image,
}from 'react-native';

import HomeContainer from './HomeContainer';

const tabBarItems = [
  {title:'最新',icon : ()=><Image style={ {width:30,height:30} } source = {require('./imgs/home.png')}/> , component:HomeContainer},
  {title:'分类',icon : ()=><Image style={ {width:30,height:30} } source = {require('./imgs/class.png')}/> , component:HomeContainer},

];

export default class TabBarView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab:tabBarItems[0].title,
    }
  }
  render(){
    return (
      <TabNavigator tabBarStyle = {{ height:60 }}>
      {
        tabBarItems.map((controller,i)=>{
          let Component = controller.component;
          return (
            <TabNavigator.Item
              key = {i}
              title = {controller.title}
              selected = {this.state.selectedTab === controller.title }
              renderIcon = {controller.icon}
              onPress = {()=>{
                this.setState({selectedTab:controller.title})
              }}>
              <Component navigator = {this.props.navigator} {...this.props} />
            </TabNavigator.Item>
          )
        })
      }
      </TabNavigator>
    );
  }
};
