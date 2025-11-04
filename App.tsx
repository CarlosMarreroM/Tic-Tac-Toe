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
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setDraws] = useState(0);
  const [showStats, setShowStats] = useState(false);

  // Manejar clic en una casilla
  const handlePressSquare = (index: number) => {
    // Si la casilla ya tiene algo o ya hay ganador, no hacemos nada
    if (board[index] || winner) return;

    // Crear una copia del tablero
    const newBoard = [...board];
    newBoard[index] = turn;

    // Actualizar el estado
    setBoard(newBoard);

    // Comprobamos si esa jugada gana
    const result = checkWinner(newBoard, 3, 3, index);

    if (result.winner) {
      setWinner(result.winner);
      setWinningPositions(result.winningPositions);

      // Actualizamos el marcador
      if (result.winner === 'X') setScoreX(scoreX + 1);
      else if (result.winner === 'O') setScoreO(scoreO + 1);
      else if (result.winner === 'draw') setDraws(draws + 1);

    } else {
      setTurn(turn === 'X' ? 'O' : 'X');
    }
  };

  const handleRestart = () => {
    // Le da la victoria al contrario del que reinicia
    if (winner === null) {
      (turn === 'X') ? setScoreO(scoreO + 1) : setScoreX(scoreX + 1);
    }

    setBoard(Array(9).fill(null));
    setWinner(null);
    setWinningPositions(null);
    setTurn('X');
  };

  const handleResetScores = () => {
    setScoreX(0);
    setScoreO(0);
    setDraws(0);
  }

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

      <Button title="Estadísticas" onPress={() => setShowStats(!showStats)} />

      {showStats && (
        <View style={styles.statsPanel}>
          <Text style={styles.statsTitle}>🏆 Estadísticas</Text>
          <Text style={styles.statsText}>Victorias X: {scoreX}</Text>
          <Text style={styles.statsText}>Victorias O: {scoreO}</Text>
          <Text style={styles.statsText}>Empates: {draws}</Text>
          <Button title="Restart" onPress={() => handleResetScores()} />
        </View>
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
  statsPanel: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    alignItems: 'center',
    width: 250,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 4,
  },
});
