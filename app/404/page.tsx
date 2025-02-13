import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
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

export default function Custom404() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
