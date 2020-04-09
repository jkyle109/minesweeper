import React from "react";

class Block extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      color: this.props.block.visibility ? this.props.block.value : "grey",
      cover: ""
    };
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.revealSurrounding = this.revealSurrounding.bind(this);
    this.colorChange = this.colorChange.bind(this);
    this.newColor = this.newColor.bind(this);
  };


  componentDidUpdate(prevProps, prevState, snapshot){
    // Handle Visual Updates
    if(this.props.block.value === "0" && this.props.block.visibility === true){
      this.revealSurrounding(this.props.block.id);
    }
    if(this.state.color !== this.newColor() && this.props.block.visibility === true){
      this.colorChange(this.newColor());
    }

    //End Game
    if(this.props.block.value === "💣"  && this.props.block.visibility === true){
      this.props.endGame(false);
    }

    if((this.props.bombCount === this.props.blocksLeft) && (!this.props.hasWon)){
      this.props.endGame(true);
      if(this.props.block.value === "💣" && this.state.cover !== "🚩"){
        this.setState({cover: "🚩"});
      }
    }
  };


  colorChange(color){
    this.setState({
      color: color
    });
  };


  newColor() {
    let color;
    switch(this.props.block.value){
      case "0":
        color = "#6495ED";
        break;
      case "1":
      case "2":
        color = "green";
        break;
      case "3":
      case "4":
        color = "orange";
        break;
      case "💣":
        color = "red";
        break;
      default:
        color = "orangered";
    }
    return color;
  };


  revealSurrounding(id){
    const y = id[0];
    const x = id[1];
    let block;
    const surrounding = [
      [y-1, x-1],[y-1,x],[y-1,x+1],
      [y,x-1],[y,x+1],
      [y+1,x-1],[y+1,x],[y+1,x+1]
    ];
    for(block of surrounding)
    {
      const ny = block[0];
      const nx = block[1];

      if( !((ny >= this.props.boardSize) || (nx >= this.props.boardSize) || (ny < 0) || (nx < 0))) {
        if(this.props.boardData[ny][nx].visibility === false){
          this.props.revealBlock(block);
          this.newColor();
        }
    }
    }
  }


  handleBoardClick(event) {
    event.preventDefault();
    if(!(this.props.hasWon || this.props.hasLost)) {
      if (event.button === 0 && !(this.state.cover === "🚩")) {
        this.props.revealBlock(this.props.block.id);
        this.props.timerHandler();
      } else if (event.button === 2) {
        if (this.props.block.visibility === false) {
          if (this.state.cover === "") {
            this.setState({cover: "🚩"});
          } else {
            this.setState({cover: ""});
          }
        }
      }
    }
  }

  render() {
    return(
        <button
          className={"block"} type={"button"}
          onClick={(event) => this.handleBoardClick(event)}
          onContextMenu={(event) => this.handleBoardClick(event)}
          style={{backgroundColor: this.state.color}}>
          {this.props.block.visibility ? this.props.block.value : this.state.cover}
        </button>
    )
  }
}

export default Block