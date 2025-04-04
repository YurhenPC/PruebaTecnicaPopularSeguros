import React, { useEffect, useState } from 'react';
//import { getPolizas, createPoliza, updatePoliza, deletePoliza } from '../api/api';
import { getPolizas, createPoliza, updatePoliza, deletePoliza } from '../api/api';
import { Button, Form, Table } from 'react-bootstrap';

const tiposPoliza = ['Vida', 'Hogar', 'Auto', 'Salud'];
const estadosPoliza = ['Activa', 'Vencida', 'Cancelada'];
const coberturas = ['Básica', 'Intermedia', 'Premium'];

const Polizas = () => {
    const [polizas, setPolizas] = useState([]);
    const [error, setError] = useState(null);
    const [filtros, setFiltros] = useState({ numeroPoliza: '', tipoPoliza: '', fechaVencimiento: '', cedulaAsegurado: '', nombre: '' });
    const [form, setForm] = useState({ numeroPoliza: '', tipoPoliza: '', cedulaAsegurado: '', montoAsegurado: '', fechaVencimiento: '', fechaEmision: '', cobertura: '', estadoPoliza: '', prima: '', periodo: '', fechaInclusion: '', aseguradora: '' });
    const [formVisible, setFormVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        loadPolizas();
    }, []);

    const loadPolizas = async () => {
        try {
            const response = await getPolizas();
            console.log(response);
            setPolizas(response.data);
        } catch (err) {
            setError("Error al cargar las pólizas");
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsOpen(false);
        if (form.id) await updatePoliza(form.id, form);
        else await createPoliza(form);
        setForm({ numeroPoliza: '', tipoPoliza: '', cedulaAsegurado: '', montoAsegurado: '', fechaVencimiento: '', fechaEmision: '', cobertura: '', estadoPoliza: '', prima: '', periodo: '', fechaInclusion: '', aseguradora: '' });
        loadPolizas();
    };

    return (
        <div className="container">
            <br /><br /><br />
            <h2>Mantenimiento de Pólizas</h2>

            {/* Formulario de Póliza */}

            <div style={{ background: '#fff', padding: 30, borderRadius: '10px', maxWidth: 500 }}>
                <h2>Ingresar Póliza</h2>

                <Form onSubmit={handleSubmit} className="mb-4">
                    <Form.Group controlId="formNumeroP">
                        <Form.Label>Número de Póliza</Form.Label>
                        <Form.Control type="text" value={form.numeroPoliza} onChange={(e) => setForm({ ...form, numeroPoliza: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formTipoP">
                        <Form.Label>Tipo de Póliza</Form.Label>
                        <Form.Control as="select" value={form.tipoPoliza} onChange={(e) => setForm({ ...form, tipoPoliza: e.target.value })} required>
                            {tiposPoliza.map(tipoPoliza => <option key={tipoPoliza} value={tipoPoliza}>{tipoPoliza}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formCedulaP">
                        <Form.Label>Cédula Asegurado</Form.Label>
                        <Form.Control type="text" value={form.cedulaAsegurado} onChange={(e) => setForm({ ...form, cedulaAsegurado: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formMonto">
                        <Form.Label>Monto Asegurado</Form.Label>
                        <Form.Control type="number" value={form.montoAsegurado} onChange={(e) => setForm({ ...form, montoAsegurado: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formVencimientoP">
                        <Form.Label>Fecha de Vencimiento</Form.Label>
                        <Form.Control type="date" value={form.fechaVencimiento} onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formEmision">
                        <Form.Label>Fecha de Emisión</Form.Label>
                        <Form.Control type="date" value={form.fechaEmision} onChange={(e) => setForm({ ...form, fechaEmision: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formCobertura">
                        <Form.Label>Cobertura</Form.Label>
                        <Form.Control as="select" value={form.cobertura} onChange={(e) => setForm({ ...form, cobertura: e.target.value })} required>
                            {coberturas.map(cobertura => <option key={cobertura} value={cobertura}>{cobertura}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="formEstado">
                        <Form.Label>Estado Poliza</Form.Label>
                        <Form.Control as="select" value={form.estadoPoliza} onChange={(e) => setForm({ ...form, estadoPoliza: e.target.value })} required>
                            {estadosPoliza.map(estadoPoliza => <option key={estadoPoliza} value={estadoPoliza}>{estadoPoliza}</option>)}
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
                        <Form.Control type="date" value={form.fechaInclusion} onChange={(e) => setForm({ ...form, fechaInclusion: e.target.value })} required />
                    </Form.Group>
                    <Form.Group controlId="formAseguradora">
                        <Form.Label>Aseguradora</Form.Label>
                        <Form.Control type="text" value={form.aseguradora} onChange={(e) => setForm({ ...form, aseguradora: e.target.value })} required />
                    </Form.Group>
                    <Button variant="success" type="submit">{form.id ? "Actualizar" : "Crear"}</Button>
                </Form>
            </div>
        </div>
    );
}

export default Polizas;
