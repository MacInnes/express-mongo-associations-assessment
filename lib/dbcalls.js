var db = require('monk')('localhost/monk-associations-assessment');
var songs = db.get('songs');
var albums = db.get('albums');
var artists = db.get('artists');
var playlists = db.get('playlists');

module.exports = {

  // refactor to less functions that do more...?

  findArtists: function(){
    return artists.find({});
  },

  findArtist: function(name){
    console.log(name)
    return artists.findOne({artist: name});
  },

  insertArtist: function(artistName){
    console.log("insertArtist function called");
    return artists.insert({artist: artistName})
  },

  findAlbum: function(albumName){
    return albums.findOne({album: albumName});
  },

  insertAlbum: function(albumName, artist){
    return findArtist(artist).then(function(data){
      return albums.insert({album: albumName, artist: data._id});
    })  
  },

  insertSong: function(name, albumName){
    var albumPromise = albums.find({album: albumName});
    albumPromise.then(function(data){
      songs.insert({name: name, album: data._id});
    })
  }
}