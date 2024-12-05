/**
 * Wrap XHR in promise
 *
 * @param url
 * @param method
 * @param data
 * @param options
 * @returns {Promise<*>}
 */
function makeRequest(url, method = 'GET', data = null, options = {}) {
  // Create the XHR request
  const request = new XMLHttpRequest();

  // Return it as a Promise
  return new Promise(function(resolve, reject) {
    // Setup our listener to process completed requests
    request.onreadystatechange = function() {
      // Only run if the request is complete
      if (request.readyState !== 4) return;

      try {
        // Process the response
        resolve(JSON.parse(request.responseText));
      } catch (e) {
        reject(e);
      }
    };

    // Setup our HTTP request
    request.open(method, url, true);

    // Send the request
    if (data) {
      const contentType = options.contentType || 'application/json;charset=UTF-8';
      request.setRequestHeader('Content-Type', contentType);
      request.send(JSON.stringify(data));
    } else {
      request.send(data);
    }
  });
}

export default makeRequest;
