export default async function fetchWithError(
    url: string | URL | Request,
    options?: RequestInit | undefined,
) {
    const response = await fetch(url, options);

    if (response.status === 200) {
        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        return result;
    }

    throw new Error(`Error ${response.status}: ${response.statusText}`);
}
