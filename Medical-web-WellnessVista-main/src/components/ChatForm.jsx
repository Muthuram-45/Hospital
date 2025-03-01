import React, { useRef } from 'react';

const ChartForm = ({setChatHistory,generateBotResponse,chatHistory}) => {
    const inputRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Corrected typo
        if (!inputRef.current) return;

        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;

        console.log(userMessage);
        inputRef.current.value = ""; // Clear input after submission
        // Update chat history with the user's message
        setChatHistory((history) =>[...history,{role: "user",text:userMessage}])
        // Delay 600 sec
       setTimeout(() => { setChatHistory((history) =>[...history,{role: "model",text:"Thinking...."}])
       generateBotResponse([...chatHistory,{role: "model",text:"Thinking...."}])
    
    },600)
       
    };

    return (
        <form className="chat-form" onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                className="message-input" 
                placeholder="Message..." 
                required 
            />
            <button type="submit" className="material-symbols-rounded">
                :
            </button>
        </form>
    );
};

export default ChartForm;