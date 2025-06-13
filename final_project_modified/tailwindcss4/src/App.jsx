import './index.css';
import Header from "./components/Header";
import Fotter from './components/Fotter';
import Contactus from "./components/Contactus";
import Aboutus from "./components/Aboutus";
import Home from './pages/Home';

//import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//import { useGSAP } from '@gsap/react'
import Loginpage from './pages/Loginpage';

import Patient from './pages/Patient';
import Docterpage from './pages/Docterpage';
import Uploadpage from './pages/Uploadpage';
import Resourcepage from './pages/Resourcepage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Staff from './pages/Staffpage';
import Hospitaladmin from './pages/hospitalAdmin';
import ProtectedRoute from './components/ProtectedRoutes';
import { Navigate } from 'react-router-dom';
import Dashboard2 from './pages/Dashboard2';
import ModelPage from './pages/ModelPage';
 const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/contact" element={<Contactus />} />
        <Route path="/login" element={<Loginpage />} />

        {/* Protected Routes */}
        <Route 
          path="/civilian" 
          element={
            <ProtectedRoute allowedRoles={['Civilian']}>
              <Patient />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/doctor" 
          element={
            <ProtectedRoute allowedRoles={['Doctor/Medical Professional']}>
              <Docterpage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute allowedRoles={['Doctor/Medical Professional']}>
              <Uploadpage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resources" 
          element={
            <ProtectedRoute allowedRoles={['Hospital Admin']}>
              <Resourcepage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['Hospital Admin']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        
        <Route path="/hospital-admin" element={
          <ProtectedRoute allowedRoles={['Hospital Admin']}>
            <Hospitaladmin/>
          </ProtectedRoute>
        } />
        
        <Route path="/staff" element={
          <ProtectedRoute allowedRoles={['Hospital Admin']}>
            <Staff />
          </ProtectedRoute>
        } />
        <Route path="/dashboard2" element={
          <ProtectedRoute allowedRoles={['Policymaker']}>
            <Dashboard2 />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={<Profile />} />
        <Route path="/modelpage" element={<ModelPage />} />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </>
    
   
  );
};

export default App;
