import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./HomePage/HomePage.tsx";
import BlogCreatePage from "./BlogCreatePage/BlogCreatePage.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="create" element={<BlogCreatePage/>}/>



        </Routes>
    )
}

export default App
