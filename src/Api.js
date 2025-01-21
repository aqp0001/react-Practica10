fetch('https://api.rawg.io/api/games?key=7533378071154d42917b6b92485bcede')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error al realizar la solicitud:",
error));

