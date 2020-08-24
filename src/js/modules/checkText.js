const checkText = (selector) => {
	const inputs = document.querySelectorAll(selector);
	inputs.forEach(input => {
		// input.addEventListener('keypress', (e) => {
		// 	if (e.key.match(/[^а-яё 0-9]/ig)) {
		// 		e.preventDefault();
		// 	};
		// });
		input.addEventListener('input', () => {
			input.value = input.value.replace(/[a-z]/ig, '');
		});
	});
};

export default checkText;