import { z } from 'zod';

export interface IProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ISkill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Language';
  iconName: string;
}

export interface IContactFormInput {
  name: string;
  email: string;
  message: string;
}

export interface IApiResponse {
  success: boolean;
  message: string;
}

// Zod Schema for Contact Form runtime validation
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});
export type Theme = 'light' | 'dark';
