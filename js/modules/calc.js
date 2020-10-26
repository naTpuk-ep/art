import {getResourse} from "../services/requests"

const calc = (size, material, options, promocode, result) => {
	const sizeBlock = document.querySelector(size),
		materialBlock = document.querySelector(material),
		optionsBlock = document.querySelector(options),
		promocodeBlock = document.querySelector(promocode),
		resultBlock = document.querySelector(result);

		let sum = 0;

		getResourse('http://localhost:3000/sizes')
		.catch(error => {
			console.log(error);
			let errorMessage = document.createElement('div');
			document.querySelector(result).appendChild(errorMessage);
			errorMessage.innerHTML = `<p>Сервер не отвечает, ошибка: ${error}</p>`;
		})
		.then(res => {
			createForm(res);
		})

		function createForm (response) {
			response.forEach(({size, price}) => {
				let option = document.createElement('option');
				option.textContent = size;
				option.value = price;
				sizeBlock.appendChild(option);
			});
		}

		const	calcFunc = () => {

			sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

			if (sizeBlock.value == '' || materialBlock.value == '') {
				resultBlock.textContent = "Выберите размер и материал картины";
			} else if (promocodeBlock.value === 'IWANTPOPART') {
				resultBlock.textContent = Math.round(sum * 0.7);
			} else {
				resultBlock.textContent = sum;
			}
		};

		sizeBlock.addEventListener('change', calcFunc);
		materialBlock.addEventListener('change', calcFunc);
		optionsBlock.addEventListener('change', calcFunc);
		promocodeBlock.addEventListener('input', calcFunc);
};

export default calc;