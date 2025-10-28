// Game.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Board from './components/Board';

export default function Game() {
  // Estado del tablero (9 posiciones, vacías al inicio)
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));

  // Estado del turno actual ("X" o "O")
  const [turn, setTurn] = useState<'X' | 'O'>('X');

  // 🔹 Manejar clic en una casilla
  const handlePressSquare = (index: number) => {
    // Si la casilla ya tiene algo, no hacemos nada
    if (board[index]) return;

    // Crear una copia del tablero
    const newBoard = [...board];
    newBoard[index] = turn;

    // Actualizar el estado
    setBoard(newBoard);

    // Cambiar de turno
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  return (
    <View style={styles.container}>
      {/* Texto arriba para ver de quién es el turno */}
      <Text style={styles.turnText}>Turno de: {turn}</Text>

      {/* Tablero */}
      <Board board={board} onPressSquare={handlePressSquare} />
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
