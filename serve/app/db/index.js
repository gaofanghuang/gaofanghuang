const mongoose = require('mongoose')
const model = require('./model')
const dbPath = `mongodb://${process.env.SQL_HOST}:${process.env.SQL_PORT}/${process.env.SQL_DATABASE}`

mongoose.Promise = require('bluebird')
mongoose.connect(
  dbPath,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) {
      console.log('Mongoose connection error: ' + err.message)
    } else {
      console.log('数据库连接成功')
    }
  }
)
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection disconnected')
})

const createdModel = (key, object) => {
  const schema = mongoose.Schema(object)
  return mongoose.model(key, schema)
}

const db = {
  User: createdModel('User', model.user),
  Project: createdModel('Project', model.project),
  Tag: createdModel('Tag', model.tag),
  Image: createdModel('Image', model.image),
  Log: createdModel('Log', model.log),
  TODO: createdModel('TODO', model.todo),
  Config: createdModel('Config', model.config),
  About: createdModel('About', model.about),
  Checklist: createdModel('Checklist', model.checklist),
  Entry: createdModel('Entry', model.entry),
  Comment: createdModel('Comment', model.comment),
  Music: createdModel('Music', model.music)
}

module.exports = db
