function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri === '/') {
    request.uri = '/index.html';
  } else if (!uri.match(/\.[^/]+$/)) {
    request.uri = uri.replace(/\/$/, '') + '.html';
  }
  return request;
}
