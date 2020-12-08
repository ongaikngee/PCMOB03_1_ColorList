import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function BlockRGB(props){
    return(
        <View
        style={{
          backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
          padding: 30,
          width: "100%",
        }}
      ></View>
   
    );


}

const styles = StyleSheet.create({

    
    
});