export const organizarPorCategoria = (videos) => {
  return videos.reduce((categorias, video) => {
    if (!categorias[video.category]) {
      categorias[video.category] = [];
    }
    categorias[video.category].push(video);
    return categorias;
  }, {});
};
