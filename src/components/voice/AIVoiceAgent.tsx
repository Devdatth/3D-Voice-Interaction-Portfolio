import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Bot,
  Send,
  Radio,
  AlertTriangle,
  Play,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { soundEngine } from '../../utils/audio';

interface VoiceMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}

export const AIVoiceAgent: React.FC = () => {
  const {
    setIsResumeOpen,
    setIsDevLabsOpen,
    setIsSettingsOpen,
    setCursorVariant,
    setCursorText,
  } = usePortfolio();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [voiceMuted, setVoiceMuted] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('');
  const [isReadyToSpeak, setIsReadyToSpeak] = useState<boolean>(true);
  const [permissionError, setPermissionError] = useState<string>('');

  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 'init-1',
      sender: 'agent',
      text: `Hello! I am DEV, your cybernetic voice assistant. Speak or type commands anytime. Try "Open skills", "Show projects", or "Open resume".`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const recognitionRef = useRef<any>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const audioUnlockedRef = useRef<boolean>(false);

  // Initialize Speech Synthesis & ensure voice readiness
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setIsReadyToSpeak(true);
        }
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      stopAllInteraction();
    };
  }, []);

  // Unlock audio context on user action
  const unlockAudioContext = () => {
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;

    try {
      soundEngine.playClick();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
    } catch {
      // ignore
    }
  };

  // Auto-scroll chat stream
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, transcript]);

  // Cyber Synth AI Voice Synthesizer (Cyber AI cadence - pitch: 1.25, rate: 1.05)
  const speakResponse = (text: string) => {
    if (voiceMuted || !text.trim()) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    try {
      // Browser SpeechSynthesis unfreeze & resume
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(text);
      // Cyber Synth pitch & cadence settings
      utterance.pitch = 1.25;
      utterance.rate = 1.05;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Find best synthetic / futuristic voice
        const cyberVoice = voices.find(
          (v) =>
            (v.name.includes('Google') ||
              v.name.includes('Microsoft') ||
              v.name.includes('Zira') ||
              v.name.includes('David') ||
              v.name.includes('Alex')) &&
            v.lang.startsWith('en')
        ) || voices.find((v) => v.lang.startsWith('en-US') || v.lang.startsWith('en'));

        if (cyberVoice) {
          utterance.voice = cyberVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = (e) => {
        console.debug('Speech utterance ended/error:', e);
        setIsSpeaking(false);
      };

      soundEngine.playNavSwitch();
      window.speechSynthesis.speak(utterance);

      // Safeguard against Chrome speech synthesis stalling
      const resumeLoop = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          clearInterval(resumeLoop);
        } else {
          window.speechSynthesis.resume();
        }
      }, 3000);
    } catch (e) {
      console.debug('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      soundEngine.playNavSwitch();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Safe Web Speech Recognition activation with full error recovery
  const startSpeechRecognition = async () => {
    unlockAudioContext();
    setPermissionError('');
    soundEngine.playClick();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setPermissionError('Speech Recognition is not supported by your current browser. You can click the voice chips or type below!');
      return;
    }

    try {
      // 1. Explicitly request microphone stream from user
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach((track) => track.stop());
        } catch (micErr: any) {
          console.debug('Mic permission query:', micErr);
          if (micErr.name === 'NotAllowedError' || micErr.name === 'PermissionDeniedError') {
            setPermissionError('Microphone permission was denied. Please allow microphone access in your browser or click the quick commands!');
            return;
          }
        }
      }

      // 2. Clear existing recognition instance
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setPermissionError('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          try {
            recognition.stop();
          } catch {
            // ignore
          }
          setIsListening(false);
          handleUserQuery(transcriptText);
          setTranscript('');
        }
      };

      recognition.onerror = (event: any) => {
        console.debug('Speech recognition event:', event.error);
        setIsListening(false);

        if (event.error === 'not-allowed') {
          setPermissionError('Microphone access is blocked in this preview window. You can click any quick command chip below or open in a new tab!');
        } else if (event.error === 'no-speech') {
          setPermissionError('No speech detected. Click the mic icon again to speak!');
        } else if (event.error !== 'aborted') {
          setPermissionError(`Voice engine notice: ${event.error}. You can speak again or click the command chips.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }

      recognition.start();
    } catch (err: any) {
      console.debug('Recognition start error:', err);
      setIsListening(false);
      setPermissionError('Microphone access is restricted in this window. Click any voice command chip below or open app in a new tab!');
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      soundEngine.playClick();
    } else {
      startSpeechRecognition();
    }
  };

  const handleOpenAgent = () => {
    unlockAudioContext();
    setIsOpen(true);
    soundEngine.playModalOpen();

    const welcomeMsg = 'Hello! I am DEV, your cybernetic voice assistant. Speak with me or ask me to navigate.';
    speakResponse(welcomeMsg);
  };

  const stopAllInteraction = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    setIsSpeaking(false);
    setIsListening(false);
  };

  // Process user command and reply with both text & speech
  const handleUserQuery = (query: string) => {
    unlockAudioContext();
    if (!query.trim()) return;

    const userMsg: VoiceMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const lower = query.toLowerCase();

    let responseText = '';

    if (lower.includes('stop') || lower.includes('quiet') || lower.includes('cancel') || lower.includes('silence')) {
      stopAllInteraction();
      responseText = 'Interaction stopped. Let me know if you need anything else!';
      const agentMsg: VoiceMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, agentMsg]);
      return;
    }

    if (
      lower.includes('skill') ||
      lower.includes('arsenal') ||
      lower.includes('stack') ||
      lower.includes('technolog')
    ) {
      scrollToSection('skills');
      responseText =
        'Opening the Skills Section. Devdatth specializes in PyTorch, TensorFlow, Scikit-learn, GCP Vertex AI, and Autonomous AI Agents.';
    } else if (
      lower.includes('project') ||
      lower.includes('work') ||
      lower.includes('built') ||
      lower.includes('portfolio') ||
      lower.includes('repos') ||
      lower.includes('github')
    ) {
      scrollToSection('projects');
      responseText =
        'Opening Selected Projects and the Live GitHub feed, including AgentForge and AgroAI.';
    } else if (
      lower.includes('experience') ||
      lower.includes('career') ||
      lower.includes('job') ||
      lower.includes('microai')
    ) {
      scrollToSection('experience');
      responseText =
        'Scrolling to professional experience. Devdatth develops RAG pipelines and autonomous agent systems.';
    } else if (
      lower.includes('contact') ||
      lower.includes('email') ||
      lower.includes('hire') ||
      lower.includes('reach') ||
      lower.includes('message') ||
      lower.includes('mail')
    ) {
      scrollToSection('contact');
      responseText =
        'Navigating to contact section. You can reach Devdatth directly at Rishiadik54@gmail.com.';
    } else if (
      lower.includes('about') ||
      lower.includes('who is') ||
      lower.includes('who are you') ||
      lower.includes('introduce') ||
      lower.includes('background')
    ) {
      scrollToSection('about');
      responseText =
        'Devdatth Adik is an AI Engineer and Full-Stack Architect focused on neural architectures and machine learning systems.';
    } else if (
      lower.includes('resume') ||
      lower.includes('cv') ||
      lower.includes('dossier') ||
      lower.includes('download')
    ) {
      setIsResumeOpen(true);
      responseText = "Opening Devdatth's verified resume.";
    } else if (
      lower.includes('lab') ||
      lower.includes('sandbox') ||
      lower.includes('playground')
    ) {
      setIsDevLabsOpen(true);
      responseText = 'Launching Dev Labs neural sandbox.';
    } else if (
      lower.includes('setting') ||
      lower.includes('theme') ||
      lower.includes('audio') ||
      lower.includes('color')
    ) {
      setIsSettingsOpen(true);
      responseText = 'Opening system configuration.';
    } else if (
      lower.includes('top') ||
      lower.includes('home') ||
      lower.includes('start') ||
      lower.includes('hero')
    ) {
      scrollToSection('hero');
      responseText = 'Returning to home overview.';
    } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      responseText =
        'Hello! How can I help you explore Devdatth’s portfolio today?';
    } else {
      responseText = `I have processed your command: "${query}". You can ask me to view skills, projects, resume, or contact Devdatth.`;
    }

    const agentMsg: VoiceMessage = {
      id: `agent-${Date.now()}`,
      sender: 'agent',
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, agentMsg]);
    speakResponse(responseText);
  };

  const handleManualSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;
    soundEngine.playClick();
    handleUserQuery(textInput);
    setTextInput('');
  };

  const isAgentReady = isReadyToSpeak && !voiceMuted;

  return (
    <>
      {/* 1. Small Sleek Floating DEV Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 pointer-events-auto select-none">
        {/* Real-time status bubble */}
        <AnimatePresence>
          {(isListening || isSpeaking) && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="px-2.5 py-1 rounded-xl bg-black/95 border border-[var(--accent-color)]/50 backdrop-blur-md shadow-[0_0_15px_var(--accent-glow)] flex items-center space-x-1.5 text-[11px] font-mono-tech select-none"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  isListening
                    ? 'bg-emerald-400 animate-ping'
                    : 'bg-teal-300 animate-pulse'
                }`}
              />
              <span className="font-hud font-bold text-white tracking-wide">
                {isListening ? 'LISTENING...' : 'DEV SPEAKING...'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Circular Trigger Button */}
        <motion.button
          id="voice-agent-trigger-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (!isOpen) {
              handleOpenAgent();
            } else {
              toggleListening();
            }
          }}
          className={`relative w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-xl ${
            isListening
              ? 'bg-[var(--accent-color)] text-black border-white shadow-[0_0_20px_var(--accent-glow)] animate-pulse'
              : isSpeaking
              ? 'bg-teal-600 text-white border-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.6)]'
              : 'bg-[#09090e]/95 border-white/20 hover:border-[var(--accent-color)] text-white hover:shadow-[0_0_15px_var(--accent-glow)]'
          }`}
          onMouseEnter={() => {
            setCursorVariant('pointer');
            setCursorText('DEV AI');
            soundEngine.playHover();
          }}
          onMouseLeave={() => {
            setCursorVariant('default');
            setCursorText('');
          }}
          title={
            isAgentReady
              ? 'DEV Cyber Voice Assistant (Ready to Speak - Green)'
              : 'DEV Cyber Voice Assistant (Muted/Inactive - Red)'
          }
        >
          {/* Main Icon */}
          {isListening ? (
            <Radio className="w-5 h-5 text-black animate-spin" />
          ) : isSpeaking ? (
            <Volume2 className="w-5 h-5 text-white animate-bounce" />
          ) : (
            <Bot className="w-5 h-5 text-[var(--accent-color)]" />
          )}

          {/* Glowing Status Dot: GREEN when ready to speak, RED when muted */}
          <span
            id="voice-agent-status-dot"
            className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#09090e] transition-colors duration-300 ${
              isAgentReady
                ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse'
                : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            }`}
          />
        </motion.button>
      </div>

      {/* 2. Interactive DEV Assistant Dialog Console */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="voice-agent-dialog"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[540px] h-[490px] rounded-2xl bg-[#09090d]/98 backdrop-blur-2xl border border-white/15 cyber-corners shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/50">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent-color)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-hud tracking-wide text-white flex items-center space-x-1.5">
                    <span>DEV CYBER ASSISTANT</span>
                    <span
                      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-mono-tech border ${
                        isAgentReady
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1 ${
                          isAgentReady ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                        }`}
                      />
                      {isAgentReady ? 'ONLINE' : 'MUTED'}
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                {/* Voice speech toggle */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                    setVoiceMuted(!voiceMuted);
                  }}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    voiceMuted
                      ? 'text-rose-400 bg-rose-500/10'
                      : 'text-zinc-300 hover:text-white hover:bg-white/5'
                  }`}
                  title={voiceMuted ? 'Unmute voice' : 'Mute voice'}
                >
                  {voiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setIsOpen(false);
                    stopAllInteraction();
                  }}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Command Suggestions */}
            <div className="px-3 py-1.5 bg-white/[0.02] border-b border-white/5 flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-[10px] font-mono-tech">
              <span className="text-zinc-500 font-bold shrink-0">COMMANDS:</span>
              {[
                'Open Skills',
                'Show Projects',
                'Open Experience',
                'Open Resume',
                'Contact Devdatth',
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    unlockAudioContext();
                    soundEngine.playClick();
                    handleUserQuery(cmd);
                  }}
                  className="px-2 py-0.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 shrink-0 transition-colors cursor-pointer"
                >
                  "{cmd}"
                </button>
              ))}
            </div>

            {/* Notice if permission error */}
            {permissionError && (
              <div className="mx-3 mt-2 p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-[10px] font-mono-tech flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div className="flex-1 leading-snug">
                  <span>{permissionError}</span>
                </div>
              </div>
            )}

            {/* Conversation Log */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-3 overflow-y-auto space-y-2.5 font-mono-tech text-xs select-text"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center space-x-1 text-[8px] text-zinc-500 mb-0.5">
                    <span>{msg.sender === 'user' ? 'YOU' : 'DEV'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div
                    className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed flex items-start justify-between space-x-2 ${
                      msg.sender === 'user'
                        ? 'bg-[var(--accent-color)] text-black font-semibold rounded-tr-none text-xs'
                        : 'bg-white/5 text-zinc-200 border border-white/10 rounded-tl-none font-sans text-xs'
                    }`}
                  >
                    <span>{msg.text}</span>
                    {msg.sender === 'agent' && (
                      <button
                        onClick={() => {
                          unlockAudioContext();
                          speakResponse(msg.text);
                        }}
                        className="shrink-0 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Replay voice audio"
                      >
                        <Play className="w-3 h-3 text-[var(--accent-color)]" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isListening && transcript && (
                <div className="flex flex-col items-end">
                  <div className="text-[8px] text-emerald-400 mb-0.5">HEARING YOU SPEAK...</div>
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 max-w-[90%] animate-pulse text-xs">
                    {transcript}...
                  </div>
                </div>
              )}
            </div>

            {/* Audio Visualizer & Input Bar */}
            <div className="p-3 border-t border-white/10 bg-black/70 space-y-2">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center space-x-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isListening
                        ? 'bg-emerald-400 animate-ping'
                        : isSpeaking
                        ? 'bg-teal-400 animate-pulse'
                        : isAgentReady
                        ? 'bg-emerald-400'
                        : 'bg-rose-500'
                    }`}
                  />
                  <span className="text-[10px] text-zinc-400 font-mono-tech truncate max-w-[210px]">
                    {isListening
                      ? 'Listening to microphone...'
                      : isSpeaking
                      ? 'DEV Cyber Agent speaking...'
                      : 'Click mic or choose command'}
                  </span>
                </div>

                {/* Soft Waveform Equalizer */}
                <div className="flex items-center space-x-0.5 h-3">
                  {[3, 6, 10, 14, 9, 5, 12, 7, 4].map((h, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: isListening || isSpeaking ? [3, h, 3] : 3,
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.5,
                        delay: i * 0.07,
                      }}
                      className={`w-0.5 rounded-full ${
                        isListening
                          ? 'bg-emerald-400'
                          : isSpeaking
                          ? 'bg-teal-400'
                          : 'bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Input & Microphone Controls */}
              <div className="flex items-center space-x-2">
                <button
                  id="voice-agent-mic-btn"
                  onClick={toggleListening}
                  className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)] animate-pulse'
                      : 'bg-[var(--accent-color)] text-black border-transparent hover:brightness-110 shadow-md'
                  }`}
                  title={isListening ? 'Stop listening' : 'Click to enable microphone and speak to Dev'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <form onSubmit={handleManualSend} className="flex-1 flex items-center space-x-1.5">
                  <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Speak or type to Dev..."
                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono-tech focus:border-[var(--accent-color)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
