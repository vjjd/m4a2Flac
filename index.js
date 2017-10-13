const ffmpeg = require('fluent-ffmpeg')
const { spawn } = require('child_process')
const fs = require('fs')
const pathm4a = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
const pathFlac = `/Users/ymhtp/Desktop/Ryo\ Fukui`

fs.readdir(pathm4a, (err, list) => {
    err ? errorHandler(err) :
    albums = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
    console.log(albums)

    albums.map((album)=> {
        fs.readdir(`${pathm4a}/${album}`, (err, list)=> {
            err ? errorHandler(err) :
            files = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item))
            console.log(files)

            files.map((file)=> {
                new ffmpeg(`${pathm4a}/${album}/${file}`)
                .fromFormat('m4a')
                .toFormat('flac')
                .saveToFile(`${pathFlac}/${album}/${file.replace(/m4a/, 'flac')}`)
                .on('end', ()=> {
                    console.log(`End: ${file}`);
                });
            })
        })
    })
  });

  function errorHandler(err){
    console.log(`Error: ${err}`)
}