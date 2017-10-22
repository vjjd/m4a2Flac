const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const argv = require('yargs').argv
const path = require('path')
const regexpFormat = new RegExp(argv.format)
const yargs = require('yargs')(['--info']).usage(
  'node index.js --from="path to music folder" --to="path to outcome" --format="m4a or ape"'
)

/**
 * Check parameters
 */
if (!argv.to || !argv.from || !argv.format) {
  yargs.help('info').argv
} else {
  sortContent()
}

/**
 * Sort content into songs or albums
 */
function sortContent() {
  let contents = fs
    .readdirSync(argv.from)
    .filter(f => !/(^|\/)\.[^\/\.]/g.test(f))
  let files = contents.filter(f => regexpFormat.test(path.extname(f)))

  if (files.length) {
    pullFromAlbums(contents.filter(f => !path.extname(f)))
  } else {
    convertSongs(files)
  }
}

/**
 * Convert songs from albums
 * @param {*array} albums
 */
function pullFromAlbums(albums) {
  albums.map(album => {
    fs.readdir(`${argv.from}/${album}`, (err, list) => {
      if (err) {
        errorHandler(err)
      } else {
        songs = list.filter(s => regexpFormat.test(s))
      }

      fs.mkdirSync(`${argv.to}/${album}`)

      console.log(`#Converting ${songs}`)

      songs.forEach(file => {
        new ffmpeg(`${argv.from}/${album}/${file}`)
          .fromFormat(argv.format)
          .toFormat('flac')
          .saveToFile(
            `${argv.to}/${album}/${file.replace(regexpFormat, 'flac')}`
          )
          .on('end', () => {
            console.log(`End: ${file}`)
          })
      })
    })
  })
}

/**
 * Converting songs without albums
 * @param {*array} songs 
 */
function convertSongs(songs) {
  console.log(`#Converting ${songs}`)
  songs.forEach(file => {
    new ffmpeg(`${argv.from}/${file}`)
      .fromFormat(argv.format)
      .toFormat('flac')
      .saveToFile(`${argv.to}/${file.replace(regexpFormat, 'flac')}`)
      .on('end', () => {
        console.log(`End: ${file}`)
      })
  })
}

/**
 * Handle a error
 * @param {*error} err 
 */
function errorHandler(err) {
  console.log(`Error: ${err}`)
}
