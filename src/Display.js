import React, {useState, useEffect} from 'react';

const Display = (props) => {
console.log('display component props', props);
    const { cookbooks } = props;
    


	const loaded = () => (
		// <div style={{ textAlign: 'center' }}>
			<div>
			{cookbooks.map((cookbook) => (
				<article>
					<h1>{cookbook.title}</h1>
					<h3>{cookbook.yearPublished}</h3>
					<button
						onClick={() => {
							props.oneSelectedCookbook(
								cookbook
							); 
							props.history.push(
								'/edit'
							);
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteCookbook(cookbook);
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	);

	
	return cookbooks.length > 0 ? loaded() : <h1>LOADING...</h1>;
};

export default Display;
