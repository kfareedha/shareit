import "./App.css";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import Verify from "./pages/verify/verify";
import { Routes, Route, Navigate } from "react-router-dom";
function App() {
  const user = useSelector((state) => state.authReducer.authData);
  // const isLoggedIn = user?.token ? true : false;
  // const isRegistered = user ? true : false;
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              user?.token ? (
                <Navigate to="home" />
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Navigate to="auth" />
            )
          }
        />
        <Route
          path="/verify"
          element={user?.token ? <Navigate to="/home" /> : <Verify />}
        />
        <Route
          path="/home"
          element={
            user ? (
              user?.token ? (
                <Home />
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Navigate to="../auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            user ? (
              user?.token ? (
                <Navigate to="../home" />
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              user?.token ? (
                <Navigate to="../home" />
              ) : (
                <Navigate to="/verify" />
              )
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
