import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/userService';

function RequireAuth({ allowedRoles, children }) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RequireAuth;
