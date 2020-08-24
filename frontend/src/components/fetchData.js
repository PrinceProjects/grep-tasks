import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchData = (props) => {

	let [data, setData] = useState([]);

	useEffect( () => {
		const fd = async () => {
			const res = await axios.get('http://localhost:5000/users');
			const dt = await res.data;
			setData(dt);
		}
		fd();
	});

	return (
		<div className="main">
			<p>{data.map(d => <div key={d._id}>{d.name}</div>)}</p>
		</div>
	);
}

export default FetchData;