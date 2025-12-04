import { NavBar } from "@/components/booth/nav-bar"
import { Avatar } from "@/components/booth/data-display"
import { Heart, Crown, Sparkles, ArrowLeft, Send } from "lucide-react"

export default function ChatScreen() {
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--background))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[hsl(var(--muted))]">
            <ArrowLeft className="w-5 h-5 text-[hsl(var(--foreground))]" />
          </button>

          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[hsl(var(--card))] rounded-full"></div>
            </div>

            <div className="flex-1">
              <h2 className="font-black text-[hsl(var(--foreground))]">Princess Clara</h2>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Land of Sweets • Online</p>
            </div>
          </div>

          <button className="w-8 h-8 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-[hsl(var(--accent))]" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-5 overflow-auto pb-24 space-y-4">
        {/* Matched Banner */}
        <div className="text-center py-4">
          <div className="inline-block bg-[hsl(var(--card))] px-6 py-3 rounded-full border-2 border-[hsl(var(--border))] shadow-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[hsl(var(--primary))]" />
              <span className="text-xs font-bold text-[hsl(var(--muted-foreground))]">
                You matched on December 3rd
              </span>
            </div>
          </div>
        </div>

        {/* Her message */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="bg-[hsl(var(--card))] rounded-2xl rounded-tl-none p-4 border border-[hsl(var(--border))] max-w-[80%]">
              <p className="text-sm text-[hsl(var(--foreground))]">
                Hello! I see you're from the Kingdom of Dolls too! Have you ever danced at the Royal Ball?
              </p>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pl-1">2:34 PM</p>
          </div>
        </div>

        {/* My message */}
        <div className="flex gap-2 justify-end">
          <div className="flex-1 space-y-2">
            <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
              <p className="text-sm text-white">
                Yes! I attended the Winter Gala last season. The nutcrackers were magnificent! Do you prefer the Land of Sweets or Land of Snow?
              </p>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] text-right pr-1">2:35 PM</p>
          </div>
        </div>

        {/* Her message */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="bg-[hsl(var(--card))] rounded-2xl rounded-tl-none p-4 border border-[hsl(var(--border))] max-w-[80%]">
              <p className="text-sm text-[hsl(var(--foreground))]">
                Oh, the Land of Sweets is my home! The sugar-coated gardens and chocolate fountains are divine. But I do love visiting the Land of Snow for ice skating. ⛸️
              </p>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] pl-1">2:36 PM</p>
          </div>
        </div>

        {/* My message */}
        <div className="flex gap-2 justify-end">
          <div className="flex-1 space-y-2">
            <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
              <p className="text-sm text-white">
                That sounds enchanting! Perhaps we could visit both realms together sometime? 👑
              </p>
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))] text-right pr-1">2:37 PM</p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div className="bg-[hsl(var(--card))] rounded-2xl rounded-tl-none px-5 py-3 border border-[hsl(var(--border))]">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--muted-foreground))] animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="px-5 py-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="flex gap-3 items-center">
          <div className="flex-1 bg-[hsl(var(--muted))] rounded-full px-5 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 bg-transparent text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none"
              disabled
            />
          </div>
          <button className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] flex items-center justify-center shadow-lg">
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <NavBar
        items={[
          { icon: <Sparkles className="w-5 h-5" />, label: "Discover" },
          { icon: <Heart className="w-5 h-5" />, label: "Matches", active: true },
          { icon: <Crown className="w-5 h-5" />, label: "Profile" },
        ]}
      />
    </div>
  )
}
