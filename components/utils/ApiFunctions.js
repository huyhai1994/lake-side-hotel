import axios from 'axios';

export const api = axios.create({
  baseUrl: 'http://localhost:8080',
});
// TODO: this function add a new room -> database
export async function addRoom(photo, roomType, roomPrice) {
  // TODO: create a new form data
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('roomType', roomType);
  formData.append('roomPrice', roomPrice);
  //TODO: set up the endpoint to post the data -> backend
  const response = await api.post('/rooms/add/new-room');
  if (response.status === 201) return true;
  return false;
}
// TODO: This function get all room types from the database
export async function getRoomTypes() {
  try {
    const response = await api.get('/rooms/room-types');
    return response.data;
  } catch (error) {
    throw new Error('Error getting room types');
  }
}
