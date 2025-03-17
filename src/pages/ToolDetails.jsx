import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaFileDownload, FaImage, FaInfoCircle, FaLightbulb } from 'react-icons/fa';

const ToolDetails = () => {
  const { toolId } = useParams();

  // Mock data - Replace with API call
  const toolsData = {
    'project-planning': {
      name: 'Project Planning Tools',
      description: 'Comprehensive suite of tools for planning and tracking project progress',
      mainTools: [
        {
          name: 'JIRA',
          description: 'Agile project management tool that supports Scrum and Kanban',
          features: [
            'Customizable workflows',
            'Sprint planning',
            'Real-time reporting',
            'Integration capabilities'
          ]
        },
        {
          name: 'Trello',
          description: 'Visual collaboration tool that creates a shared perspective on any project',
          features: [
            'Drag-and-drop interface',
            'Power-ups and integrations',
            'Task assignments',
            'Due dates and reminders'
          ]
        }
      ],
      videos: [
        {
          title: 'Getting Started with JIRA',
          duration: '10:25',
          thumbnail: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          title: 'Trello Best Practices',
          duration: '8:15',
          thumbnail: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ],
      infographics: [
        {
          title: 'Project Planning Lifecycle',
          image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        },
        {
          title: 'Agile vs Traditional Planning',
          image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
        }
      ],
      resources: [
        {
          title: 'JIRA Setup Guide',
          type: 'PDF',
          size: '2.5 MB'
        },
        {
          title: 'Trello Templates Pack',
          type: 'ZIP',
          size: '5.1 MB'
        }
      ],
      tips: [
        'Start with a project charter',
        'Define clear milestones',
        'Use templates for consistency',
        'Regular progress tracking'
      ]
    }
    // Add more tools data here
  };

  const tool = toolsData[toolId];

  if (!tool) return <div>Tool not found</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{tool.name}</h1>
        <p className="text-gray-600">{tool.description}</p>
      </motion.div>

      {/* Main Tools Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {tool.mainTools.map((mainTool, index) => (
          <div key={mainTool.name} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">{mainTool.name}</h2>
            <p className="text-gray-600 mb-4">{mainTool.description}</p>
            <ul className="space-y-2">
              {mainTool.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <FaInfoCircle className="text-primary-600 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>

      {/* Video Tutorials */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tool.videos.map((video, index) => (
            <div key={index} className="relative group">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-75 transition-all duration-300 rounded-lg flex items-center justify-center">
                <FaPlay className="text-white text-4xl" />
              </div>
              <h3 className="mt-2 font-medium text-gray-900">{video.title}</h3>
              <p className="text-gray-500">{video.duration}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Infographics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Infographics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tool.infographics.map((infographic, index) => (
            <div key={index} className="group relative">
              <img
                src={infographic.image}
                alt={infographic.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-white font-medium">{infographic.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Resources and Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Resources</h2>
          <div className="space-y-4">
            {tool.resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100">
                <div>
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <p className="text-sm text-gray-500">{resource.type} • {resource.size}</p>
                </div>
                <FaFileDownload className="text-primary-600 text-xl cursor-pointer" />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Tips & Tricks</h2>
          <div className="space-y-3">
            {tool.tips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <FaLightbulb className="text-primary-600 mt-1 mr-3" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ToolDetails;