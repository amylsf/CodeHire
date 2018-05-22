import React, { Component } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import { withRouter } from 'react-router-dom';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

class CompanyChallengeTableView extends Component {
  constructor() {
    super()

    this.storeCompanyInfo = this.storeCompanyInfo.bind(this)
    this.viewCompanyPage = this.viewCompanyPage.bind(this);
  }

  storeCompanyInfo(info) {
    let companyId = {id: info.companyId};
    let companyName = info.companyName;
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
    localStorage.setItem('companyName', companyName)
  }

  viewCompanyPage(info) {
    this.storeCompanyInfo(info)
    this.props.history.push('/user/schedule');
  }

  render() {
    return (
       <div className='ui container segment'>
        <ReactCollapsingTable 
        columns={this.props.columns} 
        rows={this.props.rows} 
        rowSize={4} 
        // showSearch={ true }
        showPagination={ true }
        callbacks={{'info': this.viewCompanyPage}}
      />
      </div>
    )
  }
}

export default withRouter(CompanyChallengeTableView);
