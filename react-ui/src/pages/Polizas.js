import React, { useEffect, useState } from 'react';
//import { getPolizas, createPoliza, updatePoliza, deletePoliza } from '../api/api';
import { getPolizas, createPoliza, updatePoliza, deletePoliza, getTipoPolizas, getEstadoPolizas, getCoberturas } from '../api/api';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Polizas = () => {
  const [polizas, setPolizas] = useState([]);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({ numeroPoliza: '', tipoPoliza: '', fechaVencimiento: '', cedulaAsegurado: '', nombre: '', primerApellido: '', segundoApellido: '' });
  const [form, setForm] = useState({ numeroPoliza: '', tipoPoliza: '', cedulaAsegurado: '', montoAsegurado: '', fechaVencimiento: '', fechaEmision: '', coberturas: '', estadoPoliza: '', prima: '', periodo: '', fechaInclusion: '', aseguradora: ''
    , cliente: {
      cedulaAsegurado: '',
      nombre: 'Juan',
      primerApellido: 'Perez',
      segundoApellido: 'Gomez',
      tipoPersona: 1,
      fechaNacimiento: '1990-05-15T00:00:00Z'
    }
   });
  const [formVisible, setFormVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tiposPoliza, setTipoPolizas] = useState([]);
  const [estadosPoliza, setEstadosPoliza] = useState([]);
  const [coberturas, setCoberturas] = useState([]);

  useEffect(() => {
    getTipoPolizas()
      .then(response => {
        if (Array.isArray(response.data)) {
          setTipoPolizas(response.data);
        } else {
          console.error("Formato de datos inesperado:", response.data);
        }
      })
      .catch(error => {
        console.error('Error al cargar tipo de póliza:', error);
      });

    getEstadoPolizas()
      .then(response => {
        if (Array.isArray(response.data)) {
          setEstadosPoliza(response.data);

        } else {
          console.error("Formato de datos inesperado:", response.data);
        }
      })
      .catch(error => {
        console.error('Error al cargar estados de póliza:', error);
      });

    getCoberturas()
      .then(response => {
        if (Array.isArray(response.data)) {
          setCoberturas(response.data);

        } else {
          console.error("Formato de datos inesperado:", response.data);
        }
      })
      .catch(error => {
        console.error('Error al cargar las coberturas:', error);
      });

      updatePoliza().then(res => {
        const data = res.data;
        setForm({
          numeroPoliza: data.numeroPoliza,
          tipoPoliza: data.tipoPoliza,
          cedulaAsegurado: data.cedulaAsegurado,
          montoAsegurado: data.montoAsegurado,
          fechaVencimiento: data.fechaVencimiento.split('T')[0],
          fechaEmision: data.fechaEmision.split('T')[0],
          coberturas: data.coberturas,
          estadoPoliza: data.estadoPoliza,
          prima: data.prima,
          periodo: data.periodo.split('T')[0],
          fechaInclusion: data.fechaInclusion.split('T')[0],
          aseguradora: data.aseguradora
        });
      })
      .catch(error => {
        console.error('Error cargando póliza:', error);
      });

    loadPolizas();
    // loadTipoPolizas();
  }, []);

  const loadPolizas = async () => {
    try {
      const response = await getPolizas();

      setPolizas(response.data);
    } catch (err) {
      setError("Error al cargar las pólizas");
      console.error(err);
    }
  };

  const filtrarPolizas = polizas.filter((p) => {
    return (
      p.numeroPoliza?.toLowerCase().includes(filtros.numeroPoliza.toLowerCase()) &&
      p.tipoPoliza?.toString().toLowerCase().includes(filtros.tipoPoliza.toString().toLowerCase()) &&
      p.cedulaAsegurado?.toLowerCase().includes(filtros.cedulaAsegurado.toLowerCase()) &&
      p.nombre?.toLowerCase().includes(filtros.nombre.toLowerCase()) &&
      p.primerApellido?.toLowerCase().includes(filtros.primerApellido.toLowerCase()) &&
      p.segundoApellido?.toLowerCase().includes(filtros.segundoApellido.toLowerCase()) &&
      p.fechaVencimiento?.toString().toLowerCase().includes(filtros.fechaVencimiento.toString().toLowerCase())
    );
  });

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(false);
    const formCompleto = {
      ...form,
      cliente: {
        ...form.cliente,
        cedulaAsegurado: form.cedulaAsegurado
      }
    };
    if (form.numeroPoliza) await updatePoliza(form.numeroPoliza, formCompleto);
        else await createPoliza(formCompleto);
    setForm({
      numeroPoliza: ''
      , tipoPoliza: ''
      , cedulaAsegurado: ''
      , montoAsegurado: ''
      , fechaVencimiento: ''
      , fechaEmision: ''
      , coberturas: ''
      , estadoPoliza: ''
      , prima: ''
      , periodo: ''
      , fechaInclusion: ''
      , aseguradora: ''
      , cliente: {
        cedulaAsegurado: '',
        nombre: 'Juan',
        primerApellido: 'Perez',
        segundoApellido: 'Gomez',
        tipoPersona: 1,
        fechaNacimiento: '1990-05-15T00:00:00Z'
      }
    });
    console.log(form);
    loadPolizas();
  };

  return (
    <div className="container">
      <br /><br /><br />
      <h2>Mantenimiento de Pólizas</h2>

      {/* Formulario de Póliza */}

      <div style={{ padding: 20 }}>
        <button className="btn btn-info " slot="start" onClick={() => setIsOpen(true)} style={{ padding: '10px 20px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Agregar Poliza
        </button>


        {isOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <div style={{ background: '#fff', padding: 300, borderRadius: '10px', maxWidth: 1000 }}>
              <h2>Ingresar Póliza</h2>

              <Form onSubmit={handleSubmit} className="mb-4">
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNumeroP">
                      <Form.Label>Número de Póliza</Form.Label>
                      <Form.Control type="text" value={form.numeroPoliza} onChange={(e) => setForm({ ...form, numeroPoliza: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTipoP">
                      <Form.Label>Tipo de Póliza</Form.Label>
                      <Form.Control as="select" value={form.tipoPoliza} onChange={(e) => setForm({ ...form, tipoPoliza: e.target.value })} required>
                        <option value="">Seleccione un estado</option>
                        {tiposPoliza.map(t => <option key={t.id} value={t.id}>{t.descripcion}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCedulaP">
                      <Form.Label>Cédula Asegurado</Form.Label>
                      <Form.Control type="text" value={form.cedulaAsegurado} onChange={(e) => setForm({ ...form, cedulaAsegurado: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formMonto">
                      <Form.Label>Monto Asegurado</Form.Label>
                      <Form.Control type="number" value={form.montoAsegurado} onChange={(e) => setForm({ ...form, montoAsegurado: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formVencimientoP">
                      <Form.Label>Fecha de Vencimiento</Form.Label>
                      <Form.Control type="date" value={form.fechaVencimiento} onChange={(e) => setForm({ ...form, fechaVencimiento: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEmision">
                      <Form.Label>Fecha de Emisión</Form.Label>
                      <Form.Control type="date" value={form.fechaEmision} onChange={(e) => setForm({ ...form, fechaEmision: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formCobertura">
                      <Form.Label>Cobertura</Form.Label>
                      <Form.Control as="select" value={form.coberturas} onChange={(e) => setForm({ ...form, coberturas: e.target.value })} required>
                        <option value="">Seleccione un estado</option>
                        {coberturas.map(c => <option key={c.id} value={c.id}>{c.descripcion}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formEstado">
                      <Form.Label>Estado Poliza</Form.Label>
                      <Form.Control as="select" value={form.estadoPoliza} onChange={(e) => setForm({ ...form, estadoPoliza: e.target.value })} required>
                        <option value="">Seleccione un estado</option>
                        {estadosPoliza.map(ep => <option key={ep.id} value={ep.id}>{ep.estado}</option>)}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPrima">
                      <Form.Label>Prima</Form.Label>
                      <Form.Control type="number" value={form.prima} onChange={(e) => setForm({ ...form, prima: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPeriodo">
                      <Form.Label>Período</Form.Label>
                      <Form.Control type="date" value={form.periodo} onChange={(e) => setForm({ ...form, periodo: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formInclusion">
                      <Form.Label>Fecha de Inclusión</Form.Label>
                      <Form.Control type="date" value={form.fechaInclusion} onChange={(e) => setForm({ ...form, fechaInclusion: e.target.value })} required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formAseguradora">
                      <Form.Label>Aseguradora</Form.Label>
                      <Form.Control type="text" value={form.aseguradora} onChange={(e) => setForm({ ...form, aseguradora: e.target.value })} required />
                    </Form.Group>
                  </Col>
                </Row>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="success" type="submit">{form.numeroPoliza ? "Actualizar" : "Crear"}</Button>
                  {/* <button type="submit" style={{ flex: 1, background: '#2ecc71', color: '#fff', padding: 10, border: 'none', borderRadius: 5 }}>Guardar</button> */}
                  <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, background: '#e74c3c', color: '#fff', padding: 10, border: 'none', borderRadius: 5 }}>Cancelar</button>
                </div>

              </Form>
            </div>
          </div>
        )}
      </div>

      {/* Filtros de Búsqueda */}
      <div className="container mt-4 mb-4">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Numero Poliza"
              name="numeroPoliza"
              value={filtros.numeroPoliza}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Cédula del Asegurado"
              name="cedulaAsegurado"
              value={filtros.cedulaAsegurado}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Tipo Póliza"
              name="tipoPoliza"
              value={filtros.tipoPoliza}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control"
              placeholder="Buscar por Fecha Vencimiento"
              name="fechaVencimiento"
              value={filtros.fechaVencimiento}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Nombre"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Primer Apellido"
              name="primerApellido"
              value={filtros.primerApellido}
              onChange={handleFiltroChange}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por Segundo Apellido"
              name="segundoApellido"
              value={filtros.segundoApellido}
              onChange={handleFiltroChange}
            />
          </div>
        </div>
      </div>

      {/* Tabla de Pólizas */}
      <div className="container mt-4 mb-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Número Poliza</th>
              <th>Tipo Poliza</th>
              <th>Cédula Asegurado</th>
              <th>Nombre</th>
              <th>Primer Apellido</th>
              <th>Segundo Apellido</th>
              <th>Monto Asegurado</th>
              <th>Fecha Vencimiento</th>
              <th>Coberturas</th>
              <th>Estado Poliza</th>
              <th>Prima</th>
              <th>Periodo</th>
              <th>Aseguradora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarPolizas.map((p) => (
              <tr key={p.numeroPoliza}>
                <td>{p.numeroPoliza}</td>
                <td>{p.tipoPoliza}</td>
                <td>{p.cedulaAsegurado}</td>
                <td>{p.nombre}</td>
                <td>{p.primerApellido}</td>
                <td>{p.segundoApellido}</td>
                <td>{p.montoAsegurado}</td>
                <td>{p.fechaVencimiento}</td>
                <td>{p.coberturas}</td>
                <td>{p.estadoPoliza}</td>
                <td>{p.prima}</td>
                <td>{p.periodo}</td>
                <td>{p.aseguradora}</td>
                <td>
                  <Button className="me-2" onClick={() => { setForm(p); setIsOpen(true); }}>
                    <i className="bi bi-pencil-fill me-1"></i>
                  </Button>
                  <Button class="btn btn-danger" onClick={() => deletePoliza(p.cedulaAsegurado).then(loadPolizas)}>
                    <i className="bi bi-trash-fill me-1"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

    </div>
  );
}

export default Polizas;
