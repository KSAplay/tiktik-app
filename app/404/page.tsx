import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="mt-4">Lo sentimos, la página que buscas no existe.</p>
      <Link href="/">
        <a className="mt-6 text-blue-500 hover:underline">Volver al inicio</a>
      </Link>
    </div>
  );
}
