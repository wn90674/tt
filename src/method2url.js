const path = require('path')
const glob = require('glob')

const FOLDER_PATH = path.resolve(__dirname, '../MockData')
console.log(FOLDER_PATH)
glob(`MockData/*.json`, (err, files) => {
    if(err) return
    console.log(files)
})