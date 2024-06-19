import {Blog} from "./Blog.ts";
import BlogCard from "./BlogCard.tsx";


function App() {

    const blogs: Blog [] = [
        {
            "id": "abc123",
            "title": "Test1",
            "description": "Kochen"


        },

        {
            "id": "abc124",
            "title": "Test2",
            "description": "Putzen"

        }


    ]


    return (
        <>
            <h1>BLOGs</h1>

            {
                blogs.map(blog => <BlogCard blog={blog} key={blog.id}/>)
            }


        </>


    )
}

export default App
