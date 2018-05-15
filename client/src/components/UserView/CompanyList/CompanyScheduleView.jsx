import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2'

import CompanyScheduleTableView from './CompanyScheduleTableView.jsx';

class CompanyScheduleView extends Component {
  constructor() {
    super()
    
    this.state = {
      style: {}
    }
    //this.enterChallenge = this.enterChallenge.bind(this);
    this.socket = socketClient();
    this.updateStyle = this.updateStyle.bind(this);
  }

  updateStyle() {
    this.setState({
      style: {'border': '5px solid red'}
    })
  }

  render() {
    if (this.props.initial_challenge[0]) {
      const companyCalendar = this.props.all_company_calendars.filter((schedule) => {
        return schedule.company_id === this.props.initial_challenge[0].company_id
      })
      return (
        <div>
         <div className="ui orange three item inverted menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div> 
        </div>
        <h1>{this.props.initial_challenge[0].name}</h1> 
        <h2>{this.props.initial_challenge[0].information}</h2> 
        <br/>
        <div className='ui raised very padded container segment' style={this.state.style}>
        <h2>
        Before You Schedule Live Challenge - You Need To Pass Initial Challenge
        </h2>
        <button onClick={() => {
          if (!this.props.pass_initial) {
            this.props.history.push('/user/challenge')
          } else {
            swal(
              "You've Passed Initial Challenge!",
              "Please Schedule A Live Challenge When You Are Ready!"
            )
          }
          }}>
            Take Initial Challenge</button>
          {/* <span className='ui container segment'> </span> */}
        </div>
        <br/>
        {this.props.initial_challenge[0].name}'s Live Challenge:
        <div className='schedule_container'>
        {companyCalendar ?
        <CompanyScheduleTableView updateStyle={this.updateStyle} userId={this.props.user_id} saveCandidateCalendar={this.props.saveCandidateCalendar} companyCalendar={companyCalendar} passInitial={this.props.pass_initial} />
        : <div> {this.props.initial_challenge[0].name} Does Not Have Any Upcoming Live Challenge </div>
      }

        </div> 

        </div>
      )
    } else {
      return (
        <div>
        <div className="ui orange three item inverted menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div> 
        </div>
        </div>
      )
    }
  }
}

export default withRouter(CompanyScheduleView);
