import { create } from 'zustand';
import { pipelineConfigs } from './data/pipelineConfigs';
import { BrainCircuit, BarChart3, Layers, Video, Activity } from 'lucide-react';
import React from 'react';

export const CHANNELS = [
  { id: 'stem', name: 'STEM & Explainers', icon: <BrainCircuit size={18} />, status: 'active' },
  { id: 'finance', name: 'Financial & Crypto', icon: <BarChart3 size={18} />, status: 'active' },
  { id: 'history', name: 'Historical Docs', icon: <Layers size={18} />, status: 'pending' },
  { id: 'crime', name: 'True Crime Mystery', icon: <Video size={18} />, status: 'active' },
  { id: 'tech', name: 'Enterprise AI News', icon: <Activity size={18} />, status: 'error' },
  { id: 'health', name: 'Health & Wellness', icon: <BrainCircuit size={18} />, status: 'active' },
  { id: 'travel', name: 'Travel Explorations', icon: <Layers size={18} />, status: 'pending' },
  { id: 'language', name: 'Language Learning', icon: <Video size={18} />, status: 'active' },
  { id: 'stoic', name: 'Stoic Motivation', icon: <BrainCircuit size={18} />, status: 'active' },
  { id: 'kids', name: 'Childrens Education', icon: <Layers size={18} />, status: 'pending' }
];

const initializeStates = () => {
  const initialState = {};
  CHANNELS.forEach(ch => {
    const config = pipelineConfigs[ch.id] || pipelineConfigs.default;
    initialState[ch.id] = {
      isRunning: false,
      stages: config.stages.map(s => ({ ...s, status: 'pending', progress: 0 })),
      logs: [],
      vramUsage: 10
    };
  });
  return initialState;
};

let ws = null;
let hftWs = null;

export const useStore = create((set, get) => ({
  channelStates: initializeStates(),
  hftTelemetry: { price: 0.0, action: 0.0 },
  isConnected: false,
  isHftConnected: false,
  theme: localStorage.getItem('theme') || 'dark',
  compactLayout: localStorage.getItem('compactLayout') === 'true',
  hapticFeedback: localStorage.getItem('hapticFeedback') !== 'false',
  soundAlerts: localStorage.getItem('soundAlerts') !== 'false', // Default true
  ambientMusic: localStorage.getItem('ambientMusic') === 'true', // Default false
  isMobileMenuOpen: false,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  toasts: [],

  addToast: (message, type = 'info') => {
    const id = Date.now() + Math.random();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) }));
    }, 4000);
  },

  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter(t => t.id !== id) })),

  login: (username, password) => {
    // Mock authentication - accept anything for the demo
    localStorage.setItem('isAuthenticated', 'true');
    set({ isAuthenticated: true });
    return true;
  },

  logout: () => {
    localStorage.removeItem('isAuthenticated');
    set({ isAuthenticated: false });
  },

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),

  setTheme: (newTheme) => {
    localStorage.setItem('theme', newTheme);
    set({ theme: newTheme });
  },

  setCompactLayout: (isCompact) => {
    localStorage.setItem('compactLayout', isCompact);
    set({ compactLayout: isCompact });
  },

  setHapticFeedback: (isHaptic) => {
    localStorage.setItem('hapticFeedback', isHaptic);
    set({ hapticFeedback: isHaptic });
  },
  
  setSoundAlerts: (isOn) => {
    localStorage.setItem('soundAlerts', isOn);
    set({ soundAlerts: isOn });
  },

  setAmbientMusic: (isOn) => {
    localStorage.setItem('ambientMusic', isOn);
    set({ ambientMusic: isOn });
  },
  
  updateChannelState: (channelId, updater) => set((state) => ({
    channelStates: {
      ...state.channelStates,
      [channelId]: typeof updater === 'function' 
        ? updater(state.channelStates[channelId]) 
        : { ...state.channelStates[channelId], ...updater }
    }
  })),

  connectWebSocket: () => {
    if (ws) return;
    
    ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('Connected to Orchestrator Mock Server');
      set({ isConnected: true });
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { type, payload } = data;
      
      set((state) => {
        const { channelId } = payload;
        if (!channelId) return state;
        
        const prevState = state.channelStates[channelId] || {};
        
        switch (type) {
          case 'PIPELINE_START':
            return {
              channelStates: {
                ...state.channelStates,
                [channelId]: {
                  ...prevState,
                  isRunning: true,
                  stages: payload.stages ? payload.stages.map(s => ({ ...s, status: 'pending', progress: 0 })) : prevState.stages,
                  logs: [],
                  vramUsage: 10
                }
              }
            };
          case 'PIPELINE_COMPLETE':
            return {
              channelStates: {
                ...state.channelStates,
                [channelId]: {
                  ...prevState,
                  isRunning: false,
                  vramUsage: 10
                }
              }
            };
          case 'STAGE_UPDATE':
            const newStages = [...prevState.stages];
            newStages[payload.stageIndex] = {
              ...newStages[payload.stageIndex],
              progress: payload.progress,
              status: payload.status
            };
            return {
              channelStates: {
                ...state.channelStates,
                [channelId]: {
                  ...prevState,
                  stages: newStages
                }
              }
            };
          case 'TELEMETRY_UPDATE':
            return {
              channelStates: {
                ...state.channelStates,
                [channelId]: {
                  ...prevState,
                  vramUsage: payload.vramUsage
                }
              }
            };
          case 'LOG_MESSAGE':
            return {
              channelStates: {
                ...state.channelStates,
                [channelId]: {
                  ...prevState,
                  logs: [...prevState.logs, payload.log]
                }
              }
            };
          default:
            return state;
        }
      });
    };

    ws.onclose = () => {
      console.log('Disconnected from Orchestrator Mock Server');
      set({ isConnected: false });
      ws = null;
      // Auto-reconnect
      setTimeout(() => get().connectWebSocket(), 3000);
    };
  },

  connectHftWebSocket: () => {
    if (hftWs) return;
    
    hftWs = new WebSocket('ws://localhost:8000/ws');

    hftWs.onopen = () => {
      console.log('Connected to HFT Telemetry Server');
      set({ isHftConnected: true });
    };

    hftWs.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        set({ hftTelemetry: { price: data.price, action: data.action } });
      } catch(e) {}
    };

    hftWs.onclose = () => {
      console.log('Disconnected from HFT Telemetry Server');
      set({ isHftConnected: false });
      hftWs = null;
      setTimeout(() => get().connectHftWebSocket(), 3000);
    };
  },

  handleRender: (channelId) => {
    // Forward the render request to the WebSocket server
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'START_RENDER',
        payload: { channelId }
      }));
    } else {
      console.warn('Cannot start render. WebSocket not connected.');
    }
  }
}));
