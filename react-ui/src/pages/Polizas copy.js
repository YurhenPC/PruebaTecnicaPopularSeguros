import React, { useEffect, useState } from 'react';
//import { getPolizas, createPoliza, updatePoliza, deletePoliza } from '../api/api';
import { getPolizas} from '../api/api';
import { Button, Form, Table } from 'react-bootstrap';

const tiposPoliza = ['Vida', 'Hogar', 'Auto', 'Salud'];
const estadosPoliza = ['Activa', 'Vencida', 'Cancelada'];
const coberturas = ['Básica', 'Intermedia', 'Premium'];

function Polizascopy() {

    //const [tiposPoliza, setTiposPoliza] = useState([]);

    // useEffect(() => {
    //     const fetchTiposPoliza = async () => {
    //         try {
    //             // Hacemos la solicitud a la API
    //             const response = await fetch('http://localhost:5003/api/TipoPoliza/Lista');
    //             const result = await response.json();
    //             // Guardamos los datos obtenidos en el estado
    //             setTiposPoliza(result);
    //         } catch (error) {
    //             console.error('Error al cargar los tipos de póliza:', error);
    //         }
    //     };

    //     fetchTiposPoliza();
    // }, []);

    const [polizas, setPolizas] = useState([]);
    const [form, setForm] = useState({ numero: '', tipo: '', cedula: '', monto: '', vencimiento: '', emision: '', cobertura: '', estado: '', prima: '', periodo: '', inclusion: '', aseguradora: '' });
    const [filtros, setFiltros] = useState({ numero: '', tipo: '', vencimiento: '', cedula: '', nombre: '' });

    useEffect(() => {
        loadPolizas();
    }, []);

    const loadPolizas = async () => {
        const res = await getPolizas();
        setPolizas(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.id) await updatePoliza(form.id, form);
        else await createPoliza(form);
        setForm({ numero: '', tipo: '', cedula: '', monto: '', vencimiento: '', emision: '', cobertura: '', estado: '', prima: '', periodo: '', inclusion: '', aseguradora: '' });
        loadPolizas();
    };

    return (
        <div className="container">
            <h2>Mantenimiento de Pólizas</h2>

            {/* Filtros de Búsqueda */}
            <div className="mb-4">
                <Form>
                    <Form.Group controlId="formNumero">
                        <Form.Label>Número de Póliza</Form.Label>
                        <Form.Control type="text" value={filtros.numero} onChange={(e) => setFiltros({ ...filtros, numero: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formTipo">
                        <Form.Label>Tipo de Póliza</Form.Label>
                        <Form.Control as="select" value={filtros.tipo} onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}>
                            {tiposPoliza.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formVencimiento">
                        <Form.Label>Fecha de Vencimiento</Form.Label>
                        <Form.Control type="date" value={filtros.vencimiento} onChange={(e) => setFiltros({ ...filtros, vencimiento: e.target.value })} />
                    </Form.Group>
                    <Form.Group controlId="formCedula">
                        <Form.Label>Cédula Asegurado</Form.Label>
                        <Form.Control type="text" value={filtros.cedula} onChange={(e) => setFiltros({ ...filtros, cedula: e.target.value })} />
                    </Form.Group>
                    <Button variant="primary" onClick={loadPolizas}>Buscar</Button>
                </Form>
            </div>

            {/* Formulario de Póliza */}
            <Form onSubmit={handleSubmit} className="mb-4">
                <Form.Group controlId="formNumeroP">
                    <Form.Label>Número de Póliza</Form.Label>
                    <Form.Control type="text" value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formTipoP">
                    <Form.Label>Tipo de Póliza</Form.Label>
                    <Form.Control as="select" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} required>
                        {tiposPoliza.map(tipo => <option key={tipo} value={tipo}>{tipo}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCedulaP">
                    <Form.Label>Cédula Asegurado</Form.Label>
                    <Form.Control type="text" value={form.cedula} onChange={(e) => setForm({ ...form, cedula: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formMonto">
                    <Form.Label>Monto Asegurado</Form.Label>
                    <Form.Control type="number" value={form.monto} onChange={(e) => setForm({ ...form, monto: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formVencimientoP">
                    <Form.Label>Fecha de Vencimiento</Form.Label>
                    <Form.Control type="date" value={form.vencimiento} onChange={(e) => setForm({ ...form, vencimiento: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formEmision">
                    <Form.Label>Fecha de Emisión</Form.Label>
                    <Form.Control type="date" value={form.emision} onChange={(e) => setForm({ ...form, emision: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formCobertura">
                    <Form.Label>Cobertura</Form.Label>
                    <Form.Control as="select" value={form.cobertura} onChange={(e) => setForm({ ...form, cobertura: e.target.value })} required>
                        {coberturas.map(cobertura => <option key={cobertura} value={cobertura}>{cobertura}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formEstado">
                    <Form.Label>Estado</Form.Label>
                    <Form.Control as="select" value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })} required>
                        {estadosPoliza.map(estado => <option key={estado} value={estado}>{estado}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formPrima">
                    <Form.Label>Prima</Form.Label>
                    <Form.Control type="number" value={form.prima} onChange={(e) => setForm({ ...form, prima: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formPeriodo">
                    <Form.Label>Período</Form.Label>
                    <Form.Control type="date" value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formInclusion">
                    <Form.Label>Fecha de Inclusión</Form.Label>
                    <Form.Control type="date" value={form.inclusion} onChange={(e) => setForm({ ...form, inclusion: e.target.value })} required />
                </Form.Group>
                <Form.Group controlId="formAseguradora">
                    <Form.Label>Aseguradora</Form.Label>
                    <Form.Control type="text" value={form.aseguradora} onChange={(e) => setForm({ ...form, aseguradora: e.target.value })} required />
                </Form.Group>
                <Button variant="success" type="submit">{form.id ? "Actualizar" : "Crear"}</Button>
            </Form>

            {/* Tabla de Pólizas */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Tipo</th>
                        <th>Cédula</th>
                        <th>Vencimiento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {polizas.map((p) => (
                        <tr key={p.id}>
                            <td>{p.numero}</td>
                            <td>{p.tipo}</td>
                            <td>{p.cedula}</td>
                            <td>{p.vencimiento}</td>
                            <td>{p.estado}</td>
                            <td>
                                <Button variant="warning" onClick={() => setForm(p)}>Editar</Button>
                                <Button variant="danger" onClick={() => deletePoliza(p.id).then(loadPolizas)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Polizascopy;
