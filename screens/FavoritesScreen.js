import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'

import MealList from '../components/MealList'

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <Text>No favorite meals found. Start adding some!</Text>
            </View>
        )
    }

    return (
        <MealList
            listData={favMeals}
            navigation={props.navigation}
        />
    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default FavoritesScreen