import { Appbar } from "../components/Appbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import JoditEditor from "jodit-react";
import { useRef } from "react";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleDescriptionChange = (newDescription: string) => {
        setDescription(newDescription);
    };

    const handleSubmit = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, {
            title,
            content: description
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        navigate(`/blog/${response.data.id}`);
    };

    return (
        <div>
            <Appbar />
            <div className="flex justify-center w-full pt-8"> 
                <div className="max-w-screen-lg w-full">
                    <input 
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Title" 
                    />
                    <TextEditor 
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    <button 
                        onClick={handleSubmit}
                        type="submit" 
                        className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    >
                        Publish post
                    </button>
                </div>
            </div>
        </div>
    );
};

interface TextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

function TextEditor({ value, onChange }: TextEditorProps) {
    const editor = useRef(null);

    return (
        <div className="mt-2">
            <div className="w-full mb-4">
                <div className="flex items-center justify-between border">
                    <div className="my-2 bg-white rounded-b-lg w-full">
                        <label className="sr-only">Publish post</label>
                        <JoditEditor
                            ref={editor}
                            value={value}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
