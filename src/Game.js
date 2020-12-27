import React, { useEffect, useState } from "react";
import Board from "./Board";

const useBoard = () => {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [board, setBoard] = useState(Array(9).fill(null));
    const [history, setHistory] = useState([]);
    const [winner, setWinner] = useState(undefined);

    const checkWinner = () => {
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

        lines.forEach(([i, j, k]) => {
            if (board[i] === board[j] && board[j] === board[k]) {
                setWinner(board[i]);
            }
        });
    };

    const setSquare = (i) => () => {
        setBoard(oldBoard => ({
            ...oldBoard,
            [i]: currentPlayer
        }));

        setCurrentPlayer(p => p === 'X' ? 'O' : 'X');
    };

    const revertTo = (index) => {
        if (history.length !== index + 1) {
            setBoard(history[index].board)
            setCurrentPlayer(history[index].currentPlayer)

            setHistory((oldHistory) => oldHistory.slice(0, index));
        }
    };

    useEffect(() => {
        checkWinner();
        setHistory((oldHistory) => ([
            ...oldHistory,
            {
                board,
                currentPlayer,
            }
        ]))
    }, [board])

    return [board, currentPlayer, winner, history, revertTo, setSquare];
}


const Game = () => {
    const [board, currentPlayer, winner, history, revertTo, setSquare] = useBoard();

    return (
        <div className="game">
            <div className="game-board">
                <Board board={board} setSquare={setSquare} />
            </div>
            <div className="game-info">
                <div className="status">
                    {
                        winner ? `Winner: ${winner}` : `Next player: ${currentPlayer}`
                    }
                </div>
                <ol>
                    {
                        history.map((_, index) =>
                            <ul><button onClick={() => revertTo(index)}>
                                {
                                    index === 0 ?
                                        `Back to Start of Game` :
                                        `Back to Move #${index}`
                                }
                            </button></ul>
                        )
                    }
                </ol>
            </div>
        </div>
    );
}

export default Game;