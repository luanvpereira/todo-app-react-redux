import	React, { Component }	from	'react';
import { connect } from 'react-redux';
import	IconButton	from	'../templates/icon-button';

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
						onClick={()	=>	this.props.handleMarkAsDone(todo)}
					/>

					<IconButton 
						style="warning"
						icon="undo"
						hide={!todo.done}
						onClick={()	=>	this.props.handleMarkAsPending(todo)}
					/>

					<IconButton
						style="danger"
						icon="trash-o"
						hide={!todo.done}
						onClick={()	=>	this.props.handleRemove(todo)}
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

export default connect(mapStateToProps)(List);