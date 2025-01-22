import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header"; // Asegúrate de que tienes este componente importado
import Banner from "../components/Banner"; // Asegúrate de que tienes este componente importado
import Footer from "../components/Footer"; // Asegúrate de que tienes este componente importado
import VideoCard from "../components/VideoCard"; // Asegúrate de que tienes este componente importado
import Modal from "../components/Modal"; // Asegúrate de que tienes este componente importado

const HomeContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
`;

const SectionContainer = styled.section`
  background-color: #03122F;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  color: white;

  h1 {
    font-size: 40px;
    color: ${({ categoria, coloresCategorias }) => coloresCategorias[categoria] || coloresCategorias.Default};
  }

  .videos {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

function Home() {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Define los colores para las categorías
  const coloresCategorias = {
    Frontend: "#6BD1FF",
    Backend: "#00C86F",
    Inovaciónygestión: "#FFBA05",
    Default: "#95A5A6"
  };

  const organizarPorCategoria = (videos) => {
    return videos.reduce((acc, video) => {
      if (!acc[video.category]) {
        acc[video.category] = [];
      }
      acc[video.category].push(video);
      return acc;
    }, {});
  };

  useEffect(() => {
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

    cargarVideos(); // Llama solo una vez al cargar el componente.
  }, []); // Este array vacío asegura que el efecto se ejecute solo una vez.

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

      const updatedVideos = videos.map((video) =>
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

      const responses = await Promise.all(
        videos.map(async (video) => {
          if (!video.title?.trim() || !video.category?.trim()) {
            return null; // Si algún video tiene datos incompletos, no lo procesamos
          }

          return fetch("https://67426541e464749900907b96.mockapi.io/videos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: video.title.trim(),
              category: video.category.trim(),
              url: video.url,
            }),
          });
        })
      );

      const errores = responses.filter((response) => !response.ok);
      if (errores.length > 0) throw new Error(`Fallaron ${errores.length} solicitudes`);

      const nuevosVideos = await obtenerVideos();

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

      setVideos((prevVideos) => {
        const updatedVideos = prevVideos.filter((video) => video.id !== id);
        setCategorias(organizarPorCategoria(updatedVideos)); // Actualiza las categorías con los videos restantes
        return updatedVideos;
      });
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
          <SectionContainer key={categoria} categoria={categoria} coloresCategorias={coloresCategorias}>
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
          onSave={(nuevoVideo) =>
            {handleUpdateVideo (nuevoVideo);
              handleAddVideos([nuevoVideo]);
            }}
        />
      )}
      <Footer />
    </HomeContainer>
  );
}

export default Home;
