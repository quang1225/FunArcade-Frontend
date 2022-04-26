import { Route, Routes, Navigate } from 'react-router-dom';
import UserLayout from './UserLayout/Loadable';
import ProvablyFairPage from '../ProvablyFairPage/Loadable';
import NotFoundPage from 'app/pages/NotFoundPage/Loadable';

const UserPage = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="cashier" replace />} />
      <Route path="provably-fair/*" element={<ProvablyFairPage />} />
      <Route path="/*" element={<UserLayout />} />
      <Route path="" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserPage;
