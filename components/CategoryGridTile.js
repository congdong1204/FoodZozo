import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet
} from 'react-native'

const CategoryGridTile = (props) => {
    return (
        <TouchableOpacity
                style={{
                    ...styles.gridItem,
                    backgroundColor: props.color
                }}
                onPress={props.onSelect}
            >
                    <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        color: 'black'
    }
})

export default CategoryGridTile