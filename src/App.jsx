import { useState } from "react";
import "./App.css";

function App() {
  async function searchSongs() {
    if (searchTerm.trim() === "") return;

    const encodedSearchTerm = encodeURIComponent(searchTerm);

    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodedSearchTerm}&media=music&entity=song&limit=10`
    );

    const data = await response.json();

    const formattedSongs = data.results.map((track) => ({
      id: track.trackId,
      name: track.trackName,
      artist: track.artistName,
      album: track.collectionName,
      preview: track.previewUrl,
    }));

    setSongs(formattedSongs);
  }


  const [searchTerm, setSearchTerm] = useState("");

  const [songs, setSongs] = useState([
    // { id: 1, name: "God's Plan", artist: "Drake" },
    // { id: 2, name: "Blinding Lights", artist: "The Weeknd" },
    // { id: 3, name: "Snooze", artist: "SZA" },
  ]);

  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  function addSongToPlaylist(song) {
    setPlaylistSongs((prevSongs) => [...prevSongs, song]);
  }

  function deleteSongFromPlaylist(songId) {
    setPlaylistSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== songId)
    );
  }

  function createPlaylist() {
    if (playlistName === "" || playlistSongs.length === 0) return;

    const newPlaylist = {
      id: Date.now(),
      name: playlistName,
      songs: playlistSongs,
    };

    setSavedPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);

    setPlaylistName("");
    setPlaylistSongs([]);
  }

  return (
    <main>
      <section className="web-intro">
        <h1>Welcome to Jamming!</h1>
        <h2>Create your own music playlists!</h2>
      </section>

      <section className="grid-section">
        <div className="panel">
          <h2>Find your song</h2>

          <label htmlFor="search">Search song:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={searchSongs}
            className='search-btn'
          >
            Search
          </button>

          <ul className="song-list">
            {songs.map((song) => (
              <li key={song.id} className="song-item">
                <div>
                  <strong>{song.name}</strong>
                  <p>{song.artist}</p>
                </div>

                <button
                  className="add-btn"
                  onClick={() => addSongToPlaylist(song)}
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h2>Your Playlist</h2>

          <label htmlFor="playlist">Name your playlist:</label>
          <input
            id="playlist"
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />

          <ul className="song-list">
            {playlistSongs.map((song) => (
              <li key={song.id} className="song-item">
                <div>
                  <strong>{song.name}</strong>
                  <p>{song.artist}</p>
                </div>

                <button
                  onClick={() => deleteSongFromPlaylist(song.id)}
                  className="add-btn"
                >
                  -
                </button>
              </li>
            ))}
          </ul>

          <button className="create-btn" onClick={createPlaylist}>
            Create Playlist
          </button>
        </div>

        <div className="panel">
          <h2>Your Playlists</h2>

          {selectedPlaylist ? (
            <>
              <h3>{selectedPlaylist.name}</h3>

              <ul className="song-list">
                {selectedPlaylist.songs.map((song) => (
                  <li key={song.id} className="song-item">
                    <div>
                      <strong>{song.name}</strong>
                      <p>{song.artist}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="create-btn"
                onClick={() => setSelectedPlaylist(null)}
              >
                Go Back
              </button>
            </>
          ) : (
            <ul className="song-list">
              {savedPlaylists.map((playlist) => (
                <li key={playlist.id} className="song-item">
                  <button 
                    className="new-playlist"
                    onClick={() => setSelectedPlaylist(playlist)}
                  >
                    {playlist.name}
                  </button>
                </li>
              ))}
            </ul>
          )}

        </div>
      </section>
    </main>
  );
}

export default App;