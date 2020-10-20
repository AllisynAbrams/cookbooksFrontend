import React, { useState, useEffect } from 'react';

const Form = (props) => {

const [formData, setFormData] = useState(props.cookbook)

const handleSubmit = (event) => {
	event.preventDefault();
	props.handleSubmit(formData)
	props.history.push('/')
};

 const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    // event.target.name is global to get the KEY, event.target.value is to get VALUE of the key
    // console.log('this is event.target', event.target)
 };

 return (
		<form onSubmit={handleSubmit}>
			<input
                type="text"
                placeholder="title"
				name="title"
				value={formData.title}
				onChange={handleChange}
			/>
			<input
                type="text"
                placeholder="year published"
				name="yearPublished"
				value={formData.yearPublished}
				onChange={handleChange}
			/>
			<input type='submit' value={props.label} />
		</form>
 );
}

export default Form