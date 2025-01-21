import React from 'react';
function Api( {name, img} ) {

  const [name, setName] = React.useState([]);

  let [img, setImg] = React.useState([]);
  return (
    <div className="card" style={{ width: "18rem", margin: "1rem auto" }}>
      <img 
        src={img}
        className="card-img-top" 
        alt="Game Cover" 
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
}

export default Api;
