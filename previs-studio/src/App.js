import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Scenes from "./pages/scenes/Scenes";
import Wrapper from "./components/wrapper/Wrapper";
import './assets/styles/styles.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/scenes" />} />
          <Route element={<Wrapper/>}>
          <Route path="/scenes" element={<Scenes/>} />
          </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
