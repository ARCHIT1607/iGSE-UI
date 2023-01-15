
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserMeterReading from './pages/UserMeterReading';
import TopUp from './pages/TopUp';
import UserReading from './pages/UserReading';
import MeterPrice from './pages/MeterPrice';
import MeterReadings from './pages/MeterReadings';
import Analytics from './pages/Analytics';
import Test from './pages/Test';
import Statistics from './pages/Statistics';
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
          <Route exact path="/adminDashboard" element={<AdminDashboard />} >
          <Route exact path="meterPrice" element={<MeterPrice />} />
          <Route exact path="meterReadings" element={<MeterReadings />} />
          <Route exact path="analytics" element={<Analytics />} />
          </Route>
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/statistics" element={<Statistics />} />
        </Routes>
    </div>
  );
}

export default App;
