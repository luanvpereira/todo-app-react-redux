import	React, { Component }	from	'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import	Grid				from	'../templates/grid';
import	IconButton	from	'../templates/icon-button';

import	{ changeDescription, search, add, clear } from 	'./todo-actions';

class TodoForm extends Component {
	constructor(props) {
		super(props);
		this.keyHandler = this.keyHandler.bind(this);
	}

	componentWillMount() {
		this.props.search();
	}

	keyHandler() {
		return (e) => {
			if(e.key == 'Enter') {
				e.shiftKey ? this.props.search() : this.props.add(this.props.description);
			} else if(e.key == 'Escape') {
				this.props.clear();
			}
		}
	};

	render() {
		return (
			<div role="form" className="todoForm">
				<Grid cols="12 9 10">
					<input 
						id="description"
						className="form-control"
						placeholder="Add a task"
						type="text"
						onKeyUp={this.keyHandler()}
						onChange={this.props.changeDescription}
						value={this.props.description}
					/>
				</Grid>

				<Grid cols="12 3 2">
					<IconButton style="primary"	icon="plus"		onClick={() => this.props.add(this.props.description)}/>
					<IconButton style="info"		icon="search"	onClick={() => this.props.search() }/>
					<IconButton style="default"	icon="close"	onClick={() => this.props.clear() }/>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	description: state.todo.description
});

const mapDispatchToProps = dispatch => (
	bindActionCreators({
		changeDescription,
		search,
		add,
		clear
	}, dispatch)
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoForm);