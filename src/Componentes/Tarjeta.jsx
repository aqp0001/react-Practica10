import React from 'react';
function Api() {

  const [gamesTitle, setGamesTitle] = React.useState([]);

  let [images, setImages] = React.useState([]);
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem auto" }}>
      <img 
        src={images}
        className="card-img-top" 
        alt="Game Cover" 
      />
      <div className="card-body">
        <h5 className="card-title">{gamesTitle}</h5>
      </div>
    </div>
  );
}

export default Api;
