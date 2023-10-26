const records = [
    {
      id: 1,
      username: 'user1',
      password: '1234',
      displayName: 'UserOne',
      emails: [{ value: 'user@mail.ru' }],
    },
    {
      id: 2,
      username: 'user2',
      password: 'birthday',
      displayName: 'Jill',
      emails: [{ value: 'jill@example.com' }],
    },
  ]

  exports.findById = function (id, cb) {
    process.nextTick(function () {
      const idx = id - 1;
      if(records[idx]) {
        cb(null, records[idx])
      } else {
        cb(new Error('User ' + id + ' does not exist'))
      }
    })
  };

  exports.findByUsername = function(username, cb) {
    process.nextTick(function () {
      for (let i = 0; i < records.length; i++) {
        const record = records[i]
        if(record.username === username) {
          return cb(null, record)
        }
      }
      return cb(null, null)
    })
  };

  exports.verifyPassword = (user, password) => {
    return user.password === password
  }