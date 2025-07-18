import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';

function App() {
  const [user, setUser] = React.useState(null);
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    
    newSocket.on('newQuestion', (data) => {
      console.log('New question:', data);
    });

    return () => newSocket.close();
  }, []);

  return (
    <div className="App">
      {!user ? <Login setUser={setUser} /> : <AdminPanel user={user} socket={socket} />}
    </div>
  );
}

export default App;
