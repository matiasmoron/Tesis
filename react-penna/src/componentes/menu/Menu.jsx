var React = require('react');
var FontAwesome = require('react-fontawesome');
import {Link} from 'react-router-dom';
require("../../styles/nuevo_menu.scss");

var tabData = [
	{tag: "a1",to:"", nombre:"Ordenes de Trabajo", isActive:true },
	{tag: "a2",to:"", nombre:"Stock / Compras", isActive:false },
	{tag: "a3",to:"/solicitud", nombre:"Solicitudes", isActive:false},
	{tag: "a4",to:"/personal", nombre:"Personal", isActive:false},
	{tag: "a5",to:"/equipo", nombre:"Equipo", isActive:false},
	{tag: "a6",to:"", nombre:"Configuración", isActive:false}
]


var Tabs = (props) => {
      return (
        <ul className="menu nav nav-tabs">
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
			<Link to={props.to}><span>{props.data.nombre}</span></Link>
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
			<nav>
				<Tabs activeTab={this.state.activeTab} changeTab={this.handleClick.bind(this)}/>
			</nav>
		);
	}
}


export default Menu
