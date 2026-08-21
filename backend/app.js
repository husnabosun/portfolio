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
  title: "QA Engineer | Aspiring Backend Developer",
  bio: "QA olarak internship yapıyorum, aynı zamanda backend development ve test otomasyonu üzerine kendimi geliştiriyorum.",
  location: "İzmir, Türkiye"
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
      .order('id', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Supabase error:', error.message);
    res.status(500).json({ error: 'Data could not be fetched' });
  }
});

app.listen(3001, () => console.log('Backend running on port 3001'));


app.get('/api/projects', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/husnabosun/repos' );
    const repos = await response.json();

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
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

export default app;