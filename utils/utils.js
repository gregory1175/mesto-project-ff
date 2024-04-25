function checkResponse(res) {
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

async function request(url, options) {
    const response = await fetch(url, options);
    return checkResponse(response);
  }

export {
    request,
    checkResponse
}