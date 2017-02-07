import io from 'socket.io-client';
import { receiveListeners, receiveTime } from '../actions/listeners';
import { receivePosts } from '../actions/posts';

const socketConnection = function socketConnection(dispatch) {
  const socket = io();

  socket.emit('nick', 'James Watt');

  socket.on('connect_failed', () => {
    socket.close();
  });

  socket.on('disconnect', () => {
    socket.close();
  });

  socket.on('messages', (messages) => {
    dispatch(
      receivePosts(messages),
    );
  });

  socket.on('listeners', (listeners) => {
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
