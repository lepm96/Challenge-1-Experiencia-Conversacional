// /home/ubuntu/furia_chat_app/src/app/page.tsx
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-white ">
      <div className="chatbot-container ">
        <ChatInterface />
      </div>
      <div className="fixed bottom-4 right-4 z-99999">
        <div className="boxIconeWhats w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg cursor-pointer">
          <a
            href="https://api.whatsapp.com/send?l=pt&phone=5511945128297&text=Poderia%20me%20ajudar?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="iconeWhats w-7 h-7 bg-no-repeat bg-center bg-contain"></div>
          </a>
          
        </div>
      </div>
    </main>
  );
}
