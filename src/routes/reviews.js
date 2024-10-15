import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const reviewsRouter = express.Router();

dotenv.config();

const app = express();
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

app.get('/login', (req, res) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
    },
    json: true
  };

  try {
    const response = await axios.post(authOptions.url, authOptions.form, { headers: authOptions.headers });
    const accessToken = response.data.access_token;
    res.redirect(`http://localhost:3000?access_token=${accessToken}`);
  } catch (error) {
    res.send(error);
  }
});

app.get('/albums', async (req, res) => {
  const accessToken = req.query.access_token;
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/albums', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

export default reviewsRouter;