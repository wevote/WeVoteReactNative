import React from 'react';
import {Text, View} from 'react-native';

const HeaderTitle = (props) => {
  const { textStyle, viewStyle, alignText } = styles;
  
  return( 
    <View style={viewStyle}>
    <View style = {alignText}>
    <Text style={textStyle}>{props.headerText}</Text>
    </View>
    </View>
   );
  
};

const styles = {
  viewStyle:{
    backgroundColor: '#F8F8F8'
  },
  textStyle:{
    fontSize: 20
  },
  alignText:{
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
  shadowColor:'#8E4585',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  elevation: 2,
  position: 'relative'
}
}



export default HeaderTitle;

