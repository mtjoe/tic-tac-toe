import React from "react";

const Square = ({ value, setSquare }) => {
    return (
        <button className="square" onClick={() => setSquare()}>
            {value}
        </button>
    );
}

const Board = ({ board, setSquare }) => {

    const renderSquare = (i) => (
        <Square value={board[i]} setSquare={setSquare(i)} />
    );

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

export default Board