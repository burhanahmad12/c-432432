
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, User } from "lucide-react";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (user) {
      fetchUserProfile();
    }
  }, [user, authLoading, navigate]);

  const fetchUserProfile = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }
      
      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
        console.log("Profile data loaded:", data);
      } else {
        console.log("No profile found, creating one");
        // Create a profile if none exists
        await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.email?.split('@')[0] || '',
            avatar_url: null
          });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-0 md:p-0">
      <div className="w-full mx-auto">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <Card className="w-full">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl flex justify-between items-center">
                <span>My Profile</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-32 h-32 border-2 border-primary/20">
                    {avatarUrl ? (
                      <AvatarImage src={avatarUrl} alt={username || "User"} />
                    ) : (
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-primary/90 to-accent/90 text-primary-foreground">
                        {user?.email?.charAt(0).toUpperCase() || <User className="h-12 w-12" />}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  {isEditing && (
                    <div className="w-full">
                      <Label htmlFor="avatar_url" className="text-sm text-muted-foreground">
                        Avatar URL
                      </Label>
                      <Input
                        id="avatar_url"
                        type="text"
                        value={avatarUrl || ""}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://example.com/avatar.jpg"
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm text-muted-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="username" className="text-sm text-muted-foreground">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      value={username || ""}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted/50" : ""}
                      placeholder="Your username"
                    />
                  </div>
                  
                  {isEditing && (
                    <Button 
                      onClick={handleSaveProfile} 
                      disabled={isLoading} 
                      className="w-full md:w-auto mt-4"
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
