import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Index from "./pages/OnlineAppointment/Index";
import Layout from "./Layout";
import Room from "./pages/OnlineAppointment/Room";
import Card from "./pages/Community/Card";
import AdminDashboard from "./pages/Community/AdminDashboard";
import { CardContainer } from "./pages/Community/CardContainer";
import AddCommunity from "./pages/AddCommunity";
// import AuthRequired from "./components/Auth/AuthRequired";
// import AuthNotRequired from "./components/Auth/AuthNotRequired"
import Denied from "./pages/Denied";
import { User } from "./pages/User";
import { AuthRequired } from "./components/Auth/AuthRequired";
import Loader from "./Loader";
// import { AuthNotRequired } from "./components/Auth/AuthNotRequired";
function App() {

  return (
    <Routes>
      <Route path="loader" element={<Loader />} />
      <Route path="/" element={<Layout />} >
        <Route path="" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signout" element={<Signout />} />

        <Route path="/denied" element={<Denied />} />
        <Route element={<AuthRequired allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/user" element={<User />} />
        </Route>
        {/* <Route element={<AuthNotRequired />}> */}
        {/* </Route> */}
        <Route path="/community" element={<Card />} />
        <Route path="/communities" element={<CardContainer />} />
        <Route path="/addCommunity" element={<AddCommunity />} />
        <Route path="/online-consultation" element={<Index />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Route >
    </Routes>
  )
}

export default App