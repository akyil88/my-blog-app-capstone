import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./HomePage/HomePage.tsx";
import BlogCreatePage from "./BlogCreatePage/BlogCreatePage.tsx";
import BlogDetail from "./BlogDetailPage/BlogDetail.tsx";
import EditPost from "./BlogEditPage/BlogEdit.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="create" element={<BlogCreatePage/>}/>
            <Route path="/blog/:id" element={<BlogDetail/>}/>
            <Route path="/blog/:id/edit" element={<EditPost />} />



        </Routes>
    );
}

export default App
