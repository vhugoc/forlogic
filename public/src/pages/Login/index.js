import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import api from '../../services/api';
import { login } from '../../services/auth';

const Login = () => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault = false;
        
        if (!email || !password) {
            alert("Preencha todos os campos");
        } else {
            try {
                const response = await api.post('/signin', { email, password });
                login(response.data.token);
                history.push('/');
            } catch (err) {
                alert("E-mail e/ou senha incorreto(s)!");
            }
        }
    }

    return (
        <Container className="App">
            <h2>Iniciar Sessão</h2>
            <Form className="form">
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
                <span className="register-span">Não tem uma conta? <Link to="/register">Registre-se</Link> agora mesmo!</span>
                <Button color="primary" block onClick={ handleSubmit }>Entrar</Button>
            </Form>
        </Container>
    );
}

export default Login;
