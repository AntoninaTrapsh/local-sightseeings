// Next.js не добавляет basePath к строковым путям до файлов из public/
export const withBasePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${path}`;
