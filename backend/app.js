import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

let aboutMe = {
  name: "Hüsna Bosun",
  title: "Computer Engineering Student",
  bio: "Interning as a QA Engineer, sharpening my backend development and test automation skills along the way.",
  location: "Türkiye"
};

app.get('/api/about', (req, res) => {
  res.json(aboutMe);
});


let myProjectNotes = {
  "task-api": {
    note: "İlk backend projem, QA'dan dev'e geçiş için yaptım. Test suite yazarken 2 gerçek bug buldum.",
    featured: true
  }
};

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/experiences', async (req, res) => {
  try {
    const {data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Supabase error:', error.message);
    res.status(500).json({ error: 'Data could not be fetched' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.github.com/users/husnabosun/repos?per_page=100',
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'husnabosun-portfolio',
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    const responseBody = await response.text();

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repos = JSON.parse(responseBody);

    if (!Array.isArray(repos)) {
      throw new Error('GitHub API returned an invalid repository list');
    }

    const enrichedRepos = repos
      .filter(repo => repo.topics && repo.topics.includes('portfolio'))
      .map(repo => {
      const myNote = myProjectNotes[repo.name];
      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language,
        note: myNote ? myNote.note : null,
        featured: myNote ? myNote.featured : false
      };
    });

    res.json(enrichedRepos);
  } catch (error) {
    console.error('Projects fetch error:', error.message);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default app;