import React, { useState, useRef, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Upload, 
  Camera, 
  Crop, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle,
  User,
  Image as ImageIcon,
  Settings,
  RefreshCw,
  Move,
  Square,
  Circle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ProfileImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  onImageUpdate: (imageUrl: string) => void;
  userName: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  isOpen,
  onClose,
  currentImage,
  onImageUpdate,
  userName
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState<'upload' | 'crop' | 'preview'>('upload');
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 200, height: 200 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [cropShape, setCropShape] = useState<'square' | 'circle'>('circle');
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);

  // Supported file formats
  const SUPPORTED_FORMATS = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const validateFile = (file: File): string | null => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      return "Please upload a valid image file (JPG, PNG, or GIF)";
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 5MB";
    }
    
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      toast({
        title: "Invalid File",
        description: validationError,
        variant: "destructive"
      });
      return;
    }

    setError("");
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreviewUrl(url);
      setStep('crop');
      
      // Load image to get dimensions
      const img = new Image();
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
        // Center crop area
        const size = Math.min(img.width, img.height) * 0.8;
        setCropArea({
          x: (img.width - size) / 2,
          y: (img.height - size) / 2,
          width: size,
          height: size
        });
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const cropImage = useCallback(() => {
    if (!imageRef.current || !cropCanvasRef.current) return;

    const canvas = cropCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;
    const size = 400; // Output size
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Apply transformations
    ctx.save();
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    // Draw image
    const sourceSize = Math.min(cropArea.width, cropArea.height);
    ctx.drawImage(
      img,
      cropArea.x,
      cropArea.y,
      sourceSize,
      sourceSize,
      -size / 2,
      -size / 2,
      size,
      size
    );

    ctx.restore();

    // Create circular mask if needed
    if (cropShape === 'circle') {
      ctx.globalCompositeOperation = 'destination-in';
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.fill();
    }

    const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
    setCroppedImageUrl(croppedUrl);
    setStep('preview');
  }, [cropArea, zoom, rotation, cropShape]);

  const simulateUpload = async (imageData: string) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setUploadProgress(i);
    }

    // Simulate server processing
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, you would upload to your server/cloud storage
    // For now, we'll use the data URL
    const imageUrl = imageData;
    
    // Store in localStorage for persistence
    localStorage.setItem('userProfileImage', imageUrl);
    
    onImageUpdate(imageUrl);
    setIsUploading(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile picture has been updated successfully!",
    });
    
    handleClose();
  };

  const handleSave = () => {
    if (croppedImageUrl) {
      simulateUpload(croppedImageUrl);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setCroppedImageUrl("");
    setStep('upload');
    setZoom(1);
    setRotation(0);
    setError("");
    setUploadProgress(0);
    setIsUploading(false);
    onClose();
  };

  const handleDeleteCurrentImage = () => {
    localStorage.removeItem('userProfileImage');
    onImageUpdate("");
    toast({
      title: "Profile Picture Removed",
      description: "Your profile picture has been removed.",
    });
    handleClose();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Picture
          </DialogTitle>
          <DialogDescription>
            Upload and customize your profile picture. Supported formats: JPG, PNG, GIF (max 5MB)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Profile Preview */}
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <Avatar className="w-16 h-16 ring-2 ring-primary/20">
              <AvatarImage src={currentImage} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{userName}</h3>
              <p className="text-sm text-muted-foreground">
                {currentImage ? "Custom profile picture" : "Using default avatar"}
              </p>
            </div>
            {currentImage && (
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={handleDeleteCurrentImage}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </EnhancedButton>
            )}
          </div>

          {/* Upload Step */}
          {step === 'upload' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Picture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300",
                    isDragging 
                      ? "border-primary bg-primary/10 scale-105" 
                      : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                  )}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Drop your image here</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <EnhancedButton
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </EnhancedButton>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="outline">JPG</Badge>
                      <Badge variant="outline">PNG</Badge>
                      <Badge variant="outline">GIF</Badge>
                      <Badge variant="outline">Max 5MB</Badge>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm text-destructive">{error}</span>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </CardContent>
            </Card>
          )}

          {/* Crop Step */}
          {step === 'crop' && previewUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crop className="w-5 h-5" />
                  Crop & Adjust
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Crop Shape Selection */}
                <div className="flex items-center gap-4">
                  <Label>Shape:</Label>
                  <div className="flex gap-2">
                    <EnhancedButton
                      variant={cropShape === 'circle' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCropShape('circle')}
                    >
                      <Circle className="w-4 h-4 mr-2" />
                      Circle
                    </EnhancedButton>
                    <EnhancedButton
                      variant={cropShape === 'square' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCropShape('square')}
                    >
                      <Square className="w-4 h-4 mr-2" />
                      Square
                    </EnhancedButton>
                  </div>
                </div>

                {/* Image Preview */}
                <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    ref={imageRef}
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-full max-h-80 mx-auto block"
                    style={{
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <ZoomIn className="w-4 h-4" />
                      Zoom: {zoom.toFixed(1)}x
                    </Label>
                    <Slider
                      value={[zoom]}
                      onValueChange={(value) => setZoom(value[0])}
                      min={0.5}
                      max={3}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <RotateCw className="w-4 h-4" />
                      Rotation: {rotation}°
                    </Label>
                    <Slider
                      value={[rotation]}
                      onValueChange={(value) => setRotation(value[0])}
                      min={0}
                      max={360}
                      step={15}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <EnhancedButton
                    variant="outline"
                    size="sm"
                    onClick={() => setStep('upload')}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </EnhancedButton>
                  <EnhancedButton
                    variant="default"
                    size="sm"
                    onClick={cropImage}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Apply Crop
                  </EnhancedButton>
                </div>

                {/* Hidden canvas for cropping */}
                <canvas ref={cropCanvasRef} className="hidden" />
              </CardContent>
            </Card>
          )}

          {/* Preview Step */}
          {step === 'preview' && croppedImageUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Preview & Confirm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-8">
                    {/* Before */}
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">Before</p>
                      <Avatar className="w-20 h-20 mx-auto ring-2 ring-muted">
                        <AvatarImage src={currentImage} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold">
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    {/* After */}
                    <div className="text-center">
                      <p className="text-sm font-medium mb-2">After</p>
                      <Avatar className="w-20 h-20 mx-auto ring-2 ring-primary/50">
                        <AvatarImage src={croppedImageUrl} />
                        <AvatarFallback>
                          {getInitials(userName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Your new profile picture looks great! Click save to apply changes.
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <div className="flex gap-2">
                  <EnhancedButton
                    variant="outline"
                    onClick={() => setStep('crop')}
                    disabled={isUploading}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Edit
                  </EnhancedButton>
                  <EnhancedButton
                    variant="default"
                    onClick={handleSave}
                    disabled={isUploading}
                    loading={isUploading}
                    className="flex-1"
                  >
                    {isUploading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Save Profile Picture
                      </>
                    )}
                  </EnhancedButton>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageUpload;