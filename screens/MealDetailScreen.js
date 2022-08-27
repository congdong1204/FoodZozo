import React, { useEffect, useCallback } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { toggleFavorite } from '../store/actions/meals'

const MealDetailScreen = ({ navigation, route }) => {
    const { mealId } = route.params
    const availableMeals = useSelector(state => state.meals.meals)
    const currentMealIsFavorite = useSelector(state => 
        state.meals.favoriteMeals.some(meal => meal.id === mealId)
    )
    const selectedMeal = availableMeals.find(meal => meal.id === mealId)

    const dispatch = useDispatch()
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId))
    }, [dispatch, mealId])

    useEffect(() => {
        navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler])

    useEffect(() => {
        navigation.setParams({ isFav: currentMealIsFavorite })
    }, [currentMealIsFavorite])

    const ListItem = props => {
        return (
            <View style={styles.listItem}>
                <Text>{props.children}</Text>
            </View>
        )
    }

    console.log('Chay vao Detail Screen!!')

    return (
        <ScrollView>
            <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
            <View style={styles.details}>
                <Text>{selectedMeal.duration}m</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => 
                <ListItem key={ingredient}>{ingredient}</ListItem>
            )}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => 
                <ListItem key={step}>{step}</ListItem>
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
})

export default MealDetailScreen