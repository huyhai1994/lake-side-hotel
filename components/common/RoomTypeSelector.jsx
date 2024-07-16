// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {getRoomTypes} from "../utils/ApiFunctions.js";

// eslint-disable-next-line react/prop-types
const RoomTypeSelector = ({handleRoomInputChange, newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
    const [newRoomTypes, setNewRoomTypes] = useState([]);
    useEffect(() => {
        getRoomTypes().then((data) => {
            setNewRoomTypes(data)
        });
    }, [])
    const handleNewRoomInputChange = (e) => {
        setNewRoomTypes(e.target.value);
    }
    const handleAddNewRoomType = () => {
        if (newRoomTypes !== "") {
            setRoomTypes([...roomTypes, newRoomTypes]);
            setNewRoomTypes('')
            setShowNewRoomTypeInput(false);
        }
    }

    /*TODO: creating front interface*/
    return (<>
        {roomTypes.length > 0 && (<div>
            {/* eslint-disable-next-line react/prop-types */}
            <select name="roomType" value={newRoom.roomType} id="roomType"
                    onChange={(e) => {
                        if (e.target.value === "Add New") {
                            setShowNewRoomTypeInput(true);
                        } else {
                            handleRoomInputChange(e);
                        }
                    }}>
                <option value={''}> select a room type</option>
                <option value={"Add New"}> Add New</option>
                {roomTypes.map((type, index) => (<option key={index} value={type}>
                    {type}
                </option>))}
            </select>
            {/*TODO: if showNewRoomTypeInput is true
                        then output the html below*/}
            {showNewRoomTypeInput && (<div className='input-group'>
                <input className='form-control'
                       type='text'
                       placeholder='Enter a new room type'
                       onChange={handleNewRoomInputChange}/>
                <button className='btn btn-hotel' type='button' onClick={handleAddNewRoomType}>Add</button>
            </div>)}
        </div>)}
    </>)

};

export default RoomTypeSelector;
