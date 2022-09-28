
import React from 'react'
import { useState } from 'react';
import './Rating.css';
import { FaStar } from "react-icons/fa"



const Rating = () => {

  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="starrating">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <label>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={100}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        )
      })}
    </div>
  )
}

export default Rating