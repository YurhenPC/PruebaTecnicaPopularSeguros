import axios from 'axios';

const API_URL = 'http://localhost:5003/api/Poliza';

export const getPolizas = async (filtros) => await axios.get(`${API_URL}/Obtener/`, { params: filtros });
export const createPoliza = async (poliza) => await axios.post(API_URL, poliza);
export const updatePoliza = async (id, poliza) => await axios.put(`${API_URL}/${id}`, poliza);
export const deletePoliza = async (id) => await axios.delete(`${API_URL}/${id}`);
