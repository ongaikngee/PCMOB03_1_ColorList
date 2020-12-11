import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BlockRGB from './components/BlockRGB';
import { FlatList } from 'react-native-gesture-handler';
// import { Container, Header, Content, Icon, Picker, Form } from "native-base";

function HomeScreen({ navigation }) {
	const [numColumns, setNumColumns] = useState(6);
	const [ colorArray, setColorArray ] = useState([
		{ red: 255, green: 255, blue: 0, col: numColumns, id: '0' }
		// { red: 0, green: 255, blue: 0, id: '1' },
		// { red: 0, green: 0, blue: 255, id: '2' }
	]);

	function renderItem({ item }) {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Details', { ...item })}>
				<BlockRGB red={item.red} green={item.green} blue={item.blue} col={item.col} />
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
				col: numColumns,
				id: `${colorArray.length}`
				//you could explore UUID
				//you could use time in the moment
			}
		]);
	};

	const reset = () => {
		setColorArray([]);
	};

	// const changeCol = (coooo) =>{
	// 	alert(coooo);
	// 	reset();
	// 	setNumColumns(coooo);
	// }

	// const increase = () => {
	// 	setNumColumns(numColumns+1);

	// 	setColorArray([...colorArray]);

	// };
	// const decrease = () => setNumColumns(numColumns -1);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button onPress={addColor} title="Add Color" />,
			headerLeft: () => <Button onPress={reset} title="Reset" />
		});
	});

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Text style={styles.detailText}>Number of Column: {numColumns}</Text>
				{/* <Button onPress={increase} title="+" />
				<Button onPress={decrease} title="-" /> */}
			</View>
			<FlatList
				contentContainerStyle={styles.list}
				data={colorArray}
				renderItem={renderItem}
				numColumns={numColumns}
			/>
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
