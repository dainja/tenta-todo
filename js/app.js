
/**================================================== *
 * ==========  Event  ========== *
 * ================================================== */

window.addEventListener('click', deleteTask);


const input = document.querySelector('.formInput')
const addTask = document.getElementById('addBtn')


input.addEventListener('keyup', function(e){
	if(e.keyCode === 13){
		postTask(e)
}
})
addTask.addEventListener('click', postTask)


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



function fetchData() {
	let giveMeSomethingPlease = fetch('http://localhost:3000/tasks', {
		method: 'GET',
		redirect: 'follow',
	}).then((response) => response.json());

	return giveMeSomethingPlease;
}



function postTask(e) {
	e.preventDefault();

	inputValue = input.value;

	if (inputValue != '') {
		fetchData().then((response) => {
			console.log(response);

			var myHeaders = new Headers();
			myHeaders.append('Content-Type', 'application/json');

			fetch('http://localhost:3000/tasks', {
				method: 'POST',
				headers: myHeaders,
				body: JSON.stringify({ id: '', title: `${inputValue}` }),
				redirect: 'follow',
			}).then((response) => response.json());
		});
	}
}



function deleteTask(e) {
	if (e.target.classList.contains('fa-trash-alt')) {
		fetchData().then((response) => {
			for (let i = 0; i < response.length; i++) {
				if (
					e.target.previousElementSibling.innerHTML ==
					response[i].title
				) {
					fetch(`http://localhost:3000/tasks/${[response[i].id]}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: '',
							title: '',
						}),
						redirect: 'follow',
					}).then((response) => response.json());

					e.target.previousElementSibling.parentElement.remove();
				}
			}
		});
	}
}





