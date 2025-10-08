import { Navigate } from 'react-router-dom';

// If you don't have useAuth, you can use:
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; 


const ProtectedRoute = ({ element: Element }) => {
  // Use your authentication context to get the login status
  const { auth } = useContext(AuthContext); // or useAuth();

  // If the user is logged in, render the component passed in the 'element' prop
  if (auth.isLoggedIn) {
    return Element;
  } 
  
  // If the user is NOT logged in, redirect them to the /login page
  // The 'replace' prop ensures the unauthenticated page is not added to the browser history
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;