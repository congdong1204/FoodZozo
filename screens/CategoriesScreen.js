import React from 'react'
import {
    FlatList,
    StyleSheet
} from 'react-native'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'

const CategoriesScreen = ({ navigation }) => {
    const renderGridItem = ({ item }) => {
        return (
            <CategoryGridTile 
                title={item.title} 
                color={item.color}
                onSelect={() => {
                    navigation.navigate('CategoryMeals', {
                        item: item,
                    })
                }}
            />
        )
    }

    return (
        <FlatList 
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}
        />
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default CategoriesScreen