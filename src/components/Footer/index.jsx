import React from "react";
import styled from "styled-components";

const FooterEstilizado = styled.footer`
   display: flex;
   justify-content: space-between;
   padding:50px;
   background-color: #262626;

   h1{
    color:white
   }
    
`
const Logo = styled.img`
 width: 212px;

`



const Footer = () => {
    return (
        <FooterEstilizado>
            <Logo src="img/footer.png" alt="Logo de Alura Flix" />
                <h1>Desarrollado por Melisa Fernández</h1>
             
        </FooterEstilizado>
    )
}

export default Footer;