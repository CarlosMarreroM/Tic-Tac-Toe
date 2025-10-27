import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type SquareProps = {
    value: string | null;
    onPress: () => void;
};

export default function Square({ value, onPress }: SquareProps) {
    return (
        <Pressable style={styles.square} onPress={onPress}>
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
    text: {
        fontSize: 48,
    },
});