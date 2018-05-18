import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchCompanySchedule from './SearchCompanySchedule.jsx';
import moment from 'moment';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

class AllChallengeListView extends Component {
  constructor(props) {
    super(props);
    this.encodeCompanyId = this.encodeCompanyId.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanySchedule(null, '')
  }

  encodeCompanyId(id) {
    let companyId = {id: id};
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
  }

  render () {
    return (
      <div>
        <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
        
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompanySchedule updateCompanyCalendar={this.props.fetchCompanySchedule}/>
          </div>
       
       <div className='company_list_items'>
       <div className='ui divided items'>
      {this.props.company_schedule.length ?
      this.props.company_schedule.map((company, i) => {
        return (

          <div className='item' key={i}>
            <span className='company_logo'>
              <img className='ui image' src={`${company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png'}`} />
            </span>
              <div className='content'>
                <h2 className='company_item_header'>{company.name}</h2>
                  <div className='description'>
                <p><b>Coming Live Challenge:</b> {moment(company.time).format('MMMM Do YYYY dddd, h:mm A')}</p>
              </div>
              <button onClick={() => {
                this.encodeCompanyId(company.company_id)
                this.props.history.push('/user/schedule');
              }}>View Company Page
              </button>
              </div>
          </div>
         
        )})


      : <div>Sorry, we weren't able to find any results</div>

      }

      </div>
      </div>
      </div>
    )
  }
}

export default withRouter(AllChallengeListView);
