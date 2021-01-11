import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import boardAdd from '../pages/boardAdd';
import boardDetail from '../pages/boardDetail';
import boardEdit from '../pages/boardEdit';
import boardList from '../pages/boardList';

const NavStack = createStackNavigator();
const NavStackScreen = () => (
  <NavStack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: { backgroundColor: '#273c75' },
      headerTitleStyle: {color : '#fff'}
    }}
    initialRouteName="List">
    <NavStack.Screen name="List" title="Board List" component={boardList} />
    <NavStack.Screen name="Add" component={boardAdd} options={{headerTitle: 'Board Add'}}/>
    <NavStack.Screen name="Detail" component={boardDetail} options={{headerTitle: 'Board Detail'}}/>
    <NavStack.Screen name="Edit" component={boardEdit} options={{headerTitle: 'Board Edit'}}/>
  </NavStack.Navigator>
);

const Navigation = () => (
    <NavigationContainer>
      <NavStackScreen />
    </NavigationContainer>
  );
  
  export default Navigation;