import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
				<p>Header</p>
		</div>
	)
};

const Homepage = () => {
	return (
		<div>
				<h1>Homepage </h1>
				<Link to='/about'>Go to Aboutpage</Link>
		</div>
	)
};

const Aboutpage = () => {
	return (
		<div>
				<h1>Aboutpage</h1>
				<Link to='/'>Go to Aboutpage</Link>
		</div>
	)
};
export {Homepage, Aboutpage , Header } ;