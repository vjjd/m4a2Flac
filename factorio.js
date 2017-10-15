const fs = require('fs')
const argv = require('yargs').argv
const fromFormat = 'm4a'
const regexpFormat = new RegExp(fromFormat)

// const m4a_path = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const flac_path = `/Users/ymhtp/Desktop/Ryo\ Fukui`

//run()

function pullFrom(albums){
    console.log('tut: ' + albums)
}

todo2()

function todo2(){
    let foldersOrfiles = fs.readdirSync(argv.from).filter(f => !(/(^|\/)\.[^\/\.]/g).test(f));

    pullFrom(foldersOrfiles.filter(f => !(/(^|\/)\.[^\/\.]/g).test(f)))


    
    //let songs = foldersOrfiles.filter(f => (regexpFormat).test(f))
// && !(/(^|\/)\.[^\/\.]/g).test(f)

    // songs ? convertSongs(songs) : 
    // albums = foldersOrfiles.filter(f => !(regexpFormat).test(f) && )
    // pullFromAlbums(albums)


    // console.log(foldersOrfiles)
}

// const ffmpeg = require('fluent-ffmpeg')
// const { spawn } = require('child_process')
// const fs = require('fs')

// const path2m4a = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui`
// const path2Flac = `/Users/ymhtp/Desktop/Ryo\ Fukui`

// const testpath = `/Users/ymhtp/Desktop/ToCowom/Ryo\ Fukui/1976 - Scenery/02. I Want to Talk About You.m4a`

// new ffmpeg(testpath)
// .fromFormat('m4a')
// .toFormat('flac')
// .saveToFile(`/Users/ymhtp/Desktop/test.flac`)
// .on('end', ()=> {
//     console.log(`End`);
// });

// fs.readdir(path2m4a, (err, list) => {
//     err ? errorHandler(err) : 
//     albums = list.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));


//     console.log(albums);
//   });


//   function errorHandler(err){
//       console.log(`Error: ${err}`)
//   }