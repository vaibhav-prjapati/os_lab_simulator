import { SignIn, BookLoader } from "..";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import LoadInputDialogueBox from "./LoadInputDialogueBox";
import axios from "axios";
import "./LoadAllInputsDialogueBox.css";

const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;

const LoadAllInputsDialogueBox = ({ isVisible=false, handleClick, setData, setNoOfProcesses }) => {
  const [datasList, setDatasList] = useState([]);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(-1);
  
  const { isSignedIn, user, isLoaded } = useUser();
  if (!isLoaded) {
    toast.error('Network Error!');
    handleClick();
    return null;
  }

  const handleShowData = (ind) => {
    setIsItemOpen(true);
    setIndex(ind);
  };

  const handleLoad = async () => {
    setIsLoading(true);
    try {
      const userName = user.username;
      const res = await axios.get(`${API_URL}/getAllInputDatas/${userName}`);
      
      if (res.data.inputDatas.length) {
        setDatasList(res.data.inputDatas);
      } else {
        toast.error('No Saved Data Found!');
        handleClick();
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while loading!');
      handleClick();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && isVisible) handleLoad();
  }, [isLoaded, isSignedIn, isVisible]);

  return (
    <div 
      className={`load-all-dialog-container ${isVisible ? 'visible' : 'hidden'}`}
      onClick={handleClick}
    >
      <div className="load-all-dialog-content" onClick={(e) => e.stopPropagation()}>
        <SignedOut>
          <SignIn redirectUrl='/simulator' />
        </SignedOut>

        <SignedIn>
          <div className="load-all-dialog-main">
            {isLoading ? (
              <div className="loader-container">
                <BookLoader />
              </div>
            ) : datasList.map(({ title, description, data }, index) => (
              <button
                key={index}
                className="data-item-button"
                onClick={() => handleShowData(index)}
              >
                <div className="data-item-content">
                  <div className="data-item-header">
                    <span className="data-item-title">{title}</span>
                    <span className="process-count">No of Processes: {data.length}</span>
                  </div>

                  <div className="data-item-description">
                    <span>{description.substring(0, 100)}</span>
                    {description.length > 100 && (
                      <>
                        &nbsp;
                        <span className="know-more">Know More...</span>
                      </>
                    )}
                  </div>
                </div>

                <FaChevronRight className="chevron-icon" />
              </button>
            ))}
          </div>

          {isItemOpen && (index >= 0 && index < datasList.length) && (
            <LoadInputDialogueBox 
              isVisible={isItemOpen}
              handleClick={() => setIsItemOpen(false)}
              userName={user.username}
              title={datasList[index].title}
              description={datasList[index].description}
              data={datasList[index].data}
              index={index}
              refreshList={handleLoad}
              setData={setData}
              handleParentClick={handleClick}
              setNoOfProcesses={setNoOfProcesses}
            />
          )}
        </SignedIn>
      </div>
    </div>
  );
};

export default LoadAllInputsDialogueBox;