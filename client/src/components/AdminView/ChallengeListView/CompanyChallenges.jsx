import React, { Component } from 'react';

class CompanyChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.allChallenges.map((item) => false)
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }

  toggleForm(i) {
    let newShowForm = [...this.state.showForm];
    newShowForm[i] = !this.state.showForm[i];
    this.setState({
      showForm: newShowForm
    })
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }


  render() {
    return (
      <div className='ui segment'>
        <h1>Your Saved Challenges</h1>
        {this.props.allChallenges.map((challenge, i) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button onClick={() => {this.props.delete(challenge)}}>Remove from challenges</button>
              <button onClick={() => {this.toggleForm(i)}}>Schedule Challenge</button>
              <br/>
              {!this.state.showForm[i] ? null :
                <div className="calendar-container">
                  <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                    <div className="ui input left icon">
                      <i className="calendar icon"></i>
                      <input type="text" placeholder="Date/Time"/>
                    </div>
                  </div>
                  <div className="field dropdown">
                  <label>Duration (minutes)</label>
                  <select className="ui dropdown" name="duration">
                    <option value="">Select</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
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
