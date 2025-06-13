// Staffpage.jsx
import React, { useEffect, useState } from "react";
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";
import axios from "axios";
import config from "../urlConfig.js";

function Staffpage() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    firstName: "",
    email: "",
    phone: "",
    aadhar: "",
    gender: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${config.backendUrl}/api/hospital-doctors`, {
        withCredentials: true,
      });
      setDoctors(res.data.doctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
      alert("Could not load doctors.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewDoctor({ ...newDoctor, [e.target.name]: e.target.value });
  };

  const addDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const payload = {
        doc_id: newDoctor.aadhar,
        first_name: newDoctor.firstName,
        email: newDoctor.email,
        phone: newDoctor.phone,
        gender: newDoctor.gender,
        birthdate: newDoctor.birthdate,
   // TODO: replace with real admin ID from session
      };
  
      console.log("Payload to backend:", payload);
  
      await axios.post(`${config.backendUrl}/api/hospital-doctors`, payload, {
        withCredentials: true
      });
  
      setMessage("Doctor added to whitelist successfully!");
      fetchDoctors();
  
      // Reset form
      setNewDoctor({
        firstName: "",
        email: "",
        phone: "",
        aadhar: "",
        gender: "",
        birthdate: ""
      });
  
    } catch (err) {
      console.error("Error adding doctor:", err);
      setMessage("Error adding doctor.");
    } finally {
      setLoading(false);
    }
  };
  

  const deleteDoctor = async (doctorId) => {
    setIsLoading(true);
    try {
      await axios.delete(`${config.backendUrl}/api/hospital-doctors/${doctorId}`, {
        withCredentials: true,
      });
      fetchDoctors();
    } catch (err) {
      console.error("Error deleting doctor:", err);
      alert("Could not delete doctor.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            </div>
    );
  }

  return (
    <>
      <GSAPcomponent />
      <Header />
      <section className="mt-20 p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-primary">
          Hospital Staff Management
        </h1>

        <form onSubmit={addDoctor} className="bg-white/10 p-6 rounded-md shadow-md">
          <h2 className="text-xl mb-4 text-white">Add New Doctor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="firstName" value={newDoctor.firstName} onChange={handleInputChange} placeholder="First Name" required className="p-2 rounded bg-transparent border text-white" />
            <input name="email" value={newDoctor.email} onChange={handleInputChange} placeholder="Email" type="email" required className="p-2 rounded bg-transparent border text-white" />
            <input name="phone" value={newDoctor.phone} onChange={handleInputChange} placeholder="Phone" required className="p-2 rounded bg-transparent border text-white" />
            <input name="aadhar" value={newDoctor.aadhar} onChange={handleInputChange} placeholder="Aadhar" required className="p-2 rounded bg-transparent border text-white" />
            <select name="gender" value={newDoctor.gender} onChange={handleInputChange} className="p-2 rounded bg-transparent border text-white">
            <option value="" disabled>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input 
                                            type="date" 
                                            className="inputlogin" 
                                            id="Birthdate"
                                            name="birthdate" 
                                            placeholder="Enter your birth date" 
                                            value={newDoctor.birthdate}
                                            onChange={handleInputChange}
                                            required
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        />
            {/* <input name="birthdate" value={newDoctor.birthdate} onChange={handleInputChange} placeholder="Birthdate" type="date" required className="p-2 rounded bg-transparent border text-white" /> */}
            
          </div>
          <button type="submit" disabled={loading} className="mt-4 bg-primary text-white px-6 py-2 rounded hover:bg-primary/80">
            {loading ? "Adding..." : "Add Doctor"}
          </button>
        </form>

        {message && <p className="text-center text-yellow-300 mt-4">{message}</p>}

        <div className="mt-10">
          <h2 className="text-2xl text-white mb-4">Available Doctors</h2>
          <div className="grid gap-4">
            {doctors.map((doc) => (
              <div key={doc.doc_id} className="p-4 bg-white/10 rounded shadow text-white flex justify-between items-center">
                <div>
                  <p><strong>{doc.first_name}</strong> ({doc.email})</p>
                  <p>Aadhar: {doc.doc_id}</p>
                </div>
                <button onClick={() => deleteDoctor(doc.doc_id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Fotter />
    </>
  );
}

export default Staffpage;
