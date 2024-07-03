import React from "react";
import './BlogCard.css';
import { Blog } from "./Blog.ts";
import { Link } from "react-router-dom";

type BlogCardProps = {
    blog: Blog,
    onBlogItemChange: () => void;
};

const BlogCard: React.FC<BlogCardProps> = (props) => {
    return (
        <div className="blog-card">
            {props.blog.image && (
                <div className="image-preview">
                    <img src={`data:image/jpeg;base64,${props.blog.image}`} alt="Blog Image"/>


                    <Link to={`/blog/${props.blog.id}`}>
                    <h3 className="blog-title">{props.blog.title}</h3></Link>
                    <p className="blog-description">{props.blog.description}</p>

                </div>
            )}

        </div>
    );
};

export default BlogCard;
