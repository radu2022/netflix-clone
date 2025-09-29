import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, catagory}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGRmNzk0NjIwMGVmYTZkYWUyMjNlMzJmODJmMTViMCIsIm5iZiI6MTc1Nzk4MzQ5NC43NzQwMDAyLCJzdWIiOiI2OGM4YjMwNmJiYjkxNjRjMTMwYzExMDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.v5ti217bQcLZGHrD_XTbH6X417W0IoPrse7kbUk5WDs'
  }
};



  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }
  useEffect(() => {
    const currentRef = cardsRef.current;
    currentRef.addEventListener("wheel", handleWheel);

    return () => {
      currentRef.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(()=>{

  fetch(`https://api.themoviedb.org/3/movie/${catagory?catagory:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return (
            <Link
              to={`/Player/${card.id}`}
              className="card"
              key={index}
              aria-label={`Watch ${card.original_title || card.title}`}
            >
              <img
                src={
                  card.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${card.backdrop_path}`
                    : "/fallback.jpg"
                }
                alt={`${card.original_title || card.title} poster`}
              />
              <p>{card.original_title || card.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  )
}

export default TitleCards