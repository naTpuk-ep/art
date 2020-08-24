// import closeModals from "./closeModals";
import culcScroll from "./culcScroll";


const modals = (dataModalSelector) => {
	let btnPressed = false;
	bindModal('.button-design', '.popup-design', '.popup-close');
	bindModal('.button-consultation', '.popup-consultation', '.popup-close');
	bindModal('.fixed-gift', '.popup-gift', '.popup-close', true);
	// showModalByTime('.popup-consultation', 3000);
	openByScroll('.fixed-gift');



	function bindModal(triggerSelector, modalSelector, closeSelector, triggerDestroy = false/*, requiredInputsSelector*/) {
		
		const trigger = document.querySelectorAll(triggerSelector),
			modal = document.querySelector(modalSelector),
			close = document.querySelectorAll(closeSelector),
			windows = document.querySelectorAll(dataModalSelector);
			// requiredInputs = document.querySelectorAll(requiredInputsSelector);
			
		trigger.forEach(item => {                       
			item.addEventListener('click', (e) => {
				if (e.target) {
					e.preventDefault();                       //отменяет стандартные действия, если они есть
				}
				btnPressed = true;
				openWindow();
			});
		});

		close.forEach(item => {
			item.addEventListener('click', () => {         //функция закрытия модального окна на кнопку close
				closeModals(dataModalSelector);
			});
		});
		
		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				closeModals(dataModalSelector);
			}
		});

		function openWindow () {                      //функция открытия модального окна
			windows.forEach(item => {                   //закрывает все модальные окна
				item.style.display = 'none';
				item.classList.add('animated', 'fadeIn');
			});
			modal.style.display = "block";              //открывает нужное модальное окно
			document.body.style.overflow = "hidden";    //отменяет прокрутку всей страницы, когда окно открыто
			// document.body.classList.add('modal-open');
			document.body.style.marginRight = `${culcScroll()}px`;
			trigger.forEach(item => {
				if (triggerDestroy){                    // скрывает trigger 
					item.remove();
				};
			});
		}

		function closeModals (dataModalSelector)  {
			const windows = document.querySelectorAll(dataModalSelector);
			windows.forEach(item => {
				item.style.display = 'none';               //закрывает все модальные окна
			});
			document.body.style.overflow = "";            //разрешает прокрутку страницы
			// document.body.classList.remove('modal-open');
			document.body.style.marginRight = '0px';
		}

	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			let display;
			document.querySelectorAll(dataModalSelector).forEach(item => {
				if (getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			});
			if (!display){                                                   // проверяет были ли открыты модальные окна
				document.querySelector(selector).style.display = "block";
				document.body.style.overflow = "hidden";
				// document.body.classList.add('modal-open');
				document.body.style.marginRight = `${culcScroll()}px`;
			}
		}, time);
	}

	function openByScroll(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(
				document.body.scrollHeight, document.documentElement.scrollHeight,
				document.body.offsetHeight, document.documentElement.offsetHeight,
				document.body.clientHeight, document.documentElement.clientHeight
			); // кроссбраузерная проверка

			if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {  // рассчет всей высоты страницы
				document.querySelector(selector).click();
			}
		});
	}
};

export default modals;
