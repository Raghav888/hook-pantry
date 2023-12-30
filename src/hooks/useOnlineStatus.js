import { useEffect, useState } from "react";

export const useOnlineStatus = () => {
  const [isOnline, setOnline] = useState(true);

  const offlineHandler = () => setOnline(false);

  const onlineHandler = () => setOnline(true);

  useEffect(() => {
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  return [isOnline];
};
