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
  background: #03122F;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 700px;
  text-align: center;

  form{
    display: flex;
    flex-direction: column;
  }

  h2{
    font-size: 40px;
  }

  label{
    text-align: left;
  }
`;

const Input = styled.input`
 background-color: #03122F;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: white;
`;

const Select = styled.select`
  padding: 8px;
  color: white;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #03122F;
`;

const Textarea = styled.textarea`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #03122F;
  color: white;
`;

const Boton = styled.button`
  padding: 10px 15px;
  margin: 5px;
  background-color: #e5e8ed;
  color: #080808;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #efcdcd;
    color:black
  }
`;

const Formulario = ({ onClose }) => {
  return (
    <Modal>
      <ModalContent>
        <form>
          <h2>Nuevo Video</h2>
          <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO</p>

          <label>Título</label>
          <Input type="text" name="titulo" required />

          <label>Categoría</label>
          <Select name="categoría">
            <option>Front End</option>
            <option>Back End</option>
            <option>Innovación y Gestión</option>
          </Select>

          <label>Imagen</label>
          <Input type="url" name="imagen" required />

          <label>Video</label>
          <Input type="url" name="url" required />

          <label>Descripción</label>
          <Textarea name="descripcion" />

          <Boton type="submit">Guardar</Boton>
          <Boton type="button" onClick={onClose}>Cerrar</Boton>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Formulario;

  