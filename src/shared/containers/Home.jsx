import React from 'react';
import Posts from './Posts';
import CreatePostForm from './CreatePostForm';

function Home() {
  return (
    <div id="bottombits" className="board">
      <CreatePostForm />
      <Posts />
    </div>
  );
}

export default Home;
