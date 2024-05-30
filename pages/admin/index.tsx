import React from 'react';
import UserProfile from '../context/AuthContext';
import Layout from '@/components/container/Layout';

const AdminPage = () => {
  return (
    <Layout>
      <h1>You are in Admin Page</h1>
      <UserProfile />
    </Layout>
  );
};

export default AdminPage;
