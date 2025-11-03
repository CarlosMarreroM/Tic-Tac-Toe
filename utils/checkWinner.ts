// utils/checkWinner.ts

export type WinnerResult = {
  winner: string | null;
  winningPositions: number[] | null;
};

// La función recibe el tablero y el número de casillas necesarias para ganar
export function checkWinner(
  board: (string | null)[],
  size: number,
  winLength = size,
  lastIndex: number
): WinnerResult {
  const getIndex = (r: number, c: number) => r * size + c;

  const r = Math.floor(lastIndex / size);
  const c = lastIndex % size;
  const symbol = board[lastIndex];
  if (!symbol) return { winner: null, winningPositions: null };

  const directions = [
    [0, 1],   // →
    [1, 0],   // ↓
    [1, 1],   // ↘
    [1, -1],  // ↙
  ];

  for (const [dr, dc] of directions) {
    const positions = [lastIndex];

    // Mira hacia adelante
    for (let step = 1; step < winLength; step++) {
      const nr = r + dr * step;
      const nc = c + dc * step;
      if (
        nr < 0 ||
        nc < 0 ||
        nr >= size ||
        nc >= size ||
        board[getIndex(nr, nc)] !== symbol
      ) break;
      positions.push(getIndex(nr, nc));
    }

    // Mira hacia atrás (dirección contraria)
    for (let step = 1; step < winLength; step++) {
      const nr = r - dr * step;
      const nc = c - dc * step;
      if (
        nr < 0 ||
        nc < 0 ||
        nr >= size ||
        nc >= size ||
        board[getIndex(nr, nc)] !== symbol
      ) break;
      positions.push(getIndex(nr, nc));
    }

    if (positions.length >= winLength) {
      return { winner: symbol, winningPositions: positions };
    }
  }

  // Empate
  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', winningPositions: null };
  }

  return { winner: null, winningPositions: null };
}
