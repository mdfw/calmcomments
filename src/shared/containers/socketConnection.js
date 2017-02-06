import io from 'socket.io-client';
import { receiveListeners, receiveTime } from '../actions/listeners';
import { receivePosts } from '../actions/posts';

const socketConnection = function socketConnection(dispatch) {
  const socket = io();
  console.log('socket connection');
  console.dir(socket);
  socket.on('connect_failed', () => {
    socket.close();
  });

  socket.on('disconnect', () => {
    socket.close();
  });

  socket.on('messages', (messages) => {
    console.log('messages');
    console.dir(messages);
  });

  socket.on('tick', (now, later) => {
    dispatch(
      receiveTime(now, later),
    );
  });
};

export default socketConnection;
