const fs = require('fs')
const imgBasePath = 'data/img'

module.exports = {
  // 读文件
  readFileSync: (path) => {
    fs.readFileSync(path, 'utf-8')
  },
  readFile: (path) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        throw err
      }
    })
  },
  // 写文件
  writeFile: (path, data) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        throw err
      }
    })
  },
  writeFileSync: (path, data) => {
    fs.writeFileSync(path, data)
  },
  writeImg: (path, data) => {
    fs.writeFile(`${imgBasePath}/${path}`, data, (err) => {
      if (err) {
        throw err
      }
    })
  },
  toBuffer: (data) => {
    const base64Data = data.replace(/^data:image\/\w+;base64,/, '')
    const dataBuffer = Buffer.from(base64Data, 'base64')
    let fileType = data.match(/^data:image\/\w+;/)[0]
    fileType = fileType.split('/')[1].replace(';', '')
    return {
      type: fileType,
      data: dataBuffer
    }
  },
  // 删文件
  deleteImg: (path) => {
    fs.exists(`${imgBasePath}/${path}`, exists => {
      if (exists) {
        fs.unlinkSync(`${imgBasePath}/${path}`)
      }
    })
  }
}
