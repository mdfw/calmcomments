import React from 'react';
import Posts from './Posts';
import CreatePostForm from './CreatePostForm';
import Timers from './Timers';

function Home() {
  return (
    <div id="bottombits" className="board">
      <CreatePostForm />
      <Timers />
      <Posts />
    </div>
  );
}

export default Home;
