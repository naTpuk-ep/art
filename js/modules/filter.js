const filter = () => {
	const menu = document.querySelector('.portfolio-menu'),
		buttons = menu.querySelectorAll('li'),
		// btnAll = menu.querySelector('.all'),
		// btnlovers = menu.querySelector('.lovers'),
		// btnchef = menu.querySelector('.chef'),
		// btngirl = menu.querySelector('.girl'),
		// btnguy = menu.querySelector('.guy'),
		// btngrandmother = menu.querySelector('.grandmother'),
		// btngranddad = menu.querySelector('.granddad'),
		wrapper = document.querySelector('.portfolio-wrapper'),
		markAll = wrapper.querySelectorAll('.all'),
		// markgirl = wrapper.querySelectorAll('.girl'),
		// markguy = wrapper.querySelectorAll('.guy'),
		// marklovers = wrapper.querySelectorAll('.lovers'),
		// markchef = wrapper.querySelectorAll('.chef'),
		no = document.querySelector('.portfolio-no');

	const typeFilter = (markShowSelector) => {

			let markType = wrapper.querySelectorAll(markShowSelector);
			console.log(markType);
			markAll.forEach(item => {
				item.style.display = 'none';
				item.classList.remove('animated', 'fadeIn');
			});

			no.style.display = 'none';
			no.classList.add('animated', 'fadeIn');
			
			if (markType.length > 0) {
				markType.forEach(item => {
					item.style.display = 'block';
					item.classList.add('animated', 'fadeIn');
				});
			} else {
				no.style.display = 'block';
				no.classList.add('animated', 'fadeIn');
			}
	}

	const markShow = (Selector) => {
		let	btn = menu.querySelector(Selector);
		btn.addEventListener('click', (e) => {
			buttons.forEach(button => {
				button.classList.remove('active')
			});
			e.target.classList.add('active');
			typeFilter(Selector);
		});
	};

	markShow('.all');
	markShow('.lovers');
	markShow('.chef');
	markShow('.girl');
	markShow('.guy');
	markShow('.granddad');
	markShow('.grandmother');

	// btnAll.addEventListener('click', () => {
	// 	typeFilter(markAll);
	// });
	// btnlovers.addEventListener('click', () => {
	// 	typeFilter(marklovers);
	// });
	// btnchef.addEventListener('click', () => {
	// 	typeFilter(markchef);
	// });
	// btngirl.addEventListener('click', () => {
	// 	typeFilter(markgirl);
	// });
	// btnguy.addEventListener('click', () => {
	// 	typeFilter(markguy);
	// });
	// btngrandmother.addEventListener('click', () => {
	// 	typeFilter();
	// });
	// btngranddad.addEventListener('click', () => {
	// 	typeFilter();
	// });
	
};

export default filter;