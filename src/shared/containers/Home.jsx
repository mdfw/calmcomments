import React from 'react';
import Posts from './Posts';
import Listeners from './Listeners';

function Home() {
  return (
    <div id="board" className="board">
      <div className="leftSide">
        <Listeners />
      </div>
      <div className="rightSide">
        <Posts />
      </div>
    </div>
  );
}


export default Home;
