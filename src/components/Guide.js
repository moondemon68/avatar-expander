import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faFire, faWater, faWind, faLeaf } from '@fortawesome/free-solid-svg-icons';

function renderElement(element) {
	switch (element) {
		case 'fire':
			return <FontAwesomeIcon icon={faFire} color='red' />;
		case 'water':
			return <FontAwesomeIcon icon={faWater} color='blue' />;
		case 'air':
			return <FontAwesomeIcon icon={faWind} color='#79edfe' />;
		case 'earth':
			return <FontAwesomeIcon icon={faLeaf} color='green' />;
		default:
			return <FontAwesomeIcon icon={faCircle} color='black' />;
	}
}

export default function AlertDialog() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
		<IconButton color="inherit" aria-label="help" component="span" onClick={handleClickOpen}>
			<FontAwesomeIcon icon={faQuestionCircle} color='white' />
		</IconButton>
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{"How to Use"}</DialogTitle>
			<DialogContent>
			<DialogContentText id="alert-dialog-description">
				<p>Enter id to search.</p>
				<p>Click on a node or on a friend in the friend list to search that node.</p>
				<p>Double click on a node to expand from that node.</p>
				<p>Scroll down/up to zoom in/out.</p>
				<p>Drag and drop on an empty space to move the graph.</p>
				<p>{renderElement("fire")} = Fire</p>
				<p>{renderElement("water")} = Water</p>
				<p>{renderElement("air")} = Air</p>
				<p>{renderElement("earth")} = Earth</p>
			</DialogContentText>
			</DialogContent>
			<DialogActions>
			<Button onClick={handleClose} color="primary" autoFocus>
				OK
			</Button>
			</DialogActions>
		</Dialog>
		</div>
	);
}