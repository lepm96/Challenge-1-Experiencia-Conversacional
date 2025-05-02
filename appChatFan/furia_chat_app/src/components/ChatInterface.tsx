// /home/ubuntu/furia_chat_app/src/components/ChatInterface.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

// 1. Função que busca partidas da FURIA via PandaScore
type Match = {
  name: string;
  begin_at: string;
  status: string;
  opponents: {
    opponent: {
      name: string;
    };
  }[];
};

const getFuriaMatches = async (): Promise<string> => {
  // Dados simulados do campeonato de 10 a 18 de maio
  const simulatedMatches = [
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-10T15:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "MIBR" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-10T18:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "Astralis" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-10T21:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "Aurora" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-11T16:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "G2" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-11T19:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "HOTU" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-11T22:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "PaiN" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-12T17:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "Spirit" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-12T20:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "GamerLegion" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-12T23:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "M80" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-13T18:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "The MongolZ" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-13T21:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "BIG" } },
      ],
      status: "not_started",
    },
    {
      name: "Campeonato PGL Astana 2025",
      begin_at: "2025-05-14T00:00:00Z",
      opponents: [
        { opponent: { name: "FURIA" } },
        { opponent: { name: "ODDIK" } },
      ],
      status: "not_started",
    },
  ];

  // Filtrar partidas que envolvem a FURIA (só por garantia)
  const furiaMatches = simulatedMatches.filter((match) =>
    match.opponents.some((opponent) =>
      opponent.opponent.name.toLowerCase().includes("furia")
    )
  );

  if (furiaMatches.length === 0) {
    return "Não encontrei partidas da FURIA no momento.";
  }

  const formatted = furiaMatches.map((match) => {
    const dataJogo = new Date(match.begin_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const adversarios = match.opponents
      .map((o) => o.opponent.name)
      .join(" vs ");
    return `🏆 ${
      match.name
    }\n🗓️ ${dataJogo}\n🎮 ${adversarios}\n📊 Status: ${match.status.replace(
      "_",
      " "
    )}`;
  });

  return formatted.join("\n\n");
};

// Dados estáticos e respostas prontas da FURIA
const furiaData = {
  cs2Roster: [
    { name: "\n🎯 KSCERATO" },
    { name: "\n🔥 yuurih" },
    { name: "\n💪 FalleN" },
    { name: "\n🎩 molodoy" },
    { name: "\n🧠 YEKINDAR" },
  ],
  coach: "sidde",
  culture:
    "A FURIA é conhecida por seu estilo de jogo agressivo e apaixonado, além de uma forte conexão com a comunidade brasileira! #DIADEFURIA",
  memes: ["PANTERA!", "CALMA!", "O Plano", "#DIADEFURIA"],
};

const playerSocials: { [key: string]: string } = {
  kscerato: "https://twitter.com/kscerato",
  yuurih: "https://twitter.com/yuurih",
  fallen: "https://twitter.com/FalleNCS",
  chelo: "https://twitter.com/chelo",
  skullz: "https://twitter.com/skullz",
  yekindar: "https://twitter.com/YEKINDAR",
  molodoy: "https://twitter.com/molodoy",
};

const getMatchStats = async (): Promise<string> => {
  // Dados simulados para exemplo
  return `📊 Estatísticas da partida contra Apogee Esports:

🗓️ Data: 06/04/2025
🗺️ Mapas: Dust2 (13-6), Mirage (13-7)
🏆 Resultado: FURIA 2 - 0 Apogee Esports

🔹 KSCERATO: 40/20 K/D, 103.7 ADR, 89.85% KAST, 1.66 Rating
🔹 yuurih: 30/18 K/D, 93.4 ADR, 92.5% KAST, 1.49 Rating
🔹 FalleN: 33/21 K/D, 86.7 ADR, 81.95% KAST, 1.39 Rating
🔹 chelo: 20/20 K/D, 58.3 ADR, 74.35% KAST, 1.01 Rating
🔹 skullz: 19/18 K/D, 53.25 ADR, 71.85% KAST, 0.85 Rating

A FURIA venceu e convenceu em sua estreia na PGL Bucharest 2025, batendo os poloneses da Apogee por dois mapas a zero.`;
};

const curiosidades = [
  "A FURIA foi fundada em 2017 e rapidamente se tornou uma das principais equipes de CS:GO do Brasil.",
  'O nome "FURIA" representa a intensidade e paixão que a equipe traz para os jogos.',
  "A equipe é conhecida por seu estilo de jogo agressivo e estratégias inovadoras.",
  "FURIA já representou o Brasil em diversos torneios internacionais, conquistando fãs ao redor do mundo.",
];

