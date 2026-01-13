import { Routes, Route } from "react-router-dom";


import Shoe from "./screens/Shoe.jsx";

function App() {
  return (
    <Routes>

      <Route path="shoe" element={<Shoe />} />
    </Routes>
  );
}

export default App;
