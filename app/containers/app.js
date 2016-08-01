import React from 'react';
import {
  Navigator,
  View,
  StyleSheet,
  Text,
}from 'react-native';
import TabBarView from './TabBarView'

export default class App extends React.Component{
  render (){
    return (
      <View style={{flex:1}}>
        <Navigator
          initialRoute = {{name:'TabBarView' , component:TabBarView}}
          configureScene = {(route)=>{
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene = {(route,navigator)=>{
            let Component = route.component;
            return (
              <Component navigator={navigator} route = {route} {...route.passProps}/>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
