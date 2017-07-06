import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = (event) => ({
	type: "DESCRIPTION_CHANGED",
	payload: event.target.value
});

export const search = () => {
	const refreshURL = `${URL}?sort=-createdAt`;

	return (dispatch, state) => {
		const searchURL =`${refreshURL}&description__regex=/${state().todo.description}/i`;
		axios
			.get(searchURL)
			.then(resp => dispatch({type: 'TODO_SEARCHED', payload: resp.data}))
	}
};

export const clear = () =>  ([
	{
		type: 'TODO_CLEAR',
	},
	search()
])

export const add = (description) => {
	return dispatch => {
		axios.post(URL, {description})
			.then(resp => dispatch({type: 'TODO_ADDED', payload: resp.data}))
			.then(resp => dispatch(clear()));
	}
};

export const markAsDone = (todo) => {
	return dispatch => {
		axios.put(`${URL}/${todo._id}`, {...todo, done: true})
			.then(resp => dispatch({type: 'TODO_MARKED_AS_DONE', payload: resp.data}))
			.then(resp => dispatch(search()))
	}
};

export const markAsPending = (todo) => {
	return dispatch => {
		axios.put(`${URL}/${todo._id}`, {...todo, done: false})
			.then(resp => dispatch({type: 'TODO_MARKED_AS_PENDING', payload: resp.data}))
			.then(resp => dispatch(search()))
	}
};

export const remove = (todo) => {
	return dispatch => {
		axios.delete(`${URL}/${todo._id}`)
			.then(resp => dispatch({type: 'TODO_DELETED', payload: resp.data}))
			.then(resp => dispatch(search()))
	}
};