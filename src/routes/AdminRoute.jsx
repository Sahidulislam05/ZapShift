import Forbidden from "../components/forbidden/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { isLoading, role } = useRole();
  if (loading || isLoading) {
    return <p>Loading...</p>;
  }
  if (role.role !== "admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default AdminRoute;
