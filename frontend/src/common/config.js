const API_LOC = import.meta.env.VITE_API_LOCATION;
const PORT = import.meta.env.VITE_API_PORT;

function getPaintApiEndpoint() {
  let url = API_LOC;
  if (PORT) {
    url = `${url}:${PORT}`;
  }
  return url;
}

export default { getPaintApiEndpoint };