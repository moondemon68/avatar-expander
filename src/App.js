import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import InputForm from './components/InputForm';
import GraphImage from './components/GraphImage';
import FriendsTable from './components/FriendsTable';
import TargetDataCard from './components/TargetDataCard';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = { target: '', json: null, targetData: null, friendsList: [], graphData: { nodes: [], links: [] }, startEmpty: false, error: false, errorMessage: '' };
	}
	
    handleOnChange = event => {
		this.setState({ target: event.target.value, startEmpty: true }, this.fetchTarget);
	};

	updateFriendsList = () => {
		var newTargetData;
		newTargetData = { id: this.state.json.id, name: this.state.json.name, element: this.state.json.element };
		this.setState({ targetData: newTargetData });

		var newFriendsList = [];
		this.state.json.friends.forEach(friend => {
			newFriendsList.push({ id: friend.id, name: friend.name, element: friend.element });
		});
		this.setState({ friendsList: newFriendsList });
	}

	updateGraphData = () => {
		var newGraphData;
		if (this.state.startEmpty === true) {
			newGraphData = { nodes: [], links: [] };
		} else {
			newGraphData = this.state.graphData;
		}
		var nodeColor;
		switch (this.state.json.element) {
			case 'fire':
				nodeColor = 'red';
				break;
			case 'water':
				nodeColor = 'blue';
				break;
			case 'air':
				nodeColor = 'green';
				break;
			case 'earth':
				nodeColor = 'yellow';
				break;
			default:
				nodeColor = 'black';
		}
		const sourceId = this.state.json.id;
		newGraphData.nodes.push({ id: this.state.json.id, name: this.state.json.name, color: nodeColor });
		this.state.json.friends.forEach(friend => {
			switch (friend.element) {
				case 'fire':
					nodeColor = 'red';
					break;
				case 'water':
					nodeColor = 'blue';
					break;
				case 'air':
					nodeColor = 'green';
					break;
				case 'earth':
					nodeColor = 'yellow';
					break;
				default:
					nodeColor = 'black';
			}
			newGraphData.nodes.push({ id: friend.id, name: friend.name, color: nodeColor });
		});
		newGraphData.nodes = newGraphData.nodes.filter((nodes, index, self) =>
			index === self.findIndex((t) => (
				t.id === nodes.id
			))
		);
		this.state.json.friends.forEach(friend => {
			newGraphData.links.push({ source: sourceId, target: friend.id });
		});
		newGraphData.links = newGraphData.links.filter((links, index, self) =>
			index === self.findIndex((t) => (
				t.source === links.source && t.target === links.target
			))
		);
		console.log(newGraphData);
		this.setState({ graphData: newGraphData });
	}
	
    fetchTarget = () => {
		console.log(this.state.target);
        fetch("https://avatar.labpro.dev/friends/" + this.state.target, {
            method: 'GET'
        })
        .then(function(response) {
            if (response.status === 200) return response.json();
            throw new Error(response.statusText);
        })
		.then(json => this.setState({ error: false, errorMessage: '', json: json.payload }))
		.then(this.updateFriendsList)
		.then(this.updateGraphData)
        .catch(_error => this.setState({error: true, errorMessage: _error.message}));
	}
	
	handleOnNodeClick = nodeId => {
		this.setState({ target: nodeId, startEmpty: false }, this.fetchTarget);
	}
	
	render() {
		return (
			<div>
				<NavBar />
				<InputForm target={ this.state.target } json={ this.state.json } onChange={ this.handleOnChange } error={ this.state.error } errorMessage={ this.state.errorMessage } />
                <GraphImage target={ this.state.target } graphData={ this.state.graphData } onClickNode={ this.handleOnNodeClick } />
				<TargetDataCard targetData={ this.state.targetData } />
				<FriendsTable friendsList={ this.state.friendsList } />
			</div>
		)
	}
}

export default App;
