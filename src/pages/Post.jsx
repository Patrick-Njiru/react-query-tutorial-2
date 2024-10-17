import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

// Fake API for tests
const POSTSAPI = "https://jsonplaceholder.typicode.com/posts"

const Post = () => {
	const [postId, setPostId] = useState(undefined)
	// There can be Parallel and Dependent queries

	// Dependent Queries
	const {
		data: data1,
		isLoading: isLoading1,
		isError: isError1,
	} = useQuery({
		queryKey: ["posts"],
		queryFn: () => fetch(POSTSAPI).then((res) => res.json()),
		staleTime: 4000,
		// To avoid refetching when the user switches window tabs
		refetchOnWindowFocus: false,
	})

	const {
		data: post,
		isLoading: isLoading2,
		isError: isError2,
	} = useQuery({
		// unique key including the postId so that a new query is made whenever the data changes.
		queryKey: ["posts", postId],
		queryFn: () => fetch(POSTSAPI + `/` + postId).then((res) => res.json()),
		enabled: !!postId,
		// This query only runs if the enabled value is true, so it depends on the postId
		// use !! to convert it to a boolean
	})

	return (
		<div>
			<h1>Choose Number To Open Post Details</h1>
			{isLoading1 ? (
				<h1>Loading ...</h1>
			) : isError1 ? (
				<h1>There was an error!</h1>
			) : (
				<ol
					style={{
						listStyleType: "none",
						display: "flex",
						flexWrap: "wrap",
						gap: "1rem",
					}}
				>
					{data1
						?.filter((post) => post.id < 15)
						.map(({ id }) => (
							<li
								key={id}
								style={{ cursor: "pointer" }}
								onClick={() => setPostId(id)}
							>
								<h3>{id}</h3>
							</li>
						))}
				</ol>
			)}
			<div>
				{isLoading2 ? (
					<p>Loading Post...</p>
				) : isError2 ? (
					<p>Error Encountered While Fetching Post!</p>
				) : post ? (
					<p style={{ display: "flex", flexDirection: "column", gap: 5 }}>
						<span style={{ fontWeight: 600, textTransform: "uppercase" }}>
							{post.id}. {post.title}
						</span>
						<span></span>
						<span>{post.body}</span>
					</p>
				) : (
					"No post selected"
				)}
			</div>
		</div>
	)
}

export default Post
