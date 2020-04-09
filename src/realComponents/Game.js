import React from "react"
import Board from "./Board"
import GUI from "./GUI"

import genBoard from "./BoardShell"


const blank = genBoard(3,1).board;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStart: 0,
      timeEnd: null,
      hasTriggered: false, //Timer
      hasLost: false,
      hasWon: false,
      revealBombs: false,
      showBoard: false,

      boardData: blank,
      boardSize: 3,
      difficulty: 1,
      bombCount: 1,
      blocksLeft: 3 * 3,
    };
    this.timerHandler = this.timerHandler.bind(this);
    this.endGame = this.endGame.bind(this);
    this.revealBlock = this.revealBlock.bind(this);
    this.revealBombs = this.revealBombs.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }


  timerHandler() {
    if (!this.state.hasTriggered) {
      this.setState({timeStart: new Date().getTime(), hasTriggered: true})
    }
  };

  stopTimer(time) {
    if(this.state.hasWon) {
      //console.log(`Username: ${this.state.username}, Difficulty: ${this.state.difficulty}, Size: ${this.state.boardSize}, Time: ${time}`)
    }
  }

  endGame(gameWon) {
    if (gameWon && !this.state.hasWon) {
      this.setState({hasWon: true});
    }
    if (!gameWon && !this.state.hasLost) {
      this.revealBombs();
      this.setState({hasLost: true});
    }
  };
  
  revealBlock(id){
    let changeCount = 0;
    if(!this.state.boardData[id[0]][id[1]].visibility) {
      this.setState((oldState) => {
        const newBoard = oldState.boardData.map(row => {
          if (row[0].id[0] === id[0]) {
            return row.map(block => {
              if (block.id[0] === id[0] && block.id[1] === id[1]) {
                if(block.visibility === false){
                  block.visibility = true;
                  changeCount++;
                }
              }
              return block
            })
          }
          return row
        });
        return ({
          boardData: newBoard,
          blocksLeft: (oldState.blocksLeft-changeCount),
        })
      });
    }
  }

  revealBombs(){
    this.setState(oldState => {
      const newBoard = oldState.boardData.map(row => {
        return row.map(block => {
          if(block.value === "💣"){
            block.visibility = true;
          }
          return block
        })
      });
      return({
        boardData: newBoard
      })
    });
  }

  handleInput(event){
    const name = event.target.name;
    let value = event.target.value;
    if(name !== "username"){
      value = parseInt(value);
    }
    //console.log(event.target.name,event.target.value);

    this.setState({
      [name]: value,
    })
  };

  handleSubmit(event){
    event.preventDefault();
    const boardData = genBoard(this.state.boardSize, this.state.difficulty);
    this.setState({
      boardData: boardData.board,
      bombCount: boardData.bombCount,
      blocksLeft: this.state.boardSize*this.state.boardSize,
      showBoard: true,
    })
  }

  handleRestart(){
    window.location.reload();
  }

  render(){
    return(
      <div>
        <div style={{display: this.state.showBoard ? "block" : "none"}}>
          <GUI
            stopTimer={this.stopTimer}
            {...this.state}
          />
        </div>
        

        <form className="menu" onSubmit={this.handleSubmit} style={{display: this.state.showBoard ? "none" : "block"}}>
          <label>Difficulty:</label>
          <br/>
          <select className="custom-select" name={"difficulty"} onChange={this.handleInput}>
            <option value={1}>Easy</option>
            <option value={2}>Medium</option>
            <option value={3}>Hard</option>
            <option value={4}>Insane</option>
          </select>
          <br/>
          <br/>
          <label>Board Size:</label>
          <br/>
          <select className="custom-select" name={"boardSize"} onChange={this.handleInput}>
            <option value={3}>3x3</option>
            <option value={5}>5x5</option>
            <option value={10}>10x10</option>
          </select>
          <br/>
          <input className="button" type={"submit"} value={"Start!"}/>
        </form>


        <Board
          timerHandler={this.timerHandler}
          endGame={this.endGame}
          revealBlock={this.revealBlock}
          revealBombs={this.revealBombs}
          {...this.state}
        />
        
        <button
          className="button"
          type="button"
          onClick={() => this.handleRestart()}
          style={{display: this.state.hasLost || this.state.hasWon ? "block" : "none", position: "fixed", }}
        >Restart</button>

        <h1 className="comment" style={{display: this.state.hasLost || this.state.hasWon ? "block" : "none", position: "fixed", }}
        >YOU {this.state.hasWon ? "WON" : "LOST"}</h1>
      </div>


    )
  }
}

export default Game