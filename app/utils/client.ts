import { createClient } from "next-sanity";

export const client = createClient({
  projectId: '9chfrxwi',
  dataset: 'production',
  apiVersion: '2024-10-14',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});