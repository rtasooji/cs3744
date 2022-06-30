import {Component, useState} from "react";

class FinalExam extends Component{
    constructor(props) {
        super(props);
        this.state = {count: 0}
        this.handleClick = this.handleClick.bind(this)
    }


    handleClick(){
        this.setState((prevState, props)=>{
            return {count: prevState.count + 1}
        })
    }

    render() {
        return(
            <div>
                <button onClick={this.handleClick}>Counter</button>
                <p>{this.state.count}</p>
            </div>
        )
    }
}


function FinalExampleFunc(){
    let [count, setCount] = useState(0)

    function handleClick(){
        setCount(count + 1)
    }

    return(
        <div>
            <button onClick={handleClick}>Counter</button>
            <p>{count}</p>
        </div>
    )
}

export  {FinalExam as default, FinalExampleFunc}