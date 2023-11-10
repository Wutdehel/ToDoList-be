const UsersModels = require ('../models/scheme/User')
const Cryptr = require('cryptr')
const CryptrNew = new Cryptr('Ems1')
const JWT = require('jsonwebtoken')


async function Register(req, res, next) {
   const {username, password, email} = req.body

   try {
    let getUser = await UsersModels.findOne({
        username: username
    })

    if ( getUser ) {
        res.status(400).send({
            message: 'Data is exists, please create another one!',
            statusCode: 400
        })
    } else {

        let data = {
            username: username,
            password: CryptrNew.encrypt(password),
            email: email,
            lastname: '-'
        }

        let createdData = await UsersModels.create(data)

        if ( !createdData ) {
            res.status(400).send({
                message: 'wrong username or password',
                statusCode: 400
            })
        } else {
            res.send({
                message: 'successfull to create data users!',
                statusCode: 200,
            })
        }
    }
   } catch (error) {
       console.log(error)
       res.status(400).send({
            message: "Something Wrong",
            error: error,
            statusCode: 400
       })
   }
}

async function Login(req, res, next) {
    const { username, password} = req.body
    try {
        let getUser = await UsersModels.aggregate([
            {
                $match: {
                    $or: [
                        { username: username },
                        { email: username }
                    ]
                }
            }
        ])

        if ( getUser.length < 1 ) {
            res.status(400).send({
                message: 'Data is not exists!',
                statusCode: 400
            })
        } else {
            let passwordUser = CryptrNew.decrypt(getUser[0].password)

            if ( req.body.password !== passwordUser ) {
                res.status(400).send({
                    message: 'Username or Password is wrong!',
                    statusCode: 400
                })
            } else {
                let expiredToken = Math.floor(Date.now() / 1000) + (60 * 60)
                let createAccessToken = JWT.sign({
                    exp: expiredToken,
                    data: {
                        user: getUser[0].username,
                        email: getUser[0].email,
                        id: getUser[0]._id,
                    }
                }, 'Ems1')
    
                let dataPassingClient = {
                    access_token: createAccessToken, // access token expired 1 day
                    refresh_token: createAccessToken, // refresh token expired 1 month
                    expired_date: expiredToken,
                    user: getUser[0].username,
                    id: getUser[0]._id,
                }
    
                res.status(200).send({
                    message: 'Successfull to login user!',
                    statusText: 'Successfull to login user!',
                    statusCode: 200,
                    data: dataPassingClient
                })
            }
        }
    } catch(error) {
        console.log(error)
        res.status(400)
    }
}

module.exports = {
    Register, Login
}