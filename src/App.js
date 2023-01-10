import Login from "./components/Login";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";
import RenderGames from "./components/RenderGames";
import RenderGame from "./components/RenderGame";
import RankingList from "./components/RankingList";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";
import Container from "react-bootstrap/Container";

function App() {
  const [toasts, setToasts] = useState([]);
  const addToast = (newToast) => {
    console.log("New Toast", newToast);
    setToasts((toasts) => [...toasts, newToast]);
  };
  const removeToast = (id) =>
    setToasts((toasts) => toasts.filter((e) => e.id !== id));

  return (
    <div className="container relative">
      <div >
        <Container className="toast-container position-absolute p-5">
        <ToastContainer>
          {toasts.map(({ id, Component, message, type }, index) => (
            <div className="pt-2">
              <Component
                key={id}
                handleRemove={() => removeToast(id)}
                message={message}
                type={type}
              />
            </div>
          ))}
        </ToastContainer>
      </Container>
        </div>
        <BrowserRouter>
          <Routes>
          <Route exact path="/" element={<Login addToast={addToast} removeToast={removeToast} />} />
            <Route exact path="/registration" element={<RegistrationForm addToast={addToast} removeToast={removeToast}/>} />
            <Route exact path="/rendergames" element={<RenderGames />} />
            <Route exact path="/rendergame" element={<RenderGame addToast={addToast} removeToast={removeToast}/>} />
            <Route exact path="/rankinglist" element={<RankingList />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
