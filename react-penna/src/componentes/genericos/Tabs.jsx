var React = require('react');
import Card from './Card';
// import {Link} from 'react-router-dom'

var tabData = [
	{nombre:"Orden0", isActive:true ,cards:true},
	{nombre:"Orden1", isActive:false,cards:true },
	{nombre:"Orden2", isActive:false,cards:true}
]


var Tabs = (props) => {
      return (
        <ul className="nav nav-tabs">
			{tabData.map(function(tab){
				return (
					<Tab data={tab} key={tab.nombre} isActive={props.activeTab===tab} handleClick={props.changeTab.bind(this,tab)} />
				);
			}.bind(this))}
		</ul>
      );
}

var Tab = (props) => {
      return (
        <li onClick={props.handleClick} className={props.isActive ? "active" : null}>
			<a href="#"> {props.data.nombre} </a>
		</li>
      );
}

var Content = (props) => {
	console.log(props);

	return (
		<div>
			{props.activeTab.nombre==='Orden0' ?
				<section className="panel panel-success">
					<ul className="ca-menu col-md-12">
						{props.activeTab.cards===true ?
							<Card url="/tecnicos" icon="glyphicon glyphicon-plus" changeCard={props.changeCard.bind(this)} nombre="tecnico" />
						 : null}
					</ul>
				</section>
			: null}
			{props.activeTab.nombre==='Orden1' ?
			 	<section className="panel panel-success">
					Orden1
				</section>
			: null}
			{props.activeTab.nombre==='Orden2' ?
			 	<section className="panel panel-success">
					Orden2
				</section>
			: null}
		</div>
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
		console.log("Tab click",tab);
		tab.cards=true;
		this.setState({activeTab:tab});
	}

	changeCard() {
		 this.state.activeTab.cards=false;
	}


	render() {
		return (
			<div>
				<Tabs activeTab={this.state.activeTab} changeTab={this.handleClick.bind(this)} />
				<Content activeTab={this.state.activeTab} changeCard={this.changeCard.bind(this)} />
			</div>
		);
	}
}





export default Menu
