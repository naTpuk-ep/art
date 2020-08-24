// import checkNumInputs from "./checkNumInputs";
// import closeModals from "./closeModals";
import {postData} from "../services/requests";

const forms = () => {
	const form = document.querySelectorAll('form'),
		inputs = document.querySelectorAll('input'),
		upload = document.querySelectorAll('[name="upload"]'),
		selects = document.querySelectorAll('select'),
		CalcPrice = document.querySelector('.calc-price'),
		startCalcPrice = CalcPrice.textContent;

	const message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Мы скоро с вами свяжемся',
		failure: 'Ошибка',
		spinner: 'assets/img/spinner.gif',
		ok: 'assets/img/ok.png',
		fail: 'assets/img/fail.png',
		upload: 'Выберите файл и материалы для портрета',
		phoneCheck: 'Неправильный номер телефона'
	}

	const path = {
		designer: 'assets/server.php',
		question: 'assets/question.php'
	}

	const clearInputs = () => {
		inputs.forEach(item => {
			item.value = '';
		});
		upload.forEach(item => {
			item.previousElementSibling.textContent = 'Файл не выбран';
		});
		selects.forEach(item => {
			item.selectedIndex = 0;
		});
		CalcPrice.textContent = startCalcPrice;
	}

	upload.forEach(item => {
		item.addEventListener('input', () => {            // подставляем в файлИнпут название файла и ставим точки если длинный
			console.log(item.files[0]);
			let dots;
			item.files[0].name.split('.')[0].length > 5 ? dots = '...' : dots = '.';
			const name = item.files[0].name.split('.')[0].substring(0, 6) + dots + item.files[0].name.split('.')[1];
			item.previousElementSibling.textContent = name;
		});
	})

	form.forEach(formItem => {
		formItem.addEventListener('submit', (e) => {
			e.preventDefault();
			const uploadInput = formItem.querySelector('[name="upload"]'),
				formSelects = formItem.querySelectorAll('select'),
				formPhone = formItem.querySelector('[name="phone"]');
				console.log(formSelects);
			// console.log(uploadInput.previousElementSibling.textContent);
			if (statusMessage) {
				statusMessage.remove();
			};

			if (document.querySelector('.status')) {
				document.querySelector('.status').remove();
			}
			
			let statusMessage = document.createElement('div');
			statusMessage.classList.add('status');
			formItem.parentNode.appendChild(statusMessage);
			
			 if (uploadInput) {
				if ((uploadInput.files[0])) {
					if  (formSelects.length > 0) {
						if (formSelects[0].value && formSelects[1].value){
							mainFunction();
						} else statusMessage.textContent = message.upload;
					} else {
						mainFunction();
					}
				} else statusMessage.textContent = message.upload;
			} else mainFunction();
			

			
			
			function mainFunction () {

				formItem.classList.add('animated', 'fadeOutUp');
				setTimeout(() =>  {
					formItem.style.display = 'none';
				}, 400);
	
				let statusImg = document.createElement('img');
				statusImg.setAttribute('src', message.spinner);
				statusImg.classList.add('animated', 'fadeInUp');
				statusMessage.appendChild(statusImg);
	
				let textMessage = document.createElement('div');
				textMessage.textContent = message.loading;
				statusMessage.appendChild(textMessage);
	
				const formData = new FormData(formItem);

				formSelects.forEach(select => {
					formData.append(select.getAttribute('id'), select.value);
				});

				if (formSelects.length > 0) {
					let sum = CalcPrice.textContent;
					formData.append('calc_price', sum);
				}

				let api;
				formItem.closest('.popup-design') || formItem.classList.contains('calc_form') ? api = path.designer : api = path.question; // проверка куда отправлять
				console.log(api);
	
				postData(api, formData)
				.then(res => {
					console.log(res);
					statusImg.setAttribute('src', message.ok);
					textMessage.textContent = message.success;
				})
				.catch(() => {
					statusImg.setAttribute('src', message.fail);
					textMessage.textContent = message.failure;
				})
				.finally(() => {
					setTimeout( () => {
						statusMessage.remove();
						formItem.style.display = 'block';
						formItem.classList.remove('fadeOutUp');
						formItem.classList.add('fadeInUp');
					}, 3000);
					clearInputs();
				});
			}
		});
	});
};

export default forms;