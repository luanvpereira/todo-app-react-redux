import	React, { Component }	from	'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import	IconButton	from	'../templates/icon-button';

import { markAsDone, markAsPending, remove } from './todo-actions';

class List extends Component {
	constructor(props) {
		super(props);
	}

	renderRows() {
		const	list	=	this.props.list || [];

		return	list.map(todo => (
			<tr key={todo._id}>
				<td className={todo.done ? 'markedAsDone' : ''}>{todo.description}</td>
				<td>
					<IconButton 
						style="success"
						icon="check"
						hide={todo.done}
						onClick={()	=>	this.props.markAsDone(todo)}
					/>

					<IconButton 
						style="warning"
						icon="undo"
						hide={!todo.done}
						onClick={()	=>	this.props.markAsPending(todo)}
					/>

					<IconButton
						style="danger"
						icon="trash-o"
						hide={!todo.done}
						onClick={()	=>	this.props.remove(todo)}
					/>
				</td>
			</tr>
		))
	}

	render() {
		return (
			<table className="table">
				<thead>
					<tr>
						<th>Description</th>
						<th width="150px">Actions</th>
					</tr>
				</thead>
				<tbody>
					{this.renderRows()}
				</tbody>
			</table>
		)
	}
}

const mapStateToProps = state => ({
	list: state.todo.list
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		markAsDone,
		markAsPending,
		remove
	}, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(List);