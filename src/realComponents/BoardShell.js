function genBoard(size, difficulty){
  let bombCount = 0;

  let minePercentage;
  switch(difficulty){
    case(1):
    default:
      minePercentage = 0.1;
      break;
    case(2):
      minePercentage = 0.15;
      break;
    case(3):
      minePercentage = 0.2;
      break;
    case(4):
      minePercentage = 0.3;
  }

  let board;

  do {
    let value;
    board = [...Array(size)].map(() => Array(size));
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (Math.random() < minePercentage) {
          value = "💣";
          bombCount++;
        } else {
          value = "0";
        }
        board[y][x] = {id: [y, x], value: value, visibility: false};
      }
    }
  } while(bombCount === 0);


  for(let row of board){
    for(let block of row){
      const y = block.id[0];
      const x = block.id[1];
      const surrounding = [
        [y-1, x-1],[y-1,x],[y-1,x+1],
        [y,x-1],[y,x+1],
        [y+1,x-1],[y+1,x],[y+1,x+1]
      ];
      if(block.value === "💣"){
        for(let id of surrounding){
          const ny = id[0];
          const nx = id[1];
          if( !((ny >= size) || (nx >= size) || (ny < 0) || (nx < 0))) {
            if(board[ny][nx].value !== "💣") {
              board[ny][nx].value = (parseInt(board[ny][nx].value) + 1).toString()
            }
          }
        }
      }
    }
  }
  return {board: board, bombCount: bombCount};
}

export default genBoard;