import Header from './Components/Header'
import MyComponent from "./Components/OurComponent";
import FrameHolder, {Frame}  from "./Components/ExploringClass";
import {NasaClass, NasaFunction} from "./Components/Nasa";


function App() {
    return(
        <div>
            <NasaFunction/>
            <NasaClass/>
            <MyComponent/>
            <FrameHolder size={250}/>
            <Frame/>

        </div>
    );
}
export default App