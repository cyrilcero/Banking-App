import React from 'react';
import image from '../assets/underConstruction.png';
import { Link, useNavigate } from 'react-router-dom';

function UnderConstr() {
  const navigate = useNavigate();

  return (
    <section className='underconstruction'>
      <img className='image-underconst' src={image} alt="" />
      <h1>page under maintenance</h1>
      <span>This page is currently under maintenance. We should be back shortly.</span>

      <button>
        <Link
          to="/"
          onClick={() => navigate(-1)}
        >
          <span>Go back</span>
        </Link>
      </button>      
    </section>
  )
}

export default UnderConstr