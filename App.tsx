// App.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Board from './components/Board';
import { checkWinner, WinnerResult } from './utils/checkWinner';

export default function Game() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [winningPositions, setWinningPositions] = useState<number[] | null>(null);

  // 🔹 Cada vez que el tablero cambie, comprobamos si hay un ganador
  /*useEffect(() => {
    const result: WinnerResult = checkWinner(board);
    if (result.winner) {
      setWinner(result.winner);
      setWinningPositions(result.winningPositions);
    }
  }, [board]);*/

  // 🔹 Manejar clic en una casilla
  const handlePressSquare = (index: number) => {
    // Si la casilla ya tiene algo o ya hay ganador, no hacemos nada
    if (board[index] || winner) return;

    // Crear una copia del tablero
    const newBoard = [...board];
    newBoard[index] = turn;

    // Actualizar el estado
    setBoard(newBoard);

    // 🔹 Comprobamos si esa jugada gana
    const result = checkWinner(newBoard, 3, 3, index);

    if (result.winner) {
      setWinner(result.winner);
      setWinningPositions(result.winningPositions);
    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }

    // Cambiar de turno
    //setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningPositions(null);
    setTurn('X');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {winner === 'draw'
          ? 'Empate 😐'
          : winner
            ? `Ganó ${winner} 🎉`
            : `Turno de: ${turn}`}
      </Text>

      <Board 
        board={board} 
        onPressSquare={handlePressSquare} 
        winningPositions={winningPositions}
      />

      <Button title="Reiniciar" onPress={handleRestart} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turnText: {
    fontSize: 24,
    marginBottom: 16,
  },
});


/**
0,0 0,1 0,2
1,0 1,1 1,2
2,0 2,1 2,2
 */