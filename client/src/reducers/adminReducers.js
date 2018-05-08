import React from 'react';
import { GET_DEFAULT_CHALLENGES, GET_ALL_CHALLENGES, GET_COMPANY_INFO, GET_COMPANY_SCHEDULE } from '../constants/actionTypes';


const initialState = {
  default_challenges: [],
  all_challenges: [],
  logo_url: 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w',
  company_information: '',
  company_schedule: []
}


const defaultChallenges = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_DEFAULT_CHALLENGES':
      return {
        ...state,
        default_challenges: action.payload
      }
    default:
      return state;
  }
}

const allChallenges = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_ALL_CHALLENGES':
      return {
        ...state,
        all_challenges: action.payload
      }
      default:
        return state;
  }
}

const companyInfo = (state = '', action) => {
  switch(action.type) {
    case 'GET_COMPANY_INFO':
      return {
        logo_url: action.logo_url,
        company_information: action.information
      }
    default:
      return state;
  }
}

const companySchedule = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COMPANY_SCHEDULE':
      return {
        ...state,
        company_schedule: action.payload
      }
    default:
      return state;
  }
}




export default { defaultChallenges, allChallenges, companyInfo, companySchedule };