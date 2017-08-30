var React = require('react');

export class Logout extends React.Component {
	constructor() {
      super();
    }
	render(){
		 return (
			      <button onClick={() => this.props.onLogoutClick()} className="btn btn-primary">
			        Logout
			      </button>
		);
	}

}
