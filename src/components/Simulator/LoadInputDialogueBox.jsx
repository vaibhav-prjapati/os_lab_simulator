import { toast } from "react-hot-toast";
import { useState, useMemo } from "react";
import { Table } from '.';
import axios from "axios";
import ShinyButton from "../ShinyButton";
import "./LoadInputsDialogueBox.css";

const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;

const LoadInputsDialogueBox = ({ 
  isVisible=false, 
  handleClick, 
  userName, 
  title: curTitle, 
  description: curDescription, 
  data: curData, 
  index, 
  refreshList, 
  setData: setCurData, 
  handleParentClick, 
  setNoOfProcesses 
}) => {
  const columns = useMemo(() => [
    { 
      id: 'Pid',
      Header: 'Process ID (Pid)', 
      accessor: 'Pid' 
    },
    { 
      id: 'AT',
      Header: 'Arrival Time (AT)', 
      accessor: 'AT'
    },
    { 
      id: 'BT',
      Header: 'Burst Time (BT)', 
      accessor: 'BT' 
    },
    { 
      id: 'P',
      Header: 'Priority (P)', 
      accessor: 'P' 
    },
  ], [])

  const [title, setTitle] = useState(curTitle);
  const [description, setDescription] = useState(curDescription);
  const [data, setData] = useState(curData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => setIsEditing(true);
  
  const deleteData = async () => {
    try {
      const res = await axios.delete(`${API_URL}/deleteInputData/${userName}/${index}`)
      refreshList()
      handleClick()
      return res.data.msg;
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    let myPromise = deleteData();
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (msg) => msg,
      error: 'Error while deleting!',
    });
  }

  const saveData = async () => {
    try {
      const updatedInputData = { title, description, data };
      const res = await axios.post(`${API_URL}/updateInputData/${userName}/${index}`, updatedInputData)
      setIsEditing(false)
      refreshList()
      return res.data.msg;
    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = () => {
    if(!title || !description) return toast.error('Title & Description are required!');
    let myPromise = saveData();
    toast.promise(myPromise, {
      loading: 'Loading...',
      success: (msg) => msg,
      error: 'Error while updating!',
    });
  }

  const handleImport = () => {
    setCurData(data)
    setNoOfProcesses(data.length)
    handleClick()
    handleParentClick()
  }

  const handleCopy = () => {
    const copyData = data.map((process) => {
      return { 
        Pid: process.Pid, AT: process.AT, BT: process.BT, P: process.P
      }
    })
    navigator.clipboard.writeText(JSON.stringify(copyData))
    toast.success('Copied to clipboard!')
  }

  return (
    <div 
      className={`load-dialogue-container ${isVisible ? 'visible' : 'hidden'}`}
      onClick={handleClick}
    >
      <div className="load-dialogue-content" onClick={(e) => e.stopPropagation()}>
        <div className="load-dialogue-box">
          <div className="load-dialogue-header">
            <input
              value={title}
              name="title"
              id="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              disabled={!isEditing}
              className={`load-title-input ${isEditing ? 'editable' : ''}`}
            />
            <span className="process-count">No of Processes: {data.length}</span>
          </div>

          <textarea
            value={description}
            name="description"
            id="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditing}
            className={`load-description-input ${isEditing ? 'editable' : ''}`}
          />

          <div className="table-container">
            <Table 
              data={data} 
              setData={setData}
              columns={columns}
              isDeleteRowAllowed={isEditing}
              isDisableEditing={!isEditing}
              thClassName='table-header-black'
              crossClassName='hover-black'
            />
          </div>

          <div className="button-group">
            <div className="left-buttons">
              <ShinyButton className="delete-button" onClick={handleDelete}>
                Delete
              </ShinyButton>

              {isEditing ? (
                <ShinyButton className="save-button" onClick={handleSave}>
                  Save
                </ShinyButton>
              ) : (
                <ShinyButton className="edit-button" onClick={handleEdit}>
                  Edit
                </ShinyButton>
              )}
            </div>

            <div className="right-buttons">
              <ShinyButton className="copy-button" onClick={handleCopy}>
                Copy
              </ShinyButton>

              <ShinyButton className="import-button" onClick={handleImport}>
                Import
              </ShinyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadInputsDialogueBox;