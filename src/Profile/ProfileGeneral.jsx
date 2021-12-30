import React, { useState } from 'react';
import FMViewer from './ProfileViewer';
import FMEditor from './ProfileEditor';

function ProfileGeneral(props) {
	const [data, setData] = useState(props.data);
	const [isViewMode, setIsViewMode] = useState(props.data.id !== -1 ? true : false);

	function handleCancel() {
		if (data.id === -1) {
			props.onDelete(props.index);
        }
		setIsViewMode(true);
	};

	function handleEdit(){
		setIsViewMode(false);
	};

	function handleCreate(changedData){
		setData(changedData);
		setIsViewMode(true);
		props.onCreate(changedData);
	};

	function handleUpdate(changedData) {
		setData(changedData);
		setIsViewMode(true);
		props.onUpdate(changedData);
	};

	function deleteProfile() {
		props.onDelete(props.index);
	}

	if (isViewMode) {
		return (
			<FMViewer data={data} onEdit={handleEdit} onDelete={deleteProfile} />
		);
	}
	else {
		return (
			<FMEditor data={data} onCancel={handleCancel} onUpdate={handleUpdate} onCreate={handleCreate}/>
		);
	}
};
export default ProfileGeneral;
