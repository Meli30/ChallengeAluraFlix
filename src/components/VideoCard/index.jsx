import React from "react";
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  margin-top: 16px;
`;

const Title = styled.h3`
  font-size: 1.2em;
  margin: 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const LinkButton = styled.a`
  display: inline-block;
  color: #007bff;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #007bff;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const VideoCard = ({ video, onEdit, onDelete }) => {
  if (!video) return null; // Evita errores si 'video' es undefined

  const handleDelete = () => {
    if (video.id) {
      onDelete(video.id);
    }
  };

  return (
    <CardContainer>
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

      <div>
        <Button onClick={() => onEdit(video)} aria-label="Editar video">Editar</Button>
        <Button onClick={handleDelete} aria-label="Eliminar video">Eliminar</Button>
      </div>
    </CardContainer>
  );
};

export default VideoCard;



