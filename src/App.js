import Login from "./components/Login";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import RenderGames from "./components/RenderGames";
import RenderGame from "./components/RenderGame";
import RankingList from "./components/RankingList";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="container">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/registration" element={<RegistrationForm />} />
            <Route exact path="/rendergames" element={<RenderGames />} />
            <Route exact path="/rendergame" element={<RenderGame />} />
            <Route exact path="/rankinglist" element={<RankingList />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
