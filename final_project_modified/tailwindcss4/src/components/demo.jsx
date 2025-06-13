const Demo = () => {
    return (
      <section
              className="mt-5 flex w-full flex-col place-items-center p-[2%]"
              id="Contactus"
          >
              <h3
                  className="text-3xl font-medium text-gray-300 max-md:text-2xl"
              >
                  Contact Us
              </h3>
              <div
                  className="mt-10 flex flex-wrap place-content-center gap-8 max-lg:flex-col"
              >
                  <div
                      className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                  >
                      <h3 className="">
                          <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-email-48_phqcbo.png" className="image2" />
                          </span>
                          
                      </h3>
                      <p className="mt-3 text-center text-gray-300 text-3xl">
                          Email Us
                      </p>
                      <hr />
                      <ul
                          className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                      >
                          <li>General Inquiries</li>
                          <li><a href="">mediloom.io@gmail.com</a></li>
                          <li>Support</li>
                          <li><a href="">supportmediloom.io@gmail.com</a></li>
                      </ul>
                  </div>
                  <div
                      className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-2 border-primary bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                  >
                      <h3 className="">
                          <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-phone-50_jipsoy.png" className="image2" /></span>
                      </h3>
                      <p className="mt-3 text-center text-gray-300 text-3xl">
                          Phone
                      </p>
                      <hr />
                      <ul
                          className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                      >
                          <li>We're here to assist you with </li>
                          <li>any questions and queries</li>
                          <li>+91 1234567809</li>
                          
                      </ul>
                  
                  </div>
                  <div
                      className="reveal-up flex w-[380px] flex-col place-items-center gap-2 rounded-lg border-[1px] border-outlineColor bg-secondary p-8 shadow-xl max-lg:w-[320px]"
                  >
                      <h3 className="">
                          <span className="text-5xl font-semibold"><img src="https://res.cloudinary.com/dmnys8vsr/image/upload/v1740465897/icons8-location-50_dzfuvb.png" className="image2" />
  </span>
                      </h3>
                      <p className="mt-3 text-center text-gray-300 text-3xl">
                          Our Address
                      </p>
                      <hr />
                      <ul
                          className="mt-4 flex flex-col gap-2 text-center text-lg text-gray-200"
                      >
                          <li>Visit us at our headquaters</li>
                          <li> for more information.</li>
                          <li>Mediloom.io,Nadargul</li>
                          <li>Hyderabad,501510.</li>
                      </ul>
                  </div>
              </div>
          </section>
    )
  }
  
  export default Demo;












// import { useState, useEffect } from "react";
// import Typed from "typed.js";

// const Loginpage = () => {
//     const [isFlipped, setIsFlipped] = useState(false);

//     // Function to toggle the flip effect
//     const flipCard = () => {
//         setIsFlipped(!isFlipped);
//     };

//     useEffect(() => {
//         // Initialize Typed.js animation
//         const typed = new Typed(".text", {
//             strings: ["Data Security", "Predictive Analytics", "Resource Management", "Future Predictions"],
//             typeSpeed: 100,
//             backSpeed: 100,
//             backDelay: 1000,
//             loop: true,
//         });

//         return () => {
//             typed.destroy(); // Clean up Typed.js instance on unmount
//         };
//     }, []);

