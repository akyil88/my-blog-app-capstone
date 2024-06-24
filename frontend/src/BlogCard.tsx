import {Blog} from "./Blog";
import axios from "axios";
import React, {useState} from "react";

type BlogCardProps = {
    blog: Blog,
    onSave?: () => void,
    onBlogItemChange: () => void
};

export default function BlogCard(props: Readonly<BlogCardProps>) {
    const [description, setDescription] = useState(props.blog.description);
    const [isEditing, setIsEditing] = useState(false);

    function deleteThisItem() {
        axios.delete("/api/blog/" + props.blog.id)
            .then(props.onBlogItemChange)
            .catch(error => {
                console.error('There was an error deleting the blog!', error);
            });
    }

    function changeText(event: React.ChangeEvent<HTMLInputElement>): void {
        setDescription(event.target.value);
    }

    function saveDescription(): void {
        axios.put(`/api/blog/${props.blog.id}`, {
            ...props.blog,
            description: description
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
                <input value={description} onChange={changeText}/>
            ) : (
                <span>{description}</span>
            )}
            <button onClick={deleteThisItem}>☒</button>
            {isEditing ? (
                <button onClick={saveDescription}>☑︎</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>✏️</button>
            )}
        </div>
    );
}
