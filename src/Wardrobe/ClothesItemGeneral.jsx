import React, { useState } from 'react';
import ClothesItemEditor from './ClothesItemEditor';
import ClothesItemViewer from './ClothesItemViewer';


function ClothesItemGeneral(props) {
    const [data, setData] = useState(props.data);
    const [isViewMode, setIsViewMode] = useState(props.data.id !== -1 ? true : false);

	console.log(JSON.stringify(props.data),'what comes to profile general');

	function handleCancel() {
		if (data.id === -1) {
			props.onDelete(props.index);
		}
		setIsViewMode(true);
	};

	function handleEdit() {
		setIsViewMode(false);
	};

	function handleSave(changedData) {
		setData(changedData);
		setIsViewMode(true);
		props.onUpdate(changedData);

	};

	function deleteItem() {						
		props.onDelete(props.index);
	}

	if (isViewMode) {
		return (
			<ClothesItemViewer data={data} onEdit={handleEdit} onDelete={deleteItem} />
		);
	}
	else {
		return (
			<ClothesItemEditor data={data} listOwners={props.listOwners} onCancel={handleCancel} onSave={handleSave} />
		);
	}
};

export default ClothesItemGeneral;