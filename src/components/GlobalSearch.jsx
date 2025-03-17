import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaBook, FaTools, FaUsers } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Mock data - In real app, this would come from your API
  const searchableContent = {
    discussions: [
      { id: 1, title: 'Best practices for remote team management', type: 'discussion' },
      { id: 2, title: 'Agile vs Waterfall: When to use which?', type: 'discussion' },
      { id: 3, title: 'Risk management strategies', type: 'discussion' },
    ],
    resources: [
      { id: 1, title: 'Project Charter Template', type: 'resource' },
      { id: 2, title: 'Risk Register', type: 'resource' },
      { id: 3, title: 'Agile Methodology Guide', type: 'resource' },
    ],
    tools: [
      { id: 1, title: 'Project Planning Tools', type: 'tool' },
      { id: 2, title: 'Timeline Management', type: 'tool' },
      { id: 3, title: 'Analytics & Reporting', type: 'tool' },
    ],
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = [];
    const lowerQuery = query.toLowerCase();

    // Search in discussions
    searchableContent.discussions.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ ...item, icon: FaUsers, path: '/community' });
      }
    });

    // Search in resources
    searchableContent.resources.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ ...item, icon: FaBook, path: '/resources' });
      }
    });

    // Search in tools
    searchableContent.tools.forEach(item => {
      if (item.title.toLowerCase().includes(lowerQuery)) {
        searchResults.push({ ...item, icon: FaTools, path: '/tools' });
      }
    });

    setResults(searchResults);
  };

  const handleResultClick = (result) => {
    setIsOpen(false);
    setSearchQuery('');
    navigate(result.path);
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto"
          >
            {results.map((result, index) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleResultClick(result)}
                className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer"
              >
                <result.icon className="h-5 w-5 text-primary-600 mr-3" />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {result.title}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {result.type}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;