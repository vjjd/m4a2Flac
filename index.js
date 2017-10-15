const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const argv = require('yargs').argv
const fromFormat = 'm4a'
const regexpFormat = new RegExp(fromFormat)

// const m4a_path = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const flac_path = `/Users/ymhtp/Desktop/Ryo\ Fukui`

todo2()

function todo2(){
    let albsORsongs = fs.readdirSync(argv.from).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f))
    let songs = albsORsongs.filter(f => (regexpFormat).test(f))    
    !songs.length ? pullFromAlbums(albsORsongs.filter(f => !(regexpFormat).test(f))) :
    convertSongs(songs)
}

function pullFromAlbums(albums){
    console.log('ya tut')
    albums.map((album)=> {
        fs.readdir(`${argv.from}/${album}`, (err, list)=> {
            err ? errorHandler(err) :
            songs = list.filter(s => (regexpFormat).test(s))
            
            fs.mkdirSync(`${argv.to}/${album}`)

            console.log(`#Converting ${songs}`)
            songs.map((file)=> {
                new ffmpeg(`${argv.from}/${album}/${file}`)
                .fromFormat(fromFormat)
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
    songs.map((file)=> {
        new ffmpeg(`${argv.from}/${file}`)
        .fromFormat(fromFormat)
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