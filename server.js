 const express = require('express');

const blogPostRouter = require('./blogPostRouter');

const app = express();

app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 8080, () => 
{
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
