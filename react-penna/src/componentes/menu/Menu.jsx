var React = require('react');
import {Link} from 'react-router-dom';

var tabData = [
	{tag: "a1",to:"", nombre:"Ordenes de Trabajo", isActive:true },
	{tag: "a2",to:"", nombre:"Stock / Compras", isActive:false },
	{tag: "a3",to:"", nombre:"Solicitudes", isActive:false},
	{tag: "a4",to:"/personal", nombre:"Personal", isActive:false},
	{tag: "a5",to:"", nombre:"Configuración", isActive:false}
]


var Tabs = (props) => {
      return (
        <ul className="nav nav-tabs">
			{tabData.map(function(tab){
				return (
					<Tab data={tab} key={tab.nombre} to={tab.to} isActive={props.activeTab===tab} handleClick={props.changeTab.bind(this,tab)} />
				);
			}.bind(this))}
		</ul>
      );
}

var Tab = (props) => {
      return (
        <li onClick={props.handleClick} className={props.isActive ? "active" : null}>
				<Link to={props.to}>{props.data.nombre} </Link>
		</li>
      );
}


class Menu extends React.Component {
	constructor() {
      super();
	  this.state={
		  activeTab: tabData[0]
	  }
    }

	handleClick(tab){
		this.setState({activeTab:tab});
	}

	render() {
		return (
			<div>
				<Tabs activeTab={this.state.activeTab} changeTab={this.handleClick.bind(this)}/>
			</div>
		);
	}
}


export default Menu
