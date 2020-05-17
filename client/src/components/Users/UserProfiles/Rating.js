import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import decode from 'jwt-decode';
import axios from 'axios';
const StarRating = (props) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              style={{ display: 'none' }}
              type="radio"
              name="rating"
              value={ratingValue}
              // onClick={() => setRating(ratingValue)}
              onLoad={() => {
                axios.get(`http://localhost:5000/api/rating/`).then((res) => {
                  console.log(res.data.rating);
                  setRating(res.data.rating.rating);
                });
              }}
              onClick={() => {
                setRating(ratingValue);
                const formData = {
                  rating: ratingValue,
                  user: decode(localStorage.getItem('token'))._id,
                };
                axios
                  .post(`http://localhost:5000/api/rating/register`, formData)
                  .then((res) => {
                    console.log(res.data.rating);
                    setRating(res.data.rating.rating);
                  });
                console.log(ratingValue);
              }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              style={{ cursor: 'pointer', transition: 'color 200ms' }}
              size={20}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
