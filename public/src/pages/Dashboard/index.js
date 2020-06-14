import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';

import './style.css';

import Navbar from '../../components/Navbar';

import { useHistory } from 'react-router';
import api from '../../services/api';

const Dashboard = () => {
    const history = useHistory();

    const [clientCount, setClientCount] = useState(0);

    // Count clients
    useEffect(() => {
        api.get('/clients').then((response) => {
            setClientCount(response.data.length);
        });
    }, []);

    return(
        <div>
            <Navbar />
            <Container fluid>
                <Row>
                    <Col sm="4">
                        <Card body align="center">
                            <CardTitle>Clientes</CardTitle>
                            <CardText>{clientCount}</CardText>
                            <Button color="primary" onClick={ () => history.push('/clients') }>Ver Clientes</Button>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body align="center">
                            <CardTitle>Avaliações</CardTitle>
                            <CardText><span class="badge badge-danger">Nenhuma Avaliação</span></CardText>
                            <Button color="primary">Ver Avaliações</Button>
                        </Card>
                    </Col>
                    <Col sm="4">
                        <Card body align="center">
                            <CardTitle>Avaliação Média</CardTitle>
                            <CardText><span class="badge badge-danger">Nenhuma Avaliação</span></CardText>
                            <Button color="primary">Ver Avaliações</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;
