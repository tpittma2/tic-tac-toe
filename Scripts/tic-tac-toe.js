const Player = (name, symbol) => {

    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol}
}

const gameboard = (() => {
    const boardArray = 
    [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const getSymbolAt = (rowIdx, colIdx) => {
        return boardArray[rowIdx, colIdx];
    }

    const markSpot = (symbol, rowIdx, colIdx) => {
        boardArray[rowIdx][colIdx] = symbol;
    }

    return {
        getSymbolAt,
        markSpot,
    }
})();

const gameController = ((player1, player2, gameboard)=> {

})();
