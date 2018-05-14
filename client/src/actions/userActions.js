
import { GET_INITIAL_CHALLENGE, GET_ALL_COMPANY_CALENDARS, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INFO, GET_CURRENT_COMPANY_CALENDAR, GET_CANDIDATE_INITIAL_RESULTS } from '../constants/actionTypes';

import axios from 'axios';
import swal from 'sweetalert2';

export const fetchAllCompanyCalendars =(cb) => (dispatch) => {
  axios.get('/api/companyCalendars')
  .then(({data}) => {
    dispatch({ type: GET_ALL_COMPANY_CALENDARS, payload: data })
    cb()
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateCalendar = (candidateId) => (dispatch) => {
  axios.get('/api/candidateCalendar', {params: {candidateId}})
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_CALENDAR, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}

export const saveCandidateCalendar = (candidateId, companyScheduleId) => (dispatch) => {
  axios.post('/api/candidateCalendar', {candidateId, companyScheduleId})
  .then(({data}) => {
    if (data) {
      swal('Success!',
        'Scheduled a Live Challenge.')
    } else {
      swal('Sorry!',
        "You've already scheduled this live challenge.",
      'error')
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

export const deleteCandidateSchedule = (candidateScheduleId, candidateId) => (dispatch) => {
  axios.post('/api/cancelCandidateSchedule', {candidateScheduleId, candidateId})
  .then(() => {
    dispatch(fetchCandidateCalendar(candidateId))
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', {params: {company_id}})
  .then(({data}) => {
    dispatch({ type: GET_INITIAL_CHALLENGE, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}



export const currentCompanyCalendar = (companyId, callback) => (dispatch) => {
  dispatch( { type: GET_CURRENT_COMPANY_CALENDAR, company_id: companyId })
  if(callback) {
    callback();
 }
}

export const saveResults = (isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial, candidateScheduleId, cb) => (dispatch) => {
  axios.post('/api/results', {isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial})
  .then(() => {
    dispatch(deleteCandidateSchedule(candidateScheduleId, candidateId))
    cb();
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateInitialResults = (companyId, candidateId) => (dispatch) => {
  axios.get('/api/results/candidate/initial', {params: {companyId: companyId, candidateId: candidateId}})
  .then(({data}) => {
    dispatch( {type: GET_CANDIDATE_INITIAL_RESULTS, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}


/* ----------- User Profile ------------ */
export const updateCandidateSkills = (userId, skill) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId: userId, skills: skill })
  .catch((err) => {
    console.log(err);
  })
}

export const updateCandidateGithub = (userId, github_url) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId: userId, github_url: github_url })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateInfo = (userId, callback) => (dispatch) => {
  axios.get('/api/candidateInfo', { params: { userId: userId }})
    .then((info) => {
      dispatch({ type: GET_CANDIDATE_INFO, skills: info.data[0].candidate_skills, github_url: info.data[0].github_url })
        if(callback) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }