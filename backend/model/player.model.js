const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let playerSchema = new Schema({
    Player_Name: {
        type: String
    },
    Matches: {
        type: Number
    },
    Inns: {
        type: Number
    },
    Runs: {
        type: Number
    },
	HS: {
        type: Number
    },
	Ave: {
        type: Number
    }
},
{
    collection: 'players'
}
);

module.exports = mongoose.model('PlayerSchema', player, 'players', playerSchema)