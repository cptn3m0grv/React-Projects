import './App.css';
import React, { useState, useEffect } from 'react';

const url = 'https://course-api.com/react-tours-project';

const Tour = ({id, name, info, price, image, removeTour}) => {
  const [readMore, setReadMore] = useState(false);
  return(
    <article className='single-tour'>
      <img src={image} alt={name} />
      <footer>
        <div className='tour-info'>
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
        </p>
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? 'show less' : 'show more'}
        </button>
        <button className='delete-btn' onClick={() => removeTour(id)}>Not Interested</button>
      </footer>
    </article>
  );
};

function Tours({tours, removeTour}){
  return(
    <section>
      <div className='title'>
        <h2>Our Tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => {
          return <Tour key={tour.id} {...tour} removeTour={removeTour}/>
        })}
      </div>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  }

  const fetchTours = async() => {
    setLoading(true);
    try{
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    }catch(error){
      setLoading(false);
      console.log(error);
    }
    console.log(tours);
  }

  useEffect(()=> {
    fetchTours();
  }, []);

  if(loading){
    return(
      <h1>Loading...</h1>
    );
  }
  if(tours.length === 0){
    return <main>
      <div className='title'>
        <h2>No Tours Left</h2>
        <button onClick={fetchTours}>
          Refresh
        </button>
      </div>
    </main>
  }
  return (
    <div className="main-container">
      <Tours tours={tours} removeTour={removeTour}/>
    </div>
  );
}

export default App;
