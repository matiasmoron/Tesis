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
			setTimeout(function(){
				Api.HideError();
			},this.props.errorServer.timeout);
			return (
					<div className="text-center alert-penna">
						<Alert bsStyle="success">
					     {this.props.errorServer.msg_error}
						 	<button type="button" onClick={this.closeError} className="close" data-dismiss="alert" aria-label="Close">
	    						<span aria-hidden="true">&times;</span>
	  						</button>
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
