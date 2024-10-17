import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"

// gcTime - Garbage Collection time - Timeout in milliseconds for when to delete your query thus getting rid of unnecessary data
// Recommended - add it here instead of individual queries
// Recommended - gcTime should be more the staleTime
// Note: Create the query client outside your component to avoid it being created anew every time the component rerenders. Otherwise you may encounter bugs like failure to cache.
const queryClient = new QueryClient({
	defaultOptions: { queries: { staleTime: 60000, gcTime: 10 * 60000 } },
})

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Router>
				<App />
			</Router>
		</QueryClientProvider>
	</StrictMode>
)
