import { Clock, Moon, Sun, TrendingUp, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const navigate = useNavigate()
  const {theme , toggleTheme} = useTheme()
    return (
      <header className="border-(--border) border-b px-6 py-3">
            <nav className="flex items-center justify-between">
                {/*Logo*/}
          <div className=" flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Wallet size={20} className="text-primary-foreground" />
            </div>
            <span className="text-lg">
              <span className="text-muted-foreground font-medium">Planej</span>
              <span className="font-extrabold">.ai</span>
            </span>
                </div>
                {/* Actions Buttons */}
                <div className="flex items-center gap-1">
                    <Button
                        variant='secondary'
                        icon={TrendingUp}
                        onClick={() => void navigate('/')}>
                        
                        <span className="hidden sm:inline">Nova Simulaçao</span> 
                    </Button>
                    <Button variant='ghost'
                        icon={Clock}
                        onClick={() => void navigate('/historico')}
                    >
                        <span className="hidden sm:inline">Historico</span>
            </Button>
            <Button 
              aria-label={`Mudar para tema ${theme === 'ligth' ? 'escuro' : 'claro'} `}
              variant='ghost'
              icon={theme === 'ligth' ? Moon : Sun}
              onClick={toggleTheme}
            />
                </div>
                
        </nav>
      </header>
    );
}

