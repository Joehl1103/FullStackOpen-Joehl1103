import ReactDOM from "react-dom/client";
import { NotificationContextProvider } from "./contexts/notificationContext"
import { LoggedinUserContextProvider } from "./contexts/loggedinUserContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogContextProvider } from "./contexts/blogContext";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import { BlogInfoContextProvider } from "./contexts/blogInfoContext.jsx";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <BlogContextProvider>
        <BlogInfoContextProvider>
          <LoggedinUserContextProvider>
            <NotificationContextProvider>
              <App />
            </NotificationContextProvider>
          </LoggedinUserContextProvider>
        </BlogInfoContextProvider>
      </BlogContextProvider>
    </QueryClientProvider>
  </Router>
);
