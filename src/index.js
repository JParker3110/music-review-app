// src/index.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
