import React, { Component, PropTypes } from 'react';
import Layout from '../layouts/Shared/Layout';

const App = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
