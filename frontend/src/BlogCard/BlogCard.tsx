import React from "react";
import './BlogCard.css';
import { Blog } from "./Blog.ts";
import { Link } from "react-router-dom";

type BlogCardProps = {
    blog: Blog,
};

const BlogCard: React.FC<BlogCardProps> = (props) => {

    return (
        <div className="blog-card">
            {props.blog.image && (
                <div className="image-preview">
                    <img src={`data:image/jpeg;base64,${props.blog.image}`} alt="Blog Image" />
                </div>
            )}
            <Link to={`/blog/${props.blog.id}`}>
                <h3>{props.blog.title}</h3>
            </Link>
            <p>{props.blog.description}</p>
        </div>
    );
};

export default BlogCard;
