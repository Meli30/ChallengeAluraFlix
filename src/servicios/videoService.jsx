export const obtenerVideos = async () => {
    try {
        const respuesta = await fetch("https://67426541e464749900907b96.mockapi.io/videos");
        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos");
        }
        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const actualizarVideo = async (updatedVideo) => {
  const { id, title, category } = updatedVideo;

  try {
    const response = await fetch(`https://67426541e464749900907b96.mockapi.io/videos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, category }),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el video");
    }

    return await response.json();  // O manejar de la manera adecuada
  } catch (error) {
    console.error("Error al actualizar el video:", error);
    throw error;
  }
};

  
  
  export const crearVideo = async (nuevoVideo) => {
    try {
      const respuesta = await fetch("https://67426541e464749900907b96.mockapi.io/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVideo),
      });
  
      if (!respuesta.ok) {
        throw new Error("Error al crear el video");
      }
  
      return await respuesta.json();
    } catch (error) {
      console.error("Error en crearVideo", error);
      throw error;
    }
  };
  