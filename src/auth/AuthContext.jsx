import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const auth = localStorage.getItem('auth');
		if (auth) {
			setIsAuthenticated(auth);
		}
	}, []);

	return (
		<AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
			{children}
		</AuthContext.Provider>
	);
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
