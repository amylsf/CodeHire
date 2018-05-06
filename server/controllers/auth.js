const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (fullname, username, password, email, phone) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: fullname, username: username, password: hash, email: email, phone: phone, role: 'candidate' })
    .catch((err) => {
      console.log('Error saving candidate', err);
    })
  })
  return knex('users')
  
}

module.exports.saveCompany = (companyName, username, password, email, phone, logoUrl) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: companyName, username: username, password: hash, email: email, phone: phone, logo_url: logoUrl, role: 'company'})
    .catch((err) => {
      console.log('Error saving company', err);
    })
  })

}

module.exports.handleLogin = (username, password) => {
  return knex('users')
  .select('username')
  .where({ username: username })
  .then((user) => {
    knex('users').select('password').where({ username: user[0].username })
      .then((hashed) => {
        bcrypt.compare(password, hashed[0].password, (err, response) => {
          if(response === true) {
            console.log('password matched!');
          } else {
            console.log('Wrong password');
          }
        })
      })
      .catch((err) => {
        console.log('Error matching password', err);
      }) 
  })
  .catch((err) => {
    console.log('Username does not match');
  })
}





