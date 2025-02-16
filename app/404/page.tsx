import Link from "next/link";

export default function NotFoundContent() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Página no encontrada</h1>
      <p className="mt-4">Lo sentimos, la página que buscas no existe.</p>
      <Link href="/">
        <a className="mt-6 text-blue-500 hover:underline">Volver al inicio</a>
      </Link>
    </div>
  );
}
