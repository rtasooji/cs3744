import React, {Component, useState} from "react";

function MyExample(props){
    /**
     * Example of function Component
     */
    return(
        <div>
            <h1>{props.date}</h1>
            <p>{props.id}</p>
        </div>
    )
}

class MyClassExample extends Component{
    /**
     *
     * @param props: Properties that we pass to our class component
     */
    constructor(props) {
        super(props)
        this.state = {number: 1, time: new Date()}  // We defined two states
        this.timerId = null
        // this.getTime = this.getTime.bind(this) // We need to bind the method to our constructed object so the method
                                                  // knows where get the values, another way to do so is to define the
                                                  // method as an arrow method
    }

    getTime = () => {
        /**
         * This approach binds the method
         * https://reactjs.org/docs/faq-functions.html
         */
        this.setState((state, props) => {
            if (this.props.id === "1"){
                return {number: state.number + 1}
            }
            else{
                return {number: state.number + state.number}
            }
        })
    }
    componentDidMount() {
        /**
         * Method that will be called after calling render()
         * @type {number}
         */
        this.timerId = setInterval(() =>{
            this.setState({time: new Date()})
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * Will be called after properties got changed
         * Most of the time you need to call your methods in both of componentDidMount and componentDidUpdate
         * when you want Ajax updates
         * In our case because setInterval is already being executed and the handler is provided
         * We shouldn't call another interval here and it is wrong!
         * If this approach is confusing use setEffect Hook
         * https://reactjs.org/docs/hooks-effect.html
         */

    }

    componentWillUnmount() {
        /**
         * Method will be called when the component removed from DOM
         */
        clearInterval(this.timerId)
    }

    render() {
        /**
         * Method that renders the component
         * This only be called once at the start
         * and later, when there are changes between the old state and the new state
         */
        return (
            <div>
                <h1>{this.props.date}</h1>
                <p>{this.props.id}</p>
                <button onClick={this.getTime}>{this.state.number}</button>
                <p>{this.state.time.toLocaleTimeString()}</p>
            </div>
        )
    }

}

function Counter(){
    /**
     * This function Component uses Hooks to update state
     */
    const [count, setCount] = useState(10)

    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

    return (
        <>
            <h3>Using Hooks</h3>
            <button onClick={() => setAge(age+1)}>{age}</button>
        </>
    )
}



function MyComponent() {
    /**
     * Our Component that we will pass to be rendered in DOM and get synced with it.
     * @type {{isLoggedIn: boolean, lastOnline: string, _id: string}}
     */
    const myObject = {
        _id: "0",
        isLoggedIn: false,
        lastOnline: "today"
    }

    const date = new Date()

  return (
      <>
          <MyExample date={date.toLocaleTimeString()} id={myObject._id} />
          <MyClassExample date={date.toLocaleTimeString()} id={myObject._id}/>
          <Counter/>
      </>

  );
}

export default MyComponent;  // Exporting our component
