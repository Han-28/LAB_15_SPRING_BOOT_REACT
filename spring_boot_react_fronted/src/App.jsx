import { BrowserRouter, Route, Routes } from "react-router-dom";
import FormEmpleado from "./components/FormEmpleado";
import Header from "./components/Header";
import ListEmpleado from "./components/ListEmpleado";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ListEmpleado />} />
          <Route path="/add" element={<FormEmpleado />} />
          <Route path="/edit/:id" element={<FormEmpleado />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
