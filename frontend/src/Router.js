import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Styles/global.scss'

import LoginPage from "./Pages/LoginPage";
import Kalkulator from "./Pages/Kalkulator";

function App ()
{
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <LoginPage /> } />
          <Route path="/kalkulator" element={ <Kalkulator /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
