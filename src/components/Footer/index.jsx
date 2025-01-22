import React from "react";
import styled from "styled-components";

const FooterEstilizado = styled.footer`
   display: flex;
   justify-content: space-between;
   padding:50px;
   background-color: #262626;

   h5{
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
                <h5>Desarrollado por Melisa Fernández</h5>
             
        </FooterEstilizado>
    )
}

export default Footer;