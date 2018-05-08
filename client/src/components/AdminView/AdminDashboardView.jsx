import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';

const AdminDashboardView = (props) => {
  return (
    <div className='admin_dashboard'>
      <div className='ui raised padded centered container segment'>
        <div className='ui grid'>
          <button className='ui button' type='button' onClick={() => {props.history.push('/admin/profile')}}>Edit Profile</button>
          <button className='ui button' type='button' onClick={() => {props.history.push('/admin/data')}}>View Analytics</button>
          <button className='ui button' type='button' onClick={() => {props.history.push('/admin/live')}}>Live Coding</button>
          <div className='row centered challenge_btns'>
            <button className='ui button' type='button' onClick={() => {props.history.push('/admin/challenges')}}>Choose Initial Challenge</button>
            <button className='ui button' type='button' onClick={() => {props.history.push('/admin/challenges')}}>Choose Scheduled Challenges</button>   
          </div>
          <table className='ui inverted table company_calendar'>
            <thead>
              <tr>
                <th>Challenge</th>
                <th>Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {props.company_schedule.map((item) => {
              return (
                <tr>
                  <td>{item.title}</td>
                  <td>{moment(item.time).format('MMMM Do YYYY, h:mm')}</td>
                  <td>{item.duration}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
  )
}

export default withRouter(AdminDashboardView);
