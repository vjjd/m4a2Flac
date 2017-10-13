const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const argv = require('yargs').argv

// const m4a_path = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const flac_path = `/Users/ymhtp/Desktop/Ryo\ Fukui`


run()

function run(){
    fs.readdir(argv.from, (err, list) => {
        err ? errorHandler(err) :
        albums = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
        console.log(albums)
    
        albums.map((album)=> {
            fs.readdir(`${argv.from}/${album}`, (err, list)=> {
                err ? errorHandler(err) :
                files = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
                console.log(files)
                
                fs.mkdirSync(`${argv.to}/${album}`)

                files.map((file)=> {
                    new ffmpeg(`${argv.from}/${album}/${file}`)
                    .fromFormat('m4a')
                    .toFormat('flac')
                    .saveToFile(`${argv.to}/${album}/${file.replace(/m4a/, 'flac')}`)
                    .on('end', ()=> {
                        console.log(`End: ${file}`);
                    })
                })  
            })
        })
      });
}

  function errorHandler(err){
    console.log(`Error: ${err}`)
}