import { Blog } from "./Blog.ts";
import React from "react";

type Props = {
    blog: Blog;
    onSave: () => void; // Callback-Funktion, um gespeicherte Blogs zu aktualisieren
};

const BlogCard: React.FC<Props> = ({ blog }) => {
    return (
        <div className="blog-card">
            <h2>{blog.title}</h2>


        </div>
    );
};

export default BlogCard;
