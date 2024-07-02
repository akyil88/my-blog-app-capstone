import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BlogDetail.css';
import { Blog } from "../BlogCard/Blog.ts";
import Header from "../Header/Header.tsx";

type BlogDetailParams = {
    id: string;
};

const BlogDetail: React.FC = () => {
    const { id } = useParams<BlogDetailParams>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        axios.get(`/api/blog/${id}`)
            .then(response => {
                setBlog(response.data);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]);

    function deleteBlog(): void {
        if (blog) {
            axios.delete(`/api/blog/${blog.id}`)
                .then(() => {
                    console.log('Blog deleted successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error deleting blog:', error);
                });
        }
    }

    function editBlog(): void {

        console.log('Edit blog:', blog);
    }

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-detail">
            <Header />
            <img src={`data:image/jpeg;base64,${blog.image}`} alt="Blog Image"/>
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
            <div className="button-container">
                <button className="delete-button" onClick={deleteBlog}>Delete</button>
                <Link to={`/blog/${blog.id}/edit`} className="edit-button">Edit</Link>
            </div>
        </div>
    );
};

export default BlogDetail;
