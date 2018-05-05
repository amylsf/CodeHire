const knex = require('../../db/index.js');

//saves a default challenge to company challenge list
module.exports.saveDefaultChallenge = (title, instruction, testCases, timelimit, difficulty, companyId) => {
  return knex('all_challenges')
  .where({
    company_id: companyId,
    title: title
  })
  .update({
    title: title,
    instruction: instruction
  })
  .then((res) => {
    if (res === 0) {
      return knex('all_challenges').insert({
        title: title,
        instruction: instruction,
        test_cases: testCases,
        timelimit: timelimit,
        difficulty: difficulty,
        initial: false,
        company_id: companyId
      })
      .then((res) => {
        console.log('Saved challenge to db');
      })
      .catch((err) => {
        console.log('Unable to save challenge to db', err);
      })
    } else {
      console.log('Challenge is already saved in the db')
    }
  })
  .catch((err) => {
    console.log(err);
  })
};

//removes a challenge from company challenge list
module.exports.deleteCompanyChallenge = (title, companyId) => {
  return knex('all_challenges')
  .where({title: title, company_id: companyId})
  .del()
  .then((res) => {
    console.log('Deleted challenge from database');
  })
  .catch((err) => {
    console.log('Unable to delete challenge from db', err);
  })
};

//get all company challenges
module.exports.getCompanyChallenges = (companyId) => {
  return knex('all_challenges').where('company_id', companyId)
  .then((res) => {
    console.log(res);
    console.log('Company challenges successfully received from db');
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve company challenges from db:', err);
  })
};

//get all default challenges
module.exports.getDefaultChallenges = () => {
  return knex('all_challenges').where('company_id', 1)
  .then((res) => {
    console.log('Default challenges successfully received from db');
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve default challenges from db:', err);
  })
};


