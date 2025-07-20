import { SignIn, SpringButton } from "..";
import { useUser, SignedOut, SignedIn } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";
import "./SaveInputDialogueBox.css";

const API_URL = import.meta.env.VITE_OS_LAB_SIMULATOR_API_URL;

const SaveDialogueBox = ({ isVisible = false, handleClick, data }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { user, isLoaded } = useUser();
  if (!isLoaded) {
    toast.error('Network Error!')
    handleClick()
    return null;
  }

  const saveData = async () => {
    try {
      const userName = user.username;
      const newInputData = { title, description, data };

      const res = await axios.post(`${API_URL}/saveInputData/${userName}`, newInputData)
      handleClick()

      setTitle('')
      setDescription('')
      return res.data.msg
    } catch (error) {
      console.log(error)
    }
  }

  const handleSave = () => {
    if (!title || !description) return toast.error('Title & Description are required!');

    const myPromise = saveData();

    toast.promise(myPromise, {
      loading: 'Loading',
      success: (msg) => msg,
      error: 'Error while saving!',
    });
  }

  return (
    <div
      className={`save-dialogue-container ${isVisible ? 'visible' : 'hidden'}`}
      onClick={handleClick}
    >
      <div className="save-dialogue-content" onClick={(e) => e.stopPropagation()}>
        <SignedOut>
          <SignIn redirectUrl='/simulator' />
        </SignedOut>

        <SignedIn>
          <div className="save-dialogue-box">
            <div className="save-dialogue-header">
              <span className="save-dialogue-title">
                <FaRegSave className="save-icon" />
                Save Current Input
              </span>
            </div>

            <div className="input-field">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="save-input"
              />
            </div>

            <div className="input-field">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                id="description"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="save-input textarea"
              />
            </div>

            <div className="save-button-container">
              <SpringButton
                handleClick={handleSave}
                parentChildName="save-button-parent"
                childClassName="save-button-child"
              >
                Save
              </SpringButton>
            </div>
          </div>
        </SignedIn>
      </div>
    </div>
  )
}

export default SaveDialogueBox;