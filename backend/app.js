import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const allowedOrigins = [
  'https://husnabosun.fyi',
  'https://www.husnabosun.fyi',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

let aboutMe = {
  name: "Hüsna Bosun",
  title: "Computer Engineering Student",
  bio: "Interning as a QA Engineer, sharpening my backend development and test automation skills along the way.",
  location: "Türkiye",
  description : "I'm focused on building reliable software, improving how systems work, and turning everyday problems into practical tools. My experience spans software QA, backend development, and test automation, with a strong interest in understanding systems end to end and making them better."
  
};

app.get('/api/about', (req, res) => {
  res.json(aboutMe);
});

let myProjectNotes = {
  "task-api": {
    note: "This portfolio website showcases my skills and projects, built with React and Supabase.",
    featured: true
  }
};


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/api/education', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Supabase error:', error.message);
    res.status(500).json({ error: 'Data could not be fetched' });
  }
});

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
          ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
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