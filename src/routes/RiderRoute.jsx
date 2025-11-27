import Forbidden from "../components/forbidden/Forbidden";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { isLoading, role } = useRole();

  if (loading || isLoading || !user) {
    return <p>Loading...</p>;
  }
  if (role !== "rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};
export default RiderRoute;
