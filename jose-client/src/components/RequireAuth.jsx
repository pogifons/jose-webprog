import { Navigate } from 'react-router-dom';
import { getCurrentUser, getCurrentUserRole } from '../services/userService';

function RequireAuth({ allowedRoles, children }) {
  const currentUser = getCurrentUser();
  const currentUserRole = getCurrentUserRole();

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUserRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RequireAuth;
