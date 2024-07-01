import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header.tsx";
import "./BlogCreatePage.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
    onBlogSaved: () => void;
};

const CreateBlog: React.FC<Props> = ({ onBlogSaved }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2,3,4,5,6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link','image'],
            ['clean']
        ],
    }

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link','image'
    ]

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
            onBlogSaved();
            setTitle("");
            setDescription("");
            setImage(null);
            setImagePreview(null);
            navigate("/"); // Redirect to homepage
        } catch (error) {
            console.error("There was an error uploading the blog!", error);
        }
    };

    return (
        <section className="create-post">
            <Header />
            <div className="container">
                <h2>Create Post</h2>
                <form className="form create-post_form" onSubmit={saveBlog}>
                    <input
                        type="text"
                        placeholder="title"
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
                    <input type="file" onChange={changeImage} accept="image/png, image/jpeg"/>
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                    <button type="submit" className="btn primary">Create</button>
                </form>
            </div>
        </section>
    );
};

export default CreateBlog;
