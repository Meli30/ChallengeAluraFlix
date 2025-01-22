import React from "react";
import styled from 'styled-components';
import coloresCategorias from "../../utils/colors";

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const InfoContainer = styled.div`
  margin-top: 16px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 1.2em;
  margin: 0;
  text-align: center;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  margin: 5px;
  border-radius: 10px;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const LinkButton = styled.a`
  display: inline-block;
  background-color:#f1f1f1;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #f1f1f1;
  }
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  width: 300px;
  background-color: ${(props) => coloresCategorias[props.$categoria] || coloresCategorias["Otros"]}; 
  border-radius: 8px;
`;

const ButtonContainer = styled.div`

display: flex;
justify-content: space-evenly;
padding: 10px;
`


const VideoCard = ({ video, onEdit, onDelete }) => {
  if (!video) return null; // Evita errores si 'video' es undefined

  console.log("Imagen URL:", video.imagenUrl); // <-- Depuración

  const handleDelete = () => {
    if (video.id) {
      onDelete(video.id);
    }
  };

  return (
    <CardContainer $categoria={video.category}>
      <ImageContainer>
        {video.imagenUrl ? (
          <img src={video.imagenUrl} alt={`Imagen de ${video.title}`} />
        ) : (
          <p>Imagen no disponible</p>
        )}
      </ImageContainer>

      <InfoContainer>
        <Title>{video.title || "Título no disponible"}</Title>
        <p>{video.category || "Sin categoría"}</p>
        <p>{video.descripcion || "Descripción no disponible"}</p>
      </InfoContainer>

      {/* Enlace a la URL */}
      {video.url && (
        <LinkButton href={video.url} target="_blank" rel="noopener noreferrer">
          Ir al enlace
        </LinkButton>
      )}

      <ButtonContainer>
        <Button onClick={() => onEdit(video)} aria-label="Editar video">Editar</Button>
        <Button onClick={handleDelete} aria-label="Eliminar video">Eliminar</Button>
      </ButtonContainer>
    </CardContainer>
  );
};

export default VideoCard;



