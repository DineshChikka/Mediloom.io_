import React, { useState, useEffect } from "react";
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";
import axios from "axios";
import config from '../urlConfig.js';

function Resourcepage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.backendUrl}/api/hospital-resources`, {
        withCredentials: true
      });
      setResources(res.data.resources.map(r => ({
        id: r.id,
        resourceName: r.resource_name,
        quantity: r.quantity
      })));
      
    } catch (error) {
      console.error("Error fetching resources:", error);
      if (error.response && error.response.status === 401) {
        // Redirect to login if unauthorized
        alert("Session expired. Please login again.");
        window.location.href = '/login'
    } else {
        alert('Failed to fetch user details. Please try again later.')
        setErrorMessage("Failed to fetch resources.");
    }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedResources = [...resources];
    updatedResources[index][name] = name === "quantity" ? Math.max(0, Number(value)) : value;
    setResources(updatedResources);
  };

  const addResource = () => {
    if (resources.length >= 10) return alert("Max 10 resources allowed.");
    setResources([...resources, { resourceName: "", quantity: "" }]);
  };

  const removeResource = async (index, resourceId) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
    if (resourceId) {
      try {
        await axios.delete(`${config.backendUrl}/api/hospital-resources/${resourceId}`, {
          withCredentials: true
        });
      } catch (err) {
        console.error("Failed to delete resource:", err);
        setErrorMessage("Failed to delete resource.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (resources.some(r => !r.resourceName.trim() || r.quantity === "")) {
      return alert("All fields must be filled.");
    }
    setLoading(true);
    try {
      await axios.post(`${config.backendUrl}/api/hospital-resources`, { resources }, {
        withCredentials: true
      });
      setSuccessMessage("Resources updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      fetchResources();
    } catch (error) {
      console.error("Error updating resources:", error);
      setErrorMessage("Failed to update resources.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <><GSAPcomponent />
    <Header />
    {loading && (
      <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
  </div>
    )}
    <section className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] mt-[80px]">
      <div className="flex flex-col place-content-center items-center">
        <div className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
          <span>Hospital Resource Management</span>
        </div>
        <div className="reveal-up mt-10 max-w-[450px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
          Add, update or remove hospital resources.
        </div>
      </div>

      <div className="flex justify-center items-center">
        <section id="resourceSection" className="border-gradient relative flex w-full max-w-[80%] flex-col place-content-center place-items-center overflow-hidden p-6 transition-all mt-10">
          <div className="flex w-full h-full flex-col gap-3 text-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 transition-transform duration-300">
            <form onSubmit={handleSubmit}>
              {resources.map((resource, index) => (
                <div key={index} className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md hover:bg-opacity-80 transition-all mt-4 flex flex-col">

<label className="flex justify-between items-center">
  Resource Name:
  
  <select
    name="resourceName"
    value={resource.resourceName}
    onChange={(e) => handleChange(index, e)}
    required
    className="form-control text-white border-1 bg-transparent"
  >
    <option value="" disabled>Select Resource</option>
    <option value="Beds">Beds</option>
    <option value="Ventilators">Ventilators</option>
    <option value="Mobility Vehicles">Mobility Vehicles</option>
    <option value="Nurses">Nurses</option>
  </select>
</label>

                  {/* <label className="flex justify-between items-center">
                    Resource Name:
                    
                    <input
                      type="text"
                      name="resourceName"
                      value={resource.resourceName}
                      onChange={(e) => handleChange(index, e)}
                      required
                      className="form-control text-white border-1"
                    />
                    </label> */}
                  

                  <label className="flex justify-between items-center mt-4">
                    Quantity:
                    <input
                      type="number"
                      name="quantity"
                      value={resource.quantity}
                      onChange={(e) => handleChange(index, e)}
                      required
                      min="0"
                      className="form-control text-white border-1"
                    />
                  </label>

                  {/* {resources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeResource(index, resource.id)}
                      className="bg-red-500 text-white py-1 px-4 rounded-md mt-4"
                    >
                      Remove
                    </button>
                  )} */}
                  {/* <button
                  type="button"
                  onClick={() => removeResource(index, resource.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded-md mt-4">Remove
                    </button> */}
                    <section className="flex justify-center mt-4">
  <button
    type="button"
    onClick={() => removeResource(index, resource.id)}
    className="btn bg-red-500 text-white py-2 px-6 rounded-lg transition-transform duration-[0.3s] hover:scale-x-[1.03] hover:bg-opacity-80"
  >
    Remove
  </button>
</section>

                </div>
              ))}

              <button type="button" onClick={addResource} className="mt-4 btn bg-blue-500 text-white py-2 px-6 rounded-lg">
                Add Resource
              </button>

              <section className="flex flex-col justify-center items-center mt-10">
              
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03] hover:bg-opacity-80 text-white py-2 px-6 rounded-lg"
                >
                  {loading ? 'Updating...' : 'Update Resources'}
                </button>
              </section>

              {successMessage && <div className="mt-4 text-green-400 text-lg">{successMessage}</div>}
              {errorMessage && <div className="mt-4 text-red-400 text-lg">{errorMessage}</div>}
            </form>
          </div>
        </section>
      </div>
    </section>
    <Fotter />
    </>
  );
}

export default Resourcepage;
