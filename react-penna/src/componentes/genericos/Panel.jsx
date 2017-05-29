var React = require('react');


const Panel = (props) => {
      return (
        <div className="panel panel-primary">
            <div className="panel-heading">{this.props.titulo}</div>
            <div className="panel-body">
                <form className="form-inline" onSubmit={props.submit}>
					{props.children}
                </form>
            </div>
        </div>
      );
}

export default Panel
