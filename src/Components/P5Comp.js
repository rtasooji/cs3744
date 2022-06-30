/*eslint no-undef: 0*/

import React, {Component} from "react";
import p5 from 'p5'

class P5Comp extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()  // createRef provides a way to include
                                        // any third-party DOM element into our React
    }

    // This is your sketch for P5, add your sketch correctly and make sure
    // your P5 sketch is correctly renders inside your app.
    Sketch = (p)=>{

        p.setup = ()=> {
        }
        p.draw = ()=>{
        }
    }
    componentDidMount() {
        // This is the time that we create a new P5 object and attach it to our dom reference
        new p5(this.Sketch, this.myRef.current)
    }
    render() {
        //We use this div as our reference for the element we want to add as a child
        return (
            <>
            <div ref={this.myRef}>
            </div>
            </>
        );
    }
}


export default P5Comp