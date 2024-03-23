import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/register";
import Main from "./components/main";

function App() {
  const user = localStorage.getItem("token");

  return (
    <>
      <Routes>
        {user && <Route path="/" exact element={<Main />} />}
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