const getBotResponse = async (input: string): Promise<string> => {
  const lower = input.toLowerCase();
  if (
    lower.includes("estatísticas") ||
    lower.includes("stats") ||
    lower.includes("desempenho") ||
    lower.includes("estatisticas")
  ) {
    return await getMatchStats();
  }

  if (
    lower.includes('mais informações') ||
    lower.includes('falar com alguém') ||
    lower.includes('whatsapp') ||
    lower.includes('quero falar com alguém') ||
    lower.includes('contato') ||
    lower.includes('atendimento')
  ) {
    return `📲 Para falar com a equipe da FURIA, clique no botão do WhatsApp no canto inferior direito da tela. Estamos prontos para te atender!`;
  }

  if (lower.includes("curiosidade") || lower.includes("fato interessante")) {
    const randomFact =
      curiosidades[Math.floor(Math.random() * curiosidades.length)];
    return `🧐 Curiosidade sobre a FURIA:\n\n${randomFact}`;
  }

  if (
    lower.includes("redes sociais") ||
    lower.includes("twitter") ||
    lower.includes("instagram")
  ) {
    const socials = Object.entries(playerSocials)
      .map(
        ([player, link]) =>
          `🔗 ${player.charAt(0).toUpperCase() + player.slice(1)}: ${link}`
      )
      .join("\n");
    return `Aqui estão as redes sociais dos jogadores da FURIA:\n\n${socials}`;
  }
  if (
    lower.includes("loja") ||
    lower.includes("produtos") ||
    lower.includes("camisa") ||
    lower.includes("merch")
  ) {
    return '🛒 Confira os produtos oficiais da FURIA: <a href="https://www.furia.gg/produtos" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">LOJA FURIA</a>';
  }
  if (
    lower.includes("elenco") ||
    lower.includes("jogadores") ||
    lower.includes("time") ||
    lower.includes("roster")
  ) {
    const roster = furiaData.cs2Roster.map((p) => `${p.name}`).join(", ");
    return `O elenco atual de CS2 da FURIA é: ${roster}. \n\n O coach é o ${furiaData.coach}.`;
  }
  if (lower.includes("coach") || lower.includes("treinador")) {
    return "O coach atual da FURIA CS2 é o Nicholas 'guerri' Nogueira.";
  }
  if (lower.includes("kscerato"))
    return "Kaike 'KSCERATO' Cerato é um dos jogadores mais consistentes do mundo, conhecido por sua mira incrível e lurker de excelência!";
  if (lower.includes("yuurih"))
    return "Yuri 'yuurih' Santos é um entry fragger explosivo, fundamental para abrir os bombsites para a FURIA.";
  if (lower.includes("fallen"))
    return "Gabriel 'FalleN' Toledo, o Verdadeiro, é uma lenda do CS mundial, atual AWPer e IGL da FURIA.";
  if (lower.includes("chelo"))
    return "Marcelo 'chelo' Cespedes traz muita energia e mira afiada como entry fragger para o time.";
  if (lower.includes("kye"))
    return "Kayke 'kye' Bertolucci é um jovem talento que completa o elenco atual da FURIA.";
  if (
    lower.includes("cultura") ||
    lower.includes("historia") ||
    lower.includes("sobre a furia")
  ) {
    return furiaData.culture;
  }
  if (lower.includes("meme")) {
    const meme =
      furiaData.memes[Math.floor(Math.random() * furiaData.memes.length)];
    return `Hehe, a torcida da FURIA é demais! Que tal esse: ${meme}?`;
  }
  if (
    ["oi", "ola", "bom dia", "boa tarde", "boa noite"].some((g) =>
      lower.includes(g)
    )
  ) {
    return "Olá! Como posso ajudar você a saber mais sobre a FURIA hoje?";
  }
  if (["obrigado", "valeu"].some((g) => lower.includes(g))) {
    return "De nada! Se precisar de mais alguma informação, é só perguntar. #DIADEFURIA";
  }
  // Padrão
  return `Não entendi muito bem sua pergunta sobre "${input}". Você pode perguntar sobre elenco, jogadores, jogos, cultura ou memes da FURIA.`;
};

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: `👋 Olá! Sou o assistente virtual da FURIA.
      💬 Como posso te ajudar hoje?`,
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    setIsLoading(true);

    // 1. Adiciona mensagem do usuário
    const userMessage: Message = {
      id: Date.now(),
      text: trimmed,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // 2. Define resposta do bot
    let botText: string;
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("jogos") ||
      lower.includes("partidas") ||
      lower.includes("resultado")
    ) {
      botText = await getFuriaMatches();
    } else {
      botText = await getBotResponse(trimmed); //
    }

    // 3. Adiciona resposta do bot
    const botMessage: Message = {
      id: Date.now() + 1,
      text: botText,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };


 
  return (
  
    <div className="flex flex-col h-full bg-black text-white border-4 border-gray-500 rounded-lg opacity-69 ">
      <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <p
              className={`rounded-lg p-2 ${
                msg.sender === "user"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black self-start"
              }`}
              dangerouslySetInnerHTML={{
                __html: msg.text.replace(/\n/g, "<br />"),
              }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] px-4 py-2 rounded-lg shadow-md bg-gray-800 text-gray-400 rounded-bl-none animate-pulse">
              Digitando...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t border-gray-700 flex items-center bg-black">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Pergunte algo sobre a FURIA..."
          disabled={isLoading}
          className="flex-grow px-4 py-2 bg-gray-900 border border-gray-600 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-white placeholder-gray-500 disabled:opacity-50"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="px-5 py-2.5 bg-gray-700 text-white border border-gray-600 rounded-r-md hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-150"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11.5a1 1 0 011-1h.094a1 1 0 01.995.918l.005.082v5.071a1 1 0 00.225.643l5 1.429a1 1 0 001.17-1.409l-7-14z" />
            </svg>
          )}
        </button>
      </div>
    </div>
    
  );
};

export default ChatInterface;
