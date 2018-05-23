import React, { Component } from 'react';
import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import BarGraph from './AnalyticsView/BarGraph.jsx';
import LineGraph from './AnalyticsView/LineGraph.jsx';
import Scatterplot from './AnalyticsView/Scatterplot.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
  }

  render() {
    console.log('do i have all challenges for a company??', this.props)
    return (
      <div>
<<<<<<< HEAD
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <BarGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} results={this.props.results} challengeData={this.props.challenge_data}/>
        <LineGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
        <Scatterplot getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} results={this.props.results} challengeData={this.props.challenge_data}/>
=======
        <div className="ui orange five item menu">
          <div className='ui item cursor' onClick={ () => { this.props.history.push('/admin/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin')}}>Dashboard</div>
          <div className='ui item cursor' onClick={() => this.props.history.push('/admin/challenges') }>Manage Challenges</div>
          <div className='ui active item cursor' onClick={() => {this.props.history.push('/admin/data')}}>Analytics</div>
          <div className='ui item cursor' onClick={() => {this.props.history.push('/admin/hire')}}>Hire</div>
        </div>
        <BarGraph companyResults={this.props.company_data} allResults={this.props.all_results} challenges={this.props.all_challenges} fetchChallengeData={this.props.fetchChallengeData} challengeData={this.props.challenge_data} />
        <LineGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
        <Scatterplot companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challengeData={this.props.challenge_data}/>
>>>>>>> cleaned up props
      </div>
    )
  }
}

export default AnalyticsView;
// <Scatterplot getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} results={this.props.results} challengeData={this.props.challenge_data}/>


// <h1>Analytics</h1>
// <h2>Candidate List</h2>
//   {this.props.candidate_list.length > 0 ? this.props.candidate_list.map((candidate, i) => {
//     return (
//       <div key={i}>Name: {candidate.name}
//       <button onClick={() => {
//         this.props.fetchCompanyResults(localStorage.getItem('userId'), candidate.id)
//         this.props.history.push('/admin/data/results')
//       }}>View Candidate Details
//       </button>
//       </div>
//     )
//   }) : null}
//   <div>
//   <button onClick={()=>{this.setState({show: !this.state.show})}}>Show Graph</button>
//     {this.state.show ? <AllChallengeResults getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/> : null}
//   </div>
