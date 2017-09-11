var React = require('react');
import {Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import * as Api from '../../api/error_server_api';


class ErrorServer extends React.Component {
	constructor() {
      super();
    }

	closeError(){
		Api.HideError();
	}

	render() {
		if (this.props.errorServer.display_error){
			return (
					<div className="text-center">
					<Alert bsStyle="danger"  >
				     {this.props.errorServer.msg_error}
					 <button onClick={this.closeError}>Hide Alert</button>
				  	</Alert>
					</div>
		      );
		 }
		 else {
		 	return null
		 }
	}
}

const mapStateToProps = function(store) {

  return {
	  errorServer 	 : store.errorServerState,
  };
};

 export default connect(mapStateToProps)(ErrorServer);
