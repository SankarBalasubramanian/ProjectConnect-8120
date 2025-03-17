import { motion } from 'framer-motion';
import { FaComment, FaUser, FaClock } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const discussions = [
  {
    id: 1,
    title: 'Best practices for remote team management',
    author: 'Sarah Johnson',
    replies: 24,
    lastActive: '2 hours ago',
    tags: ['Remote Work', 'Team Management'],
  },
  {
    id: 2,
    title: 'Agile vs Waterfall: When to use which?',
    author: 'Mike Chen',
    replies: 45,
    lastActive: '1 day ago',
    tags: ['Agile', 'Waterfall', 'Methodology'],
  },
  {
    id: 3,
    title: 'Risk management strategies for large projects',
    author: 'Emma Davis',
    replies: 18,
    lastActive: '3 hours ago',
    tags: ['Risk Management', 'Enterprise'],
  },
];

const Community = () => {
  const { hasPermission } = useAuth();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold text-gray-900"
        >
          Community Discussions
        </motion.h1>
        {hasPermission('CREATE_DISCUSSION') && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Start Discussion
          </motion.button>
        )}
      </div>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <motion.div
            key={discussion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {discussion.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FaUser className="mr-2" />
              <span className="mr-4">{discussion.author}</span>
              <FaComment className="mr-2" />
              <span className="mr-4">{discussion.replies} replies</span>
              <FaClock className="mr-2" />
              <span>{discussion.lastActive}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            {hasPermission('DELETE_DISCUSSION') && (
              <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium">
                Delete Discussion
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Community;