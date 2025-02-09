import { BsCode, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaMusic, FaPaw, FaMedal, FaGamepad } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";

export const topics = [
  {
    name: "coding",
    icon: <BsCode />,
    iconGradient: <BsCode fill="url(#grad)" />,
  },
  {
    name: "comedia",
    icon: <BsEmojiSunglasses />,
    iconGradient: <BsEmojiSunglasses fill="url(#grad)" />,
  },
  {
    name: "juegos",
    icon: <FaGamepad />,
    iconGradient: <FaGamepad fill="url(#grad)" />,
  },
  {
    name: "comida",
    icon: <GiCakeSlice />,
    iconGradient: <GiCakeSlice fill="url(#grad)" />,
  },
  {
    name: "bailes",
    icon: <GiGalaxy />,
    iconGradient: <GiGalaxy fill="url(#grad)" />,
  },
  {
    name: "belleza",
    icon: <GiLipstick />,
    iconGradient: <GiLipstick fill="url(#grad)" />,
  },
  {
    name: "animales",
    icon: <FaPaw />,
    iconGradient: <FaPaw fill="url(#grad)" />,
  },
  {
    name: "deportes",
    icon: <FaMedal />,
    iconGradient: <FaMedal fill="url(#grad)" />,
  },
  {
    name: "música",
    icon: <FaMusic />,
    iconGradient: <FaMusic fill="url(#grad)" />,
  },
  {
    name: "viajes",
    icon: <MdCardTravel />,
    iconGradient: <MdCardTravel fill="url(#grad)" />,
  },
];

export const footerList1 = [
  "Acerca de",
  "Noticias",
  "Tienda",
  "Contacto",
  "Carreras",
  "ByteDance",
  "Directorio de Creadores",
];
export const footerList2 = [
  "TikTik para el Bien",
  "Anunciar",
  "Desarrolladores",
  "Transparencia",
  "Premios TikTik",
];
export const footerList3 = [
  "Ayuda",
  "Seguridad",
  "Términos",
  "Privacidad",
  "Portal del Creador",
  "Normas de la comunidad",
];
