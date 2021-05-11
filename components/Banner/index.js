import React from 'react';
import { Message } from 'semantic-ui-react';

/**
 * Banner component for landing page. Displays
 * a header string and optional paragraph content
 * passed in as prop arguments.
 *
 * @param {Object} content
 * @param {String} content.header Header string for banner
 * @param {String} content.paragraph pargraph string that can contain be html
 */
const Banner = ({ header, paragraph, handleDismiss }) => {
  return (
    <>
      <Message positive onDismiss={handleDismiss}>
        <Message.Header>{header}</Message.Header>
        <p>{paragraph}</p>
      </Message>
    </>
  );
};

export default Banner;
