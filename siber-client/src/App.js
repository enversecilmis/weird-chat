import { Route, Routes } from "react-router-dom";
import Bug from "./pages/Bug";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/bug" element={<Bug/>}/>
    </Routes>
  );
}

export default App;
