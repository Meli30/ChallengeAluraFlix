import React, { useState } from "react";
import { Link } from "react-router-dom";
import Formulario from "../Formulario";// Asegúrate de que este componente esté importado correctamente
import styled from "styled-components";

// Aquí va tu estilo del Header
const HeaderEstilizado = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #333;
`;

const Logo = styled.img`
  height: 50px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const Boton = styled.button`
  background-color: ${(props) => (props.$destacado ? "#007bff" : "#333")};
  color: white;
  border: none;
  padding: 20px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Header = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <HeaderEstilizado>
      <Logo src="img/LogoMain.png" alt="Logo de Alura Flix" />
      <Nav>
        <Link to="/" aria-label="Ir a la página de inicio">
          <Boton $destacado>Home</Boton>
        </Link>
        <Link to="/nuevo-video" aria-label="Subir nuevo video">
          <Boton onClick={() => setMostrarFormulario(true)}>
            Nuevo Video
          </Boton>
        </Link>
      </Nav>

      {/* Mostrar el formulario si el estado es true */}
      {mostrarFormulario && <Formulario onClose={() => setMostrarFormulario(false)} />}
    </HeaderEstilizado>
  );
};

export default Header;
