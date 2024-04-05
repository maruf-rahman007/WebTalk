import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

export const ContentBox = () => {
    const editor = useRef(null);
    const [content , setContent] = useState("");
    return (
        <JoditEditor
			ref={editor}
			value={content}
			// config={config}
			// tabIndex={1} // tabIndex of textarea
		 // preferred to use only this option to update the content for performance reasons
			onChange={(newContent => setContent(newContent))}
		/>
    );

}