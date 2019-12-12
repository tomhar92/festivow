let express = require('express')
let router = express.Router()

let db = require('../db.js')

router.post('/', (req,res)=>{
	let item = {
		'_id': req.body.id,
		'name': req.body.name,
		'artists': req.body.artists,
		'festivals': req.body.festivals
	}
	db.get().collection('genres').insertOne(item, (err,result)=>{
		if(err) res.json(err)
		res.send("Saved Genres To DB")
	})
})

router.get('/get-all', (req,res)=>{
	db.get().collection('genres').find().toArray((err,docs)=>{
		if(err) res.json(err)
		res.send(docs)
	})
})

router.post('/get-by-id', async(req,res)=>{
	const result = await db.get().collection('genres').find({_id: req.body.id}).limit(1).next(function(err,doc){
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
		const result = await db.get().collection('genres').deleteOne(
			{_id: req.body.id},
			{justOne: true}
		)
		if(result.writeConcernError)
			res.json(result.writeConcernError)
		else
			res.send("Deleted Genre Successfully!")
	} catch (err) {
		res.json(err)
	}
})

router.post('/update', async (req,res)=>{
	if(req.body.id === req.body.newId){
		updateGenreWithoutId(req,res)
	}
	else{
		updateGenreWithChangeId(req,res)
	}
	
})

router.post('/add-artist', async (req,res)=>{
	try{
		const result = await db.get().collection('genres').updateOne(
			{_id: req.body.genreId},
			{	$push: {
					artists: req.body.artistId
				}
			}
		)
		res.json(result)
	} catch(err) {
		res.json(err)
	}
})

router.post('/remove-artist', async (req,res)=>{
	try{
		const result = await db.get().collection('genres').updateOne(
			{_id: req.body.genreId},
			{
				$pull: {
					artists: req.body.artistId
				}
			}
		)
		res.json(result)
	} catch(err){
		res.json(err)
	}
})

router.post('/get-genres-by-artist', async (req,res) => {
	try{
		const result = await db.get().collection('genres').find(
			{ artists: { $in: [req.body.artistId]}}
		).toArray(function(err,docs){
			if(err)
				res.json(err)
			if(docs)
				res.send(docs)
			else
				res.send("I didn't Find Anything!")
		})
	} catch(err) {
		res.json(err)
	}
})

updateGenreWithoutId = async function(req,res){
	try{
		const result = await db.get().collection('genres').updateOne(
			{_id: req.body.id},
			{ $set: {
					name: req.body.name,
					artists: req.body.artists,
					festivals: req.body.festivals
				}
			}
		)	
		res.json(result)
	} catch (err) {
		res.json(err)
	}
}

updateGenreWithChangeId = async function(req,res){
	try{
		const result = await db.get().collection('genres').deleteOne(
			{_id: req.body.id},
			{justOne: true}
		)
		if(result.writeConcernError)
			res.json(result.writeConcernError)
		else {
			let item = {
				'_id': req.body.newId,
				'name': req.body.name,
				'artists': req.body.artists,
				'festivals': req.body.festivals
			}
			db.get().collection('genres').insertOne(item, (err,result)=>{
				if(err) res.json(err)
				res.send("Saved Genres To DB")
			})
		}
	} catch (err) {
		res.json(err)
	}
}

module.exports = router