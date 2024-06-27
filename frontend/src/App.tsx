import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./HomePage/HomePage.tsx";

function App() {


    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
        </Routes>
    )
}

export default App