//     return (
//         <section className="sectionlogin relative flex min-h-[80vh] w-full max-w-[100vw] flex-col place-content-center place-items-center overflow-hidden p-6 gap-5">
//             <div className="reveal-up flex min-h-[60vh] place-content-center place-items-center gap-[10%] max-lg:flex-col max-lg:gap-10">
//                 <div className="mt-6 flex max-w-[550px] flex-col gap-4">
//                     <h3 className="reveal-up text-5xl font-medium max-md:text-2xl text-center">
//                         Welcome to Mediloom.io Family
//                     </h3>
//                     <div className="reveal-up mt-4 flex flex-col gap-3">
//                         <h4 className="text-3xl font-medium text-center">
//                             <i className="bi bi-check-all !text-2xl"></i> The features and Promises which we provide are <br />
//                             <span className="text"></span>
//                         </h4>
//                     </div>
//                 </div>
//                 <div className="flex">
//                     <div className="max-h-[650px] max-w-[850px] overflow-hidden rounded-lg shadow-lg shadow-[rgba(170,49,233,0.44021358543417366)]">
//                         <div className={`reveal-up flip-container gap-5`}>
//                             <div className={`flipper ${isFlipped ? "flipped" : ""}`} id="flipper">
//                                 <div className="front">
//                                     <h2 className="h2login">Login</h2>
//                                     <input className="inputlogin" type="email" placeholder="Email" />
//                                     <input className="inputlogin" type="password" placeholder="Password" />
//                                     <select>
//                                         <option value="" disabled>Select the type of person</option>
//                                         <option>Patient</option>
//                                         <option>Hospital Admin</option>
//                                         <option>Super Admin</option>
//                                     </select>
//                                     <br />
//                                     <button className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]">
//                                         Login
//                                     </button>
//                                     <br />
//                                     <button className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]" onClick={flipCard}>
//                                         New User? Register
//                                     </button>
//                                 </div>
//                                 <div className="back">
//                                     <h2 className="h2login">Register</h2>
//                                     <input className="inputlogin" type="text" placeholder="Full Name" />
//                                     <input className="inputlogin" type="email" placeholder="Email" />
//                                     <input className="inputlogin" type="password" placeholder="Password" />
//                                     <input className="inputlogin" type="password" placeholder="Confirm Password" />
//                                     <select>
//                                         <option>Select the type of person</option>
//                                         <option>Patient</option>
//                                         <option>Hospital Admin</option>
//                                         <option>Super Admin</option>
//                                     </select>
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <input type="checkbox" className="w-4 h-4" />
//                                         <a href="#" className="text-blue-500 hover:underline hover:text-white whitespace-nowrap">
//                                             Terms and Conditions
//                                         </a>
//                                     </div>

//                                     <button className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03]">
//                                         Register
//                                     </button>
//                                     <br />
//                                     <button className="text-white hover:underline hover:text-blue-500" onClick={flipCard}>
//                                         Already Registered? Login
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// // export default Loginpage;





// const Patientpage = () => {
//     return (
//         <section className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px]" id="hero-section">
//             <div className="flex h-full min-h-[100vh] w-full flex-col place-content-center gap-6 p-[5%] max-xl:place-items-center max-lg:p-4">
//                 {/* Header Section */}
//                 <div className="flex flex-col place-content-center items-center">
//                     <h1 className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
//                         Welcome to Mediloom.io
//                         <br />
//                         <span>User Name</span>
//                     </h1>
//                     <p className="reveal-up mt-10 max-w-[450px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
//                         Thank you for selecting our platform for your data privacy.
//                     </p>
//                 </div>

//                 {/* Show Data Button */}
//                 <div className="flex flex-col justify-center items-center h-screen">
//                     <input type="checkbox" id="toggle" className="peer hidden" />
//                     <label htmlFor="toggle" className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03] hover:bg-opacity-80 text-white py-2 px-6 rounded-lg">
//                         Show Data
//                     </label>
                
//                     {/* Collapsible Data List */}
//                     <div className="border-gradient relative flex w-full h-screen flex-col place-content-center place-items-center overflow-hidden p-6 peer-checked:flex hidden transition-all mt-10">
//                         <div className="reveal-up flex w-full h-full flex-col gap-3 text-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
//                             {/* Search Bar & Filter */}
//                             <div className="flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg">
//                                 <input type="text" id="searchBar" placeholder="Search documents..." 
//                                     className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder-gray-300" />
//                                 <button id="filterBtn" className="ml-4 p-2 bg-gray-200 rounded-lg text-gray-600 hover:bg-gray-300 relative">
//                                     <i className="bi bi-funnel-fill text-black"></i>
//                                 </button>
//                             </div>
                            
//                             {/* Document List */}
//                             <div id="dataList" className="mt-4 space-y-4">
//                                 {["Document 1", "Document 2", "Document 3"].map((doc, index) => (
//                                     <div key={index} className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all">
//                                         <span className="text-gray-200">{doc}</span>
//                                         <div className="flex gap-3">
//                                             <i className="fas fa-eye text-xl text-white-400 cursor-pointer hover:text-green-500 transition-all" title="Preview"></i>
//                                             <i className="fas fa-download text-xl text-white-400 cursor-pointer hover:text-blue-500 transition-all" title="Download"></i>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Patientpage;

