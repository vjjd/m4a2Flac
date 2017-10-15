const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const argv = require('yargs').argv
const path = require('path')

const regexpFormat = new RegExp(argv.format)

run()

function run(){
    let contents = fs.readdirSync(argv.from).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f))
    let files = contents.filter(f => (regexpFormat).test(path.extname(f)))
    
    !files.length ? pullFromAlbums(contents.filter(f => !path.extname(f))) :
    convertSongs(files)
}

function pullFromAlbums(albums){
    albums.map(album=> {
        fs.readdir(`${argv.from}/${album}`, (err, list)=> {
            err ? errorHandler(err) : 
            songs = list.filter(s => (regexpFormat).test(s))
            
            fs.mkdirSync(`${argv.to}/${album}`)

            console.log(`#Converting ${songs}`)
            songs.map(file=> {
                new ffmpeg(`${argv.from}/${album}/${file}`)
                .fromFormat(argv.format)
                .toFormat('flac')
                .saveToFile(`${argv.to}/${album}/${file.replace(regexpFormat, 'flac')}`)
                .on('end', ()=> {
                    console.log(`End: ${file}`);
                })
            })
        })
    })
}

function convertSongs(songs){
    console.log(`#Converting ${songs}`)
    songs.map(file=> {
        new ffmpeg(`${argv.from}/${file}`)
        .fromFormat(argv.format)
        .toFormat('flac')
        .saveToFile(`${argv.to}/${file.replace(regexpFormat, 'flac')}`)
        .on('end', ()=> {
            console.log(`End: ${file}`);
        })
    })  
}

  function errorHandler(err){
    console.log(`Error: ${err}`)
}