import React, { Component } from 'react';


class DefaultChallenges extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='ui segment'>
      <h1>Default Challenges</h1>
      <ul>
      {this.props.defaultChallenges.map((challenge) => {
        return (
          <div className="challenges" key={challenge.id}>
            <div>{challenge.title}</div>
            <div>{challenge.description}</div>
            <button className="ui icon button" onClick={() => {this.props.save(challenge)}}>Save to Challenges</button>
          </div>
        )
      })}
      </ul>
    </div>
    )
  }
}






export default DefaultChallenges;