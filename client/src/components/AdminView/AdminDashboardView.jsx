import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
// import AnalyticsView from './AnalyticsView.jsx';
// import ChallengeListView from './ChallengeListView.jsx';
// import AdminProfileView from './AdminProfileView.jsx';
// import LiveCodingView from './LiveCodingView.jsx';

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
          <div className='company_calendar row ui raised container segment'></div>
        </div>
      </div>
    </div>
  )
}

//const AdminDashboard = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default withRouter(AdminDashboardView);