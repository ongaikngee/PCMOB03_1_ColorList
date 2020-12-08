import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BlockRGB from "./components/BlockRGB";
import { FlatList } from 'react-native-gesture-handler';

function HomeScreen() {

  const [colorArray, setColorArray] = useState([
    { red: 255, green:0, blue:0, id:"0"},
    { red: 0, green:255, blue:0, id:"1"},
    { red: 0, green:0, blue:255, id:"2"},
  ]);

  function renderItem({item}){
    return <BlockRGB red={item.red} green={item.green} blue={item.blue} />
  }

  const addColor = () => {
    let color = Math.floor(Math.random() * 255);  
    setColorArray([...colorArray, {
      red:Math.floor(Math.random() * 255), 
      green:Math.floor(Math.random() * 255), 
      blue:Math.floor(Math.random() * 255), 
      id: `${colorArray.length}`,
    }])

  }

  const reset = () =>{
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      <Button title="Add Color" onPress={addColor}/>
      <Button title="reset" onPress={reset}/>
      <FlatList contentContainerStyle={styles.list} data={colorArray} renderItem={renderItem} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Colors' }} />
				{/* <Stack.Screen name="Details" component={DetailsScreen} /> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // width:"100%",
  },
  list:{
    width:"100%",
  }
});