//<div className='border-gradient relative flex flex-col w-full h-screen place-content-center place-items-center overflow-hidden p-6 peer-checked:flex hidden transition-all mt-10 '></div>




// import React from 'react'
// import { useState, useRef } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faDownload } from '@fortawesome/free-solid-svg-icons';

// function Patient() {


//     const [otpGenerated, setOtpGenerated] = useState(false);
//         const [enteredOtp, setEnteredOtp] = useState(["", "", "", "", "", ""]);
//         const [isVerified, setIsVerified] = useState(null);
//         const [showData, setShowData] = useState(false);
//         const [files, setFiles] = useState([]);
//         const otpRefs = useRef([]);
        
//         const defaultOtp = "123456";
    
//         const generateOtp = () => {
//             setOtpGenerated(true);
//         };
    
//         const verifyOtp = () => {
//             if (enteredOtp.join("") === defaultOtp) {
//                 setIsVerified(true);
//                 alert("Verification Successful!");
//                 setShowData(true);
//             } else {
//                 setIsVerified(false);
//                 alert("Verification Failed! Try Again.");
//             }
//         };
    
//         const fetchData = () => {
//             const dummyFiles = [
//                 { name: "Document1.pdf", url: "#" },
//                 { name: "Document2.pdf", url: "#" },
//                 { name: "Document3.pdf", url: "#" }
//             ];
//             setFiles(dummyFiles);
//         };
    
//         const handleOtpChange = (e, index) => {
//             let newOtp = [...enteredOtp];
//             newOtp[index] = e.target.value;
//             setEnteredOtp(newOtp);
            
//             if (e.target.value && index < otpRefs.current.length - 1) {
//                 otpRefs.current[index + 1].focus();
//             }
//         };
    
//         const handleKeyDown = (e, index) => {
//             if (e.key === "Backspace") {
//                 let newOtp = [...enteredOtp];
//                 if (!enteredOtp[index] && index > 0) {
//                     otpRefs.current[index - 1].focus();
//                 }
//                 newOtp[index] = "";
//                 setEnteredOtp(newOtp);
//             }
//         };
//   return (
//     <section class="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] mt-[80px]"
//             id="hero-section">
                
//                     <div class="flex flex-col place-content-center items-center">
//                         <div class="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
//                             <span class=""> Welcome to Mediloom.io</span>
//                             <br />
//                             <span class=""> User Name</span>
//                         </div>
//                         <div class="reveal-up mt-10 max-w-[450px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
//                             Thank you for selecting our platform for your data privacy.
//                         </div>
//                     </div>
                
//                 <div className=" flex justify-center items-center">
//                 {!otpGenerated ? (
//                     <button onClick={generateOtp} className="mt-6 btn text-white py-2 px-6 rounded-lg items-center">
//                         Generate OTP
//                     </button>
//                 ) : (
//                     <div className="mt-6 text-center">
//                         <div className="flex gap-2 justify-center">
//                             {enteredOtp.map((digit, index) => (
//                                 <input
//                                     key={index}
//                                     type="text"
//                                     maxLength="1"
//                                     value={digit}
//                                     ref={(el) => (otpRefs.current[index] = el)}
//                                     onChange={(e) => handleOtpChange(e, index)}
//                                     onKeyDown={(e) => handleKeyDown(e, index)}
//                                     className=" w-12 h-12 text-center  border-1 rounded-lg text-xl text-white border-primary"
//                                 />
//                             ))}
//                         </div>
//                         <button onClick={verifyOtp} className="mt-4 bg-green-500 text-white py-2 px-6 rounded-lg">
//                             Verify OTP
//                         </button>
//                         {isVerified !== null && (
//                             <p className={`mt-4 ${isVerified ? 'text-green-500' : 'text-red-500'}`}>
//                                 {isVerified ? "Verification Successful!" : "Verification Failed! Try Again."}
//                             </p>
//                         )}
//                     </div>
//                 )}
//                 </div>
//                 <div className="flex justify-center items-center">
//                 {showData && (
//                     <div className="mt-6 text-center w-full max-w-5xl p-6 rounded-lg overflow-auto shadow-lg">
//                         <button onClick={fetchData} className="bg-purple-500 text-white py-2 px-6 rounded-lg">
//                             Get Data
//                         </button>
//                         <div className="mt-6 grid grid-cols-1 gap-4">
//     {files.map((file, index) => (
//         <div key={index} className="bg-white/10 flex justify-between items-center backdrop-blur-md scale-95 hover:scale-100 transition-transform duration-300 p-6 rounded-lg shadow-lg text-white">
//             {/* Document Name */}
//             <span className="text-lg font-semibold">{file.name}</span>

