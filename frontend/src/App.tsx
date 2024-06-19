import {Blog} from "./Blog.ts";
import BlogCard from "./BlogCard.tsx";
import {useEffect, useState} from "react";
import  axios from "axios";


function App() {
    const [blogs, setBlogs] = useState<Blog[]>()

    useEffect((): void => {


            axios.get("/api/blog")
                .then(response => {
                    setBlogs(response.data)
                })
        }, []);


    if (!blogs) {
        return "Lade..."

    }


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
