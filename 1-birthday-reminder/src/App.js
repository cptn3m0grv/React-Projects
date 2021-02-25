import './App.css';
import React, { useState } from 'react';
import data from './data';

function List({ birthday }){
  return(
    <>
      {birthday.map((item) => {
        const { id, name, age, image } = item;
        return(
          <article key={id} className='person'>
            <img src={image} alt={name} />
            <div className="space-between">
              <h4>{name}</h4>
              <p>{age} years</p>
              <hr />
            </div>
          </article>
        ); 
      })}
    </>
  );
}

function App() {
  // console.log(data)
  const [birthday, setBirthDay] = useState(data);
  return (
    <div className="center-element">
      <h1>{birthday.length} Birthdays Today</h1>
      <List birthday={birthday}/>
      <div className="btn">
        <button onClick={() => setBirthDay([])}>Clear All</button>
      </div>
    </div>
  );
}

export default App;
