import { useState, useEffect } from "react";

export const  useSmartPolling=(apiCall, initialInterval = 5000, maxInterval = 30000)=> {
  const [pollingInterval, setPollingInterval] = useState(initialInterval);
  const [apiResponse, setApiResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiCall();
        setApiResponse(result);
        if (result.success) {
          setPollingInterval(initialInterval);
        } else {
          setPollingInterval(Math.min(pollingInterval * 2, maxInterval));
        }
      } catch (error) {
        console.error("failed api call");
      }
    };

    fetchData();

    let id = setInterval(fetchData, pollingInterval);

    return () => {
      clearInterval(id);
    };
  }, [apiCall, initialInterval, maxInterval, pollingInterval]);

  return {
    pollingInterval,
    apiResponse
  };
}
