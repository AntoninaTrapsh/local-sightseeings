const YANDEX_DISK_PUBLIC_LINK = /^https:\/\/disk\.yandex\.ru\/d\/([^/]+)(\/.*)?$/;
const YANDEX_DISK_DOWNLOAD_API = 'https://cloud-api.yandex.net/v1/disk/public/resources/download';

export const isYandexDiskUrl = (url: string) => YANDEX_DISK_PUBLIC_LINK.test(url);

// Публичная ссылка Диска ведёт на HTML-страницу, а прямая ссылка на файл временная (живёт несколько часов),
// поэтому в моках храним публичную и получаем прямую в момент показа.
export const resolveYandexDiskUrl = async (url: string): Promise<string> => {
  const match = url.match(YANDEX_DISK_PUBLIC_LINK);
  if (!match) return url;

  const [, key, path] = match;
  const params = new URLSearchParams({ public_key: `https://disk.yandex.ru/d/${key}` });
  if (path) params.set('path', decodeURIComponent(path));

  const response = await fetch(`${YANDEX_DISK_DOWNLOAD_API}?${params}`);
  if (!response.ok) throw new Error(`Yandex Disk: ${response.status}`);
  const { href } = (await response.json()) as { href: string };
  return href;
};
