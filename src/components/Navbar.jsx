import { Link } from 'react-router-dom';
import { FaBook, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import GlobalSearch from './GlobalSearch';

const Navbar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const { user } = useAuth();

  const handleMenuClick = (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaBook className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                PM Knowledge Hub
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Global Search */}
            <div className="hidden md:block">
              <GlobalSearch />
            </div>

            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <FaBell className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src={user.avatar}
                alt={`${user.name}'s avatar`}
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                {user.name}
              </span>
              <span className="ml-2 px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full hidden md:block">
                {user.role}
              </span>
            </div>

            <button
              onClick={handleMenuClick}
              className="p-2 rounded-lg text-gray-600 lg:hidden hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <GlobalSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;