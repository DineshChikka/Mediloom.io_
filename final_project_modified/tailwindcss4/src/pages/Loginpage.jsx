import { useState, useEffect } from "react";
import Typed from "typed.js";
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";
import axios from "axios";
import config from '../urlConfig.js';

const Loginpage = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [showHospitalID, setShowHospitalID] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
        hospitalID: "",
        firstname: "",
        phone: "",
        aadhar: "",
        confirmPassword: "",
        gender: "",
        birthdate: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const flipCard = () => {
        setIsFlipped(!isFlipped);
        setError("");
        setSuccess("");
    };

    const toggleHospitalIDField = (role) => {
        setSelectedRole(role);
        setFormData(prev => ({...prev, role}));
        if (role === 'Doctor/Medical Professional' || role === 'Hospital Admin') {
            setShowHospitalID(true);
        } else {
            setShowHospitalID(false);
            setFormData(prev => ({...prev, hospitalID: ""}));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setShowMessage(false);
        try {
            const response = await axios.post(`${config.backendUrl}/api/loginUser`, {
                email: formData.email,
                password: formData.password,
                role: formData.role,
                hospitalID: formData.hospitalID
            },{
                withCredentials: true // Include cookies in the request
            });
            
            if (response.data.success) {
                setSuccess("Login successful!");
                // Store token and role in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', formData.role);
                
                // Redirect based on role
                switch(formData.role) {
                    case 'Civilian':
                        window.location.href = '/civilian';
                        break;
                    case 'Doctor/Medical Professional':
                        window.location.href = '/doctor';
                        break;
                    case 'Hospital Admin':
                        window.location.href = '/hospital-admin';
                        break;
                    case 'Policymaker':
                        window.location.href = '/dashboard2';
                        break;
                    default:
                        window.location.href = '/';
                }
            } else {
                setError(response.data.message || "Login failed");
            }
        } catch (err) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                alert("Session expired. Please login again 1234hwjebflhafji.");
                window.location.href = '/login'
            } else {
                alert('Failed to fetch user details. Please try again later.')
                setError(err.response?.data?.message || "An error occurred during login");
            }
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setShowMessage(false);
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match bro");
            return;
        }

        try {
            const response = await axios.post(`${config.backendUrl}/api/registerUser`, {
                firstname: formData.firstname,
                phone: formData.phone,
                aadhar: formData.aadhar,
                email: formData.email,
                password: formData.password,
                role: formData.role,
                birthdate: formData.birthdate,
                gender: formData.gender,
                hospitalID: formData.hospitalID
            },
            {withCredentials: true // Include cookies in the request
            });

            if (response.data.success) {
                setSuccess("Registration successful! Please login.");
                setFormData({
                    email: "",
                    password: "",
                    role: "",
                    hospitalID: "",
                    firstname: "",
                    phone: "",
                    aadhar: "",
                    confirmPassword: ""
                });
                
            } else {
                setError(response.data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Registration error:", err); // Log the full error object
            console.error("Error response:", err.response); // Log the response object if it exists
            setError(err.response?.data?.message || "An error occurred during registration");
        }
    };

    useEffect(() => {
        const typed = new Typed(".text", {
            strings: ["Data Security", "Predictive Analytics", "Resource Management", "Future Predictions"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <><GSAPcomponent />
        <Header />
        <section className="sectionlogin relative flex min-h-[80vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6 gap-5">
            <div className="flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-10">
                <div className="mt-6 flex max-w-[550px] flex-col gap-4">
                    <h3 className="reveal-up text-5xl font-medium max-md:text-2xl text-center">
                        Welcome to Mediloom.io Family
                    </h3>
                    <div className="reveal-up mt-4 flex flex-col gap-3">
                        <h4 className="text-3xl font-medium text-center">
                            <i className="bi bi-check-all !text-2xl"></i> The features and Promises which we provide are <br />
                            <span className="text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"></span>
                        </h4>
                    </div>
                </div>
                <div className="border-gradient flex">
                    <div className="max-h-[1200px] max-w-[900px] overflow-hidden rounded-lg shadow-lg shadow-[rgba(170,49,233,0.44021358543417366)]">
                        <div className={`reveal-up flip-container gap-5 ${(selectedRole === 'Doctor/Medical Professional' || selectedRole === 'Hospital Admin' || setShowMessage == true) ? 'taller' : ''}`}>
                            <div className={`flipper ${isFlipped ? "flipped" : ""}`} id="flipper">
                                <div className="front h-[100%]">
                                    <h2 className="h2login">Login</h2>
                                    {error && <div className="text-red-500 mb-4">{error}</div>}
                                    {success && <div className="text-green-500 mb-4">{success}</div>}
                                    <form className="flex flex-col items-center justify-center w-full" onSubmit={handleLogin}>
                                        <input 
                                            className="inputlogin" 
                                            type="email" 
                                            name="email" 
                                            id="Email"
                                            placeholder="Email" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="EmailErrMsg" className="error-message"></p>
                                        <input 
                                            className="inputlogin" 
                                            type="password" 
                                            name="password" 
                                            id="Password"
                                            placeholder="Password" 
                                            value={formData.password}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="PasswordErrMsg" className="error-message"></p>
                                        <select 
                                            id="Role" 
                                            name="role" 
                                            value={selectedRole}
                                            onChange={(e) => toggleHospitalIDField(e.target.value)} 
                                            required
                                        >
                                            <option value="" disabled>Select the type of person</option>
                                            <option value="Civilian">Civilian</option>
                                            <option value="Doctor/Medical Professional">Doctor/Medical Professional</option>
                                            <option value="Hospital Admin">Hospital Admin</option>
                                            <option value="Policymaker">Policymaker</option>
                                        </select>
                                        <p id="RoleErrMsg" className="error-message"></p>
                                        {showHospitalID && (
                                            <div className="w-full flex justify-center">
                                                <input 
                                                    className="inputlogin" 
                                                    type="text" 
                                                    name="hospitalID" 
                                                    id="HospitalID"
                                                    placeholder="Hospital ID" 
                                                    value={formData.hospitalID}
                                                    onChange={handleChange}
                                                    required 
                                                />
                                                <p id="HospitalIDErrMsg" className="error-message"></p>
                                            </div>
                                        )}
                                        <button type="submit" className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]">
                                            Login
                                        </button>
                                    </form>
                                    <br />
                                    <button className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]" onClick={flipCard}>
                                        New User? Register
                                    </button>
                                </div>
                                <div className={`back ${showMessage ? 'h-[calc(100%+30px)]' : ''}`}>
                                    <h2 className="h2login mt-3">Register</h2>
                                    {error && <div className="text-red-500 mb-0.5" onLoad={() => setShowMessage(true)}>{error}</div>}
                                    {success && <div className="text-green-500 mb-0.5" onLoad={() => setShowMessage(true)}>{success}</div>}
                                    <form className="flex flex-col items-center justify-center w-full" onSubmit={handleRegister}>
                                        <input 
                                            className="inputlogin" 
                                            type="text" 
                                            name="firstname" 
                                            id="Firstname"
                                            placeholder="Your legal Full Name" 
                                            value={formData.firstname}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="FirstnameErrMsg" className="error-message"></p>
                                        <input 
                                            type="tel" 
                                            className="inputlogin" 
                                            id="Phone"
                                            name="phone" 
                                            placeholder="Include country code" 
                                            value={formData.phone}
                                            onChange={handleChange}
                                            pattern="[0-9]{12}" 
                                        />
                                        <p id="PhoneErrMsg" className="error-message"></p>
                                        <input 
                                            type="text" 
                                            className="inputlogin" 
                                            id="Aadhar"
                                            name="aadhar" 
                                            placeholder="Enter your Aadhar number" 
                                            value={formData.aadhar}
                                            onChange={handleChange}
                                            pattern="[0-9]{12}" 
                                        />
                                        <p id="BirthDateErrMsg" className="error-message"></p>
                                        <input 
                                            type="date" 
                                            className="inputlogin" 
                                            id="Birthdate"
                                            name="birthdate" 
                                            placeholder="Enter your birth date" 
                                            value={formData.birthdate}
                                            onChange={handleChange}
                                            required
                                        pattern="\d{4}-\d{2}-\d{2}"
                                        />
                                        <p id="BirthdateErrMsg" className="error-message"></p>
                                        <input 
                                            className="inputlogin" 
                                            type="email" 
                                            name="email" 
                                            id="Email"
                                            placeholder="Email" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="EmailErrMsg" className="error-message"></p>
                                        <input 
                                            className="inputlogin" 
                                            type="password" 
                                            name="password" 
                                            id="Password"
                                            placeholder="Password" 
                                            value={formData.password}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="PasswordErrMsg" className="error-message"></p>
                                        <input 
                                            className="inputlogin" 
                                            type="password" 
                                            name="confirmPassword" 
                                            id="ConfirmPassword"
                                            placeholder="Confirm Password" 
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required 
                                        />
                                        <p id="ConfirmPassworsErrMsg" className="error-message"></p>
                                        <select 
                                            id="Gender" 
                                            name="gender" 
                                            value={formData.gender}
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="" disabled>Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        <select 
                                            id="Role" 
                                            name="role" 
                                            value={selectedRole}
                                            onChange={(e) => toggleHospitalIDField(e.target.value)} 
                                            required
                                        >
                                            <option value="" disabled>Select the type of person</option>
                                            <option value="Civilian">Civilian</option>
                                            <option value="Doctor/Medical Professional">Doctor/Medical Professional</option>
                                            <option value="Hospital Admin">Hospital Admin</option>
                                            <option value="Policymaker">Policymaker</option>
                                        </select>
                                        <p id="RoleErrMsg" className="error-message"></p>
                                        {showHospitalID && (
                                            <div className="w-full flex justify-center">
                                                <input 
                                                    className="inputlogin" 
                                                    type="text" 
                                                    name="hospitalID" 
                                                    id="HospitalID"
                                                    placeholder="Hospital ID" 
                                                    value={formData.hospitalID}
                                                    onChange={handleChange}
                                                    required 
                                                />
                                                <p id="HospitalIDErrMsg" className="error-message"></p>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2 mb-2">
                                            <input type="checkbox" className="w-4 h-4" required />
                                            <a href="#" className="text-blue-500 hover:underline hover:text-white whitespace-nowrap">
                                                Terms and Conditions
                                            </a>
                                        </div>
                                        <button type="submit" className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]">
                                            Register
                                        </button>
                                        <button className="text-white hover:underline hover:text-blue-500 py-3" onClick={flipCard}>
                                            Already Registered? Login
                                        </button>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Fotter />
        </>
    );
};

export default Loginpage;
