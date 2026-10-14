export const toRutubeEmbedUrl = (url: string) => {
  const id = url.match(/rutube\.ru\/(?:video|play\/embed)\/([a-f0-9]+)/)?.[1];
  return id ? `https://rutube.ru/play/embed/${id}` : url;
};
