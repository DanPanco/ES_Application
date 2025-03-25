import './App.css';
import {BrowserRouter, Link, Route, Router, Routes} from "react-router-dom";
import {Home} from "./components/Home";
import {About} from "./components/About";
import {Contact} from "./components/Contact";
import {Button} from "antd";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Button type="primary">Click Me</Button>

                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
