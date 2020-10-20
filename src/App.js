import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
  const url = 'http://localhost:4000';

  const [cookbooks, setCookbooks] = useState([])

  const emptyCookbook = {
		title: '',
		yearPublished: ''
  };
  
  const [selectedCookbook, setSelectedCookbook] = useState(emptyCookbook)

  const getCookbooks = () => {
    fetch(url + '/api/cookbooks/')
			.then((response) => response.json())
			.then((data) => {
				setCookbooks(data.data);
			});
  }

  useEffect(() => getCookbooks(), []);

	const handleCreate = (newCookbook) => {
		fetch(url + '/api/cookbooks/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCookbook),
		}).then((response) => getCookbooks()); 
	};


const handleUpdate = (cookbook) => {
	fetch(url + '/api/cookbooks/'+ cookbook._id, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(cookbook),
	}).then((response) => getCookbooks());
};

const oneSelectedCookbook = (cookbook) => {
	setSelectedCookbook(cookbook);
};

const deleteCookbook = (cookbook) => {
	fetch(url + '/api/cookbooks/' + cookbook.title, {
		method: 'delete',
	}).then((response) => getCookbooks());
};



  return (
		<div className='App'>
			<header className='App-header'>
				<h1>Cookbooks</h1>
			</header>
			<Link to='/create'>
				<button>Add Cookbook</button>
			</Link>

			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								cookbooks={cookbooks}
								oneSelectedCookbook={oneSelectedCookbook}
								deleteCookbook={deleteCookbook}
							/>
						)}
					/>

					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								cookbook={emptyCookbook}
								handleSubmit={handleCreate}
							/>
						)}
					/>

					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								cookbook={selectedCookbook}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
