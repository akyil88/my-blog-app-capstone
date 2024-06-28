import React, { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "../BlogCard/Blog.ts";
import BlogCard from "../BlogCard/BlogCard.tsx";
import Header from "../Header/Header.tsx";


const Homepage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    function fetchBlogs(): void {
        axios.get("/api/blog").then((response) => {
            setBlogs(response.data);
        });
    }

    function handleCreateBlog(): void {

        console.log("Navigating to create blog page...");
    }
// @ts-ignore
    function handleBlogSaved(): void {
        fetchBlogs();
    }

    return (
        <div className="homepage">
            <Header onCreateBlog={handleCreateBlog} />

            <div className="blog-list">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        blog={blog}
                        onBlogItemChange={fetchBlogs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Homepage;