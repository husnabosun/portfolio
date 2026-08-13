const express = require('express');
const cors = require('cors');
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

app.get('/', (req, res) => {
  res.send('Portfolio API is running!');
});

app.get('/api/projects', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/husnabosun/repos');
    const repos = await response.json();

    const enrichedRepos = repos.map(repo => {
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

module.exports = app;