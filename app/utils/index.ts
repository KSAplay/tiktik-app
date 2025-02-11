import { jwtDecode } from 'jwt-decode';
import { IUser } from '@/types';

// Definir la interfaz del token decodificado
interface DecodedToken {
  name: string;
  picture: string;
  sub: string;
}

export const createOrGetUser = async (response: { credential: string }, addUser: (user: IUser) => void) => {
  // Decodificar el token
  const decode: { name: string, picture: string, sub: string } = jwtDecode<DecodedToken>(response.credential);
  const { name, picture, sub } = decode;

  // Crear el objeto de usuario
  const user: IUser = {
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