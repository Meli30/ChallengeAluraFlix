import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./../components/Header";
import Banner from "./../components/Banner";
import Footer from "./../components/Footer";
import VideoCard from "./../components/VideoCard";
import Modal from "./../components/Modal";
import { organizarPorCategoria } from "./../utils/organizarVideos";

const HomeContainer = styled.div`
  width: 1280px;
  max-width: 100%;
  margin: 0 auto;
`;

const SectionContainer = styled.section`
  background-color: #f8f9fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: #333;

  h1 {
    display: flex;
    justify-content: left;
    font-size: 50px;
    padding-left: 30px;
  }

  .videos {
    display: flex;
    gap: 10px;
    flex-wrap: wrap; /* Cambio para mejorar adaptabilidad */
  }
`;

function Home() {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const obtenerVideos = async () => {
    try {
      const response = await fetch("https://67426541e464749900907b96.mockapi.io/videos");
      if (!response.ok) throw new Error("Error al obtener los videos");

      return await response.json();
    } catch (error) {
      console.error("Error capturado:", error);
      throw error;
    }
  };

  const cargarVideos = async () => {
    try {
      setCargando(true);
      setError(null);
  
      const datos = await obtenerVideos();
      console.log("Datos obtenidos:", datos);
  
      setVideos(datos);
      setCategorias(organizarPorCategoria(datos));
    } catch (err) {
      setError("Error al cargar los videos. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (videos.length === 0) {
      cargarVideos(); // Evita recargar si ya hay datos
    }
  }, [videos]);

  const handleUpdateVideo = async (updatedVideo) => {
    if (!updatedVideo.id) {
      console.error("ID inválido:", updatedVideo.id);
      alert("Error: ID del video no disponible.");
      return;
    }
  
    if (!updatedVideo.title.trim() || !updatedVideo.category.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch(`https://67426541e464749900907b96.mockapi.io/videos/${updatedVideo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: updatedVideo.title.trim(),
          category: updatedVideo.category.trim(),
        }),
      });
  
      if (!response.ok) throw new Error("Error al actualizar el video");
  
      const updatedVideos = videos.map(video =>
        video.id === updatedVideo.id ? updatedVideo : video
      );
  
      setVideos(updatedVideos);
      setCategorias(organizarPorCategoria(updatedVideos));
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al actualizar el video");
    }
  };
  

  const handleAddVideos = async (videos) => {
    try {
      if (!videos || videos.length === 0) {
        alert("No hay videos para agregar.");
        return;
      }
  
      const videosValidos = videos.filter(video => video.title?.trim() && video.category?.trim());
      if (videosValidos.length !== videos.length) {
        alert("Algunos videos tienen datos incompletos y no se enviarán.");
      }
  
      const responses = await Promise.all(
        videosValidos.map(video =>
          fetch("https://67426541e464749900907b96.mockapi.io/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: video.title.trim(),
              category: video.category.trim(),
              url: video.url, 
            }),
          })
        )
      );
  
      const errores = responses.filter(response => !response.ok);
      if (errores.length > 0) throw new Error(`Fallaron ${errores.length} solicitudes`);
  
      // Obtener la lista actualizada desde la API para evitar inconsistencias
      const nuevosVideos = await obtenerVideos();
  
      // Actualizar el estado de los videos y las categorías
      setVideos(nuevosVideos);
      setCategorias(organizarPorCategoria(nuevosVideos));
  
      setModalOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert(`Hubo un error al agregar los videos: ${error.message}`);
    }
  };
  
  const handleEdit = (video) => {
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://67426541e464749900907b96.mockapi.io/videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el video");

      setVideos(prevVideos => prevVideos.filter(video => video.id !== id));
      setCategorias(organizarPorCategoria(videos.filter(video => video.id !== id)));
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al eliminar el video");
    }
  };

  return (
    <HomeContainer>
      <Header />
      <Banner />

      {cargando && <h2>Cargando videos...</h2>}
      {error && <h2 style={{ color: "red" }}>{error}</h2>}

      {!cargando && !error &&
        Object.keys(categorias).map((categoria) => (
          <SectionContainer key={categoria}>
            <h1>{categoria}</h1>
            <div className="videos">
              {categorias[categoria].map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(video.id)}
                />
              ))}
            </div>
          </SectionContainer>
        ))}

      {modalOpen && (
        <Modal
          video={selectedVideo}
          onClose={() => setModalOpen(false)}
          onSave={(nuevoVideo) => handleAddVideos([nuevoVideo])} 
        />
      )}
      <Footer />
    </HomeContainer>
  );
}

export default Home;
