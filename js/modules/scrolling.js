const scrolling = (upSelector) => {
	const upElem = document.querySelector(upSelector);
	window.addEventListener('scroll', () => {
		if (document.documentElement.scrollTop > 500) {
			upElem.classList.add('animated', 'fadeIn');
			upElem.classList.remove('fadeOut');
		} else {
			upElem.classList.add('fadeOut');
			upElem.classList.remove('fadeIn');
		}
	});

	// scrolling with raf

	let links = document.querySelectorAll('[href^="#"]');

	links.forEach(link => {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			let	element = document.documentElement,
			body = document.body;

			let widthTop =  Math.round(body.scrollTop || element.scrollTop),    // Свойство scrollTop считывает или устанавливает количество пикселей, прокрученных от верха элемента. scrollTop измеряет дистанцию от верха элемента до верхней точки видимого контента. + проверка!!
			hash = this.hash,
			toBlock = document.querySelector(hash).getBoundingClientRect().top,    // верхняя граница элемента, к которому скроллим. getBoundingClientRect  позволяет получить доступ к свойствам например Top

			duration = 3000;
			console.log('widthTop', widthTop);
			console.log('toBlock', toBlock);
			
			function EaseInOut(timing) {
				return function(timeFraction) {
					if (timeFraction < .5)
						return timing(2 * timeFraction) / 2;
					else
						return (2 - timing(2 * (1 - timeFraction))) / 2;
				}
			}

			function quad(timeFraction) {
				return Math.pow(timeFraction, 3);
			};

			let EaseInOutquad = EaseInOut(quad);
			
				let start = performance.now();

				requestAnimationFrame(function animate(time) {
					// timeFraction изменяется от 0 до 1

					let timeFraction = (time - start) / duration;
					if (timeFraction > 1) timeFraction = 1;
					// вычисление текущего состояния анимации
					let progress = EaseInOutquad(timeFraction);
					
					let r = (widthTop + toBlock*progress);		// колличество пикселей на которое нам необходимо пролистать за время анимации
					
					element.scrollTo(0, r);
					body.scrollTo(0, r);
					
					// if (r != widthTop + toBlock) {
					// 	requestAnimationFrame(animate);
					// } else {
					// 	location.hash = hash;
					// }
					if (timeFraction < 1) {
						requestAnimationFrame(animate);
					}
				});


			// requestAnimationFrame(step);

			// function step(time) {
				
			// 	if (start === null) {
			// 		start = time;
			// 	}

			// 	let progress = time - start,
			// 	r = (toBlock < 0 ? Math.max(widthTop - progress/speed, widthTop + toBlock) : Math.min(widthTop + progress/speed, widthTop + toBlock));											// колличество пикселей на которое нам необходимо пролистать за время анимации
			// 	console.log(progress);
			// 	element.scrollTo(0, r);
			// 	body.scrollTo(0, r);

			// 	if (r != widthTop + toBlock) {
			// 		requestAnimationFrame(step);
			// 	} else {
			// 		location.hash = hash;
			// 	}
			// }
		})
	})


	//Pure js scrolling
	// const	element = document.documentElement,
	// 	body = document.body;

	// 	const	calcScroll = () => {
	// 		upElem.addEventListener('click', function (event) {
	// 			let scrollTop = Math.round(body.scrollTop || element.scrollTop);  //

	// 			if (this.hash !== '') {
	// 				event.preventDefault();
	// 				let hashElement = document.querySelector(this.hash),
	// 					hashElementTop = 0;

	// 				while (hashElement.offsetParent) {
	// 					hashElementTop += hashElement.offsetTop;
	// 					hashElement = hashElement.offsetParent;
	// 				}

	// 				hashElementTop = Math.round(hashElementTop);
	// 				smoothScroll(scrollTop, hashElementTop, this.hash);
	// 			}
	// 		});
	// 	};

	// 	const smoothScroll = (from, to, hash) => {
	// 		let timeInterval = 1,
	// 			prevScrollTop,
	// 			speed;

	// 			if (to > from) {
	// 				speed = 30;
	// 			} else {
	// 				speed = -30;
	// 			}

	// 			let move = setInterval(function () {
	// 				let scrollTop = Math.round(body.scrollTop || element.scrollTop);

	// 				if (
	// 					prevScrollTop === scrollTop || 
	// 					(to > from && scrollTop >= to) ||
	// 					(to < from && scrollTop <= to)
	// 				) {
	// 					clearInterval(move);

	// 				} else {
	// 					body.scrollTop += speed;
	// 					element.scrollTop += speed
	// 					prevScrollTop = scrollTop;
	// 				}
	// 			}, timeInterval);
	// 	};

	// 	calcScroll();
};

export default scrolling;