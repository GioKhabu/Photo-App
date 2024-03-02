export async function fetcher(endpoint: string): Promise<any> {
  const response = await fetch(endpoint);
  if (!response.ok) {
      throw new Error("Failed to fetch data");
  }
  const json = await response.json();
  return json;
}