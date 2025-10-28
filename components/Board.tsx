import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

type BoardProps = {
    board: (string | null)[];
    onPressSquare: (index: number) => void;
};

export default function Board({ board, onPressSquare }: BoardProps) {
    return (
        <View style={styles.board}>
            {board.map((value, i) => (
                <Square key={i} value={value} onPress={() => onPressSquare(i)} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        width: 310,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});
