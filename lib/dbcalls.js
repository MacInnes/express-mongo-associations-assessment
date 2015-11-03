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

  updateSong: function(songID, songName){
    return songs.update({_id: songID}, {$set: {name: songName}});
  },

  findAllPlaylists: function(){
    return playlists.find({});
  },

  findPlaylistByID: function(id){
    return playlists.findOne({_id: id});
  },

  insertPlaylist: function(name, songArray){
    return playlists.insert({name: name, songs: songArray})
  },

  updatePlaylist: function(playlistID, songsArray){
    return playlists.update({_id: playlistID}, { $set: {songs: songsArray}});
  }




}