//             {/* Icons */}
//             <div className="flex gap-4">
//                 <button onClick={() => alert(`Previewing ${file.name}`)} className="text-green-500 text-2xl">
//                     <FontAwesomeIcon icon={faEye} />
//                 </button>
//                 <button onClick={() => alert(`Downloading ${file.name}`)} className="text-blue-500 text-2xl">
//                     <FontAwesomeIcon icon={faDownload} />
//                 </button>
//                 </div>
//                 </div>
//             ))}
//         </div>

//                     </div>
//                 )}
//                 </div>
//     </section>
//   )
// }

// // export default Patient






// import React, { useState } from "react";

// function Uploadpage() {
//   const [showForm, setShowForm] = useState(false);

//   return (
//     <section
//       className="hero-section relative flex min-h-[100vh] w-full max-w-[100vw] flex-col overflow-hidden max-md:mt-[50px] mt-[80px]"
//       id="hero-section"
//     >
//       <div className="flex flex-col place-content-center items-center">
//         <div className="reveal-up gradient-text text-center text-6xl font-semibold uppercase leading-[80px] max-lg:text-4xl max-md:leading-snug">
//           <span> Welcome to Mediloom.io</span>
//           <br />
//           <span> Here you can upload the data of the patients</span>
//         </div>
//         <div className="reveal-up mt-10 max-w-[450px] p-2 text-center text-gray-300 max-lg:max-w-full text-3xl">
//           Thank you for selecting our platform.
//         </div>
//       </div>
//       <div className="flex justify-center items-center">
//         <button
//           className="mt-6 btn text-white py-2 px-6 rounded-lg items-center"
//           onClick={() => setShowForm(!showForm)}
//         >
//           Upload Data
//         </button>
//       </div>

//       {showForm && (
//         <div className="flex justify-center items-center">
//         <section
//           id="uploadDocsSection"
//           className="border-gradient relative flex w-full max-w-[80%] flex-col place-content-center place-items-center overflow-hidden p-6 transition-all mt-10"
//         >
//           <div className="reveal-up flex w-full h-full flex-col gap-3 text-center bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-6  transition-transform duration-300">
//             <div className="text-white font-semibold">
//               <form>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Hospital ID:{" "}
//                   <input type="text" required className="form-control text-white border-1" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Patient ID:{" "}
//                   <input type="text" required className="form-control text-white border-1" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Patient Name:{" "}
//                   <input type="text" required className="form-control text-white border-1" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Department:{" "}
//                   <input type="text" required className="form-control text-white border-1" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Prescription:{" "}
//                   <input type="file" required className="form-control text-white" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Doctor Name:{" "}
//                   <input type="text" required className="form-control text-white border-1" />
//                 </label>
//                 <label className="p-4 bg-white/10 backdrop-blur-md rounded-lg shadow-md flex justify-between items-center hover:bg-opacity-80 transition-all mt-4">
//                   Test Results:{" "}
//                   <input type="file" multiple className="form-control" />
//                 </label>
//                 <section className="flex flex-col justify-center items-center mt-10">
//                   <div className="flex justify-center items-center gap-4">
//                     <button className="btn bg-[#7e22ce85] shadow-lg shadow-primary transition-transform duration-[0.3s] hover:scale-x-[1.03] hover:bg-opacity-80 text-white py-2 px-6 rounded-lg">
//                       Submit
//                     </button>
//                   </div>
//                 </section>
//               </form>
//             </div>
//           </div>
//         </section>
//         </div>
//       )}
//     </section>
//   );
// }

// export default Uploadpage;
