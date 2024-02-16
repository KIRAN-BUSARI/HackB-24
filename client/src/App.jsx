import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Signin } from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Index from "./pages/OnlineAppointment/Index";
import Layout from "./Layout";
import Room from "./pages/OnlineAppointment/Room";
import Card from "./pages/Community/Card";
import AdminDashboard from "./pages/Community/AdminDashboard";
import { CardContainer } from "./pages/Community/CardContainer";
import AddCommunity from "./pages/AddCommunity";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="" element={<Home />} />
        {/* <Route path="/community" element={<Card />} /> */}
        {/* <Route path="/communities" element={<CardContainer />} /> */}
        {/* <Route path="/addCommunity" element={<AddCommunity />} /> */}
        <Route path="/signup" element={<Signup />} />
        < Route path="/signin" element={<Signin />} />
        {/* <Route path="/online-consultation" element={<Index />} /> */}
        {/* <Route path="/room/:roomId" element={<Room />} /> */}
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Route >
    </Routes>
  )
}

export default App