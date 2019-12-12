const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const morgan=require("morgan")
const app=express()
var db=require('./db.js')

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('combined'))

db.connect('mongodb://festivowadmin:Festivow!2018@ds137464.mlab.com:37464/learnfestivow', (err) => {
	if(err) return console.error(err)
	else{	
		app.listen(3000, function() {
			console.log("listening to 3000")
			createGenres(db, function() {
				db.close()
			})
			createArtists(db, function() {
				db.close()
			})
		})
	}		
})

app.get('/', (req,res)=>{
	res.send("Festivow Checking Server")
})
app.use('/genres', require('./collections/genres.js'))
app.use('/artists', require('./collections/artists.js'))

function createGenres(db, callback){
	db.get().createCollection("genres", {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name", "artists", "festivals"]
			}
		}
	}), function(err, results){
		console.log("Genre Collection Created")
		callback()
	}
}

function createArtists(db, callback){
	db.get().createCollection("artists", {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name", "desc", "img", "video", "shows"]
			}
		}
	}), function(err,results){
		console.log("Artists Collection Created")
		callback()
	}
}