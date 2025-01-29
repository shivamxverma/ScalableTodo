import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./page/dashboard/landing-page";
import Signup from "./page/(auth)/signup/page";
import Signin from "./page/(auth)/signin/page";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  );
}


