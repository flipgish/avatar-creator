import React, { useCallback, useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Settings, RefreshCw, Download, Trash2, MessageSquare } from 'lucide-react';
import AvatarStyleSelector from './components/AvatarStyleSelector';
import AvatarEditor from './components/AvatarEditor';
import ChatInterface from './components/ChatInterface';
import { AvatarStyle } from './types';
import { useDropzone } from 'react-dropzone';

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<AvatarStyle>('pixar');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setGeneratedAvatar(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const generateAvatar = () => {
    if (!uploadedImage) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      // In a real app, this would call an AI service API
      // For now, we'll just use placeholder images based on the selected style
      const placeholderAvatars: Record<AvatarStyle, string> = {
        pixar: 'https://images.unsplash.com/photo-1601814933824-fd0b574dd592?q=80&w=300&auto=format&fit=crop',
        anime: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=300&auto=format&fit=crop',
        simpsons: 'https://images.unsplash.com/photo-1608889335941-32ac5f2041b9?q=80&w=300&auto=format&fit=crop',
        realistic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop',
        cartoon: 'https://images.unsplash.com/photo-1620428268482-cf1851a383b0?q=80&w=300&auto=format&fit=crop',
        fantasy: 'https://images.unsplash.com/photo-1535137755190-8a0503aebdc1?q=80&w=300&auto=format&fit=crop',
      };
      
      setGeneratedAvatar(placeholderAvatars[selectedStyle]);
      setIsGenerating(false);
    }, 2000);
  };

  const resetImages = () => {
    setUploadedImage(null);
    setGeneratedAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadAvatar = () => {
    if (!generatedAvatar) return;
    
    const link = document.createElement('a');
    link.href = generatedAvatar;
    link.download = `avatar-${selectedStyle}-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center text-indigo-600">Avatar Generator</h1>
          <p className="text-center text-gray-600 mt-2">Upload your photo and transform it into stylized avatars</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload and Original Image */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Your Photo</h2>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                uploadedImage ? 'border-green-400' : 'border-gray-300 hover:border-indigo-400'
              }`}
              onClick={triggerFileInput}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload} 
              />
              
              {uploadedImage ? (
                <div className="space-y-4">
                  <div className="relative w-64 h-64 mx-auto">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <button 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetImages();
                    }}
                  >
                    <Trash2 size={18} className="mr-2" />
                    Remove Photo
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload size={32} className="text-indigo-500" />
                  </div>
                  <p className="text-gray-500">Click to upload a photo or drag and drop</p>
                  <p className="text-xs text-gray-400">Supports JPG, PNG (Max 5MB)</p>
                </div>
              )}
            </div>

            {uploadedImage && (
              <div className="mt-6 space-y-4">
                <AvatarStyleSelector 
                  selectedStyle={selectedStyle} 
                  onSelectStyle={setSelectedStyle} 
                />
                
                <button 
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center transition-colors ${
                    isGenerating 
                      ? 'bg-indigo-300 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                  onClick={generateAvatar}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="mr-2 animate-spin" />
                      Generating Avatar...
                    </>
                  ) : (
                    <>
                      <ImageIcon size={20} className="mr-2" />
                      Generate Avatar
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Generated Avatar and Controls */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Avatar</h2>
              {generatedAvatar && (
                <button 
                  className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                  onClick={toggleChat}
                >
                  <MessageSquare size={18} className="mr-1" />
                  {showChat ? 'Hide Chat' : 'Chat with AI'}
                </button>
              )}
            </div>
            
            {generatedAvatar ? (
              <div className="space-y-6">
                <div className="relative w-64 h-64 mx-auto">
                  <img 
                    src={generatedAvatar} 
                    alt="Generated Avatar" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                
                {showChat ? (
                  <ChatInterface 
                    avatarStyle={selectedStyle} 
                    onRegenerateAvatar={generateAvatar}
                  />
                ) : (
                  <AvatarEditor 
                    onRegenerateAvatar={generateAvatar}
                    onDownloadAvatar={downloadAvatar}
                  />
                )}
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <ImageIcon size={48} className="mx-auto mb-2 text-gray-400" />
                  <p>Your generated avatar will appear here</p>
                  <p className="text-sm mt-2">Upload a photo and select a style to get started</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-6 border-t">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} AI Avatar Generator. All rights reserved.
          </p>
          <p className="text-center text-gray-400 text-sm mt-1">
            This is a demo application. In a production environment, it would connect to Google's AI services.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;