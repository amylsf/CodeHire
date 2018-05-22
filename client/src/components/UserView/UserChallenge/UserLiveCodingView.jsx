import React, { Component } from 'react';
import { connect } from 'react-redux';
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2'
import moment from 'moment';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';

class UserLiveCodingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: '',
      seconds: '',
      code: `function ${this.props.location.challenge.function_name}(${this.props.location.challenge.parameters}) {

}`,
      inChallenge: true,
      submission: '',
      exampleInputs: [],
      exampleOutputs: []
    }

    this.socket = socketClient();
    this.onChange = this.onChange.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
    this.saveResults = this.saveResults.bind(this)
    this.checkAnswer = this.checkAnswer.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getExamples = this.getExamples.bind(this)

    this.socket.on('add char', (chars)=> {
      this.setState({
        code: chars
      })
    })

    this.socket.on('show time_limit', (minutes, seconds) => {
      this.setState({ minutes: minutes, seconds: seconds });
    })
  }

  componentDidMount() {
     this.socket.emit('candidate enter', localStorage.getItem('username'), this.props.current_company_calendar);
  }

  componentWillUnmount() {
    this.socket.emit('candidate disconnect', localStorage.getItem('username'), this.props.current_company_calendar);
  }

  onChange(newValue, event) {
    this.setState({
      code: newValue
    }, ()=> console.log(this.state.code))
    this.socket.emit('typing', newValue, localStorage.getItem('username'));
  }

  handleTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }

  getExamples() {
    let examplesS = this.props.location.challenge.examples.replace(/"/g, "'")
    let examplesD = examplesS.replace(/'/g, '"')
    let examples = JSON.parse(examplesD)
    let exampleInputs = examples[0].map((el)=> {
      return JSON.stringify(el)
    })
    let exampleOutputs = examples[1].map((el)=> {
      return JSON.stringify(el)
    })

    this.setState({
      exampleInputs: exampleInputs,
      exampleOutputs: exampleOutputs
    })
  }


  saveResults(companyScheduleId, result, submission, score, time) {

    this.socket.emit('candidate result', localStorage.getItem('username'), result);
    
    let challenge_id = this.props.location.challenge.challenge_id
    let company_id = localStorage.getItem('companyId')
    let candidate_id = localStorage.getItem('userId')
    let userSchedule_id = this.props.location.challenge.id
    this.props.saveResults(company_id, result, submission, score, time, challenge_id, company_id, candidate_id, false, userSchedule_id, () => {})
  }

  checkAnswer() {
    let params = this.props.location.challenge.parameters
    let testCaseS = this.props.location.challenge.test_cases.replace(/"/g, "'")
    let testCaseD = testCaseS.replace(/'/g, '"')

    let tests = JSON.parse(testCaseD)
    let input = tests[0].map((el)=> {
      return JSON.stringify(el)
    }).join(',')
    let output = tests[1].map((el)=> {
      return JSON.stringify(el)
    }).join(',')
    input = input.replace(/'/g, "")
    output = output.replace(/'/g, "")

    let reg = new RegExp(`${params}`, 'g')
    let submittedCode = `${this.state.code.replace(reg, `${params}`)}

    ${this.props.location.challenge.function_name}(${input})
    `
    if (this.state.inChallenge) {
      window.onerror = () => {
        swal(
          'There was an error in your code',
          'Double check your syntax and try again!',
          'warning'
        )
      }
    }

    let answer = eval(submittedCode)
    this.setState({
      submission: submittedCode
    })
    return JSON.stringify(answer) === output
  }

  handleSubmit() {
    let result = this.checkAnswer()
    let score = 90 //hardcoded
    let time = moment(Date.now()).format()
    swal({
      title: 'Are you sure?',
      text: "You can only submit once!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!'
    }).then((clickResult) => {
      if (clickResult.value) {
        let submission = this.state.submission
        let companyScheduleId = this.props.location.challenge.company_schedule_id
        this.saveResults(companyScheduleId, result, submission, score, time)
        let thatProps = this.props
        if (result === true) {
          swal(
            {title: 'Success!',
             text: 'You answered our challenge correctly!',
             type: 'success'}).then(function() {
              thatProps.history.push('/user')
             }
            )
        } else {
          swal(
            {title: 'Sorry!',
             text: 'The answer you submitted was not correct',
             type: 'error'}).then(function() {
               thatProps.history.push('/user')
          })
        }
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ localStorage.getItem('username') }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>

        <div className='ui horizontal segments user_liveCoding_container' style={{ padding: '30px', margin: 'auto'}}>
          <div classname='ui padded segment'>
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="codehire"
              onLoad={this.onLoad}
              onChange={this.onChange}
              fontSize={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              editorProps={{$blockScrolling: Infinity}}
              value={this.state.code}
              setOptions={{
              showLineNumbers: true,
              tabSize: 2,
            }}/>
            <select value={this.state.theme} onChange={this.handleTheme}>
              <option value='monokai'>Monokai</option>
              <option value='github'>Github</option>
              <option value='twilight'>Twilight</option>
              <option value='solarized_dark'>Solarized Dark</option>
              <option value='terminal'>Terminal</option>
            </select>
            <button className='ui green button' style={{ float: 'right' }} onClick={this.handleSubmit}> Submit Answer </button>
          </div>

          <div className='ui padded segment' style={{ paddingLeft: '30px'}}>
            <h1>{this.props.location.challenge.name}</h1>
            <br/>
            <h2>Title: {this.props.location.challenge.title}</h2>
            <h3>Difficulty: {this.props.location.challenge.difficulty}</h3>
            <div> Instructions: {this.props.location.challenge.instruction}</div>
            <div>
              examples:
              {this.state.exampleInputs.map((input, i) => {
                return <div className="examples" key={i}>{input}</div>
              })}
              {this.state.exampleOutputs.map((output, i) => {
                return <div className="examples" key={i}>{output}</div>
              })}
            </div>
            <div> Time Limit: { this.state.minutes + ':' + this.state.seconds }</div>
            </div>

        
      </div>
      </div>
     )
  }
}

export default UserLiveCodingView;
