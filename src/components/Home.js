import React, { useEffect } from 'react';


export default function Home(props) {
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className=' fw-bold display-1 text-muted text-center'>Welcome to Smart Lottery!</div>
        </div>
        <div className='row'>
          <img src={require('../images/Ethereum-Landscape-Black.png')} className="my-5 image-fluid float-start home-img" alt="Responsive image" />
        </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col home-text-below px-5 py-5 text-white text-center'>
            <h5 className='display-4'>Smart Lottery is a decentralized lottery hosting platform based on Ethereum Smart Contracts</h5>
            <br/>
            <h5 className='display-6'>A WEB 3.0 environment enforces fairness to a mostly infringed traditional method.</h5>
            <br/><br/>
            <p className='fs-5 text-left home-text-below'>This application extensively uses metamask for its transactions, please install it if u have'nt already.</p>
            <span><a href='https://metamask.io/download/' target='_blank'><img src={require('../images/MetaMask_icon.png')} height={'50vmax'} /></a></span>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
