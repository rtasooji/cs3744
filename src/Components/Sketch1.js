/*eslint no-undef: 0*/
import React, {Component} from "react";
import p5 from 'p5'
import {Slider} from "@mui/material";
// To make this class Component works you need to install material UI (https://mui.com/material-ui/getting-started/installation/) and P5 (https://www.npmjs.com/package/p5)

class MyDot{
    /**
     *
     * @param speed
     * @param offset
     * @param width
     * @param height
     * @param sketch: Sketch is a reference to our P5 object
     */
    constructor(speed, offset, width, height, sketch) {
        this.speed = speed
        this.offset = offset
        this.loc = 0
        this.width = width
        this.height = height
        this.dir = 1
        this.p = sketch  // This is a reference to our P5 object
    }
    render(value){
        /**
         * During each draw, we pass the value from the state to our object
         * @type {number}: Simple speed multiplier
         */
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
        this.myRef = React.createRef()  //createRef() provides a way to integrate third-party DOM elements into our React app.
                                        // Check https://reactjs.org/docs/refs-and-the-dom.html for more detail.
        this.state = {speed: 5}
    }

    // We define our sketch here
    // Our sketch is a function object that gets a reference to the P5 object
    // With this we can call all the function inside our sketch
    // We call this function object to our object P5
    Sketch = (p)=>{
        let myDots = []
        p.setup = ()=> {
            p.createCanvas(500, 500)
            p.ellipseMode(p.RADIUS)
            for (let i = 1; i <= p.height / 5; i += 1) {
                // Assigning sin pattern speed value to the points
                let myDot = new MyDot(this.state.speed?p.sin(i) * this.state.speed:p.sin(i) * 5, 10 * i, 5, 5, p)
                myDots.push(myDot)
            }
        }
        p.draw = ()=>{
            p.background(100)
            // For each point in our array of points
            // We map the state value to our render method.
            myDots.map((dot, idx)=>{

                dot.render(this.state.speed)
            })

        }
    }
    componentDidMount() {
        // After rendering the component class we have access to the element reference
        // Inside the DOM tree.
        // Looking at the constructor we can see the p5 object
        // gets sketch and HTMLElement
        new p5(this.Sketch, this.myRef.current)
    }

    handleSliderChange = (event)=>{
        // Here we change the state for onChange event caused by the slider
        // The slider is part of the React material UI component
        this.setState({speed: event.target.value})
    }


    render() {
        // The render method is being called first and then the componentDidmount
        // we be called.
        // In this method we set our HTMLElement reference.
        // The callback for onChange event is handleSliderChange function.
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