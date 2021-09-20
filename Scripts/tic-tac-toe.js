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

    // const winningMoves = 
    // [
    //     [[0,0], [0,1], [0,2]],
    // ]

    const resetBoard = ()=> {
        for(let row=0; row<boardArray.length;row++) {
            for(let col=0; col < boardArray.length;col++) {
                boardArray[row][col] = '';
            }
        }
    }

    const isEmpty = (rowIdx, colIdx) => { 
        let valueAt = boardArray[rowIdx][colIdx];
        return valueAt === ''
    }

    const getSymbolAt = (rowIdx, colIdx) => { 
       let symbolAt = boardArray[rowIdx][colIdx]; 
       return symbolAt;
    }

    const markSpot = (rowIdx, colIdx, symbol) => {
        boardArray[rowIdx][colIdx] = symbol;
    }

    const getWinner = () => {
        for (let idx = 0; idx < boardArray.length; idx++) 
        {
            let symbol1 = getSymbolAt(idx, 0);
            let symbol2 = getSymbolAt(idx, 1);
            let symbol3 = getSymbolAt(idx,2);
            if(!isEmpty(idx,0) && symbol1 === symbol2  && symbol1 === symbol3)
                return symbol1;
            
            symbol1 = getSymbolAt(0,idx);
            symbol2 = getSymbolAt(1, idx);
            symbol3 = getSymbolAt(2,idx);
            if(!isEmpty(0,idx) && symbol1 === symbol2 && symbol1 === symbol3)
                return symbol1;
            
        }
        if(!isEmpty(0,0) && getSymbolAt(0,0) === getSymbolAt(1,1) && getSymbolAt(0,0) === getSymbolAt(2,2))
            return getSymbolAt(0,0);
        
        if(!isEmpty(0,2) && getSymbolAt(0,2) === getSymbolAt(1,1) && getSymbolAt(0,2) === getSymbolAt(2,0))
            return getSymbolAt(0,2);
    }

    const isTie = () => {
        
        for (let rowIdx = 0; rowIdx < boardArray.length; rowIdx++) {
            for (let colIdx = 0; colIdx < boardArray.length; colIdx++) {
                if(isEmpty(rowIdx,colIdx))
                    return false;
                
            }          
        }
        return !getWinner();
    }

    return {
        isEmpty,
        getSymbolAt,
        markSpot,
        getWinner,
        isTie,
        resetBoard,
    }
})();

const gameController = (()=> {
    let player1;
    let player2;
    let isPlayer1Turn = true;
    let isGameOver = false;
    const BUTTON_VISIBLE_CLASS = 'visible';

    const btnPlayAgain = document.querySelector('.play-again');
    const gameSquares = document.querySelectorAll('.row div');
    const txtCurrentPlayer = document.querySelector('.current-player');

    const setPlayer1 = (player) => {
        player1 = player;
    }

    const setPlayer2 = (player) => {
        player2 = player;
    }

    const startGame = () => {
        for (let i = 0; i < gameSquares.length; i++) {
            const element = gameSquares[i];
            
            element.addEventListener('click', playRound);      
        }

        btnPlayAgain.addEventListener('click', resetGame);
        resetGame();
    }

   resetGame = () => {
        gameboard.resetBoard();
        for (let i = 0; i < gameSquares.length; i++) {
            gameSquares[i].textContent = '';
                
        }
        isGameOver = false;
        isPlayer1Turn = true;
        btnPlayAgain.classList.remove(BUTTON_VISIBLE_CLASS);
        txtCurrentPlayer.textContent = `${getCurrentPlayer().getName()}'s Turn`;
    }

    

    getCurrentPlayer = () => {
        return isPlayer1Turn ? player1 : player2;
    }


    function playRound(e) {
        if(isGameOver)
        return;
        let row = e.target.dataset.row;
        let col = e.target.dataset.column;
        let currSymbol = isPlayer1Turn ? player1.getSymbol() : player2.getSymbol();
        if(gameboard.isEmpty(row,col))
        {
            gameboard.markSpot(row,col,currSymbol);
            isPlayer1Turn = !isPlayer1Turn;
            e.target.textContent = currSymbol;
            txtCurrentPlayer.textContent = `${getCurrentPlayer().getName()}'s Turn`;
        }
        let winner = gameboard.getWinner();
        if(winner || gameboard.isTie())
        {
            isGameOver = true;
            btnPlayAgain.classList.add(BUTTON_VISIBLE_CLASS);
            txtCurrentPlayer.textContent = (winner ? `${winner == player1.getSymbol() ? player1.getName() : player2.getName()} is the winner!` :`Tie Game!`);
        }
    
    }

    return {setPlayer1, setPlayer2, startGame}

})();

gameController.setPlayer1(Player('Player X', 'X'));
gameController.setPlayer2(Player('Player O', 'O'));
gameController.startGame();


