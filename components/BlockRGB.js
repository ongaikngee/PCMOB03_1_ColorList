import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default function BlockRGB(props) {
  // console.log(props);

	const screenWidth = Dimensions.get('window').width;
  const numColumns = props.col;
	const tileSize = screenWidth / numColumns;

	return (
		<View
			style={{
				backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
				padding: 30,
				width: tileSize,
        height: tileSize,
        // height: 100,
        // flex:1,
        // aspectRatio:1,
        // flex:1/numColumns,
			}}
		/>
	);
}

const styles = StyleSheet.create({});
