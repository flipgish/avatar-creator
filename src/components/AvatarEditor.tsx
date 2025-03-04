import React, { useState } from 'react';
import { Sliders, RefreshCw, Download } from 'lucide-react';

interface AvatarEditorProps {
  onRegenerateAvatar: () => void;
  onDownloadAvatar: () => void;
}

const AvatarEditor: React.FC<AvatarEditorProps> = ({ onRegenerateAvatar, onDownloadAvatar }) => {
  const [settings, setSettings] = useState({
    brightness: 50,
    contrast: 50,
    saturation: 50,
    detailLevel: 50,
  });

  const handleSettingChange = (setting: keyof typeof settings, value: number) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-3">
          <Sliders size={18} className="text-indigo-600 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">Adjust Avatar Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between">
              <label className="block text-xs text-gray-500">Brightness</label>
              <span className="text-xs text-gray-500">{settings.brightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.brightness}
              onChange={(e) => handleSettingChange('brightness', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label className="block text-xs text-gray-500">Contrast</label>
              <span className="text-xs text-gray-500">{settings.contrast}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.contrast}
              onChange={(e) => handleSettingChange('contrast', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label className="block text-xs text-gray-500">Saturation</label>
              <span className="text-xs text-gray-500">{settings.saturation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.saturation}
              onChange={(e) => handleSettingChange('saturation', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          
          <div>
            <div className="flex justify-between">
              <label className="block text-xs text-gray-500">Detail Level</label>
              <span className="text-xs text-gray-500">{settings.detailLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.detailLevel}
              onChange={(e) => handleSettingChange('detailLevel', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <button
          onClick={onRegenerateAvatar}
          className="flex-1 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <RefreshCw size={18} className="mr-2" />
          Regenerate
        </button>
        
        <button
          onClick={onDownloadAvatar}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          <Download size={18} className="mr-2" />
          Download
        </button>
      </div>
    </div>
  );
};

export default AvatarEditor;