import { useState } from "react";

interface UseMutationState<TData> {
  loading: boolean;
  data?: TData;
  error?: any;
}

type UseMutationResult<TData> = [(data: any) => Promise<TData>, UseMutationState<TData>];

export default function useMutation<TData = any>(url: string): UseMutationResult<TData> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);

  async function mutation(formData: any): Promise<TData> {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } else {
        const errorData = await response.json();
        console.error("Request failed with status " + response.status);
        setError(errorData);
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      console.error(error);
      setError(error);
      return null!;
    } finally {
      setLoading(false);
    }
  }

  return [mutation, { loading, data, error }];
}
