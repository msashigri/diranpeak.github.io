import React from 'react';
import { UserDashboardPage } from './UserDashboardPage';

interface AdminDashboardPageProps {
  onNavigate: (route: string, param?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  return <UserDashboardPage initialTab="admin" onNavigate={onNavigate} />;
};
