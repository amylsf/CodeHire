import { combineReducers } from 'redux';
import adminReducers from './adminReducers';
import authReducers from './authReducers';
import userReducers from './userReducers';


export default combineReducers({
  default_challenges: adminReducers.defaultChallenges,
  all_challenges: adminReducers.allChallenges,
  login_status: authReducers.loginStatus,
  username: authReducers.loginStatus,
  signup_status: authReducers.signupStatus,
  logo_url: adminReducers.companyInfo,
  information: adminReducers.companyInfo,
  company_schedule: adminReducers.companySchedule,
  all_company_calendars: userReducers.allCompanyCalendars,
  initial_challenge: userReducers.initialChallenge, 
  company_information: adminReducers.companyInfo,
  candidate_information: userReducers.candidateInfo,
  candidate_skills: userReducers.candidateInfo
})





