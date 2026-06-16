# Entrepreneur Visibility OS

AI-powered operating system helping founders build in public, grow their audience, and create opportunities through authentic content.

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Chatchat
Create a `.env` file in the root directory:

```env
VITE_CHATCHAT_API_KEY=your_chatchat_api_key_here
```

Get your API key from [Chatchat Dashboard](https://chatchat.ai/dashboard)

### 3. Run Development Server
```bash
npm run dev
```

## 🤖 How Agent Integration Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Your Application                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │           AgentProvider (Context)                 │  │
│  │  - Manages agent lifecycle                        │  │
│  │  - Handles WebSocket connection                   │  │
│  │  - Coordinates message routing                    │  │
│  └──────────────────────────────────────────────────┘  │
│                          │                               │
│                          ▼                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │         ChatchatService (API Layer)              │  │
│  │  - WebSocket connection to Chatchat              │  │
│  │  - Agent registration                             │  │
│  │  - Message sending/receiving                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   Chatchat Platform   │
              │  - Agent execution    │
              │  - Tool integration   │
              │  - Real-time updates  │
              └───────────────────────┘
```

### Adding Your First Agent

1. **Click "Add Agent"** in the Agent Workspace
2. **Fill in agent details:**
   - Name (e.g., "Chief of Staff")
   - Type (Coordinator, Content, etc.)
   - System Prompt (optional customization)
   - Connected Tools (optional)
3. **Click "Connect Agent"**

The agent will be registered with Chatchat and appear in your workspace!

### Agent Communication

```typescript
// Send a message to an agent
const { sendMessage } = useAgents();
await sendMessage(agentId, "Create a LinkedIn post about AI");

// Subscribe to agent responses
const { subscribeToAgent } = useAgents();
const unsubscribe = subscribeToAgent(agentId, (message) => {
  console.log('Agent response:', message.content);
});
```

### Agent Types

- **Coordinator** (Chief of Staff) - Orchestrates all other agents
- **Knowledge** (Journal) - Processes thoughts and notes
- **Strategy** (Content Strategy) - Analyzes trends
- **Content** (Writer) - Creates content drafts
- **Intelligence** (Research) - Gathers information
- **Media** - Manages visual assets
- **Publishing** - Distributes content
- **Execution** (Accountability) - Tracks commitments

## 🎨 Memphis Design Theme

Bold, maximalist design with:
- Bright saturated colors
- Geometric patterns
- Rounded typography (Fredoka)
- Playful animations

## 📦 Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **Chatchat** - AI agent platform

## 🔧 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_CHATCHAT_API_KEY` | Your Chatchat API key | Yes |
| `VITE_CHATCHAT_WS_URL` | WebSocket URL (default: wss://api.chatchat.ai/v1/ws) | No |

## 🤝 Contributing

This is a founder-focused tool. Contributions welcome!

## 📄 License

MIT

---

Built with [ChatAndBuild](https://chatandbuild.com) 🚀
