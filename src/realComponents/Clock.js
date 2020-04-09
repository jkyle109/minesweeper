import React from "react"



class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      time: 0,
    };
    this.newTick=this.newTick.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.newTick(),1000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((this.props.hasLost || this.props.hasWon)){
      clearInterval(this.interval);
      if(this.props.timeEnd === null) {
        this.props.stopTimer(this.state.time)
      }
    }
  }


  componentWillUnmount() {
    clearInterval((this.interval));
  }

  newTick(){
    this.setState(() => {
      if(!(this.props.timeStart === 0)){
        return {
          time: (Math.floor((new Date().getTime() - this.props.timeStart) / 1000)+1)
        };
      }
    })
  }


  getTime(date){
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    return h+':'+m+':'+s;
  }



  render(){
    return(
      <h4 className="clock">
        Time: {this.state.time}
      </h4>
    )
  }
}

export default Clock;