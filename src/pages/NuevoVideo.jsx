import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner"
import Footer from "../components/Footer";
import Formulario from "../components/Formulario";
import styled from "styled-components";

const PageContainer = styled.div`
  background-color: #120e0e;
  max-height: max-content;
  padding: 20px;
`;


const NuevoVideo = () => {
  return (
    <PageContainer>
      <Header activePage="nuevo-video" />
      <Banner/>
        <Formulario onClose={() => window.history.back()} />
      <Footer />
    </PageContainer>
  );
};

export default NuevoVideo;


