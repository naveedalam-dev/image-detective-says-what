import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EnhancedButton } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import ProfileImageUpload from './ProfileImageUpload';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  Camera, 
  Shield, 
  Bell,
  Globe,
  Clock,
  Building,
  Briefcase,
  Award,
  Settings,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  bio: string;
  location: string;
  timezone: string;
  dateJoined: Date;
  lastLogin: Date;
  profileImage: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    publicProfile: boolean;
    showEmail: boolean;
    showPhone: boolean;
  };
  stats: {
    ordersProcessed: number;
    customersServed: number;
    revenue: number;
    rating: number;
  };
}

const UserProfileManager: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load user profile from localStorage or API
    const loadProfile = () => {
      const userEmail = localStorage.getItem("userEmail") || "user@example.com";
      const userName = localStorage.getItem("userName") || "User";
      const userRole = localStorage.getItem("userRole") || "admin";
      const profileImage = localStorage.getItem("userProfileImage") || "";

      const mockProfile: UserProfile = {
        id: "1",
        name: userName,
        email: userEmail,
        phone: "+1 (555) 123-4567",
        role: userRole,
        department: "Pharmacy Operations",
        bio: "Dedicated healthcare professional with over 5 years of experience in pharmaceutical services and patient care.",
        location: "New York, NY",
        timezone: "America/New_York",
        dateJoined: new Date("2023-01-15"),
        lastLogin: new Date(),
        profileImage: profileImage,
        preferences: {
          notifications: true,
          emailUpdates: true,
          publicProfile: false,
          showEmail: false,
          showPhone: false
        },
        stats: {
          ordersProcessed: 1247,
          customersServed: 892,
          revenue: 125000,
          rating: 4.9
        }
      };

      setProfile(mockProfile);
      setEditedProfile(mockProfile);
    };

    loadProfile();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...profile! });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({ ...profile! });
  };

  const handleSave = async () => {
    if (!editedProfile) return;

    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update localStorage
    localStorage.setItem("userName", editedProfile.name);
    localStorage.setItem("userEmail", editedProfile.email);
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsSaving(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully!",
    });
  };

  const handleImageUpdate = (imageUrl: string) => {
    if (profile) {
      const updatedProfile = { ...profile, profileImage: imageUrl };
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: any) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: value
      });
    }
  };

  const handlePreferenceChange = (field: keyof UserProfile['preferences'], value: boolean) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        preferences: {
          ...editedProfile.preferences,
          [field]: value
        }
      });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { color: "bg-blue-500", icon: Shield },
      pharmacist: { color: "bg-green-500", icon: Award },
      cashier: { color: "bg-purple-500", icon: Briefcase }
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.admin;
    const Icon = config.icon;
    
    return (
      <Badge className={cn("text-white", config.color)}>
        <Icon className="w-3 h-3 mr-1" />
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent" />
        </div>
        <CardContent className="relative -mt-16 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* Profile Image */}
            <div className="relative">
              <Avatar className="w-24 h-24 ring-4 ring-background shadow-xl">
                <AvatarImage src={profile.profileImage} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-xl">
                  {getInitials(profile.name)}
                </AvatarFallback>
              </Avatar>
              <EnhancedButton
                variant="outline"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background shadow-lg"
                onClick={() => setIsImageUploadOpen(true)}
              >
                <Camera className="w-4 h-4" />
              </EnhancedButton>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {getRoleBadge(profile.role)}
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {profile.department}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isEditing ? (
                <EnhancedButton variant="outline" onClick={handleEdit}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </EnhancedButton>
              ) : (
                <>
                  <EnhancedButton variant="outline" onClick={handleCancel}>
                    Cancel
                  </EnhancedButton>
                  <EnhancedButton 
                    variant="default" 
                    onClick={handleSave}
                    loading={isSaving}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </EnhancedButton>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={editedProfile?.name || ""}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile?.email || ""}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      value={editedProfile?.phone || ""}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile.phone}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={editedProfile?.location || ""}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile.location}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    value={editedProfile?.bio || ""}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm py-2">{profile.bio}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow others to see your profile information
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreferenceChange('publicProfile', !editedProfile?.preferences.publicProfile)}
                    disabled={!isEditing}
                  >
                    {editedProfile?.preferences.publicProfile ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Display email address on public profile
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreferenceChange('showEmail', !editedProfile?.preferences.showEmail)}
                    disabled={!isEditing}
                  >
                    {editedProfile?.preferences.showEmail ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Phone</Label>
                    <p className="text-sm text-muted-foreground">
                      Display phone number on public profile
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreferenceChange('showPhone', !editedProfile?.preferences.showPhone)}
                    disabled={!isEditing}
                  >
                    {editedProfile?.preferences.showPhone ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profile.stats.ordersProcessed.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Orders Processed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{profile.stats.customersServed.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Customers Served</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">${(profile.stats.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Revenue Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{profile.stats.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span>{profile.dateJoined.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Last Login</span>
                <span>{profile.lastLogin.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Timezone</span>
                <span>{profile.timezone}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Account Status</span>
                <Badge variant="default" className="bg-green-500">Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Push Notifications</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreferenceChange('notifications', !editedProfile?.preferences.notifications)}
                  disabled={!isEditing}
                >
                  {editedProfile?.preferences.notifications ? "On" : "Off"}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm">Email Updates</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreferenceChange('emailUpdates', !editedProfile?.preferences.emailUpdates)}
                  disabled={!isEditing}
                >
                  {editedProfile?.preferences.emailUpdates ? "On" : "Off"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Profile Image Upload Modal */}
      <ProfileImageUpload
        isOpen={isImageUploadOpen}
        onClose={() => setIsImageUploadOpen(false)}
        currentImage={profile.profileImage}
        onImageUpdate={handleImageUpdate}
        userName={profile.name}
      />
    </div>
  );
};

export default UserProfileManager;