import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type SquareProps = {
    value: string | null;
    onPress: () => void;
    highlight?: boolean;
};

export default function Square({ value, onPress, highlight }: SquareProps) {
    return (
        <Pressable 
            style={[styles.square, highlight && styles.highlight]} 
            onPress={onPress}
        >
            <Text style={styles.text}>{value}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    square: {
        width: 100,
        height: 100,
        borderWidth: 2,
        borderColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlight: {
        backgroundColor: '#8f8',
    },
    text: {
        fontSize: 48,
    },
});