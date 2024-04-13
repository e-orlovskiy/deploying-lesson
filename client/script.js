const req1 = document.querySelector('.req1GET')
const req2 = document.querySelector('.req2POST')
const req3 = document.querySelector('.req3DEL')
const req4 = document.querySelector('.req4PATCH')

const PREFIX = 'https://deploying-lesson-server.onrender.com'

//! GET
const getData = url => {
	return new Promise((resolve, reject) =>
		fetch(url)
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

//! POST
const postData = (url, data) => {
	return new Promise((resolve, reject) =>
		fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

//! DELETE
const deleteData = url => {
	return new Promise((resolve, reject) =>
		fetch(`${url}`, {
			method: 'DELETE'
		})
			.then(response => {
				if (response.ok) {
					resolve('Данные успешно удалены')
				} else {
					reject('Ошибка удаления данных')
				}
			})
			.catch(error => reject(error))
	)
}

//! PATCH
const patchData = (url, updatedData) => {
	return new Promise((resolve, reject) =>
		fetch(`${url}`, {
			method: 'PATCH',
			body: JSON.stringify(updatedData),
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		})
			.then(response => response.json())
			.then(json => resolve(json))
			.catch(error => reject(error))
	)
}

req1.addEventListener('click', async () => {
	try {
		const users = await getData(`${PREFIX}/getUsers`)
		console.log(users)
	} catch (err) {
		console.error('Произошла ошибка при получении пользователей', err)
	}
})

req2.addEventListener('click', async () => {
	let name = prompt('Введите имя')
	let email = prompt('Введите почту')
	let password = prompt('Введите пароль')

	try {
		let user = {
			name,
			email,
			password
		}
		console.log(user)
		let info = await postData(`${PREFIX}/addUser`, user)
		console.log(info)
	} catch (err) {
		console.error('Произошла ошибка при добавлении нового пользователя', err)
	}
})

req3.addEventListener('click', async () => {
	try {
		let id = '59b99db4cfa9a34dcd7885b7'
		let info = await deleteData(`${PREFIX}/deleteUser/${id}`)
		console.log(info)
	} catch (err) {
		console.error('Произошла ошибка при удалении пользователя', err)
	}
})

req4.addEventListener('click', async () => {
	try {
		let name = prompt('Введите имя, по которому ищем')
		let newName = prompt('Введите новое имя')
		let newEmail = prompt('Введите новый email')
		let newPassword = prompt('Введите новый пароль')
		let user = {
			newName,
			newEmail,
			newPassword
		}

		let info = await patchData(`${PREFIX}/editUser/${name}`, user)
		console.log(info)
	} catch (err) {
		console.error('Произошла ошибка при редактировании пользователя', err)
	}
})
