import CreateRoot from 'react-dom/client'
// import * as ReactDOM from 'react-dom'
import App from './App'


const domRoot = document.getElementById('root')
// ReactDOM.render(<App/>, domRoot)

const root = CreateRoot.createRoot(domRoot)
root.render(
    <App/>
)
