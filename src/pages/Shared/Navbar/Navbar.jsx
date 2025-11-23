import { Link, NavLink } from "react-router";
import Logo from "../../../components/logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log out successful");
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="">Services</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="">Blog</NavLink>
      </li>
      <li>
        <NavLink to="">Contact</NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm mb-10 rounded-2xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <span>
            <Logo></Logo>
          </span>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end flex gap-3">
          {user ? (
            <a onClick={handleLogOut} className="btn">
              Log Out
            </a>
          ) : (
            <Link to="/login" className="btn">
              Log In
            </Link>
          )}
          <Link to="/rider" className="btn bg-primary">
            Be a rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
