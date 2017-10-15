const fs = require('fs')
const argv = require('yargs').argv
const path = require('path')

// const m4a_path = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const flac_path = `/Users/ymhtp/Desktop/Ryo\ Fukui`

let arrFiles = fs.readdirSync(argv.from).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f))

arrFiles.map(f => {
    path.extname(f) ? console.log('lul') : console.log('kek')
})