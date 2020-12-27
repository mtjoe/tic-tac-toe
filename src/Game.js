import React, { useEffect, useState } from "react";
import Board from "./Board";

const INITIAL_BOARD = Array(9).fill(null);
const INITIAL_PLAYER = 'X';
const INITIAL_HISTORY = [
    {
        board: INITIAL_BOARD,
        player: INITIAL_PLAYER,
    }
];

const useTicTacToe = () => {
    const [history, setHistory] = useState(INITIAL_HISTORY);
    const [winner, setWinner] = useState(undefined);
    const { board, player } = history[history.length - 1];
    const nextPlayer = player === 'X' ? 'O' : 'X';

    const checkWinner = () => {
        const { board } = history[history.length - 1];
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
        const { board } = history[history.length - 1];

        if (winner || board[i] !== null) {
            return;
        }

        setHistory((prevHistory) => {
            const { board: prevBoard, player: prevPlayer } = prevHistory[prevHistory.length - 1]
            const player = prevPlayer === 'X' ? 'O' : 'X'
            const board = {
                ...prevBoard,
                [i]: player
            };

            return [...prevHistory, { board, player }]
        })
    };

    const revertTo = (index) => {
        if (history.length !== index + 1) {
            setHistory((prevHistory) => prevHistory.slice(0, index + 1));
        }
    };

    useEffect(() => {
        checkWinner();
    }, [history, checkWinner])

    return [history, board, nextPlayer, winner, revertTo, setSquare];
}


const Game = () => {
    const [history, board, nextPlayer, winner, revertTo, setSquare] = useTicTacToe();

    return (
        <div className="game">
            <div className="game-board">
                <Board board={board} setSquare={setSquare} />
            </div>
            <div className="game-info">
                <div className="status">
                    {
                        winner ? `Winner: ${winner}` : `Next player: ${nextPlayer}`
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