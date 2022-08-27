import React from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';

import MealList from '../components/MealList';

const CategoryMealsScreen = ({navigation, route}) => {
  const {item} = route.params;

  const availableMeals = useSelector(state => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(meal =>
    meal.categoryIds.includes(item.id),
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No meals found, maybe check your filters!</Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={navigation} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryMealsScreen;
