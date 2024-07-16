import React, {useState} from 'react';
import {addRoom} from '../utils/ApiFunctions.js';
import RoomTypeSelector from "../common/RoomTypeSelector.jsx";

const AddRoom = () => {
    const [newRoom, setNewRoom] = useState({
        photo: null, roomType: '', roomPrice: '',
    });

    const [imagePreview, setImagePreview] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRoomInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        // TODO: value to update
        if (name === 'roomPrice') {
            if (!isNaN(value)) {
                value.parseInt(value);
            } else {
                value = '';
            }
        }
        setNewRoom({...newRoom, [name]: value});
        // TODO: update room properties by value defined
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewRoom({...newRoom, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage(success);
                setNewRoom({
                    photo: null, roomType: '', roomPrice: '',
                });
                setImagePreview('');
                setErrorMessage('');
            }
            setErrorMessage('Error adding room');
        } catch (error) {
            setErrorMessage('An error occurred while creating the room.');
        }
    };

    return (<>
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add A New Room</h2>
                    {/* TODO: form -> add new room */}
                    <form action={handleSubmit}>
                        {/* TODO: Room Type */}
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label">
                                Room Type
                            </label>
                            <div>
                                <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                            </div>
                        </div>
                        {/* TODO: Room Price */}
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label">
                                Room Price
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                required
                                id="roomPrice"
                                name="roomPrice"
                                value={newRoom.newPrice}
                            />
                        </div>
                        {/* TODO: Room Photo */}
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">
                                Room Photo
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                className="form-control"
                                onChange={handleImageChange}
                            />
                            {/* TODO: image file upload preview */}
                            {imagePreview && (<img
                                src={imagePreview}
                                alt="Preview Room Photo"
                                style={{maxWidth: '400px', maxHeight: '400px'}}
                                className="mb-3"
                            />)}
                        </div>
                        <div className="d-grid d-md-flex mt-2">
                            <button type="button" className="btn btn-outline-primary ">
                                Save Room
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>);
};
export default AddRoom;
