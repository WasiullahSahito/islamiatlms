// Replace contents of src/context/AuthContext.js with this:
import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Seed an instructor account if it doesn't exist
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (!users.find(u => u.email === 'instructor@islamiat.com')) {
            users.push({
                id: 'admin_1',
                name: 'Arsslan Turabi (Instructor)',
                email: 'instructor@islamiat.com',
                password: 'admin',
                role: 'instructor'
            });
            localStorage.setItem('users', JSON.stringify(users));
        }

        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    }, [])

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find(u => u.email === email && u.password === password)
        if (user) {
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            return true
        }
        return false
    }

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const existingUser = users.find(u => u.email === email)
        if (existingUser) {
            return false
        }
        // Default new registrations to "student" role
        const newUser = { id: Date.now(), name, email, password, role: 'student', courses: [], enrolledCourses: [] }
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const purchaseCourse = (courseId, courseData) => {
        if (user) {
            const updatedUser = {
                ...user,
                courses: [...(user.courses || []), courseId],
                enrolledCourses: [...(user.enrolledCourses || []), courseData]
            }
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))

            const users = JSON.parse(localStorage.getItem('users') || '[]')
            const userIndex = users.findIndex(u => u.id === user.id)
            if (userIndex !== -1) {
                users[userIndex] = updatedUser
                localStorage.setItem('users', JSON.stringify(users))
            }
            return true
        }
        return false
    }

    const value = {
        user,
        login,
        register,
        logout,
        purchaseCourse,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
