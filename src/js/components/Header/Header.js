import React from 'react';
import {Text, View, Platform} from 'react-native';

const HeaderTitle = (props) => {
  const { textStyle, viewStyle, alignText, appleStyle } = styles;
  
  return( 
    <View style={viewStyle}>
    <View style={appleStyle}>
    <View style={alignText}>
    <Text >{props.headerText}</Text>
    </View>
    </View>
    </View>
   );
  
};

const styles = {
  viewStyle:{
    backgroundColor: 'blue',
  },
  alignText:{
  alignItems: 'center',
  justifyContent: 'center',
  shadowColor:'#8E4585',
  shadowOffset: {width: 0, height: 2},
  shadowOpacity: 0.2,
  elevation: 2,
  position: 'relative',
},
  appleStyle: {
    height: (Platform.OS === 'ios') ? 50 : 0,
    justifyContent: (Platform.OS === 'ios') ? 'center' : '',
  },
}



export default HeaderTitle;
