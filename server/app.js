const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const UserModel = require('./models/UserModel')

require('dotenv').config()

const port = process.env.PORT || 3002
const app = express()

app.use(
	cors({
		origin: ['https://deploying-lesson-client.onrender.com'],
		methods: 'GET, PATCH, POST, DELETE'
	})
)
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI)

// получение всех пользователей из БД
app.get('/getUsers', async (req, res) => {
	try {
		const users = await UserModel.find({})
		res.send({ users })
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
		res.send({ error: 'Произошла ошибка при получении пользователей' })
	}
})

// добавление нового пользователя в БД
app.post('/addUser', async (req, res) => {
	try {
		const { name, password, email } = req.body
		const user = { name, password, email }
		await UserModel.create(user)
		res.send({ message: 'Пользователь успешно добавлен в БД' })
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового пользователя', err)
		res.send({
			error: `Произошла ошибка при добавлении нового пользователя ${err}`
		})
	}
})

// удаление пользователя из БД
app.delete('/deleteUser/:id', async (req, res) => {
	try {
		const { id } = req.params
		await UserModel.findByIdAndDelete(id)
		res.send({ message: 'Пользователь успешно удален из БД' })
	} catch (err) {
		console.error('Произошла ошибка при удалении пользователя', err)
		res.send({
			error: `Произошла ошибка при удалении пользователя ${err}`
		})
	}
})

// редактирование пользователя в БД
app.patch('/editUser/:name', async (req, res) => {
	try {
		const { name } = req.params
		const { newName, newPassword, newEmail } = req.body

		const user = await UserModel.findOne({ name })
		if (user) {
			user.name = newName
			user.password = newPassword
			user.email = newEmail
		}
		const info = await user.save()
		if (info) {
			res.send({ message: 'Пользователь успешно отредактирован в БД' })
		}
	} catch (err) {
		console.error('Произошла ошибка при редактировании пользователя', err)
		res.send({
			error: `Произошла ошибка при редактировании пользователя ${err}`
		})
	}
})

app.listen(port, () => {
	console.log(`Сервер запущен на порту ${port}`)
})
