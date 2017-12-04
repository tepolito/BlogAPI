const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Post1", "this stuff is tough", "teps");

router.get("/", (req,res)=>
{
	res.json(BlogPosts.get());
})

router.post("/", jsonParser, (req,res)=>
{
	const requiredFields = ['title', 'content', 'author'];

	for(let i = 0; i<requiredFields.length; i++)
	{
		const field = requiredFields[i];
		if(!(field in req.body))
		{
			const message = `missing ${field} in request body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}
})