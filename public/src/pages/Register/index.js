import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import api from '../../services/api';

const Register = () => {

    const history = useHistory();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault = false;
        
        if (!name || !email || !password) {
            alert("Preencha todos os campos");
        } else {
            try {
                await api.post('/user/register', { name, email, password });
                alert("Registro efetuado! Entre para iniciar a sessão");
                history.push("/signin");
            } catch (err) {
                alert("Este usuário já existe");
            }
        }
    }

    return (
        <Container className="App">
            <h2>Registrar-se</h2>
            <Form className="form">
                <FormGroup>
                    <Label>Nome</Label>
                    <Input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Seu nome"
                    onChange={ e => setName(e.target.value) }
                    />
                </FormGroup>
                <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email@email.com"
                    onChange={ e => setEmail(e.target.value) }
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="********"
                    onChange={ e => setPassword(e.target.value) }
                    />
                </FormGroup>
                <span className="register-span">Já tem uma conta? <Link to="/signin">Entrar</Link></span>
                <Button color="primary" block onClick={ handleSubmit }>Registrar-se</Button>
            </Form>
        </Container>
    );
}

export default Register;
