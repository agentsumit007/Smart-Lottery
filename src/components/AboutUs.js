import React, { useState } from 'react'
import WinnerListItem from './WinnerListItem';



export default function AboutUs(props) {


  return (
    <>
      <p className='display-6 text-center text-white'>Welcome to our project! We are a team of dedicated individuals passionate about leveraging blockchain technology to create secure and transparent solutions. Our project aims to harness the power of smart contracts to revolutionize various industries and enhance trust in transactions.</p>
    <div className='container my-5'>
      <p className='lead text-white'>Group Members:</p>
      <div className='row'>
        <div className='col '>
          <div class="card" style={{ width: '18rem' }}>
            <img src={require('../images/sumit.jpg')} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">Sumit Kesarwani</p>
              <p class="card-text">
                Email: sumitkesarwani168@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className='col '>
          <div class="card" style={{ width: '18rem' }}>
            <img src={require('../images/sundaram.jpg')} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">Sundaram Mishra</p>
              <p class="card-text">Email id: sundarammishra2000@gmail.com</p>
              <p class="card-text">
              
              </p>
            </div>
          </div>
        </div>
        <div className='col '>
          <div class="card" style={{ width: '18rem' }}>
            <img src={require('../images/suji.jpg')} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">Suraj Pandey</p>
              <p class="card-text">Email: surajpandey5858@gmail.com</p>
            </div>
          </div>
        </div>
        <div className='col '>
          <div class="card" style={{ width: '18rem' }}>
            <img src={require('../images/utsav.jpg')} class="card-img-top" alt="..." />
            <div class="card-body">
              <p class="card-text">Utsav Kesarwani</p>
              <p class="card-text">Email id: utsavkes29@gmail.com</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
