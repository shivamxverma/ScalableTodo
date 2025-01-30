import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./page/dashboard/landing-page";
import Signup from "./page/(auth)/signup/page";
import Signin from "./page/(auth)/signin/page";
import './App.css';
import PrivateRoute from "./sessionProvider";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
              <PrivateRoute>
                <LandingPage/>
              </PrivateRoute>
            }
        />
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}


