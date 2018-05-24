import React, { Component } from 'react';
import CompanyNavBar from './CompanyNavBar.jsx';
import { connect } from "react-redux";
import UserResults from './UserResults.jsx';
import BarGraph from './AnalyticsView/BarGraph.jsx';
import LineGraph from './AnalyticsView/LineGraph.jsx';
import Scatterplot from './AnalyticsView/Scatterplot.jsx';
import PastChallenges from './AnalyticsView/PastChallenges.jsx';

class AnalyticsView extends Component {
  constructor() {
    super();
    this.state = {
      currentGraph: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.changeGraph = this.changeGraph.bind(this)
    this.renderGraph = this.renderGraph.bind(this)
  }

  componentDidMount() {
    this.props.fetchCandidateList(localStorage.getItem('userId'));
    this.props.fetchAllChallenges(localStorage.getItem('userId'));
    this.props.getCompanyData(localStorage.getItem('userId'));
    this.props.fetchAllResults();
    this.props.fetchPastSchedule(localStorage.getItem('userId'));
  }

  handleClick(graph) {
    this.changeGraph(graph)
  }

  changeGraph(option) {
    this.setState({
      currentGraph: option
    }, ()=> console.log(this.state.currentGraph))
  }

  renderGraph() {
    const {currentGraph} = this.state

    if (currentGraph === 'bar') {
      return <BarGraph companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challenges={this.props.all_challenges} challengeData={this.props.challenge_data}/>
    } else if (currentGraph === 'line') {
      return <LineGraph getAllResults={this.props.fetchAllResults} getCompanyResults={this.props.getCompanyData} companyResults={this.props.company_data} allResults={this.props.all_results}/>
    } else if (currentGraph === 'scatter') {
      return <Scatterplot companyResults={this.props.company_data} allResults={this.props.all_results} fetchChallengeData={this.props.fetchChallengeData} challengeData={this.props.challenge_data}/>
      }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <CompanyNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <h1>Analytics</h1>
        <PastChallenges fetchCandidateResults={this.props.fetchCandidateResults} candidateResults={this.props.candidate_results} favorites={this.props.favorites} remove={this.props.removeFromFavorites} getFavorites={this.props.getFavorites} history={this.props.history} save={this.props.saveToFavorites} pastResults={this.props.past_results} pastChallenges={this.props.past_challenges} fetchPastResults={this.props.fetchPastResults}/>
        <div className="ui orange five item menu">
          <div className='ui item cursor' onClick={() => this.handleClick('bar') }> Bar </div>
          <div className='ui item cursor' onClick={() => this.handleClick('line') }> Line </div>
          <div className='ui item cursor' onClick={() => this.handleClick('scatter') }> Scatterplot </div>
        </div>
        <div>
          {this.renderGraph()}
        </div>
      </div>
    )
  }
}

export default AnalyticsView;


// <h2>Candidate List</h2>
// {this.props.candidate_list.length > 0 ? this.props.candidate_list.map((candidate, i) => {
//   return (
//     <div key={i}>Name: {candidate.name}
//     <button onClick={() => {
//       this.props.fetchCompanyResults(localStorage.getItem('userId'), candidate.id)
//       this.props.history.push('/admin/data/results')
//     }}>View Candidate Details
//     </button>
//     </div>
//   )
// }) : null}