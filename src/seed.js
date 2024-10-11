// src/seed.js
import axios from 'axios';
import dotenv from 'dotenv';
import supabase from './supabaseClient.js';

dotenv.config();

const getSpotifyToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64')}`
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};

const fetchMusicData = async (token) => {
  const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.tracks.items.map(item => ({
    title: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    release_date: item.track.album.release_date,
    genre: 'R&B' // Example genre, you can adjust this
  }));
};

const seedDatabase = async () => {
  try {
    const token = await getSpotifyToken();
    const musicData = await fetchMusicData(token);

    for (const song of musicData) {
      const { data, error } = await supabase
        .from('songs')
        .insert([song]);

      if (error) {
        console.error('Error inserting song:', error);
      } else {
        console.log('Inserted song:', data);
      }
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();
