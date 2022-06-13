import CreateRoot from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import * as ReactDOM from 'react-dom'
import Page from './Components/Page'
import {NasaClass} from "./Components/Nasa"
import MyMain from "./Components/Main";


const domRoot = document.getElementById('root')
// ReactDOM.render(<App/>, domRoot)

const root = CreateRoot.createRoot(domRoot)
root.render(
    <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<Page />}>
                <Route index element={<MyMain/>}/>
                <Route path={"/projects"} element={<NasaClass />}/>
            </Route>

        </Routes>
    </BrowserRouter>
)
