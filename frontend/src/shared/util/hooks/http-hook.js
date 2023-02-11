import { useCallback, useState } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      try {
        setIsLoading(true);
        const response = await fetch(url, { method, body, headers });
        const responseData = await response.json();
        setIsLoading(false);

        if (!response.ok) {
          throw new Error(responseData.message);
        }
        return responseData;
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { sendRequest, isLoading, error, clearError };
};
