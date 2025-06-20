import Hero from "./screens/Hero";
import Form from "./screens/Form";
import Details from "./screens/Details";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <Hero />
            <Form />
          </div>
        }
      />
      <Route path="/details" element={<Details />} />
    </Routes>
  );
}

export default App;
