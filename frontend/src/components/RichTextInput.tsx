import React, { useState } from "react"

interface RichTextInputProps {
    onTextChange: (text: string) => void;
  }

const RichTextInput:React.FC<RichTextInputProps>=({onTextChange})=>{
    const [isEmpty, setIsEmpty] = useState(true);


    const handleInput=(e:any)=>{
        const text=e.target.innerText;console.log(text,'\n\n\n',text.length)
        setIsEmpty(text.length===0||text==='\n')
        onTextChange(text==='\n'?'':text)
    }

    return <>
        <div className="min-h-[24px] max-h-[720px] overflow-x-hidden overflow-y-auto relative">
            {isEmpty&&<div className="absolute pointer-events-none text-gray-500 select-none text-xl">What's happening?</div>}
            <div
                onInput={handleInput}
                contentEditable="true"
                className="outline-none whitespace-pre-wrap wrap-break-word text-xl select-text">
                
            </div>
        </div>
    </>
}

export default RichTextInput