import React from 'react';
import ReactMarkdown from 'react-markdown';

const postContainerStyle = {
  padding: '10px',
};

function Post(props) {
  return (
    <div className="post">

        <div className="post-content">{ props.message }</div>
    </div>
  );
}

Post.propTypes = {
  postId: React.PropTypes.number.isRequired,
  edited: React.PropTypes.bool,
  message: React.PropTypes.string,
  createdAt: React.PropTypes.number,
  updatedAt: Ract.PropTypes.number,
  accountDisplayName: React.PropTypes.string,
};
Post.defaultProps = {
  edited: false,
  message: '',
  createdAt: 0,
  updatedAt: 0,
  accountDisplayName: '',
};

export default Post;
