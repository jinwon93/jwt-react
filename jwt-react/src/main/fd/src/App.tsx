import React, { useContext } from 'react';
import {Routes , Route , Navigate} from "react-router-dom";
import AuthContext from "./store/authContext";

import Layout from "./components/layout/Layout";
import AuthPage from "./pages/authPage";
import HomePage from "./pages/homePage";
import CreateAccountPage from "./pages/createAccountPage";
import ProfilePage from "./pages/profilePage";



function App() {

  const authCtx = useContext(AuthContext);



  return (
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/signUp" element={authCtx.isLoggedIn ? <Navigate to='/'/> : <CreateAccountPage />} />
          <Route path="/user/login/*"
                 element={authCtx.isLoggedIn ? <Navigate to='/' /> : <AuthPage /> } />
          <Route path="/user/profile" element={!authCtx.isLoggedIn ? <Navigate to='/'/> : <ProfilePage />} />
        </Routes>
      </Layout>
  );
}

export default App;
