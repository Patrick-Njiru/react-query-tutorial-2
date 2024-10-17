import { useQuery } from "@tanstack/react-query"

// Fake API for tests
const TODOSAPI = "https://jsonplaceholder.typicode.com/todos"

const Todos = () => {
	const { data, error, isLoading } = useQuery({
		queryKey: ["todos"],
		// RECOMMENDED: Create your query and mutation functions outside the query to have a clean slate
		queryFn: () => fetch(TODOSAPI).then((res) => res.json()),
		// Retry 3 times if the request fails
		retry: 3,
	})

	return (
		<div>
			<h1>My ToDo List</h1>
			{isLoading ? (
				<h1>Loading ...</h1>
			) : error ? (
				<h1>There was an error!</h1>
			) : (
				<ol style={{ listStyleType: "none" }}>
					{data?.map(({ id, title, complete }) => (
						<li key={id} style={{ display: "flex", placeItems: "center", gap: 15 }}>
							<h3>{id}</h3>
							<h4>{title}</h4>
							<input type='checkbox' name='completed' id='' checked={complete} />
						</li>
					))}
				</ol>
			)}
		</div>
	)
}

export default Todos
