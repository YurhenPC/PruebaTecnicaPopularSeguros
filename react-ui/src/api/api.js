import axios from 'axios';

const API_URL = 'http://localhost:5003/api/Poliza';

export const getPolizas = async () => await axios.get(`${API_URL}/Lista`);
export const createPoliza = async (poliza) => {
    console.log(poliza);
    return await axios.post(`${API_URL}/Nuevo`, poliza);} 

export const updatePoliza = async (numeroPoliza, poliza) => await axios.put(`${API_URL}/Editar/${numeroPoliza}`, poliza);
export const deletePoliza = async (cedulaAsegurado) => await axios.delete(`${API_URL}/Eliminar/${cedulaAsegurado}`);
export const getTipoPolizas = async () => await axios.get(`http://localhost:5003/api/TipoPoliza/Lista`);
export const getEstadoPolizas = async () => await axios.get(`http://localhost:5003/api/EstadoPoliza/Lista`);
export const getCoberturas = async () => await axios.get(`http://localhost:5003/api/Coberturas/Lista`);