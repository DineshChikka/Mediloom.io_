import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../urlConfig.js';

const Profile = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`${config.backendUrl}/api/profile`, {
                    withCredentials: true
                })
                if (response.data.success) {
                    setUser(response.data)
                }
            } catch (error) {
                console.error('Error fetching user details:', error)
                if (error.response && error.response.status === 401) {
                    // Redirect to login if unauthorized
                    alert("Session expired. Please login again bjkfehliffd.");
                    window.location.href = '/login'
                } else {
                    alert('Failed to fetch user details. Please try again later.')
                }

            } finally {
                setLoading(false)
            }
        }

        fetchUserDetails()
    }, [])

    const handleLogout = async () => {
        try {
            window.location.href = '/login'
            await axios.post(`${config.backendUrl}/api/logout`, {}, {
                withCredentials: true
            })
            // setSuccessMessage("You have been logged out successfully!");
            // setTimeout(() => setSuccessMessage(""), 10000);
            alert("You have been ogged out successfully!")
            // localStorage.removeItem('token')
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-w-5xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-black mb-6">Profile Details</h1>
                
                {user ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {user.first_name?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-black">{user.first_name}</h2>
                                <p className="text-black">{user.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div>
                                <p className="text-sm text-black">Role</p>
                                <p className="font-medium text-black">{user.role}</p>
                            </div>
                            <div>
                                <p className="text-sm text-black">Phone</p>
                                <p className="font-medium text-black">{user.phone}</p>
                            </div>
                            {/* {user.hospitalID && (
                                <div>
                                    <p className="text-sm text-gray-500">Hospital ID</p>
                                    <p className="font-medium">{user.hospitalID}</p>
                                </div>
                            )} */}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-black">No user data available</p>
                )}
            </div>
        </div>
    )
}

export default Profile
