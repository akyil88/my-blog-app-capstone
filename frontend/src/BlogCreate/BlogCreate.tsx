import React, { useState } from "react";
import axios from "axios";
import { Blog } from '../BlogCard/Blog.ts';

type Props = {
    onBlogSaved: () => void;
};

const CreateBlog: React.FC<Props> = ({ onBlogSaved }) => {
    const [text, setText] = useState("");

    function changeText(event: React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    function saveBlog(): void {
        setText("");
        axios
            .post("/api/blog", {
                description: text,
                title: text,
            } as Blog)
            .then(() => {
                onBlogSaved(); // Nach dem Speichern Blogs neu laden
            });
    }

    return (
        <div className="input-container">
            <input type="text" value={text} onChange={changeText} />
            <button onClick={saveBlog}>Add Blog</button>
        </div>
    );
};

export default CreateBlog;
