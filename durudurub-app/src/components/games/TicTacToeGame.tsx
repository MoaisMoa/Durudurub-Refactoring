import { useState } from 'react';
import { X, Circle, RotateCcw } from 'lucide-react';

type Player = 'X' | 'O' | null;

export function TicTacToeGame() {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  const calculateWinner = (squares: Player[]): Player | 'draw' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    // 모든 칸이 찼는지 확인 (무승부)
    if (squares.every(square => square !== null)) {
      return 'draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-full aspect-square border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl font-bold transition-all ${
          !value && !winner
            ? 'hover:bg-gray-100 cursor-pointer'
            : 'cursor-not-allowed'
        } ${value === 'X' ? 'text-blue-600' : 'text-red-600'}`}
      >
        {value === 'X' && <X className="w-16 h-16" />}
        {value === 'O' && <Circle className="w-16 h-16" />}
      </button>
    );
  };

  return (
    <div className="max-w-md mx-auto">
      {/* 게임 정보 */}
      <div className="mb-6 text-center">
        {winner ? (
          <div className="space-y-2">
            <p className="text-2xl font-bold">
              {winner === 'draw' ? (
                <span className="text-gray-600">무승부!</span>
              ) : (
                <>
                  <span className={winner === 'X' ? 'text-blue-600' : 'text-red-600'}>
                    {winner}
                  </span>
                  <span className="text-gray-700"> 승리!</span>
                </>
              )}
            </p>
            <button
              onClick={resetGame}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A651] text-white rounded-full hover:bg-[#008c44] transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              다시 시작
            </button>
          </div>
        ) : (
          <p className="text-xl font-semibold text-gray-700">
            현재 차례:{' '}
            <span className={isXNext ? 'text-blue-600' : 'text-red-600'}>
              {isXNext ? 'X' : 'O'}
            </span>
          </p>
        )}
      </div>

      {/* 게임 보드 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>

      {/* 리셋 버튼 */}
      {!winner && (
        <div className="text-center">
          <button
            onClick={resetGame}
            className="inline-flex items-center gap-2 px-6 py-2 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            게임 초기화
          </button>
        </div>
      )}

      {/* 게임 규칙 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-2">게임 규칙</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 두 명이 번갈아가며 X와 O를 놓습니다</li>
          <li>• 가로, 세로, 대각선으로 3개를 연속으로 놓으면 승리</li>
          <li>• 모든 칸이 차도 승자가 없으면 무승부</li>
        </ul>
      </div>
    </div>
  );
}
