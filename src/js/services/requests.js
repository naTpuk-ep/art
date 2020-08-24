const postData = async (url, data) => {      // async говорит, что функции будут выполняться асинхронно, не сразу
	let res = await fetch(url, {               // в данном случае await, по получению ответа от сервера
		method: 'POST',
		body: data
	});
	 return await res.text();
};

const getResourse = async (url) => {      // async говорит, что функции будут выполняться асинхронно, не сразу
	let res = await fetch(url);

	if (!res.ok) {
		throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
	}

	 return await res.json();
};

export {postData, getResourse};