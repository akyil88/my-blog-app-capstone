import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.tsx";
import "./BlogCreatePage.css";

const CreateBlog: React.FC = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const changeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
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
            const response = await axios.post("/api/blog/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            setTitle("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            navigate("/");
        } catch (error) {
            console.error("There was an error uploading the blog!", error);
        }
    };

    return (
        <section className="create-post">
            <h2>Create Post</h2>
            <Header/>
            <div className="container">

                <form className="form create-post_form" onSubmit={saveBlog}>
                    <input
                        type="text"
                        name="title"
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
                    <input type="file" onChange={changeImage} accept="image/png, image/jpeg"/>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview"/>
                        </div>
                    )}
                    <button type="submit" className="btn primary">Create</button>
                </form>
            </div>
        </section>
    );
};

export default CreateBlog;
