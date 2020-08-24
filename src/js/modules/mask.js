const mask = (selector) => {

	let setCursorPosition = (pos, elem) => {
		if (elem.selectionStart < 2) {
			elem.selectionStart = 2;
		}
		elem.focus();

		if (elem.setSelectionRange) {                  // кроссбраузерная проверка
				elem.setSelectionRange(pos, pos);
		} else if (elem.createTextRange) {
			let range = elem.createTextRange();

			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	};

		function createMask(event) {
			let matrix = '+7 (___) ___-__-__',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');
				
			if (def.length > val.length){
				val = def;
			}

			this.value = matrix.replace(/[_\d]/g, function(a) {
				return val.charAt(i++) || '_';
				// if (/[_\d]/.test(a) && i < val.length) {
				// 	return val.charAt(i++);
				// } else if (i >= val.length) {
				// 	return '';
				// } else {
				// 	return a;
				// };
			});
			
			this.value.split('').forEach((a, index) => {
				if (!isNaN(a) && a != ' ') i = index+1;
			})
			
			setCursorPosition(i, this);
			console.log(i);

			// if (event.type === 'blur') {
			// 	if (this.value.length == 2) {
			// 		this.value = '';
			// 	}
			// } else {
			// 	setCursorPosition(this.value.length, this);
			// }
		}

		let inputs = document.querySelectorAll(selector);

		inputs.forEach(input => {
			input.addEventListener('input', createMask);
			// input.addEventListener('blur', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('click', () => {
				if (input.selectionStart < 2) {
					input.selectionStart = 2;
				}
			});
		});
};

export default mask;