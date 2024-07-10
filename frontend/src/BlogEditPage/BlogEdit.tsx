import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header.tsx";
import './BlogEdit.css';  // Import the CSS file here

const EditPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch blog details
        axios.get(`/api/blog/${id}`)
            .then(response => {
                const data = response.data;
                setTitle(data.title);
                setDescription(data.description);
            })
            .catch(error => {
                console.error('Error fetching blog details:', error);
            });
    }, [id]);

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const changeDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
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
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.put(`/api/blog/${id}/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            navigate(`/blog/${id}`);
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <section className="edit-post">
            <h2>Edit Post</h2>
            <Header />
            <div className="container">
                <form className="form edit-post_form" onSubmit={saveBlog}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={changeTitle}
                        autoFocus
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={changeDescription}
                        rows={10}
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
