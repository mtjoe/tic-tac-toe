import React from "react";
import Square from "./Square";


const Board = () => {
    return (
        <div>
            <div className="status">Next player: X</div>
            <div className="board-row">
                <Square i={0} />
                <Square i={1} />
                <Square i={2} />
            </div>
            <div className="board-row">
                <Square i={3} />
                <Square i={4} />
                <Square i={5} />
            </div>
            <div className="board-row">
                <Square i={6} />
                <Square i={7} />
                <Square i={8} />
            </div>
        </div>
    );
}

export default Board