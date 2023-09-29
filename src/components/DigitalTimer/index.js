// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: 25,
    timeElapsedInMins: 25,
    timeElapsedInSecs: 0,
    timerRunning: false,
    secs: 59,
    reset: true,
  }

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  timeElapsedDecrement = () => {
    const {timeElapsedInMins, timeElapsedInSecs, secs} = this.state

    if (timeElapsedInMins > 0 || secs > 0) {
      this.setState(prev => ({
        secs: prev.secs - 1,
        timeElapsedInSecs: prev.secs - 1,
      }))
    } else if (timeElapsedInMins > 0 && timeElapsedInSecs === 0) {
      this.setState(prev => ({
        timeElapsedInMins: prev.timeElapsedInMins - 1,
        secs: 59,
        timeElapsedInSecs: 59,
      }))
    }
    if (timeElapsedInMins === 0 && timeElapsedInSecs === 0) {
      this.setState({timerRunning: false})
    }
  }

  clickPlayPause = () => {
    const {timeElapsedInMins, timer, secs, timerRunning} = this.state

    if (timerRunning) {
      this.clearTimerInterval()
      this.setState({timerRunning: false})
    } else if (timerRunning === false && timeElapsedInMins > 0) {
      this.setState({
        timeElapsedInMins: timer - 1,
        timeElapsedInSecs: secs,
        timerRunning: true,
        reset: false,
      })
      this.intervalId = setInterval(this.timeElapsedDecrement, 1000)
    }
  }

  incrementBtn = () => {
    const {timeElapsedInMins, reset} = this.state
    if (reset === true) {
      return this.setState(prev => ({
        timeElapsedInMins: prev.timer + 1,
        timer: prev.timer + 1,
        timeElapsedInSecs: 0,
      }))
    }
    return timeElapsedInMins
  }

  decrementBtn = () => {
    const {timer, reset} = this.state
    if (reset === true) {
      if (timer > 0) {
        this.setState(prev => ({
          timeElapsedInMins: prev.timer - 1,
          timer: prev.timer - 1,
          timeElapsedInSecs: 0,
        }))
      }
    }
  }

  resetClicked = () => {
    const {timer} = this.state
    this.clearTimerInterval()
    this.setState({
      timeElapsedInMins: timer,
      timeElapsedInSecs: 0,
      timerRunning: false,
      secs: 59,
      reset: true,
    })
  }

  render() {
    const {
      timerRunning,
      timeElapsedInMins,
      timer,
      timeElapsedInSecs,
    } = this.state

    const stringifiedMins =
      timeElapsedInMins < 10 ? `0${timeElapsedInMins}` : timeElapsedInMins

    const stringifiedSecs =
      timeElapsedInSecs < 10 ? `0${timeElapsedInSecs}` : timeElapsedInSecs

    return (
      <div className="white-bg">
        <div className="DigitalTimer-bg">
          <h1 className="DigitalTimer-title">Digital Timer</h1>
          <div className="Timer-section-container">
            <div className="sub-DigitalTimer-bg">
              <div className="timer-box">
                <h1 className="timing-text">
                  {stringifiedMins}:{stringifiedSecs}
                </h1>
                {timerRunning ? (
                  <p className="timing-status">Running</p>
                ) : (
                  <p className="timing-status">Paused</p>
                )}
              </div>
            </div>
            <div className="timer-right-section">
              <div className="play-pause-reset-container">
                <div className="play-pause-reset">
                  {timerRunning === false ||
                  (timeElapsedInMins === 0 && timeElapsedInSecs === 0) ? (
                    <button
                      type="button"
                      className="play-pause-reset-button"
                      onClick={this.clickPlayPause}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                        alt="play icon"
                        className="play-pause-reset-icon"
                      />
                      <p type="button" className="timer-common-text">
                        Start
                      </p>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="play-pause-reset-button"
                      onClick={this.clickPlayPause}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                        alt="pause icon"
                        className="play-pause-reset-icon"
                      />
                      <p type="button" className="timer-common-text">
                        Pause
                      </p>
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className="reset-button"
                  onClick={this.resetClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="play-pause-reset-icon"
                  />
                  <p className="timer-common-text">Reset</p>
                </button>
              </div>
              <p className="timer-header">Set Timer Limit</p>
              <div className="timer-adjust-container">
                <button
                  type="button"
                  className="minus-plus-btn"
                  onClick={this.decrementBtn}
                >
                  -
                </button>
                <div className="timer-value">
                  <p className="timer-common-text">{timer}</p>
                </div>

                <button
                  type="button"
                  className="minus-plus-btn"
                  onClick={this.incrementBtn}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
