import React,{ useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


 


const TitleCards = ({title,category}) => {

  const [apiData,setApiData]=useState([]);
    
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTAyMDFjYmQxOTNiMjVlOWRhOGMzOTAyYjhjZTkzYiIsIm5iZiI6MTczNDc4NjQ1OS4yLCJzdWIiOiI2NzY2YmQ5YjhlOWQ5Y2NkZWI5MGYzMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fp-Ej_hnt30E-PSv7gqIeqcVdNIJfWgH3phhMvZzPmQ'
    }
  };
  
  // fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  //   .catch(err => console.error(err));
  // fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)

  const handleWheel = (event)=>{
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  return (
    // <div className='titelcards'> 

    //    <h2>{title?title:"Popular on Netflix"}</h2>
    //    <div className="card-list" ref={cardsRef}>
    //     {apiData.map((card,index)=>{
    //       return <Link to={`/player/${card.id}`} className="card" key={index}>
    //         <img src={ `https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
    //         <p>{card.original_title}</p>
    //       </Link>
    //     })}
    //    </div>
         
    // </div>
    <div className='titelcards'> 

        <h2>Popular on Netflix</h2>
        <div className="card-list" ref={cardsRef}>
        {cards_data.map((card,index)=>{
          return <div className="card" key={index}>
            <img src={ card.image} alt="" />
            <p>{card.name}</p>
          </div>
        })}
        </div>
      
    </div>
  )
}

export default TitleCards