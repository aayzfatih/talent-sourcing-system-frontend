let newLocal = null;

if (window.location.host == "localhost:5173") {
  newLocal = `${window.location.protocol}//${window.location.hostname}:3000/api/v1`;
} else {
  if (window.location.hostname == "localhost") {
    newLocal = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api/v1`;
  } else {
    newLocal = `${window.location.protocol}//${window.location.hostname}/api/v1`;
  }
}
export const apiUrl = newLocal;
