import { useState } from "react";
import { toast } from 'react-hot-toast';
import { ShinyButton } from "..";
import "./ImportJsonDialogueBox.css";

const ImportJsonDialogueBox = ({ isVisible, handleClick, setData, setNoOfProcesses }) => {
  const [jsonData, setJSONData] = useState('');

  const handleImport = () => {
    let data;
    
    try {
      data = JSON.parse(jsonData);
    } catch (error) {
      console.log(error);
      toast.error('Invalid JSON Data!');
      return;
    }
    
    setData(data);
    setNoOfProcesses(data.length);
    setJSONData('');
    handleClick();
  };

  return (
    <div
      className={`import-json-container ${isVisible ? "visible" : "hidden"}`}
      onClick={handleClick}
    >
      <div className="import-json-content" onClick={(e) => e.stopPropagation()}>
        <div className="import-json-box">
          <textarea
            value={jsonData}
            name="jsonData"
            id="jsonData"
            placeholder="Enter the JSON Data"
            onChange={(e) => setJSONData(e.target.value)}
            className="json-textarea"
          />

          <div className="button-group">
            <ShinyButton 
              className="cancel-button" 
              onClick={() => { 
                setJSONData(''); 
                handleClick(); 
              }}
            >
              Cancel
            </ShinyButton>

            <ShinyButton
              className="import-button"
              onClick={handleImport}
            >
              Import
            </ShinyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportJsonDialogueBox;