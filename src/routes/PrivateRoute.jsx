import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function PrivateRoute() {
	const { isAuthenticated } = useAuth();
	const [ok, setOk] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		const auth = localStorage.getItem('auth');
		if (!auth) {
			setOk(false);
			navigate('/login');
		} else {
			setOk(true);
		}
	}, [isAuthenticated]);

	return ok ? <Outlet /> : 'You are not logged in';
}
