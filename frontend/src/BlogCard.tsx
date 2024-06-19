
import {Blog} from   "./Blog.ts"

type Props = {
    blog: Blog,
}

export default function BlogCard(props:Props) {
    return (
        <div className="blog-card">
            {props.blog.description}
        </div>
    );
}


