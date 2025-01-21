import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Si usas React Router v6

const PageContainer = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NuevoVideo = () => {
    const [titulo, setTitulo] = useState('');
    const [url, setUrl] = useState('');
    const [imagen, setImagen] = useState('');
    const [categorias, setCategorias] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [videos, setVideos] = useState('')
    const navigate = useNavigate(); // Para redirigir en React Router v6

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevoVideo = {
            title: titulo,
            url: url,
            imagen: imagen,
            category: categorias,
            descripcion: descripcion
        };

        try {
            const response = await fetch('https://67426541e464749900907b96.mockapi.io/videos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoVideo)
            });

            const data = await response.json();
            console.log("Nuevo video agregado:", data);
            // Actualiza el estado para reflejar el nuevo video
            setVideos((prevVideos) => [...prevVideos, data]);
            setCategorias(organizarPorCategoria([...videos, data])); // Reorganiza las categorías después de agregar el video

            // Redirigir automáticamente a Home
            navigate('/');

        } catch (error) {
        }
    };

    return (
        <PageContainer>
            <Header activePage="nuevo-video" />
            <main>
                <h1>Nuevo Video</h1>
                <FormContainer onSubmit={handleSubmit}>
                    <label htmlFor="titulo">Título:</label>
                    <Input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />

                    <label htmlFor="url">URL del Video:</label>
                    <Input
                        type="url"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />

                    <label htmlFor="imagen">URL de la Imagen:</label>
                    <Input
                        type="url"
                        id="imagen"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        required
                    />

                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        id="categoria"
                        value={categorias}
                        onChange={(e) => setCategorias(e.target.value)}
                        required
                    >
                        <option value="Front End">Front End</option>
                        <option value="Back End">Back End</option>
                        <option value="Innovación y Gestión">Innovación y Gestión</option>
                    </select>

                    <label htmlFor="descripcion">Descripción:</label>
                    <Input
                        as="textarea"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        required
                    />

                    <Button type="submit">Guardar</Button>
                    <Button type="reset">Limpiar</Button>
                </FormContainer>

            </main>
            <Footer />
        </PageContainer>
    );
};

export default NuevoVideo;

