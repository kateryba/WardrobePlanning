import React, { useState } from 'react';
import FMViewer from './FMViewer';
import FMEditor from './FMEditor';

function FMGeneral(props) {
	const [data, setData] = useState(props.data);
	const [isViewMode, setIsViewMode] = useState(props.data.id !== -1 ? true : false);

	function handleCancel() {
		setIsViewMode(true);
	};

	function handleEdit(){
		setIsViewMode(false);
	};

	function handleSave(changedData){
		setData(changedData);
		setIsViewMode(true);
		props.onUpdate(data);
	};

	function deleteProfile(e) {
		props.onDelete(e);
	}

	//function getidfromserver(){

 //   }

	if (isViewMode) {
		return (
			<FMViewer data={data} onEdit={handleEdit} onDelete={deleteProfile}/>
		);
	}
	else {
		return (
			<FMEditor data={data} onCancel={handleCancel} onSave={handleSave}/>
		);
	}
};
export default FMGeneral;
