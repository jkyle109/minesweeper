import React from "react"
import BoardRow from "./BoardRow"


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const board = this.props.boardData.map(row => (
      <BoardRow
        key={row[0].id[0]}
        rowData={row}
        revealBlock={this.revealBlock}
        {...this.state}
        {...this.props}
      />
    ));
    return (
      <div className={"board"} style={{display: this.props.showBoard ? "block" : "none"}}>
        {board}
      </div>
    )
  }
}

export default Board