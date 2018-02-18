import React from 'react';

import { Countdown } from './countdown';

export function Banner() {
  return (
    <section className="banner">
      <header>
          <div className="title">Chennai <span>Js</span></div>
      </header>
      <nav>
        <a href="#" className="menus">Home</a>
        <a href="#topics" className="menus">Topics</a>
        <a href="#" className="menus">Speakers</a>
        <a href="#" className="menus">About</a>
        <a href="#" className="menus">Join Us</a>
      </nav>
      <div className="meetup-details">
        <div className="date">17-2-2018</div>
        <div className="title">
          <h1>Febuary Meetup</h1>
          <p className="hint"><span>Js</span> Conference</p>
        </div>
        <div className="joinus">Join the <b>Conference</b></div>
      </div>
      <Countdown days={10} hours={10} minutes={10}/>
      <div className="scrolldown">
        <div className="mousebox"></div>
        <p>Scroll down</p>
      </div>
    </section>
  )
}