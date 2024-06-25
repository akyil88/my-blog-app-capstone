import { Blog } from "./Blog";
import axios from "axios";
import React, { FormEvent, useState } from "react";

type BlogCardProps = {
    blog: Blog,
    onSave?: () => void,
    onBlogItemChange: () => void
};

export default function BlogCard(props: Readonly<BlogCardProps>) {
    const [title, setTitle] = useState(props.blog.title);
    const [description, setDescription] = useState(props.blog.description);
    const [isEditing, setIsEditing] = useState(false);

    function deleteThisItem() {
        axios.delete("/api/blog/" + props.blog.id)
            .then(props.onBlogItemChange);
    }

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        setTitle(event.target.value);
    }

    function changeDescription(event: React.ChangeEvent<HTMLInputElement>): void {
        setDescription(event.target.value);
    }

    function saveBlog(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        axios.put(`/api/blog/${props.blog.id}`, {
            title: title,
            description: description,
        })
            .then(response => {
                console.log('Blog updated successfully', response.data);
                setIsEditing(false);
                if (props.onSave) {
                    props.onSave();
                }
            })
            .catch(error => {
                console.error('There was an error updating the blog!', error);
            });
    }

    return (
        <div className="blog-card">
            {isEditing ? (
                <form onSubmit={saveBlog}>
                    <input
                        type="text"
                        value={title}
                        onChange={changeTitle}
                        placeholder="Title"
                    />
                    <input
                        type="text"
                        value={description}
                        onChange={changeDescription}
                        placeholder="Description"
                    />
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </>
            )}
            <button className="delete-button" onClick={deleteThisItem}>☒</button>
            {!isEditing && (
                <button className="edit-button" onClick={() => setIsEditing(true)}>✏️</button>
            )}
        </div>
    );
}
