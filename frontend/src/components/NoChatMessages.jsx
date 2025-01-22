import { MessageCircleCode, Users, ArrowRight, Sparkles } from "lucide-react";

const NoChatMessages = ({children}) => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 bg-base-100/50">
      <div className="max-w-md text-center">
        {/* Animated Icons */}
        <div className="relative w-full h-32 mb-8">
          {/* Main circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <MessageCircleCode className="w-10 h-10 text-primary" />
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute left-1/4 top-0 animate-float-slow">
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
          </div>
          
          <div className="absolute right-1/4 top-1/3 animate-float-delayed">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-secondary" />
            </div>
          </div>
          
          <div className="absolute left-1/3 bottom-0 animate-float">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary/40"></div>
          <div className="w-2 h-2 rounded-full bg-primary/30"></div>
          <div className="w-2 h-2 rounded-full bg-primary/20"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatMessages;
