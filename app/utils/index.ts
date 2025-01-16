import { jwtDecode } from 'jwt-decode';

// Definir la URL base
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Definir la interfaz del token decodificado
interface DecodedToken {
  name: string;
  picture: string;
  sub: string;
}

// Definir la interfaz de usuario
interface User {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

export const createOrGetUser = async (response: { credential: string }, addUser: (user: User) => void) => {
  // Decodificar el token
  const decode: { name: string, picture: string, sub: string } = jwtDecode<DecodedToken>(response.credential);
  const { name, picture, sub } = decode;

  // Crear el objeto de usuario
  const user: User = {
    _id: sub,
    _type: "user",
    userName: name,
    image: picture,
  };

  // Agregar el usuario al store
  addUser(user);

  // Enviar los datos a la API
  await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });
};