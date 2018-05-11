import React, { Component } from 'react';
import moment from 'moment';

class UserResults extends Component {
  constructor() {
    super();
  }

  render() {
      if (this.props.results.length) {
        return (
        <div>
            <div>Name: {this.props.results[0].name}</div>
            <div>Photo</div>
            <div>Information: {this.props.results[0].information}</div>
            <div>Skills: {this.props.results[0].candidate_skills}</div>
            <div>Email: {this.props.results[0].email}</div>
            <div>Phone: {this.props.results[0].phone}</div>
            <br/>
            <br/>
            <div> Challenges:
            {this.props.results.map((result, i) => {
                let isPassed = 'Failed';
                let isInitial = '';
                if (result.user_passed) {
                    isPassed = 'Passed';
                }
                if (result.isInitial) {
                    isInitial = 'Initial Challenge'
                }
                return (
                <div key={i}>
                <div>Title: {result.title}    Difficulty: {result.difficulty}   {isInitial}, {isPassed}, {result.score}</div>
                
                <div>Instruction: {result.instruction}</div>
                <div>Completed At: {moment(result.completed_at).format('MMMM Do YYYY dddd, h:mm A')}</div>
                <div>{result.code}</div>
                <br/>
                <br/>
                </div>)
            })}
            </div>
        </div>
        )
      } else {
        return null;
      }
  }
}

export default UserResults;