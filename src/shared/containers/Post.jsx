import { connect } from 'react-redux';
import React from 'react';
import Post from '../components/Post';
import EditPost from './EditPost';
import beginForm from '../actions/forms';
import deletePost from '../actions/posts';


/* Main container that manages showing of posts */
class PostContainer extends React.Component {
  handleEditRequest() {
    const formName = `editPost${this.props.post.id}`;
    this.props.dispatch(
     beginForm(formName, this.props.post),
    );
  }
  handleDelete() {
    if (this.props.submitError) {
      this.props.dispatch(deletePost(this.props.post.id));
    }
  }
  render() {
    const formName = `editPost${this.props.post.id}`;
    const editPostForm = this.props.forms[formName];
    

    if (!editPostForm) {
      return (
        <Post 
          messageValue={this.props.post.message}
          createdDate={this.props.post.createdAt}
          displayName={this.props.post.Account.displayName}
          handleEdit={this.handleEditRequest}
          handleDelete={this.handleDelete}
        />
      )
    }
    return (
      <EditPost
        formName={formName}
        postId={this.props.post.postId}
        message={this.props.post.message}
      />
    );
  }
}

PostContainer.propTypes = {
  dispatch: React.PropTypes.func,
  post: React.PropTypes.object,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    forms: state.forms,
    accountId: state.account.accountId,
  };
};

const Container = connect(mapStateToProps)(PostContainer);

export default Container;
