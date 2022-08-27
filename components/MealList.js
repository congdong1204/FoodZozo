import React from 'react'
import {
    View,
    Text,
    FlatList,
    StyleSheet
} from 'react-native'

import MealItem from './MealItem'

const MealList = props => {
    const renderMealItem = ({ item }) => {
        return (
            <MealItem
                title={item.title} 
                duration={item.duration}
                complexity={item.complexity}
                affordability={item.affordability}
                image={item.imageUrl}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        mealId: item.id,
                        mealTitle: item.title
                    })
                }}
            />
        )
    }

    return (
        <View style={styles.list}>
            <FlatList
                data={props.listData}
                renderItem={renderMealItem}
                style={{ width: '100%' }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MealList