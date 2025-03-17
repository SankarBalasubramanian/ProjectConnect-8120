import { motion } from 'framer-motion';
import { FaProjectDiagram, FaCalendarAlt, FaTasks, FaChartBar } from 'react-icons/fa';

const tools = [
  {
    icon: FaProjectDiagram,
    name: 'Project Planning',
    tools: ['JIRA', 'Trello', 'Asana', 'Monday.com'],
    description: 'Tools for planning and tracking project progress',
  },
  {
    icon: FaCalendarAlt,
    name: 'Timeline Management',
    tools: ['MS Project', 'TeamGantt', 'Smartsheet'],
    description: 'Solutions for creating and managing project timelines',
  },
  {
    icon: FaTasks,
    name: 'Task Management',
    tools: ['Todoist', 'ClickUp', 'Notion'],
    description: 'Tools for organizing and tracking tasks',
  },
  {
    icon: FaChartBar,
    name: 'Analytics & Reporting',
    tools: ['PowerBI', 'Tableau', 'Google Analytics'],
    description: 'Tools for data analysis and reporting',
  },
];

const Tools = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Project Management Tools
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <category.icon className="h-6 w-6 text-primary-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                {category.name}
              </h2>
            </div>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <div className="flex flex-wrap gap-2">
              {category.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Tools;