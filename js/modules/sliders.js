const sliders = (slides, dir, prev, next) => {
	let slideIndex = 4,
	paused = false;
	const items = document.querySelectorAll(slides);

		

		function showSlides(n) {
			if (n > items.length) {
				slideIndex = 1;
			}

			if (n < 1) {
				slideIndex = items.length;
			}

			items.forEach(item => {
				item.classList.add('animated');
				item.style.setProperty('animation-duration', '0.6s');
				item.style.display = 'none';
			});

			items[slideIndex - 1].style.display = 'block';
		}

		showSlides(slideIndex);

		function plusSlides (n) {
			showSlides(slideIndex += n);
		}


	
		try {
			const prevBtn = document.querySelector(prev),
			nextBtn = document.querySelector(next);

			prevBtn.addEventListener('click', () => {
				items[slideIndex - 1].classList.add('fadeOutLeft');
				items[slideIndex - 1].addEventListener('animationend', () => {
					items[slideIndex - 1].classList.remove('fadeOutLeft');
					plusSlides(-1);
					items[slideIndex - 1].classList.remove('fadeInLeft');
					items[slideIndex - 1].classList.add('fadeInRight');
				}, {once: true});
			});
			nextBtn.addEventListener('click', () => {
				items[slideIndex - 1].classList.add('fadeOutRight');
				items[slideIndex - 1].addEventListener('animationend', () => {
					items[slideIndex - 1].classList.remove('fadeOutRight');
					plusSlides(-1);
					items[slideIndex - 1].classList.remove('fadeInRight');
					items[slideIndex - 1].classList.add('fadeInLeft');
				}, {once: true});
			});
		} catch(e){}

		function activateSliders () {
			if (dir === 'vertical') {
				paused = setInterval(() => {
					plusSlides(1);
					items[slideIndex - 1].style.setProperty('animation-duration', '1.5s');
					items[slideIndex - 1].classList.add('slideInUp');
				}, 6000);
			} else {
				paused = setInterval(() => {
					items[slideIndex - 1].classList.add('fadeOutRight');
					items[slideIndex - 1].addEventListener('animationend', () => {
						items[slideIndex - 1].classList.remove('fadeOutRight');
						plusSlides(-1);
						items[slideIndex - 1].classList.remove('fadeInRight');
						items[slideIndex - 1].classList.add('fadeInLeft');
					}, {once: true});
				}, 6000);
			}
		}

		activateSliders();

		items[0].parentNode.addEventListener('mouseenter', () => {
			clearInterval(paused);
		});
		items[0].parentNode.addEventListener('mouseleave', () => {
			activateSliders();
		});

}

export default sliders;