import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home'
import ImageSelector from './screens/ImageSelector'

export default class App extends Component {
	render() {
		const Stack = createStackNavigator();
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="ImageSelector" component={ImageSelector} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}
