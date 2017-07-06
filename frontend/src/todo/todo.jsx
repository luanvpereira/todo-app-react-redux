import	React,	{	Component	}	from	'react';
import	axios	from	'axios';

import	PageHeader	from	'../templates/page-header';
import	TodoForm		from	'./todo-form';
import	TodoList		from	'./todo-list';

const	URL	=	'http://localhost:3003/api/todos';

export	default	class	Todo	extends	Component	{
	constructor(props) {
		super(props);
	}

	render()	{
		return	(
			<div>
				<PageHeader name="Tasks" small="Register"/>
				<TodoForm/>
				<TodoList/>
			</div>
		);
	}
}