import React from 'react';
import { AvatarStyle, StyleOption } from '../types';

interface AvatarStyleSelectorProps {
  selectedStyle: AvatarStyle;
  onSelectStyle: (style: AvatarStyle) => void;
}

const styleOptions: StyleOption[] = [
  {
    id: 'pixar',
    name: 'Pixar/Disney',
    description: '3D animated character with expressive features'
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style with distinctive eyes and colorful hair'
  },
  {
    id: 'simpsons',
    name: 'Simpsons',
    description: 'Yellow-skinned cartoon character with overbite'
  },
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic portrait with enhanced features'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Classic cartoon style with exaggerated features'
  },
  {
    id: 'fantasy',
    name: 'Fantasy',
    description: 'Mythical character with fantasy elements'
  }
];

const AvatarStyleSelector: React.FC<AvatarStyleSelectorProps> = ({ selectedStyle, onSelectStyle }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Select Avatar Style
      </label>
      <div className="relative">
        <select
          value={selectedStyle}
          onChange={(e) => onSelectStyle(e.target.value as AvatarStyle)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {styleOptions.map((style) => (
            <option key={style.id} value={style.id}>
              {style.name} - {style.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AvatarStyleSelector;