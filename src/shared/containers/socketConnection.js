import io from 'socket.io-client';
import { receiveListeners, receiveTime } from '../actions/listeners';
import { receivePosts } from '../actions/posts';

const socketConnection = function socketConnection(dispatch) {
  const socket = io();

  socket.on('connect_failed', () => {
    socket.close();
  });

  socket.on('disconnect', () => {
    socket.close();
  });

  socket.on('messages', (messages) => {
    console.log('socket: messages');
    console.dir(messages);
    dispatch(
      receivePosts(messages),
    );
  });

  socket.on('listeners', (listeners) => {
    console.log('socket: listeners');
    dispatch(
      receiveListeners(listeners),
    );
  });


  socket.on('tick', (now, later) => {
    dispatch(
      receiveTime(now, later),
    );
  });
};

export default socketConnection;
