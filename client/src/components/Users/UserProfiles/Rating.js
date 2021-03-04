import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import decode from 'jwt-decode';
import axios from 'axios';

const StarRating = (props) => {
  console.log('mentorId', props.mentorId);
  const [rating, setRating] = useState(props.rating);
  const [hover, setHover] = useState(null);
  console.log(props.rating, 'StarRating');

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
              onClick={() => {
                setRating(ratingValue);
                const formData = {
                  rating: ratingValue,
                  user: decode(localStorage.getItem('token'))._id,
                  mentorId: props.mentorId,
                };
                console.log('mentorid', formData.mentorId);
                console.log('userid', formData.user);

                axios
                  .post(`http://localhost:5000/api/rating/register`, formData)
                  .then((res) => {
                    window.location.reload();
                    console.log(res.data);
                  });
                console.log('my rating value', ratingValue);
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
