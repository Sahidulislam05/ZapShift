import { CiDeliveryTruck } from "react-icons/ci";
import { RiEBikeFill } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import {
  FaMotorcycle,
  FaRegCreditCard,
  FaTasks,
  FaUsers,
} from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import logo from "../assets/logo.png";

const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="mx-auto min-h-screen bg-base-100">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 shadow-md px-4 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>

              <h2 className="text-xl font-bold text-pink-500 tracking-wide">
                Zap Shift Dashboard
              </h2>
            </div>
          </nav>

          {/* Page Content */}
          <div className="p-4">
            <Outlet />
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <aside className="min-h-full w-64 bg-base-200 border-r border-base-300 flex flex-col">
            <div className="p-4 border-b border-base-300 w-full flex items-center justify-center">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Menu */}
            <ul className="menu px-4 py-4 space-y-2">
              <li>
                <NavLink to="/dashboard" className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                  Homepage
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  className="flex items-center gap-3"
                >
                  <CiDeliveryTruck className="text-lg" /> My Parcels
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className="flex items-center gap-3"
                >
                  <FaRegCreditCard /> Payment History
                </NavLink>
              </li>

              {/* Rider */}
              {role === "rider" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assign-deliveries"
                      className="flex items-center gap-3"
                    >
                      <FaTasks /> Assign Deliveries
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/completed-deliveries"
                      className="flex items-center gap-3"
                    >
                      <SiGoogletasks /> Completed Deliveries
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/approve-riders"
                      className="flex items-center gap-3"
                    >
                      <FaMotorcycle /> Approve Riders
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/assign-riders"
                      className="flex items-center gap-3"
                    >
                      <RiEBikeFill /> Assign Riders
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/users-management"
                      className="flex items-center gap-3"
                    >
                      <FaUsers /> Users Management
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <button className="flex items-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <circle cx="7" cy="7" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                  </svg>
                  Settings
                </button>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
