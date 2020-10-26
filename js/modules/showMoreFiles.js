import {getResourse} from "../services/requests"

const showMoreFiles = (trigger, wrapper) => {
	const	btn = document.querySelector(trigger);

		// cards.forEach(card => {
		// 	card.classList.add('animated', 'fadeInUp');
		// });

		// btn.addEventListener('click', () => {
		// 	cards.forEach(card => {
		// 		card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
		// 		card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
		// 	});
		// 	btn.remove();
		// });

		btn.addEventListener('click', function() {              //стрелочная функция не ссылается на this!!!
			getResourse('http://localhost:3000/styles')
				.catch(error => {
					console.log(error);
					let errorMessage = document.createElement('div');
					document.querySelector(wrapper).appendChild(errorMessage);
					errorMessage.innerHTML = `<p>Сервер не отвечает, ошибка: ${error}</p>`;
				})
				.then(res => {
					createCards(res);
				})
				this.remove();
		});

		function createCards(response) {
			response.forEach(({src, title, link}) => {   // деструктуризация
				let card = document.createElement('div');
				card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1', 'animated', 'fadeInUp');
				card.innerHTML = `
					<div class=styles-block>
						<img src=${src} alt="style">
						<h4>${title}</h4>
						<a href="#">${link}</a>
					</div>
				`;
				document.querySelector(wrapper).appendChild(card);
			});
		}


				
};

export default showMoreFiles;