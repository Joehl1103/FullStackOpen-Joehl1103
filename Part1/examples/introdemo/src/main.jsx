import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'

import App from './App'

// Renders the App component into the div element which is called 'root' in the html file
ReactDOM.createRoot(document.getElementById('root')).render(
<StrictMode>
<App/>
</StrictMode>
)