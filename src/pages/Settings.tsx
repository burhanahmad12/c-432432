import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user?.id)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      let finalAvatarUrl = avatarUrl;
      
      // Upload avatar if changed
      if (avatarFile) {
        setUploading(true);
        
        // Create storage bucket if it doesn't exist
        const { data: bucketData, error: bucketError } = await supabase
          .storage
          .getBucket('avatars');
          
        if (bucketError && bucketError.message.includes('The resource was not found')) {
          await supabase.storage.createBucket('avatars', {
            public: true,
            fileSizeLimit: 1024 * 1024 * 2 // 2MB
          });
        }
        
        // Upload file
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user!.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        
        const { data, error } = await supabase
          .storage
          .from('avatars')
          .upload(fileName, avatarFile, {
            upsert: true
          });
          
        if (error) {
          toast.error('Error uploading avatar');
          console.error('Error uploading avatar:', error);
        } else {
          const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
          finalAvatarUrl = publicUrl;
        }
        
        setUploading(false);
      }
      
      // Update profile
      await updateProfile({
        username,
        avatar_url: finalAvatarUrl
      });
      
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Account Settings
          </h1>
          <div className="bg-card/60 backdrop-blur-sm border border-primary/10 rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary/30">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-primary/90 to-accent/90 text-primary-foreground text-4xl">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="avatar" className="block mb-2 cursor-pointer text-sm text-primary/80 bg-primary/10 hover:bg-primary/20 px-3 py-1 rounded-md transition-colors">
                      Change Avatar
                    </Label>
                    <Input 
                      id="avatar"
                      type="file" 
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="email" className="block mb-2">Email</Label>
                    <Input 
                      id="email"
                      type="email" 
                      value={user?.email || ""} 
                      readOnly 
                      className="bg-background/50 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>
                  <div>
                    <Label htmlFor="username" className="block mb-2">Username</Label>
                    <Input 
                      id="username"
                      type="text" 
                      placeholder="Enter your username" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button 
                  type="submit" 
                  disabled={loading || uploading}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
                >
                  {loading || uploading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
