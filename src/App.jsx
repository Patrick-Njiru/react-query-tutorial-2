import { NavLink, Route, Routes } from "react-router-dom"
import Todos from "./pages/Todos"
import Posts from "./pages/Posts"
import Post from "./pages/Post"

const App = () => {
	//NOTE: React Query is not an alternative for axios or fetch
	// It can, however replace manage state management libraries  - zustand or redux - to handle the state of data being fetched

	return (
		<div>
			<nav
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 20,
					fontWeight: "bold",
					fontSize: 24,
				}}
			>
				<NavLink to=''>Todos</NavLink>
				<NavLink to='posts'>Posts</NavLink>
				<NavLink to='post'>Post</NavLink>
			</nav>
			<Routes>
				<Route index exact path='' element={<Todos />} />
				<Route path='posts' element={<Posts />} />
				<Route path='post' element={<Post />} />
			</Routes>
		</div>
	)
}

export default App
