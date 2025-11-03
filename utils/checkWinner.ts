// utils/checkWinner.ts

// La función recibe el tablero y el número de casillas necesarias para ganar
export function checkWinner(board: (string | null)[], winLength = 3): string | null {
  const size = Math.sqrt(board.length); // ejemplo: 3x3 = 9 posiciones
  if (!Number.isInteger(size)) return null;

  const lines: (string | null)[][] = [];

  //Filas
  for (let r = 0; r < size; r++) {
    const row = board.slice(r * size, (r + 1) * size);
    lines.push(row);
  }

  //Columnas
  for (let c = 0; c < size; c++) {
    const col = [];
    for (let r = 0; r < size; r++) {
      col.push(board[r * size + c]);
    }
    lines.push(col);
  }

  //Diagonal principal (↘)
  const mainDiagonal = [];
  for (let i = 0; i < size; i++) {
    mainDiagonal.push(board[i * size + i]);
  }
  lines.push(mainDiagonal);

  //Diagonal inversa (↙)
  const reverseDiagonal = [];
  for (let i = 0; i < size; i++) {
    reverseDiagonal.push(board[i * size + (size - 1 - i)]);
  }
  lines.push(reverseDiagonal);

  //Comprobar si alguna línea tiene el mismo símbolo winLength veces seguidas
  for (const line of lines) {
    const joined = line.join('');
    if (joined.includes('X'.repeat(winLength))) return 'X';
    if (joined.includes('O'.repeat(winLength))) return 'O';
  }

  // Empate (no hay nulls y nadie ganó)
  if (board.every(cell => cell !== null)) {
    return 'draw';
  }

  return null; // nadie ganó todavía
}
