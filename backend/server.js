import express from 'express';
import bodyParser from 'body-parser';
import { marked } from 'marked';
import hljs from 'highlight.js';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

marked.setOptions({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  },
});

app.post('/convert', (req, res) => {
  const { markdown } = req.body;
  const html = marked(markdown);
  res.json({ html });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
