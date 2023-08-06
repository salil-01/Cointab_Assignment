import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navabar";
import { Homepage } from "./pages/Homepage";
import { Users } from "./pages/Users";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/data" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
