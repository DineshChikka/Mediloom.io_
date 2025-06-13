import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../urlConfig.js';

const Details = () => {
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
                    alert("Hello, Session expired. Please login again.");
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

   
        return { user, loading };
}

export default Details