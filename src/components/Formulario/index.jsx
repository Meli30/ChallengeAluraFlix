import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  z-index: 1;
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
  border-radius: 8px;
  width: 800px;
  display: flex;
  flex-direction: column;
;

form{
    
}

  h2{
    text-align: center;
    font-size: 30px;
  }

  p{
    text-align: center;
  }

  label{
    font-size: 15px;
  }
 
  
`;

const Input = styled.input`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
 
`;

const Select = styled.select`

  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Textarea = styled.textarea`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`

const Boton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  background-color: #ff0000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #cc0000;
  }
`;

const Formulario = ({ onClose }) => {
  return (
    <Modal>
      <ModalContent>
        <h2>Nuevo Video</h2>
        <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TAREJTA DE VIDEO</p>
        <form>
          <label>Título</label>
          <Input type="text" name="titulo" required />

          <label>Categoría</label>
             <Select name="categoría">
              <option>Front End</option>

              <option>Back End</option>

              <option>Innovación y Gestión</option>

              </Select>
             

          <label>Imagen</label>
          <Input type="url" name="url" required />

          <label>Video</label>
          <Input type="url" name="url" required />

          <label>Descripción</label>
          <Textarea />

          <Boton type="submit">Guardar</Boton>
          <Boton type="button" onClick={onClose}>Limpiar</Boton>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Formulario;

  