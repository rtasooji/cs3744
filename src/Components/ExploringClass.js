import React, {Component} from "react";



class FrameHolderClass extends Component {
    constructor(props) {
        super(props);
        this.state = {size: 150}
    }

    changeSize = ()=>{
        this.setState((state, prop) =>{
            console.log(state.size)
            return {size: state.size === 150 ? 250 : 150}
        })
    }

    HandleOnClick = () => {
        this.changeSize()
    }

    render() {
        const description = "description"
        return(
            <div style={FrameStyle}>
                <button onClick={this.HandleOnClick}>Switch size!</button>
                <div>
                    <img src={`https://via.placeholder.com/${this.state.size.toString()}`} alt={'placeholder'}/>
                </div>

                <section>
                    <p>{description}</p>
                </section>
        </div>)
    }
}

const FrameStyle = {
    display: 'flex',
    width: "25%",
    flexFlow: 'column wrap',
    alignItems: "center"
}

function FrameHolder(props){
    return(
        <div style={FrameStyle}>
            <button>Click me!</button>
            <div>
                <img src={`https://via.placeholder.com/${props.size.toString()}`} alt={'placeholder'}/>
            </div>
            <section>
                <p>description</p>
            </section>
        </div>
    )
}

export {FrameHolder as default, FrameHolderClass as Frame}