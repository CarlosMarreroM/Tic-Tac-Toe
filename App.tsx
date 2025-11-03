// App.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Board from './components/Board';
import { checkWinner } from './utils/checkWinner';

export default function Game() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<'X' | 'O'>('X');
  const [winner, setWinner] = useState<string | null>(null);

  // 🔹 Cada vez que el tablero cambie, comprobamos si hay un ganador
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
    }
  }, [board]);

  // 🔹 Manejar clic en una casilla
  const handlePressSquare = (index: number) => {
    // Si la casilla ya tiene algo o ya hay ganador, no hacemos nada
    if (board[index] || winner) return;

    // Crear una copia del tablero
    const newBoard = [...board];
    newBoard[index] = turn;

    // Actualizar el estado
    setBoard(newBoard);

    // Cambiar de turno
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
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
      <Board board={board} onPressSquare={handlePressSquare} />
      {winner && (
        <Button title="Reiniciar" onPress={handleRestart} />
      )}
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
