import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
}from 'react-native';

import Class from '../pages/Class';

class ClassContainer extends React.Component{
  render(){
    return (
      <Class {...this.props} />
    )
  }
}

export default connect((state)=>{
  const {Class} = state;
  return {
    Class
  }
})(ClassContainer);
