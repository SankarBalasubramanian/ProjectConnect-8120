import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Tools from '../pages/Tools';
import ToolDetails from '../pages/ToolDetails';
import Community from '../pages/Community';
import Resources from '../pages/Resources';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tools" element={
        <ProtectedRoute>
          <Tools />
        </ProtectedRoute>
      } />
      <Route path="/tools/:toolId" element={
        <ProtectedRoute>
          <ToolDetails />
        </ProtectedRoute>
      } />
      <Route path="/community" element={
        <ProtectedRoute>
          <Community />
        </ProtectedRoute>
      } />
      <Route path="/resources" element={
        <ProtectedRoute>
          <Resources />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;