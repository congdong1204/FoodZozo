import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Platform, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

import CategoriesScreen from './screens/CategoriesScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import FiltersScreen from './screens/FiltersScreen';
import BookingScreen from './screens/BookingScreen';
import Colors from './constants/Colors';
import mealsReducer from './store/reducers/meals';

const rootReducer = combineReducers({
  meals: mealsReducer,
});
const store = createStore(rootReducer);

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
Entypo.loadFont();
FontAwesome.loadFont();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={({navigation}) => ({
          title: 'Meal Categories',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginRight: Platform.OS == 'android' ? 16 : 0}}>
              <Entypo
                name="menu"
                size={24}
                color={Platform.OS == 'android' ? 'white' : Colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={({route}) => ({
          title: route.params.item.title,
        })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({route}) => ({
          title: route.params.mealTitle,
          headerRight: () => (
            <TouchableOpacity onPress={route.params.toggleFav}>
              <Entypo
                name={route.params.isFav ? 'star' : 'star-outlined'}
                size={20}
                color={Platform.OS == 'android' ? 'white' : Colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const FavStackNavigatior = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
        headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={{marginRight: Platform.OS == 'android' ? 16 : 0}}>
              <Entypo
                name="menu"
                size={24}
                color={Platform.OS == 'android' ? 'white' : Colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={({route}) => ({
          title: route.params.mealTitle,
          headerRight: () => (
            <TouchableOpacity onPress={route.params.toggleFav}>
              <Entypo
                name={route.params.isFav ? 'star' : 'star-outlined'}
                size={20}
                color={Platform.OS == 'android' ? 'white' : Colors.primary}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:
          Platform.OS == 'android' ? 'white' : Colors.accent,
        tabBarStyle: {
          backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
        },
      }}>
      <Tab.Screen
        name="Meal Categories"
        component={StackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome name="cutlery" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavStackNavigatior}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="star" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = props => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor:
                Platform.OS == 'android' ? Colors.primary : 'white',
            },
            headerTintColor:
              Platform.OS == 'android' ? 'white' : Colors.primary,
            drawerActiveTintColor: Colors.accent,
          }}>
          <Drawer.Screen
            name="Meals"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Filters"
            component={FiltersScreen}
            options={({navigation, route}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{marginLeft: 16}}>
                  <Entypo
                    name="menu"
                    size={24}
                    color={Platform.OS == 'android' ? 'white' : Colors.primary}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => route.params.save()}
                  style={{marginRight: 16}}>
                  <FontAwesome
                    name="save"
                    size={24}
                    color={Platform.OS == 'android' ? 'white' : Colors.primary}
                  />
                </TouchableOpacity>
              ),
            })}
          />
          <Drawer.Screen
            name="Booking"
            component={BookingScreen}
            options={({navigation, route}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.toggleDrawer()}
                  style={{marginLeft: 16}}>
                  <Entypo
                    name="menu"
                    size={24}
                    color={Platform.OS == 'android' ? 'white' : Colors.primary}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => route.params.save()}
                  style={{marginRight: 16}}>
                  <FontAwesome
                    name="save"
                    size={24}
                    color={Platform.OS == 'android' ? 'white' : Colors.primary}
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
