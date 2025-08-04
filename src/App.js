import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import Login from "./components/pages/user/Login";
import Register from "./components/pages/user/Register";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={ <Home/> }/>
      <Route path="/Login" element={ <Login/> }/>
      <Route path="/Register" element={ <Register/> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
