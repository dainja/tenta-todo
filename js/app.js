/**================================================== *
 * ==========  Constants  ========== *
 * ================================================== */
const input = document.querySelector('.formInput');
const addTask = document.getElementById('addBtn');

/**================================================== *
 * ==========  Eventlisteners  ========== *
 * ================================================== */
window.addEventListener('click', deleteTask);
addTask.addEventListener('click', postTask);
input.addEventListener('keyup', function (e) {
	if (e.keyCode === 13) {
		postTask(e);
	}
});

/**================================================== *
 * ==========  Functions  ========== *
 * ================================================== */

/*--------  fetch data from local api  --------*/
function fetchData() {
	let giveMeSomethingPlease = fetch('http://localhost:3000/tasks', {
		method: 'GET',
		redirect: 'follow',
	}).then((response) => response.json());

	return giveMeSomethingPlease;
}

/*--------  fetch api and print existing todo-data to dom  --------*/
function printToDom() {
	const list = document.getElementById('myUL');

	fetchData().then((response) => {
		for (let i = 0; i < response.length; i++) {
			const taskTitle = response[i].title;

			let code = `
				<li class="d-flex align-items-center p-3">
        <i class="far fa-circle"></i>
        <span class="ml-2">${taskTitle}</span>
        <i class="far fa-trash-alt ml-auto text-danger"></i>
    		</li>
				`;

			list.innerHTML += code;
		}
	});
}
printToDom();

/*--------  post task to todo-list  --------*/
function postTask(e) {
	e.preventDefault();

	inputValue = input.value;

	/* if input value is not empty, proceed */
	if (inputValue != '') {
		fetchData().then((response) => {
			var myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');

			/* the code here posts the tasks */
			fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify({ id: '', title: `${inputValue}` }),
				redirect: 'follow',
			}).then((response) => response.json());
		});
	}
}

/*--------  delete a task function  --------*/
function deleteTask(e) {
	if (e.target.classList.contains('fa-trash-alt')) {
		fetchData().then((response) => {
			for (let i = 0; i < response.length; i++) {

				/**
				 *
				 * match the innerHTML (word)
				 * with the text in json api
				 *
				 */
				if (
					e.target.previousElementSibling.innerHTML ==
					response[i].title
				) {
					fetch(`http://localhost:3000/tasks/${[response[i].id]}`, {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ id: '', title: '' }),
						redirect: 'follow',
					}).then((response) => response.json());

					/* remove the whole <li> */
					e.target.previousElementSibling.parentElement.remove();
				}
			}
		});
	}
}
