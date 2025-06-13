import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faSearch, faFilter, faUpload, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import GSAPcomponent from "../components/GSAPcomponent";
import Header from "../components/Header";
import Fotter from "../components/Fotter";
import axios from "axios";
import config from '../urlConfig.js';
import Details from "../components/Details.jsx";

function Docterpage() {
    const navigate = useNavigate();
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
    const [files, setFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("all");
    const [dataFetched, setDataFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const otpRefs = useRef([]);
    const [aadharNumber, setAadharNumber] = useState("");
    const [aadharError, setAadharError] = useState("");
    const [previewFile, setPreviewFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const { user } = Details();

    useEffect(() => {
        let timer;
        if (otpGenerated && resendTimer > 0) {
            timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [otpGenerated, resendTimer]);

    const validateAadhar = (number) => {
        // Remove any spaces or dashes
        const cleanNumber = number.replace(/[-\s]/g, '');
        // Check if it's exactly 12 digits
        return /^\d{12}$/.test(cleanNumber);
    };

    const handleAadharChange = (e) => {
        const value = e.target.value;
        // Allow only numbers and format as XXXX-XXXX-XXXX
        const formattedValue = value
            .replace(/\D/g, '')
            .replace(/(\d{4})(?=\d)/g, '$1-')
            .slice(0, 14); // Max length with dashes
        
        setAadharNumber(formattedValue);
        setAadharError("");
    };

    const generateOtp = async (e) => {
        e.preventDefault();
        if (!validateAadhar(aadharNumber)) {
            setAadharError("Please enter a valid 12-digit Aadhar number");
            return;
        }

        try {
            setLoading(true);
            setError("");
            // console.log("Aadhar number:", aadharNumber.replace(/[-\s]/g, ''));
            // console.log("Backend URL:", `${config.backendUrl}/api/generate-otp`);
            const response = await axios.post(`${config.backendUrl}/api/generate-otp`, {
                aadharNumber: aadharNumber.replace(/[-\s]/g, ''),
            },{
                withCredentials: true // Include cookies in the request
            }
        );
            
            if (response.data.success) {
                setSuccess("OTP has been sent to the patient's WhatsApp number. Please check with your patient.");
                setOtpGenerated(true);
                setResendTimer(30);
                setCanResend(false);
            } else {
                setError(response.data.message || "Failed to send OTP");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                alert("Session expired. Please login again.");
                window.location.href = '/login'
            }
            else{
            setError(error.response?.data?.message || "An error occurred while sending OTP");
            }
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true);
            setError("");
            const otp = enteredOtp.join("");
            
            const response = await axios.post(`${config.backendUrl}/api/verify-otp`, {
                otp: otp
            },{
                withCredentials: true // Include cookies in the request
            });
            
            if (response.data.success) {
                setSuccess("OTP verified successfully!");
                setOtpVerified(true);
                setEnteredOtp(["", "", "", "", "", ""]);
            } else {
                setError(response.data.message || "Invalid OTP");
                setEnteredOtp(["", "", "", "", "", ""]);
                if (otpRefs.current[0]) {
                    otpRefs.current[0].focus();
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                alert("Session expired. Please login again.");
                window.location.href = '/login'
            }
            else{
            setError(error.response?.data?.message || "An error occurred during verification");
            setEnteredOtp(["", "", "", "", "", ""]);
            if (otpRefs.current[0]) {
                otpRefs.current[0].focus();
            }
        }
        } finally {
            setLoading(false);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await axios.get(`${config.backendUrl}/api/documentsInfoFetch`,{
                withCredentials: true // Include cookies in the request
            });
            // console.log("Documents fetched:", response.data.documents);

            setFiles(Array.isArray(response.data.documents) ? response.data.documents : []);
            if (response.data.success && Array.isArray(response.data.documents)) {
                setFiles(response.data.documents);
                setDataFetched(true);
                setSuccess("Documents fetched successfully!");
            } else {
                setFiles([]); // Set to an empty array if documents is not valid
                setError(response.data.message || "Failed to fetch documents");
            }

            
            // if (response.data.success) {
            //     setFiles(response.data.documents);
            //     setDataFetched(true);
            //     setSuccess("Documents fetched successfully!");
            // } else {
            //     setError(response.data.message || "Failed to fetch documents");
            // }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                alert("Session expired. Please login again.");
                window.location.href = '/login'
            }else{
            setError(error.response?.data?.message || "An error occurred while fetching documents");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (fileId) => {
        try {
            setLoading(true);
            const file = files.find(file => String(file.id) === String(fileId));
            if (!file) {
                console.error("File not found in the files array");
                setError("File not found");
                return;
            }
    
            const url = file.file_location; // e.g., https://ipfs.io/ipfs/<hash>
    
            // Fetch content type if needed (optional)
            const response = await axios.get(url, { responseType: 'blob' });
            const mimeType = response.headers['content-type'];
    
            const blobUrl = window.URL.createObjectURL(new Blob([response.data], { type: mimeType }));
    
            file.type = mimeType;
            setPreviewUrl(blobUrl);
            setPreviewFile(file);
        } catch (err) {
            console.error("Error viewing file:", err);
            setError("Failed to view document");
        } finally {
            setLoading(false);
        }
    };
    

    //         console.log("Files array:", files); // Debugging
    //         setPreviewFile(files.find(file => file.id === fileId));
    //         console.log("Preview URL:", url); // Debugging
    //         console.log("Preview File:", previewFile); // Debugging
    //     } catch (err) {
    //         console.error('View error:', err);
    //         setError(err.response?.data?.message || "Failed to view document");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const closePreview = () => {
        if (previewUrl) {
            window.URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
        setPreviewFile(null);
    };

    const handleOtpChange = (e, index) => {
        let newOtp = [...enteredOtp];
        newOtp[index] = e.target.value;
        setEnteredOtp(newOtp);

        if (e.target.value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            let newOtp = [...enteredOtp];
            if (!enteredOtp[index] && index > 0) {
                otpRefs.current[index - 1].focus();
            }
            newOtp[index] = "";
            setEnteredOtp(newOtp);
        }
    };

    const handleResendOtp = async () => {
        if (!validateAadhar(aadharNumber)) {
            setAadharError("Please enter a valid 12-digit Aadhar number");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const response = await axios.post('/api/generate-otp', {
                aadharNumber: aadharNumber.replace(/[-\s]/g, '')
            });
            
            if (response.data.success) {
                setSuccess("New OTP has been sent to the patient's WhatsApp number. Please check their messages.");
                setResendTimer(30);
                setCanResend(false);
                setEnteredOtp(["", "", "", "", "", ""]);
                if (otpRefs.current[0]) {
                    otpRefs.current[0].focus();
                }
            } else {
                setError(response.data.message || "Failed to send new OTP");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                alert("Session expired. Please login again.");
                window.location.href = '/login'
            }
            else{
            setError(error.response?.data?.message || "An error occurred while sending new OTP");
            }
        } finally {
            setLoading(false);
        }
    };

    console.log("Current filter:", filter);
    console.log("File types in list:", files.map(f => f.type));

    const filteredFiles = (files || []).filter(file =>
        file && file.name && file.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filter === "all" || file.type === filter)
    );

    return (
        <>
            <GSAPcomponent />
            <Header />
            <section className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] mt-[80px]">
                {/* Welcome Section */}
                <div className="flex flex-col place-content-center items-center mb-12">
                    <div className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
                        <span>Welcome to Mediloom.io</span>
                        <br />
                        {user ? (
                        <span className="reveal-up bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent" >Dr. {user.first_name}</span>
                        ) : ( <span>Patient</span>)}
                    </div>
                    {!otpGenerated && (
                    <div className="reveal-up mt-10 min-w-[450px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
                        Please enter the patient's Aadhar number to proceed...
                    </div>
                    )}
                </div>

                {/* OTP Section */}
                <div className="flex flex-col items-center justify-center w-full min-w-md mx-auto mb-12">
                    {error && <div className="text-red-500 mb-4 text-center w-full">{error}</div>}
                    {success && <div className="text-green-500 mb-10 text-center w-full mt-10 min-w-[450px] p-2 max-lg:max-w-full text-2xl">{success}</div>}
                    {loading &&  <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            </div>}
                    
                    {!otpGenerated ? (
                        <div className="w-full max-w-md space-y-6">
                            <div className="w-full">
                                <input
                                    type="text"
                                    value={aadharNumber}
                                    onChange={handleAadharChange}
                                    placeholder="Enter Aadhar Number (XXXX-XXXX-XXXX)"
                                    className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-300 border-2 border-primary focus:outline-none focus:border-purple-500"
                                />
                                {aadharError && <div className="text-red-500 mt-2 text-sm text-center">{aadharError}</div>}
                            </div>
                            <div className="flex justify-center">
                                <button 
                                    onClick={generateOtp} 
                                    disabled={loading || !validateAadhar(aadharNumber)}
                                    className="w-full max-w-xs btn text-white py-3 px-6 rounded-lg items-center bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending OTP...' : 'Generate OTP'}
                                </button>
                            </div>
                        </div>
                    ) : !otpVerified ? (
                        <div className="w-full max-w-md space-y-6">
                            <div className="flex gap-2 justify-center">
                                {enteredOtp.map((digit, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        ref={(el) => (otpRefs.current[index] = el)}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        className="w-12 h-12 text-center border-2 rounded-lg text-xl text-white border-primary bg-white/10"
                                    />
                                ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={verifyOtp}
                                    disabled={loading || enteredOtp.join("").length !== 6}
                                    className="w-full sm:w-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    Verify OTP
                                </button>
                                <button 
                                    onClick={handleResendOtp}
                                    disabled={loading || !canResend}
                                    className={`w-full sm:w-auto py-2 px-6 rounded-lg transition-colors ${
                                        canResend 
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                                            : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                    }`}
                                >
                                    {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-5xl mx-auto p-6 space-y-6">
                            <div className="flex justify-center gap-4">
                                <button 
                                    onClick={fetchData} 
                                    className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-colors"
                                >
                                    Get Data
                                </button>
                                <button 
                                    onClick={() => navigate('/upload')}
                                    className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    Upload Data
                                </button>
                            </div>

                            {/* Search and Filter Section */}
                            {dataFetched && (
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-lg shadow-lg bg-white/10">
                                    <div className="w-full sm:w-1/2 flex items-center bg-white/20 rounded-lg px-4 py-2">
                                        <FontAwesomeIcon icon={faSearch} className="text-gray-300 mr-3" />
                                        <input 
                                            type="text" 
                                            placeholder="Search documents..." 
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-transparent text-white placeholder-gray-300 outline-none"
                                        />
                                    </div>

                                    <div className="w-full sm:w-auto relative">
                                        <FontAwesomeIcon icon={faFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" />
                                        <select 
                                            value={filter} 
                                            onChange={(e) => setFilter(e.target.value)} 
                                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 text-white appearance-none outline-none"
                                        >
                                            <option value="all">All</option>
                                            <option value="Report">Report</option>
                                            <option value="Prescription">Prescription</option>
                                            
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Documents List */}
                            <div className="grid grid-cols-1 gap-4">
                                {filteredFiles.map((file, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white/10 flex justify-between items-center backdrop-blur-md scale-95 hover:scale-100 transition-transform duration-300 p-6 rounded-lg shadow-lg text-white"
                                    >
                                        <span className="text-lg font-semibold">{file.name}</span>
                                        <div className="flex gap-4">
                                            <button 
                                                onClick={() => handleView(file.id)}
                                                className="text-green-500 text-2xl hover:text-primary transition-colors"
                                            >                                              <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Modal */}
                {previewFile && previewUrl && (
                    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
                            <div className="flex justify-between items-center p-4 border-b">
                                <h3 className="text-lg font-semibold text-gray-800">{previewFile.name}</h3>
                                <button 
                                    onClick={closePreview}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FontAwesomeIcon icon={faTimes} className="text-2xl" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-4">
                                {previewFile.type === 'application/pdf' ? (
                                    <iframe

                                        src={previewUrl} 
                                        className="w-full h-full min-h-[70vh]"
                                        title={previewFile.name}
                                    />
                                ) : previewFile.type === 'text/xml' || previewFile.type === 'text/plain' ? (
                                    <pre className="whitespace-pre-wrap">{previewFile.data}</pre>
                                ) :(
                                    <img 
                                        src={previewUrl} 
                                        alt={previewFile.name}
                                        className="max-w-full h-auto"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
            <Fotter />
        </>
    );
}

export default Docterpage;
