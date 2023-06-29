import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Scenes from "./pages/scenes/Scenes";
import Wrapper from "./components/wrapper/Wrapper";
import 'react-image-crop/src/ReactCrop.scss'
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles/styles.scss'
import StartPage from "./pages/start/StartPage";
import EditWrapper from "./components/editWrapper/EditWrapper";
import Edit from "./pages/edit/Edit";
import ImgCropper from "./pages/imgCropper/ImgCropper";

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
              <Route path="/image_cropper" element={<ImgCropper/>} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
