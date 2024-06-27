import React, { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "../BlogCard/Blog.ts";
import BlogCard from "../BlogCard/BlogCard.tsx";
import Header from "../Header/Header.tsx"; // Annahme: Header-Komponente wurde bereits erstellt

import CreateBlog from "../BlogCreate/BlogCreate.tsx"; // Annahme: Pfad zur CreateBlog-Komponente

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
        // Hier könntest du zur CreateBlog-Seite navigieren oder die CreateBlog-Komponente anzeigen lassen
        console.log("Navigating to create blog page...");
    }

    function handleBlogSaved(): void {
        fetchBlogs(); // Nach dem Speichern eines Blogs die Liste aktualisieren
    }

    return (
        <div className="homepage">
            <Header onCreateBlog={handleCreateBlog} />
            <CreateBlog onBlogSaved={handleBlogSaved} />
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
