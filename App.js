import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlockRGB from './components/BlockRGB';
import { FlatList } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
	const [ colorArray, setColorArray ] = useState([
		{ red: 255, green: 0, blue: 0, id: '0' },
		{ red: 0, green: 255, blue: 0, id: '1' },
		{ red: 0, green: 0, blue: 255, id: '2' }
	]);

	function renderItem({ item }) {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Details', { ...item })}>
				<BlockRGB red={item.red} green={item.green} blue={item.blue} />
			</TouchableOpacity>
		);
	}

	const addColor = () => {
		let color = Math.floor(Math.random() * 255);
		setColorArray([
			...colorArray,
			{
				red: Math.floor(Math.random() * 255),
				green: Math.floor(Math.random() * 255),
				blue: Math.floor(Math.random() * 255),
				id: `${colorArray.length}`
				//you could explore UUID
				//you could use time in the moment
			}
		]);
	};

	const reset = () => {
		setColorArray([]);
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
      headerLeft: () => <Button onPress={reset} title="Reset" />,
    });
  });

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				{/* <Button title="Add Color" onPress={addColor} />
				<Button title="Reset" onPress={reset} /> */}
				{/* <Button title="Details" onPress={() => navigation.navigate("DetailsScreen", { ...item })} /> */}
			</View>
			<FlatList contentContainerStyle={styles.list} data={colorArray} renderItem={renderItem} />
		</View>
	);
}



function DetailsScreen({ route }) {
	// Destructure this object so we don't have to type route.params.red etc
	const { red, green, blue } = route.params;

	return (
		<View style={[ styles.container, { backgroundColor: `rgb(${red}, ${green}, ${blue})` } ]}>
			<View style={styles.colorScreen}>
				<Text style={styles.detailText}>Red: {red}</Text>
				<Text style={styles.detailText}>Green: {green}</Text>
				<Text style={styles.detailText}>Blue: {blue}</Text>
			</View>
		</View>
	);
}

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Colors' }} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
		// alignItems: 'center',
		// justifyContent: 'center',
		// width:"100%",
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	list: {
		width: '100%'
	},
	colorScreen: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	detailText: {
		fontSize: 24,
		marginBottom: 20
	}
});
