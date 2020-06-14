import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Table, Button, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaPencilAlt, FaTrashAlt,FaEllipsisV, FaPlus } from 'react-icons/fa';
import InputMask from 'react-input-mask';

import './style.css';

import Navbar from '../../components/Navbar';
import PageTitle from '../../components/PageTitle';

import api from '../../services/api';

const Clients = () => {

    const [updated, setUpdated] = useState(0);
    const [clients, setClients] = useState([]);
    const [modalFunction, setModalFunction] = useState('add');
    const [addEditModal, setAddEditModal] = useState(false);
    const [form, setFormState] = useState({
        id: '',
        name: '',
        contact_name: '',
        cnpj: '',
        since_date: ''
    });

    const clearFormState = () => {
        setFormState({
            id: '',
            name: '',
            contact_name: '',
            cnpj: '',
            since_date: ''
        });
    }

    const toggleAddModal = () => {
        setAddEditModal(!addEditModal);
        setModalFunction('add');
        clearFormState();
    };
    const toggleEditModal = (id) => {
        form.id = id;
        setAddEditModal(!addEditModal);
        setModalFunction('edit');
        api.get(`clients/${id}`).then((response) => {
            setFormState({
                id: response.data._id,
                name: response.data.name,
                contact_name: response.data.contact_name,
                cnpj: response.data.cnpj,
                since_date: response.data.since_date
            });
        });
    };

    const updateFormFields = e => {
        setFormState({
          ...form,
          [e.target.name]: e.target.value
        });
    };

    const submitAddEditModal = async () => {
        if (modalFunction === "add") {
            try {
                const response = await api.post('/clients', form);
                if (response.data.success) {
                    setUpdated(response.data);
                    toggleAddModal();   
                }
            } catch (err) {
                alert("Ops, algo deu errado. Reveja os campos e tente novamente.");
            }
        } else {
            try {
                const response = await api.put(`/clients/${form.id}`, form);
                if (response.data.success) {
                    setUpdated(response.data);
                    toggleAddModal();
                }
            } catch (err) {
                alert("Ops, algo deu errado. Reveja os campos e tente novamente.");
            }
        }
    }

    const removeClient = async (id) => {
        const response = await api.delete(`/clients/${id}`);
        setUpdated(response.data);
    }
    
    // Load clients
    useEffect(() => {
        api.get('/clients').then((response) => {
            setClients(response.data);
        });
    }, [updated]);

    return(
        <div>
            <Navbar />
            <Container fluid>
                <PageTitle title="Clientes" subtitle="Visualize os clientes registrados ou adicione um novo"></PageTitle>
                <Button size="sm" color="success" onClick={toggleAddModal}><FaPlus /> Novo Cliente</Button>
                <div className="table-container mt-2">
                    <Table responsive>
                        <thead align="center">
                            <tr>
                                <th>Nome</th>
                                <th>Nome do Contato</th>
                                <th>CNPJ</th>
                                <th><FaEllipsisV /></th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {clients.map((client) => (
                                <tr key={client._id}>
                                    <td>{client.name}</td>
                                    <td>{client.contact_name}</td>
                                    <td>{client.cnpj ? client.cnpj : <span className="badge badge-danger">Não Informado</span>}</td>
                                    <td>
                                        <Button size="sm" color="primary" onClick={() => toggleEditModal(client._id)} className="mr-1"><FaPencilAlt /></Button>
                                        <Button size="sm" color="danger" onClick={() => removeClient(client._id)}><FaTrashAlt /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Container>
            <Modal isOpen={addEditModal} toggle={toggleAddModal} size="lg">
                <ModalBody>
                    <div className="section-title" align="center">
                        { modalFunction === "add" ? <h4>Adicionar Cliente</h4> : <h4>Editar Cliente <br/><small>{form.name}</small></h4> }
                    </div>
                    <hr/>
                    <div className="section-body">
                        <Form className="form">
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Nome</Label>
                                        <Input
                                        type="name"
                                        name="name"
                                        value={form.name}
                                        id="name"
                                        placeholder="Nome do cliente"
                                        onChange={updateFormFields}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Nome do Contato</Label>
                                        <Input
                                        type="contact_name"
                                        name="contact_name"
                                        value={form.contact_name}
                                        id="contact_name"
                                        placeholder="Nome do Contato"
                                        onChange={updateFormFields}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>CNPJ</Label>
                                        <Input
                                        type="cnpj"
                                        name="cnpj"
                                        value={form.cnpj}
                                        id="cnpj"
                                        placeholder="CNPJ"
                                        onChange={updateFormFields}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Cliente Desde</Label>
                                        <InputMask
                                        mask="9999/99/99"type="since_date"
                                        name="since_date"
                                        value={form.since_date}
                                        id="since_date"
                                        placeholder="Y/m/d"
                                        onChange={updateFormFields}
                                        >
                                            {(inputProps) => <Input {...inputProps} disableUnderline />}
                                        </InputMask>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <hr/>
                    <div className="section-footer" align="center">
                        <Button type="submit" size="md" color="primary" className="mr-1" onClick={submitAddEditModal}>Salvar</Button>
                        <Button size="md" color="danger" onClick={toggleEditModal}>Cancelar</Button>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Clients;
