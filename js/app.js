


function fetchData(){

	let giveMeSomethingPlease = fetch("http://localhost:3000/tasks", {
		method: 'GET',
		redirect: 'follow'
	})
	.then(response => response.json())

	return giveMeSomethingPlease

}

function printToDom() {

	const list = document.getElementById('myUL')

	fetchData().then((response) => {

		for (let i = 0; i < response.length; i++) {

			const taskTitle = response[i].title;

			let code = `
				<li class="d-flex align-items-center p-3">
        <i class="far fa-circle"></i>
        <span class="ml-2">${taskTitle}</span>
        <i class="far fa-trash-alt ml-auto text-danger"></i>
    		</li>
				`
			console.log(taskTitle);
			list.innerHTML += code


		}

	});
}
printToDom()