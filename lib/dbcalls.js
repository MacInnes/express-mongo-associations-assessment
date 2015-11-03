var db = require('monk')('localhost/monk-associations-assessment');
var songs = db.get('songs');
var albums = db.get('albums');
var artists = db.get('artists');
var playlists = db.get('playlists');

module.exports = {


  getPlaylists: function(){
    var that = this
    return playlists.find({}).then(function(playlists){
      return {playlists: playlists, artists: [], albums: []};
    })

    .then(function(outputObject){
      return that.findAllSongs().then(function(songsArray){
        outputObject.songs = songsArray
        return outputObject
      })
    })

    .then(function(outputObject){
      /*
        var foo = outputObject.songs.map(function(song){return song.album})
        artists.find({_id: {$in: foo }})

        artists.find({_id: {$in: outputObject.songs.map(function(song){return song.album}) }})
        
        artists.find({_id: {$in: ['asdf', 'asdfasdf'] }})
      */
      var albumsPromisesArray = outputObject.songs.map(function(each){ return that.findAlbumByID(each.album) });
      var artistsPromisesArray = outputObject.songs.map(function(each){ return that.findArtistByID(each.artist); })
      return Promise.all([   // LEARN THIS
        Promise.all(albumsPromisesArray), 
        Promise.all(artistsPromisesArray)
      ]).then(function(results){
        outputObject.albums = results[0]
        outputObject.artists = results[1]
        console.log(outputObject)
        return outputObject
      })
    })

    // .then(function(outputObject){
    //   var songs = []
    //   outputObject.songs.forEach(function(song){
    //     outputObject.albums.forEach(function(album){
    //       if (song.album.toString() === album._id.toString()) {
    //         song.album = album
    //       };
    //     })
    //   })
    // })

  },

  // refactor to less functions that do more...?

  findArtists: function(){
    return artists.find({});
  },
  findArtist: function(name){
    return artists.findOne({artist: name});
  },

  findArtistByID: function(id){
    console.log("id function: " + id)
    return artists.findOne({_id: id});
  },

  insertArtist: function(artistName){
    console.log("insertArtist function called");
    return artists.insert({artist: artistName})
  },

  updateArtist: function(ID, newName){
    console.log('updating artist')
    return artists.update({_id: ID}, {artist: newName});
  },

  deleteArtist: function(artistID){
    return artists.remove({_id: artistID});
  },


  //ALBUMS below:
  findAlbum: function(albumName){
    return albums.findOne({name: albumName});
  },

  findAlbumByID: function(albumID){
    return albums.findOne({_id: albumID});
  },

  findAlbumCheck: function(albumName, artistID){
    return albums.findOne({name: albumName, artist: artistID});
  },

  findAlbumsByArtist: function(artistID){
    console.log('findAlbumsByArtist function called')
    return albums.find({artist: artistID});
  },

  insertAlbumByArtistID: function(artistID, albumName){
    return albums.insert({name: albumName, artist: artistID}) 
  },

  updateAlbum: function(albumID, albumName){
    console.log('update functionnnnnnnnnnnnnnnn')
    return albums.update({_id: albumID}, {$set: {name: albumName}})
  },

  deleteAlbum: function(albumID){
    return albums.remove({_id: albumID});
  },



  // SONGS below:
  insertSong: function(name, albumID, artistID){
    console.log('insertSong called: ' + name)
    return songs.insert({name: name, album: albumID, artist: artistID});
  },

  findAllSongs: function(){
    return songs.find({});
  },

  findSongsByAlbum: function(albumID){
    return songs.find({album: albumID});
  },

  findSongByID: function(songID){
    return songs.findOne({_id: songID});
  },

  findSongByName: function(songName){
    return songs.findOne({name: songName});
  },
  findSongsByArtist: function(artistID){
    return songs.find({artist: artistID});
  },

  updateSong: function(songID, songName){
    return songs.update({_id: songID}, {$set: {name: songName}});
  },

  deleteSong: function(songID){
    return songs.remove({_id: songID});
  },



  //PLAYLISTS below:
  findAllPlaylists: function(){
    return playlists.find({});
  },

  findPlaylistByID: function(id){
    return playlists.findOne({_id: id});
  },

  findPlaylistBySong: function(songID){
    return playlists.find({songs: songID});
  },

  insertPlaylist: function(name, songArray){
    return playlists.insert({name: name, songs: songArray})
  },

  updatePlaylist: function(playlistID, songsArray){
    return playlists.update({_id: playlistID}, { $set: {songs: songsArray}});
  },
  deletePlaylist: function(playlistID){
    return playlists.remove({_id: playlistID});
  }




}