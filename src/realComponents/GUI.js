import React from "react"
import Clock from "./Clock"

class GUI extends React.Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }


  render() {
    return (
      <div className="clock">
        <Clock
          {...this.props}
        />
      </div>
    )
  }
}

export default GUI