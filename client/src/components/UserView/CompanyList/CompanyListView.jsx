import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearchView from './UserSearchView.jsx';
import moment from 'moment';

class CompanyListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCalendar: []
    }

    this.updateCompanyCalendar = this.updateCompanyCalendar.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllCompanyCalendars(() => {
      this.setState({
        companyCalendar: this.props.all_company_calendars
      })
    })
  }

  updateCompanyCalendar(companyName) {
    var newList = this.props.all_company_calendars.filter((schedule) => {
      return schedule.name === companyName;
    })
    this.setState({
      companyCalendar: newList
    })
  }

  render () {
    console.log('compa list view', this.props)
    return (
      <div>
        <div className="ui orange three item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div>
        </div>
        <div className='ui centered grid'>
          <div className='row' style={{marginTop: '40px', marginBottom: '50px'}} >
            <UserSearchView updateCompanyCalendar={this.updateCompanyCalendar}/>
          </div>


      {this.state.companyCalendar.length ?
      this.state.companyCalendar.map((company, i) => {
        return (
          <div key={i}>
            <div className='five wide column'>
              <img className='company-logo' src={`${company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png'}`} />
              {company.name}
              <div>
                <p>Coming Live Challenge: {moment(company.time).format('MMMM Do YYYY dddd, h:mm A')}</p>
                <p>Duration: {company.duration} Minutes</p>
              </div>
              <button onClick={() => {
                this.props.fetchInitialChallenge(company.company_id)
                // this.props.fetchCompanyResults(company.company_id, this.props.user_id)
                this.props.fetchCandidateInitialResults(company.company_id, this.props.user_id)
                this.props.fetchCompanySchedule(company.company_id)
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
    )
  }
}

export default withRouter(CompanyListView);
