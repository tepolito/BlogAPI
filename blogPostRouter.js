const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

BlogPosts.create("Post1", "this stuff is tough", "teps");

BlogPosts.create('post2', 'why am i having difficulties with this', 'tyler');

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

	const post = BlogPosts.create(req.body.title, req.body.content, req.body.author);
	res.status(201).json(post);
})

router.delete("/:id", (req,res)=>
{
	BlogPosts.delete(req.params.id);
	console.log(`deleted post ${req.params.id}`);
	res.status(204).end();
})

router.put("/:id", jsonParser, (req,res)=>
{
	const requiredFields = ['title', 'content', 'author', 'id'];

	for(let i=0; i<requiredFields.length;i++)
	{
		const field = requiredFields[i];
		if(!(field in req.body))
		{
			const message = `no ${field} in req body`;
			console.error(message);
			return res.status(400).send(message);
		}
	}

	if(req.body.id !== req.params.id)
	{
		const message = `the ids dont match`;
		console.error(message);
		return res.status(400).send(message);
	}

	const updatedPost = BlogPosts.update({id: req.params.id, title: req.body.title, content:req.body.content, author:req.body.author});

	res.status(200);
})

module.exports = router;