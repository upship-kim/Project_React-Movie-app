const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema(
    {
        userFrom: {
            type: Schema.Types.ObjectId,
            ref: 'User', //해당 User Schema에 있는 정보를 참조하여 가져올 수 있음
        },
        movieId: {
            type: String,
        },
        movieTitle: {
            type: String,
        },
        movieImage: {
            type: String,
        },
        movieRunTime: {
            type: String,
        },
    },
    {timestamps: true} //생성된 시간을 자동으로 처리해줌
);

const Favorite = mongoose.model('Favorite', favoriteSchema); //모델에 userSchema를 감싸는 것  (모델의 이름, 스키마)

module.exports = {Favorite}; //다른곳에도 쓸 수 있게 함
