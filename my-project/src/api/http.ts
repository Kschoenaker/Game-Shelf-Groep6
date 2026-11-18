export const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5182";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const problem: { title?: string; detail?: string } = await response.json();
      message = problem.detail ?? problem.title ?? message;
    } catch {
      // Some HTTP errors have no JSON response body.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
