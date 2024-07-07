// AddButton.tsx

import React, { useState, useRef, useEffect } from 'react';
import './AddButton.css';
import AddItem from './AddItem';

interface Item {
    day: number | null,
    month: number | null,
    year: number | null,
    description: string,
}

interface itemList {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;

}

const AddButton: React.FC<itemList> = ({ setItems }, items: Item[]) => {

    const [isPopoutVisible, setIsPopoutVisible] = useState(false);
    const [day, setDay] = useState<number | null>(null);
    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [description, setInputValue] = useState('');

    const addItem = () => {
        const newItem: Item = {
            day: day,
            month: month,
            year: year,
            description: description,
        };
        setItems(prevItems => [newItem, ...prevItems]);
        console.log(items)
    };



    const togglePopout = () => {
        setIsPopoutVisible(!isPopoutVisible);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const popout = document.getElementById('popout-content');
        if (popout && !popout.contains(event.target as Node)) {
            setIsPopoutVisible(false);
        }
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null); // Define type for ref

    useEffect(() => {
        // Ensure ref is not null before accessing
        if (textareaRef.current) {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [description]); // Run effect on inputValue change


    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    function handleAdd() {
        if (day != null && month != null && year != null && description != '') {
            addItem();
            setIsPopoutVisible(false);
            setDay(null);
            setMonth(null);
            setYear(null);
            setInputValue('');
        } else {
            console.log("Cannot add");
        }
    }

    useEffect(() => {
        if (isPopoutVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            setDay(null);
            setMonth(null);
            setYear(null);
            setInputValue('');
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopoutVisible]);  

    return (
    <div className="button-container">
        <button className="add-button" onClick={togglePopout}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
        </svg>
        <span>Add New Item</span>
        </button>
        {isPopoutVisible && (
        <div className="overlay visible">
            <div className="popout visible" id="popout-content">
            {/* Popout content goes here */}
            <h1 style={{color:'white'}}>Add new Item</h1>
            <div className='d-flex'>
                <AddItem isPassword={false} text="day" stateChange={setDay}></AddItem>
                <AddItem isPassword={false} text="Month" stateChange={setMonth}></AddItem>
                <AddItem isPassword={false} text="Year" stateChange={setYear}></AddItem>
            </div>
            <div style={{width:'100%', paddingTop:'1%'}}>
            <div>
                <textarea
                id="expandingTextarea"
                ref={textareaRef}
                value={description}
                onChange={handleInputChange}
                placeholder="Description"
                />
                {/* <p>
                    day  {day} month {month} year {year} desc: {description}
                </p> */}
            </div>
            </div>
            <div style={{paddingTop:'2%'}}>
                <button className='btn btn-outline-light' onClick={handleAdd}>Add</button>
            </div>
            </div>
        </div>
        )}
    </div>
    );
    };

export default AddButton;   
