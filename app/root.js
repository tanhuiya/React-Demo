import React ,{Component} from 'react';
import {Provider} from 'react-redux';
import store from './store/store';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './containers/app';

export default class TH_BiZhi extends Component {
  render (){

    return (
      <Provider store = {store}>
        <App />
      </Provider>
    )
  }
}
