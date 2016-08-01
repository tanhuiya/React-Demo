import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
}from 'react-native';

import Home from '../pages/Home';

class HomeContainer extends React.Component{
  render(){
    return (
      <Home {...this.props} />
    )
  }
}

export default connect((state)=>{
  const {Home} = state;
  return {
    Home
  }
})(HomeContainer);
