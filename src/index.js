import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            minutes: 25,
            seconds: 0,
            disableBtn: false,
            isBreak: false,
        }
        this.tickDown = this.tickDown.bind(this)
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.sessionPlus = this.sessionPlus.bind(this)
        this.sessionMinus = this.sessionMinus.bind(this)
        this.breakPlus = this.breakPlus.bind(this)
        this.breakMinus = this.breakMinus.bind(this)
        this.Beep = this.Beep.bind(this)
    }
    Beep() {
        var audioCtx = window.AudioContext || window.webkitAudioContext;
        var audio = new audioCtx();
        var osc = audio.createOscillator();
        var gain = audio.createGain();
        
        osc.connect(gain);
        gain.connect(audio.destination);
        
        gain.gain.value = 1;
        osc.frequency.value = 750;
        osc.type = 0;
        
        osc.start();
        
        setTimeout(function() {
          osc.stop();
        }, 500)
      }
    tickDown() {
        if (this.state.minutes < 1) {
            document.getElementById('timer').classList.add('animate')
        }
        if (this.state.minutes >= 0) {
            if (this.state.seconds === 0) {
                this.setState({
                    seconds: this.state.seconds + 59,
                    minutes: this.state.minutes -1
                })
            } else {
                this.setState({
                    seconds: this.state.seconds -1
                })
            }
        } if (this.state.minutes < 0 && this.state.isBreak === false) {
            document.getElementById('timer').classList.remove('animate');
            this.Beep();
            this.setState({
                minutes: this.state.breakLength - 1,
                isBreak: true,
            })
        } else if (this.state.minutes < 0 && this.state.isBreak === true) {
            document.getElementById('timer').classList.remove('animate');
            this.Beep();
            this.setState({
                minutes: this.state.sessionLength - 1,
                isBreak: false,
            })
        }
    }
    startTimer() {
        if (this.state.minutes >= 0) {
            this.setState({
                disableBtn: true
            })
            this.app = setInterval(this.tickDown, 1000);
        }
    }
    stopTimer() {
        this.app = clearInterval(this.app);
        this.setState({
            disableBtn: false
        })
    }
    resetTimer() {
        this.app = clearInterval(this.app);
        this.setState({
            minutes: this.state.minutes - this.state.minutes + 25,
            seconds: this.state.seconds - this.state.seconds,
            disableBtn: false,
            sessionLength: this.state.sessionLength - this.state.sessionLength + 25,
            breakLength: this.state.breakLength - this.state.breakLength + 5,
        })
    }
    sessionPlus() {
        this.setState({
            minutes: this.state.sessionLength + 1,
            sessionLength: this.state.sessionLength + 1,
            seconds: this.state.seconds - this.state.seconds,
        })
    }
    sessionMinus() {
        if (this.state.sessionLength > 1) {
            this.setState({
            sessionLength: this.state.sessionLength - 1,
            seconds: this.state.seconds - this.state.seconds,
            minutes: this.state.sessionLength -1,
        })
        }
    }
    breakPlus() {
            this.setState({
                breakLength: this.state.breakLength +1
            })
    }
    breakMinus() {
        if (this.state.breakLength > 1) {
            this.setState({
                breakLength: this.state.breakLength -1
            })
        }
    }
    render() {
        let minute = ('0' + this.state.minutes).slice(-2);
        let second = ('0' + this.state.seconds).slice(-2);
        return(
            <div id='container'>
                <h1>Pomorodo Clock</h1>
                <div id='timerBox'>
                    <h2>{(this.state.isBreak) ? 'Break' : 'Session'}</h2>
                    <div id='timer'>{minute} : {second}</div>
                </div>
                <div id='controlsBox'>
                  <button id='start' onClick={this.startTimer} disabled={this.state.disableBtn}>start</button>
                  <button id='stop' onClick={this.stopTimer}>stop</button>
                  <button id='reset'onClick={this.resetTimer}>reset</button>
                </div>
                <div id='sessionLength'>
                  <h3>Session Length</h3>
                </div>
                <div id='sessionBtns'>
                  <button onClick={this.sessionPlus} disabled={this.state.disableBtn}>up</button>
                  <div class='setNum'>{this.state.sessionLength}</div>
                  <button onClick={this.sessionMinus} disabled={this.state.disableBtn}>down</button>
                </div>
                <div id='breakLength'>
                  <h3>Break Length</h3>
                </div>
                <div id='breakBtns'>
                  <button onClick={this.breakPlus} disabled={this.state.disableBtn}>up</button>
                  <div class='setNum'>{this.state.breakLength}</div>
                  <button onClick={this.breakMinus} disabled={this.state.disableBtn}>down</button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));