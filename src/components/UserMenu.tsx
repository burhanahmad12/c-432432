
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      if (!user?.id) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .maybeSingle();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (!user) {
    return (
      <Button
        variant="outline"
        onClick={() => navigate("/auth")}
        className="ml-auto bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground border-none hover:from-primary hover:to-accent transition-all duration-300"
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary/60 transition-all p-0">
          <Avatar className="h-full w-full">
            {avatarUrl ? (
              <AvatarImage 
                src={avatarUrl} 
                alt="Profile"
                className="object-cover"
              />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-primary/90 to-accent/90 text-primary-foreground">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 mr-2 mt-1 bg-card/95 backdrop-blur-sm border border-primary/20 p-2 rounded-xl" align="end" forceMount>
        <DropdownMenuLabel className="font-normal px-4 py-3 rounded-lg bg-gradient-to-r from-background to-background-secondary/50 mb-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username || user.email}</p>
            <p className="text-xs text-muted-foreground">Forex Trader</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        <div className="p-1">
          <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10">
            <User className="h-4 w-4 text-primary/80" />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10">
            <Settings className="h-4 w-4 text-primary/80" />
            <span>Account Settings</span>
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator className="bg-primary/10" />
        <div className="p-1">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
