
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserMeterReading from './pages/UserMeterReading';
import TopUp from './pages/TopUp';
import UserReading from './pages/UserReading';
function App() {
  return (
    <div className="App">
       <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/userDashboard" element={<UserDashboard />} >
          <Route exact path="meterReading" element={<UserMeterReading />} />
          <Route exact path="userReading" element={<UserReading />} />
          <Route exact path="topUp" element={<TopUp />} />
          </Route>
          <Route exact path="/adminDashboard" element={<AdminDashboard />} />
        </Routes>
    </div>
  );
}

export default App;
