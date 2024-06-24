import React, { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "./Blog.ts";
import BlogCard from "./BlogCard.tsx";

type Props = {
    onBlogItemChange: () => void;
};

const App: React.FC<Props> = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    function fetchBlogs(): void {
        axios.get("/api/blog").then((response) => {
            setBlogs(response.data);
        });
    }

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
                fetchBlogs(); // Nach dem Speichern einen neuen Blog laden
            });
    }

    return (
        <div className="app">
            <h1>BLOGs</h1>

            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    onBlogItemChange={fetchBlogs}
                />
            ))}

            <input type="text" value={text} onChange={changeText} />
            <button onClick={saveBlog}>Add Blog</button>
        </div>
    );
};

export default App;
