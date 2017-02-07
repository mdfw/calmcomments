import React from 'react';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

const timeStyle = {
  fontSize: '10px',
  color: 'gray',
  marginLeft: '5px',
};


function Post(props) {
  let controls = null;
  if (props.canEditDelete) {
    controls = (
      <div style={timeStyle}>
        <a href="#" onClick={props.deleteActionHandler}>delete</a>
        <span> | </span>
        <a href="#" onClick={props.editActionHandler}>edit</a>
      </div>
    );
  }
  let editedTime = null;
  if (props.edited) {
    editedTime = ` | edited: ${moment(props.updatedAt).fromNow()}`;
  }
  const createdTime = moment(props.createdAt).fromNow();
  return (
    <div className="post">
      <div>
        <span className="post-account">{props.accountDisplayName}</span>
        <span style={timeStyle}>{createdTime}{editedTime}</span>
      </div>
      <div className="post-content"><ReactMarkdown source={props.messageValue} /></div>
      {controls}
    </div>
  );
}

Post.propTypes = {
  edited: React.PropTypes.bool,
  messageValue: React.PropTypes.string,
  createdAt: React.PropTypes.string,
  updatedAt: React.PropTypes.string,
  accountDisplayName: React.PropTypes.string,
  editActionHandler: React.PropTypes.func.isRequired,
  deleteActionHandler: React.PropTypes.func.isRequired,
  canEditDelete: React.PropTypes.bool,
};
Post.defaultProps = {
  edited: false,
  messageValue: '',
  createdAt: 0,
  updatedAt: 0,
  accountDisplayName: '',
  canEditDelete: false,
};

export default Post;
