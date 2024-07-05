import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./HomePage/HomePage.tsx";
import BlogCreatePage from "./BlogCreatePage/BlogCreatePage.tsx";
import BlogDetail from "./BlogDetailPage/BlogDetail.tsx";
import EditPost from "./BlogEditPage/BlogEdit.tsx";
import Register from "./RegisterPage/Register.tsx";
import Login from "./LoginPage/Login.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="create" element={<BlogCreatePage/>}/>
            <Route path="/blog/:id" element={<BlogDetail/>}/>
            <Route path="/blog/:id/edit" element={<EditPost />} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    );
}

export default App
