import React from "react";
import Block from "./Block";
// row
class BoardRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){

    const blockRow = this.props.rowData.map(block => (
      <Block
        key={block.id}
        block={block}
        style={{lineHeight: "20px"}}
        {...this.props}
      />
    ));

    return(
      <div className={"boardRow"}>
        {blockRow}
      </div>
    )
  }
}

export default BoardRow