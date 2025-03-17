import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaTools, FaBook } from 'react-icons/fa';

const features = [
  {
    icon: FaChartLine,
    title: 'Project Management Frameworks',
    description: 'Learn about Agile, Waterfall, and hybrid approaches',
  },
  {
    icon: FaUsers,
    title: 'Community Discussions',
    description: 'Connect with other professionals and share experiences',
  },
  {
    icon: FaTools,
    title: 'Tools & Techniques',
    description: 'Discover the latest PM tools and methodologies',
  },
  {
    icon: FaBook,
    title: 'Resources Library',
    description: 'Access templates, guides, and best practices',
  },
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to PM Knowledge Hub
        </h1>
        <p className="text-xl text-gray-600">
          Your comprehensive resource for project management excellence
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <feature.icon className="h-10 w-10 text-primary-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;