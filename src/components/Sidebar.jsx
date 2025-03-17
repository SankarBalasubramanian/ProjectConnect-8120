import { NavLink } from 'react-router-dom';
import { FaHome, FaTools, FaUsers, FaBookOpen } from 'react-icons/fa';

const Sidebar = ({ mobile = false, onItemClick }) => {
  const navItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/tools', icon: FaTools, label: 'Tools' },
    { path: '/community', icon: FaUsers, label: 'Community' },
    { path: '/resources', icon: FaBookOpen, label: 'Resources' },
  ];

  const handleClick = (e) => {
    if (onItemClick) {
      onItemClick();
    }
  };

  const sidebarClass = mobile 
    ? "w-full" 
    : "w-64 bg-white shadow-md h-[calc(100vh-4rem)]";

  return (
    <aside className={sidebarClass}>
      <nav className={mobile ? "py-2" : "mt-8"}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleClick}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 ${
                isActive ? 'bg-primary-50 text-primary-600' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="ml-3">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;