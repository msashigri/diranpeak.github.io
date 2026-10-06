import React from 'react';
import { UserDashboardPage } from './UserDashboardPage';

export const AdminDashboardPage: React.FC<{ onNavigate: (route: string, param?: string) => void }> = ({ onNavigate }) => {
  return <UserDashboardPage onNavigate={onNavigate} />;
};
