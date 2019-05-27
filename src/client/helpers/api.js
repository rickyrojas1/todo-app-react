/**
 * Fetches to the backend and directs results to proper function for processing
 *
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 * @param  {string} endpoint - String endpoint
 * @param  {function} cb - Callback function for returned data
 */
export function api(method, endpoint, data, cb) {
  const promise = getApiPromise(method, endpoint, data);

  promise
    .then(json => {
      if (typeof cb === "function") {
        cb(json);
      }
    })
    .catch(err => {
      console.log("error:", err);
    });
}

/**
 * HTML request to the backend
 * @param  {string} method - Request method
 * @param  {object} data - Todo object
 * @param  {string} endpoint - String endpoint
 *
 * @returns {promise} - Promise from the fetch request to the backend
 */
export function getApiPromise(method, endpoint, data) {
  let url = `http://localhost:3000/${endpoint}`;
  if (["DELETE", "PUT"].indexOf(method) !== -1) {
    url += `/${data.id ? data.id : ""}`;
  }

  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  if (data) {
    options.body = JSON.stringify({
      data
    });
  }

  return fetch(url, options).then(response => {
    if (response.status >= 400) {
      return response.json().then(err => Promise.reject(err.message));
    }

    return response.json();
  });
}
