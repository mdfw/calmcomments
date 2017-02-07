import { connect } from 'react-redux';
import React from 'react';
import Post from '../components/Post';
import EditPost from './EditPost';
import { beginForm } from '../actions/forms';
import { deletePost } from '../actions/posts';


/* Main container that manages showing of posts */
class PostContainer extends React.Component {
  constructor() {
    super();
    this.handleEditRequest = this.handleEditRequest.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleEditRequest() {
    const formName = `editPost${this.props.post.id}`;
    this.props.dispatch(
      beginForm(formName, this.props.post),
    );
  }
  handleDelete() {
    const toDelete = deletePost(this.props.post.id);
    this.props.dispatch(
      toDelete,
    );
  }
  render() {
    const formName = `editPost${this.props.post.id}`;
    const editPostForm = this.props.forms[formName];
    if (!editPostForm) {
      const post = this.props.post;
      let canEditDelete = false;
      if (this.props.account.accountId === post.AccountId) {
        canEditDelete = true;
      }
      return (
        <Post
          postId={post.id}
          messageValue={post.message}
          createdAt={post.createdAt}
          updatedAt={post.updatedAt}
          edited={post.edited}
          accountDisplayName={post.Account.displayName}
          editActionHandler={this.handleEditRequest}
          deleteActionHandler={this.handleDelete}
          canEditDelete={canEditDelete}
        />
      );
    }
    return (
      <EditPost
        formName={formName}
        postId={this.props.post.id}
        message={this.props.post.message}
      />
    );
  }
}

PostContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  post: React.PropTypes.object.isRequired,
  forms: React.PropTypes.object,
  accountId: React.PropTypes.number,
  account: React.PropTypes.object,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    forms: state.forms,
    account: state.account,
  };
};

const Container = connect(mapStateToProps)(PostContainer);

export default Container;
