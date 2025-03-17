import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  const handleMainClick = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        toggleMobileMenu={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen} 
      />
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar onItemClick={closeMobileMenu} />
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isMobile && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 top-16 z-50 bg-white shadow-lg"
            >
              <Sidebar mobile={true} onItemClick={closeMobileMenu} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6"
          onClick={handleMainClick}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};

export default Layout;