import { connect } from 'react-redux';
import React from 'react';
import { fetchPosts } from '../actions/posts';
import Post from './Post';

/* Renders if there are no posts */
const noPostsStyle = {
  textAlign: 'center',
  fontSize: '20px',
  color: '#4376a3',
  marginTop: '30px',
};

const NoPosts = () => (
  <div id="noPosts" style={noPostsStyle}>
    There are no posts to show.
  </div>
);

/* Renders a list of posts */
const AllPosts = ({ posts }) => (
  <div>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);
AllPosts.propTypes = {
  posts: React.PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

/* Main container that manages showing of posts */
class PostsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    const allPosts = this.props.posts.posts;
    if (allPosts.length === 0) {
      return (<NoPosts />);
    }
    allPosts.sort(function comparePostDates(posta, postb) {
      if (posta.createdAt > postb.createdAt) {
        return -1;
      }
      if (posta.createdAt < postb.createdAt) {
        return 1;
      }
      // dates must be equal
      return 0;
    });
    return (
      <AllPosts posts={allPosts} />
    );
  }
}

PostsContainer.propTypes = {
  posts: React.PropTypes.object, // eslint-disable-line react/forbid-prop-types
  dispatch: React.PropTypes.func.isRequired,
};
PostsContainer.defaultProps = {
  posts: {},
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
};

const Container = connect(mapStateToProps)(PostsContainer);

export default Container;
