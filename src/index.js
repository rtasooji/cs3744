import CreateRoot from 'react-dom/client'
import App from './App'


const domRoot = document.getElementById('root')

const root = CreateRoot.createRoot(domRoot)
root.render(
    <App/>
)