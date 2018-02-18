import React from 'react';
import PropTypes from  'prop-types';

Countdown.propTypes = {
  days: PropTypes.number,
  hours: PropTypes.number,
  minutes: PropTypes.number,
}

export function Countdown(props) {
  props = Object.assign({days: 0, hours: 0, minutes: 0}, props);
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  
  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      var t = getTimeRemaining(endtime);
  
      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
  
    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  var dayInAdvance = props.days * 24 * 60 * 60 * 1000 + (props.hours * 60 * 60 * 1000) + (props.minutes * 60) * 1000 + 1000;
  var deadline = new Date(Date.parse(new Date()) + dayInAdvance);
  setInterval(() => initializeClock('clock', deadline))

  return (
    <div className="clock" id="clock">
      <div className="ticks">
        <h3 className="days">18</h3>
        <small>Days</small>
      </div>
      <div className="ticks">
        <h3 className="hours">18</h3>
        <small>Hours</small>
      </div>
      <div className="ticks">
        <h3 className="minutes">36</h3>
        <small>Min</small>
      </div>
      <div className="ticks">
        <h3 className="seconds">40</h3>
        <small>Sec</small>
      </div>
    </div>
    
  )
}