const accordion = (triggersSelector, itemSelectors) => {         
	const btns = document.querySelectorAll(triggersSelector),
		blocks = document.querySelectorAll(itemSelectors);
	
		btns.forEach(btn => {
			btn.addEventListener('click', function () {
				
				btns.forEach(btn => {
					if (btn !== this) {
						btn.classList.remove('active-style');
						btn.nextElementSibling.classList.remove('active-content');
						btn.nextElementSibling.style.maxHeight = '0px';
					}
				});

				this.classList.toggle('active-style');
				this.nextElementSibling.classList.toggle('active-content');

				if (this.classList.contains('active-style')) {
					this.nextElementSibling.style.maxHeight = 	this.nextElementSibling.scrollHeight + 80 + 'px';
				} else {
					this.nextElementSibling.style.maxHeight = '0px';
				}
			})
		})

	// blocks.forEach(block => {																		 //css  .accordion-heading.active+.active-block {display: block}
	// 	block.classList.add('animated', 'fadeInDown');							 //     .often-questions .accordion-block {display: none};
	// });

	// btns.forEach(btn => {
	// 	btn.addEventListener('click', function () {
	// 		if (!this.classList.contains('active')) {
	// 			btns.forEach(btn => {
	// 				btn.classList.remove('active', 'active-style');
	// 			});
	// 			this.classList.add('active', 'active-style');
	// 		}
	// 	})
	// })
};

export default accordion;