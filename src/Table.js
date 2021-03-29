import Modal from 'react-modal';
import React from 'react';



const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


function Table() {

	const [data, setData] = React.useState([]);

	if(data.length === 0) {
		fetch("./react-data.csv")
		  .then(response => response.text())
		  .then(text => {
		  	var t = text.split("\n");
		  	t = t.map(function(item) {
	    		return item.split(";");
			});
		  	setData(t);
		  });
	}

	const [modalIsOpen,setIsOpen] = React.useState(false);
	function openModal() {
		setIsOpen(true);
	}

	function closeModal(){
		setIsOpen(false);
	}

	function addData() {
		var newData = document.getElementById("new-data-input").value.split(";");
		closeModal();
		const d = [...data];
		d.push(newData);
		setData(d);
	}

	return (
		<React.Fragment>
			<table>
				<tbody>
				    {data.map((row) => (
				      <tr>
				      	{row.map((cell) => (
				          <td>{cell}</td>
				      	))}
				      </tr>
				    ))}
			    </tbody>
			</table>		

			<div>
				<button onClick={openModal}>Add row</button>
				<Modal
				  isOpen={modalIsOpen}
				  onRequestClose={closeModal}
				  style={customStyles}
				  contentLabel="Example Modal"
				>
				  <input type="text" id="new-data-input" />
				  <button type="button" onClick={addData}>Add</button>
				</Modal>
			</div>
		</React.Fragment>
	);
}

export default Table;