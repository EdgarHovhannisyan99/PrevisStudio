import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Scenes from "./pages/scenes/Scenes";
import Wrapper from "./components/wrapper/Wrapper";
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.scss'
import StartPage from "./pages/start/StartPage";
import EditWrapper from "./components/editWrapper/EditWrapper";
import Edit from "./pages/edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/scenes" />} />
          <Route element={<Wrapper/>}>
          <Route path="/scenes" element={<Scenes/>} />
          <Route path="/start" element={<StartPage/>} />
          </Route>
          <Route element={<EditWrapper/>}>
              <Route path="/scenes/:id" element={<Edit/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
