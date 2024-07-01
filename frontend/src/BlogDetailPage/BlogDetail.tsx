import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './BlogDetail.css';
import { Blog } from "../BlogCard/Blog.ts";
import Header from "../Header/Header.tsx"; // Stile für die Detailseite

type BlogDetailParams = {
    id: string;
};

const BlogDetail: React.FC = () => {
    const { id } = useParams<BlogDetailParams>(); // Hole die Blog ID aus den URL-Parametern
    const [blog, setBlog] = useState<Blog | null>(null); // Zustand für den Blogbeitrag

    useEffect(() => {
        // Lade den Blogbeitrag beim ersten Rendern der Komponente
        axios.get(`/api/blog/${id}`)
            .then(response => {
                setBlog(response.data); // Setze den geladenen Blogbeitrag in den Zustand
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]); // Abhängigkeit von der Blog ID

    function deleteBlog(): void {
        if (blog) {
            axios.delete(`/api/blog/${blog.id}`)
                .then(() => {
                    console.log('Blog deleted successfully');
                    // Hier kannst du eine Weiterleitung oder andere Aktionen nach dem Löschen einfügen
                })
                .catch(error => {
                    console.error('Error deleting blog:', error);
                });
        }
    }

    function editBlog(): void {
        // Hier kannst du zur Editierungsseite weiterleiten oder die Bearbeitung innerhalb dieser Komponente implementieren
        console.log('Edit blog:', blog);
    }

    if (!blog) {
        return <div>Loading...</div>; // Ladeanzeige, während der Blogbeitrag geladen wird
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
