import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url) => {
  const [ws, setWebSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState(null);

  const reconnectInterval = useRef(1000); 
  const maxReconnectInterval = 30000; 
  const reconnectTimeout = useRef(null);

  const createWebSocket = () => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      setIsConnected(true);
      reconnectInterval.current = 1000; 
    };

    socket.onmessage = (event) => {
      setMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
      setIsConnected(false);

      reconnectTimeout.current = setTimeout(() => {
        createWebSocket();
        reconnectInterval.current = Math.min(reconnectInterval.current * 2, maxReconnectInterval);
      }, reconnectInterval.current);
    };

    setWebSocket(socket);
  };

  useEffect(() => {
    createWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      clearTimeout(reconnectTimeout.current);
    };
  }, [url]);

  const sendMessage = (data) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  };

  return { ws, isConnected, message, sendMessage };
};
