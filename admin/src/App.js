import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/hotelNew/NewHotel";
import NewRoom from "./pages/roomNew/NewRoom";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  // const navigate = useNavigate()
  const ProtectedRoute = ({children})=>{
    const {user} = useContext(AuthContext)
    console.log(user)
    if(!user){
      return <Navigate to="/login"/>
    }
    return children
  }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="users">

              <Route index element={
              <ProtectedRoute>
                <List columns = {userColumns}/>
              </ProtectedRoute>} />

              <Route path=":userId" element={
              <ProtectedRoute>
                <Single />
              </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>
              }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelColumns}/></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewHotel inputs={hotelInputs} title="Add New Product" /></ProtectedRoute>}
              />
            </Route>
            <Route path="room">
              <Route index element={<ProtectedRoute><List columns={roomColumns}/></ProtectedRoute>} />
              <Route path=":productId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewRoom inputs={roomInputs} title="Add New Product" /></ProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
