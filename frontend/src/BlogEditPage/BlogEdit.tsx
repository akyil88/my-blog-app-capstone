import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header.tsx";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Blog = {
    id: string;
    title: string;
    description: string;
    image: string; // Assuming image is stored as a base64 string
};

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch blog details
        axios.get(`/api/blog/${id}`)
            .then(response => {
                setBlog(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const changeDescription = (value: string) => {
        setDescription(value);
    };

    const changeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const saveBlog = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("id", blog?.id || "");
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.put(`/api/blog/${blog?.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            navigate(`/blog/${blog?.id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <section className="edit-post">
            <Header />
            <div className="container">
                <h2>Edit Post</h2>
                <form className="form edit-post_form" onSubmit={saveBlog}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                    />
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={description}
                        onChange={changeDescription}
                    />
                    <input type="file" onChange={changeImage} accept="image/png, image/jpeg" />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                    <button type="submit" className="btn primary">Update</button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
