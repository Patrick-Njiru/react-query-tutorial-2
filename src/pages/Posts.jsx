import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

// Fake API for tests
const POSTSAPI = "https://jsonplaceholder.typicode.com/posts"

const Posts = () => {
	const queryClient = useQueryClient()

	const { data, isLoading, isError } = useQuery({
		queryKey: ["posts"],
		queryFn: () => fetch(POSTSAPI).then((res) => res.json()),

		// staleTime: 4000,
		// Time in milliseconds that it will wait until data is refectched.
		// The query must become stale for this to be activated.
		// Actions that can make a query stale include:
		// 1. When a new instance of a query is mounted
		// 2. When the window is refocused - e.g switching tabs
		// 3. When the network is reconnected
		// 4. The query is optionally configured to have a refetch interval
		

		refetchInterval: 4000,
		// Time interval in milliseconds for the data will be refectched.
		// The above will refetch the data every 4 seconds
		// This is helpful for changing data
	})

	const { mutate, isPending } = useMutation({
		mutationFn: (newPost) => {
			// Add new post
			return fetch(POSTSAPI, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newPost),
			}).then((res) => res.json())
		},
		onSuccess: (newPost) => {
			// Update the cache after adding a new post
			// queryClient.invalidateQueries({ queryKey: ["posts"] })
			// The above method won't work because of the fake API which doesn't allow adding new posts to it

			// Manually adding the new post
			queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost])
		},
		// NOTE: NEVER use retry method in useMutation to avoid creating the same post several times
	})

	return (
		<div>
			<h1>My Posts</h1>
			<button
				disabled={isPending}
				onClick={() =>
					mutate({
						userId: 1,
						id: Math.random() * 100 + "new",
						title: "New Post",
						body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur at id dignissimos autem culpa harum magni ut ullam quam illum.",
					})
				}
			>
				{isPending ? "Adding..." : "Add Post"}
			</button>
			{isLoading ? (
				<h1>Loading ...</h1>
			) : isError ? (
				<h1>There was an error!</h1>
			) : (
				<ol style={{ listStyleType: "none" }}>
					{data?.map(({ id, title, body }, index) => (
						<li key={id}>
							<div style={{ display: "flex", placeItems: "center", gap: 15 }}>
								<h3>{index + 1}</h3>
								<h4>{title}</h4>
							</div>
							<p>{body}</p>
						</li>
					))}
				</ol>
			)}
		</div>
	)
}

export default Posts
