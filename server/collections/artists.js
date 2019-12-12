let express = require('express')
let router = express.Router()

let db = require('../db.js')

router.post('/', (req,res)=>{
	let item = {
		'_id': req.body.id,
		'name': req.body.name,
		'desc': req.body.desc,
		'img': req.body.img,
		'video': req.body.video,
		'shows': req.body.shows
	}
	db.get().collection('artists').insertOne(item, (err,result)=>{
		if(err) res.json(err)
		res.send("Saved Artists To DB")
	})
})

router.get('/get-all', (req,res)=>{
	db.get().collection('artists').find().toArray((err,docs)=>{
		if(err) res.json(err)
		res.send(docs)
	})
})

router.post('/get-by-id', async(req,res)=>{
	const result = await db.get().collection('artists').find({_id: req.body.id}).limit(1).next(function(err,doc){
		if(err)
			res.json(err)
		if(doc)
			res.send(doc)
		else
			res.send(req.body.id)

	})
})

router.post('/delete', async (req,res)=>{
	try{
		const result = await db.get().collection('artists').deleteOne(
			{_id: req.body.id},
			{justOne: true}
		)
		if(result.writeConcernError)
			res.json(result.writeConcernError)
		else
			res.send("Deleted Artist Successfully!")
	} catch (err) {
		res.json(err)
	}
})

router.post('/update', async (req,res)=>{
	if(req.body.id === req.body.newId){
		updateArtistWithoutId(req,res)
	}
	else{
		updateArtistWithChangeId(req,res)
	}
	
})

updateArtistWithoutId = async function(req,res){
	try{
		const result = await db.get().collection('artists').updateOne(
			{_id: req.body.id},
			{ $set: {
					name: req.body.name,
					desc: req.body.desc,
					img: req.body.img,
					video: req.body.video,
					shows: req.body.shows
				}
			}
		)	
		res.json(result)
	} catch (err) {
		res.json(err)
	}
}

updateArtistWithChangeId = async function(req,res){
	try{
		const result = await db.get().collection('artists').deleteOne(
			{_id: req.body.id},
			{justOne: true}
		)
		if(result.writeConcernError)
			res.json(result.writeConcernError)
		else {
			let item = {
				'_id': req.body.newId,
				'name': req.body.name,
				'desc': req.body.desc,
				'img': req.body.img,
				'video': req.body.video,
				'shows': req.body.shows
			}
			db.get().collection('artists').insertOne(item, (err,result)=>{
				if(err) res.json(err)
				res.send("Saved Artists To DB")
			})
		}
	} catch (err) {
		res.json(err)
	}
}

module.exports = router