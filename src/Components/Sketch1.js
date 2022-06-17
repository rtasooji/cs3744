/*eslint no-undef: 0*/
import React, {Component} from "react";
import p5 from 'p5'
import {Slider} from "@mui/material";

class MyDot{
    constructor(speed, offset, width, height, sketch) {
        this.speed = speed
        this.offset = offset
        this.loc = 0
        this.width = width
        this.height = height
        this.dir = 1
        this.p = sketch
    }
    render(value){

        this.loc += this.speed * this.dir * this.p.map(value, 1, 10, 0, 1)
        this.p.ellipse(this.loc, this.offset, this.width, this.height)
        if (this.loc > this.p.width || this.loc < 0){
            this.dir *= -1
        }
    }
}



class P5Comp extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.state = {speed: 5}
    }

    Sketch = (p)=>{
        let myDots = []
        p.setup = ()=> {
            p.createCanvas(500, 500)
            p.ellipseMode(p.RADIUS)
            for (let i = 1; i <= p.height / 5; i += 1) {
                let myDot = new MyDot(this.state.speed?p.sin(i) * this.state.speed:p.sin(i) * 5, 10 * i, 5, 5, p)
                myDots.push(myDot)
            }
        }
        p.draw = ()=>{
            p.background(100)
            myDots.map((dot, idx)=>{

                dot.render(this.state.speed)
            })

        }
    }
    componentDidMount() {
        new p5(this.Sketch, this.myRef.current)
    }

    handleSliderChange = (event)=>{
        this.setState({speed: event.target.value})
    }


    render() {
        return (
            <>
                <div ref={this.myRef}>

                </div>
                <Slider size={"small"} defaultValue={5}
                        min={1} max={10}
                        onChange={this.handleSliderChange}/>
            </>

        );
    }
}


export default function P5Sketch(){
    return(
        <div>
        <P5Comp/>
        </div>
    )
}