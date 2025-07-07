import React from 'react';
import UserProfileManager from '@/components/profile/UserProfileManager';

const UserProfilePage: React.FC = () => {
  return (
    <main className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
      </div>
      <UserProfileManager />
    </main>
  );
};

export default UserProfilePage;