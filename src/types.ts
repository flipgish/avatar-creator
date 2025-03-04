export type AvatarStyle = 'pixar' | 'anime' | 'simpsons' | 'realistic' | 'cartoon' | 'fantasy';

export interface StyleOption {
  id: AvatarStyle;
  name: string;
  description: string;
}