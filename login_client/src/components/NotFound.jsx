import React from 'react';

const NotFound = () => {
  const notFoundStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  };

  const headingStyles = {
    fontSize: '4rem',
    color: 'red',
  };

  const messageStyles = {
    fontSize: '1.5rem',
    marginTop: '20px',
  };

  return (
    <div style={notFoundStyles}>
      <h1 style={headingStyles}>404</h1>
      <p style={messageStyles}>Page Not Found</p>
    </div>
  );
};

export default NotFound;
