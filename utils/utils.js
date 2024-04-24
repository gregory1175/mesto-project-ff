function checkResponse(response) {
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
}

async function request(url, options) {
    const response = await fetch(url, options);
    return checkResponse(response);
  }

export {
    request,
    checkResponse
}