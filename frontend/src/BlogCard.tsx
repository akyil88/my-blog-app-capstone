import {Blog} from "./Blog.ts";
import axios from "axios";

type Props = {
    blog: Blog,
    onSave?: () => void
    onBlogItemChange: () => void
};

export default function BlogCard(props: Readonly<Props>) {

    function deleteThisItem() {
        axios.delete("/api/blog/" + props.blog.id)
            .then(props.onBlogItemChange)
    }

    return (
        <div className="blog-card">
            {props.blog.description}
            <button onClick={deleteThisItem}>🗑️</button>
        </div>
    );
}
