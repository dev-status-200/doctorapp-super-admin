// pages/_error.js
import React from 'react';

const error = ({ statusCode }) => {
  return (
    <div>
      <h1>Error {statusCode}</h1>
      <p>
        {statusCode === 404
          ? 'The page you are looking for does not exist.'
          : 'An error occurred on this page.'}
      </p>
    </div>
  );
};

error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default error;
