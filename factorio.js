const fs = require('fs')
//const argv = require('yargs').argv
const path = require('path')

const argv = require('yargs').argv
const yargs = require('yargs')(['--info']).usage(
  'npm start --from="path to music folder" --to="path to outcome" --format="m4a or ape"'
)
//   .help('info').argv

if (!argv.to || !argv.from || !argv.format) {
  yargs.help('info').argv
}
// console.log(argv)

// const m4a_path = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const flac_path = `/Users/ymhtp/Desktop/Ryo\ Fukui`

// let arrFiles = fs.readdirSync(argv.from).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f))

// arrFiles.map(f => {
//     path.extname(f) ? console.log('lul') : console.log('kek')
// })
