import React, { Component } from 'react';
import Form from './Form.jsx';

class CompanyChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.allChallenges.map((item) => false),
      duration: 0,
      showUpdateForm: this.props.allChallenges.map((item) => false)
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleUpdateForm = this.toggleUpdateForm.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    console.log(this.props)
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  handleClick(challenge, i) {
    if (this.props.isInitial) {
      this.props.makeInitial(challenge.id, challenge.initial)
    } else {
      this.props.addToSchedule($('#date').val(), this.state.duration, challenge.id);
    }
    this.toggleForm(i);
  }

  toggleForm(i) {
    let newShowForm = [...this.state.showForm];
    newShowForm[i] = !this.state.showForm[i];
    this.setState({
      showForm: newShowForm
    })
  }

  toggleUpdateForm(i) {
    let newShowUpdateForm = [...this.state.showUpdateForm];
    newShowUpdateForm[i] = !this.state.showUpdateForm[i];
    this.setState({
      showUpdateForm: newShowUpdateForm
    })
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }

  render() {
    return (
      <div className='ui segment'>
        <h1>Saved Challenges</h1>
        {this.props.allChallenges.map((challenge, i) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button className="ui button" onClick={() => {this.toggleForm(i)}}>
              {this.props.isInitial ? 'Set Initial Challenge' :
              'Schedule Challenge'}
              </button>
              <button className="ui icon button" onClick={() => {this.props.delete(challenge)}}>
                <i className="minus icon"></i>
              </button>
              <button className="ui icon button" onClick={() => {this.toggleUpdateForm(i)}}>
                <i className="edit icon"></i>
              </button>
              <br/>
              {!this.state.showUpdateForm[i] ? null: <Form/>}
              <br/>
              {!this.state.showForm[i] ? null : 
                <div className="calendar-container">
                {!this.props.isInitial ? 
                    <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                      <div className="ui input left icon">
                        <i className="calendar icon"></i>
                        <input name="date" type="text" placeholder="Date/Time" id="date"/>
                      </div>
                    </div> : null}
                  <div className="field dropdown">
                  <label>Duration (minutes)</label>
                    <select className="ui dropdown" name="duration" value={this.state.duration} onChange={this.handleDurationChange}>
                      <option value="">Select</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="60">60</option>
                      <option value="90">90</option>
                    </select>
                  </div> 
                       <button onClick={() => {this.handleClick(challenge, i)}}>Save</button>
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}



export default CompanyChallenges;
