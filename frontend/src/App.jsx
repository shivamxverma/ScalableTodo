import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./page/dashboard/landing-page";
import Signup from "./page/(auth)/signup/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}


