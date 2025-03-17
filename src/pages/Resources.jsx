import { motion } from 'framer-motion';
import { FaFileAlt, FaVideo, FaBook, FaDownload } from 'react-icons/fa';

const resources = [
  {
    category: 'Templates',
    icon: FaFileAlt,
    items: [
      { title: 'Project Charter Template', type: 'DOCX', size: '245 KB' },
      { title: 'Risk Register', type: 'XLSX', size: '180 KB' },
      { title: 'Stakeholder Analysis Matrix', type: 'XLSX', size: '156 KB' },
    ],
  },
  {
    category: 'Video Tutorials',
    icon: FaVideo,
    items: [
      { title: 'Agile Project Management Basics', duration: '15 mins' },
      { title: 'Stakeholder Management Tips', duration: '12 mins' },
      { title: 'Risk Assessment Guide', duration: '20 mins' },
    ],
  },
  {
    category: 'Guides & Documentation',
    icon: FaBook,
    items: [
      { title: 'Project Management Handbook', type: 'PDF', size: '2.5 MB' },
      { title: 'Agile Methodology Guide', type: 'PDF', size: '1.8 MB' },
      { title: 'Best Practices Collection', type: 'PDF', size: '3.2 MB' },
    ],
  },
];

const Resources = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Resources Library
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <section.icon className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                {section.category}
              </h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.type || item.duration}
                    </p>
                  </div>
                  <button className="text-primary-600 hover:text-primary-700">
                    <FaDownload />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;