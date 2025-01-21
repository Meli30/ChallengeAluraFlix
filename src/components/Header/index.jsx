import React from "react"
import styled from "styled-components";
import { useState } from "react";
import Formulario from "../Formulario";
import { Link } from "react-router-dom";

const HeaderEstilizado = styled.header `
   display: flex;
   justify-content: space-between;
   padding:20px;
   background-color: #262626;
   
  
`
const Logo = styled.img`
 width: 212px;
`

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  height: 100%;
  background-color: #262626;
`;

const Boton = styled.button`
  background-color: #1e00ff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  
  &:hover {
    background-color: #7956e0;
  }
`;

const Header = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);


    return (
      <HeaderEstilizado>
      <Logo src="img/LogoMain.png" alt="Logo de Alura Flix"/>
      <Nav>
        <Link to="/" aria-label="Ir a la página de inicio">
          <Boton>Home</Boton>
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