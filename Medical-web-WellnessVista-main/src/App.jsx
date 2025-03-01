
import { Users } from "./components/users";
import { Routes, Route } from 'react-router-dom';
import "./App.css"
import { Header } from "./components/Header";
import BookAppointment from "./components/BookAppointment";
import {AppointmentList} from "./components/Appointmentlist";
import Payment from "./components/Payment";
import { Chatmain } from "./components/Chatmain";




const App = () => {
  return (
    <div>
      

      <Routes>
        
        <Route path="/" element={<Header/>}></Route>
        <Route path="/admin" element={<Users/>} />
        <Route path="/BookAppointment" element={<BookAppointment/>}/>
        <Route path="/List" element={<AppointmentList/>}/>
        <Route path="/payment" element={<Payment/>}/>
        {/* Add more routes as needed */}
      </Routes>
      <Chatmain/>

    </div>
  );
};

export default App;
