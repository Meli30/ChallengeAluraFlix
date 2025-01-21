import React, { useState } from "react";
import styled from "styled-components";
import { actualizarVideo } from "../../servicios/videoService";


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
 background: ${(props) => (props.$primary ? "#4caf50" : "#ff6b6b")};
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  width: 48%;

  &:hover {
    background: ${(props) => (props.primary ? "#45a049" : "#ff4f4f")};
  }
`;

const Modal = ({ video, onClose, onSave }) => {
 

  const [title, setTitle] = useState(video?.title || "");
  const [category, setCategory] = useState(video?.category || "");

  const handleSave = async () => {

    const updatedVideo = {
      ...video,
      title,
      category
    };

    try {
      await actualizarVideo(updatedVideo); 
      onSave(updatedVideo); 
      onClose(); 
    } catch (error) {
      console.error("Error al actualizar el video:", error);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Editar Video</h3>
        <button onClick={onClose}>X</button>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Front End">Front End</option>
          <option value="Back End">Back End</option>
          <option value="Innovación y Gestión">Innovación y Gestión</option>
        </Select>
        <ButtonContainer>
          {video ? (
            <Button $primary onClick={handleSave}>Guardar</Button>
          ) : (
            <Button $primary onClick={handleAdd}>Agregar</Button>
          )}
          <Button onClick={onClose}>Cancelar</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
