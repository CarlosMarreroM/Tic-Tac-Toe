import React from 'react';
import { View, StyleSheet } from 'react-native';
import Square from './Square';

type BoardProps = {
    board: (string | null)[];
    onPressSquare: (index: number) => void;
    winningPositions?: number[] | null;
};

export default function Board({ board, onPressSquare, winningPositions }: BoardProps) {
    return (
        <View style={styles.board}>
            {board.map((value, i) => {
                const isWinner = winningPositions?.includes(i) ?? false;
                return (
                    <Square
                        key={i}
                        value={value}
                        onPress={() => onPressSquare(i)}
                        highlight={isWinner}
                    />
                );
            })}
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
