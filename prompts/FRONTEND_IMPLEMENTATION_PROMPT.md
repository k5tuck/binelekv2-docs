# Frontend Implementation Prompt

Use this prompt when starting a new Claude Code session to implement the frontend features.

---

## Context

You are working on the **SMB AI Command Platform** frontend repository: `binelekv2-smb-platform-frontend`

This is a React/TypeScript PWA with:
- **Vite** for build tooling
- **React Router** for navigation
- **TailwindCSS** for styling
- **Lucide React** for icons
- **Zustand** for state management (if needed)

**Reference:** See the backend repo's `docs/ARCHITECTURE.md` for full system architecture.

---

## Implementation Tasks

### Priority 1: Replace Mock Data with Real API Calls

**Current State:** All module pages use hardcoded `mockData` arrays instead of API calls.

#### Task 1.1: Ops Copilot Page
**Location:** `src/pages/modules/OpsCopilot.tsx`

**Changes:**
1. Remove `mockTasks` array (line ~70)
2. Add API integration:
   ```typescript
   import { api } from '../../services/api';

   const [tasks, setTasks] = useState<Task[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
     const fetchTasks = async () => {
       try {
         const response = await api.get('/api/modules/ops-copilot/tasks');
         setTasks(response.data.tasks);
       } catch (err) {
         setError('Failed to load tasks');
       } finally {
         setLoading(false);
       }
     };
     fetchTasks();
   }, []);
   ```

3. Implement task actions:
   ```typescript
   const createTask = async (task: CreateTaskInput) => {
     const response = await api.post('/api/modules/ops-copilot/tasks', task);
     setTasks([...tasks, response.data]);
   };

   const updateTask = async (id: string, updates: Partial<Task>) => {
     await api.put(`/api/modules/ops-copilot/tasks/${id}`, updates);
     setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
   };

   const deleteTask = async (id: string) => {
     await api.delete(`/api/modules/ops-copilot/tasks/${id}`);
     setTasks(tasks.filter(t => t.id !== id));
   };
   ```

4. Add loading and error states to UI

#### Task 1.2: Mini Foundry Page
**Location:** `src/pages/modules/MiniFoundry.tsx`

**Changes:**
1. Remove mock dashboard data
2. Implement dashboard CRUD:
   ```typescript
   // Fetch dashboards
   const { data: dashboards } = await api.get('/api/modules/mini-foundry/dashboards');

   // Create dashboard
   const createDashboard = async (dashboard: CreateDashboardInput) => {
     return api.post('/api/modules/mini-foundry/dashboards', dashboard);
   };

   // Execute query
   const executeQuery = async (query: string) => {
     return api.post('/api/modules/mini-foundry/query', { query });
   };
   ```

#### Task 1.3: Marketplace Intel Page
**Location:** `src/pages/modules/MarketplaceIntel.tsx`

**Changes:**
1. Remove `mockProducts` and `mockCompetitors` (line ~126)
2. Implement API calls:
   ```typescript
   // Fetch competitors
   const fetchCompetitors = async () => {
     const response = await api.get('/api/modules/marketplace-intel/competitors');
     setCompetitors(response.data.competitors);
   };

   // Fetch tracked products
   const fetchProducts = async () => {
     const response = await api.get('/api/modules/marketplace-intel/products');
     setProducts(response.data.products);
   };

   // Track new product
   const trackProduct = async (product: TrackProductInput) => {
     return api.post('/api/modules/marketplace-intel/products', product);
   };

   // Add competitor
   const addCompetitor = async (competitor: AddCompetitorInput) => {
     return api.post('/api/modules/marketplace-intel/competitors', competitor);
   };

   // Discover competitors
   const discoverCompetitors = async (params: DiscoveryParams) => {
     return api.post('/api/modules/marketplace-intel/discover', params);
   };
   ```

3. Add competitor discovery modal with:
   - Location-based search (address/radius input)
   - Similarity-based search (keywords, categories)

#### Task 1.4: Cybersecurity Scanner Page
**Location:** `src/pages/modules/CybersecurityScanner.tsx`

**Changes:**
1. Replace static data with API calls:
   ```typescript
   // Fetch security posture
   const fetchPosture = async () => {
     const response = await api.get('/api/modules/cybersecurity-scanner/posture');
     setPosture(response.data);
   };

   // Fetch devices
   const fetchDevices = async () => {
     const response = await api.get('/api/modules/cybersecurity-scanner/devices');
     setDevices(response.data.devices);
   };

   // Fetch compliance status
   const fetchCompliance = async () => {
     const response = await api.get('/api/modules/cybersecurity-scanner/compliance');
     setCompliance(response.data);
   };
   ```

---

### Priority 2: Implement Connectors Page

**Location:** `src/pages/Connectors.tsx`

**Current State:** Shows static connector cards with non-functional buttons.

**Tasks:**

1. Create connector service:
   **File:** `src/services/connectors.ts` (NEW)
   ```typescript
   import { api } from './api';

   export interface Connector {
     id: string;
     type: string;
     name: string;
     status: 'connected' | 'disconnected' | 'error';
     lastSync?: string;
     config?: Record<string, unknown>;
   }

   export const connectorsService = {
     async list(): Promise<Connector[]> {
       const response = await api.get('/api/connectors');
       return response.data.connectors;
     },

     async getOAuthUrl(type: string): Promise<string> {
       const response = await api.get(`/api/connectors/oauth/${type}/authorize`);
       return response.data.url;
     },

     async disconnect(id: string): Promise<void> {
       await api.delete(`/api/connectors/${id}`);
     },

     async sync(id: string): Promise<void> {
       await api.post(`/api/connectors/sync/${id}`);
     },

     async getStatus(id: string): Promise<Connector> {
       const response = await api.get(`/api/connectors/${id}`);
       return response.data;
     }
   };
   ```

2. Implement OAuth flow:
   ```typescript
   const handleConnect = async (connectorType: string) => {
     try {
       const url = await connectorsService.getOAuthUrl(connectorType);
       // Open OAuth popup
       const popup = window.open(url, 'oauth', 'width=600,height=700');

       // Listen for OAuth callback
       const handleMessage = (event: MessageEvent) => {
         if (event.data.type === 'oauth_callback') {
           popup?.close();
           window.removeEventListener('message', handleMessage);
           // Refresh connectors list
           fetchConnectors();
         }
       };
       window.addEventListener('message', handleMessage);
     } catch (error) {
       toast.error('Failed to start connection');
     }
   };
   ```

3. Create OAuth callback page:
   **File:** `src/pages/OAuthCallback.tsx` (NEW)
   ```typescript
   import { useEffect } from 'react';
   import { useSearchParams } from 'react-router-dom';

   export const OAuthCallback = () => {
     const [params] = useSearchParams();

     useEffect(() => {
       const code = params.get('code');
       const state = params.get('state');
       const error = params.get('error');

       if (window.opener) {
         window.opener.postMessage({
           type: 'oauth_callback',
           code,
           state,
           error
         }, window.location.origin);
       }
     }, [params]);

     return <div>Connecting... You can close this window.</div>;
   };
   ```

4. Add route in `App.tsx`:
   ```typescript
   <Route path="/oauth/callback" element={<OAuthCallback />} />
   ```

5. Update Connectors.tsx with real functionality:
   - "Connect" button triggers OAuth flow
   - "Disconnect" button calls API
   - "Sync" button triggers manual sync
   - Show last sync time and status

---

### Priority 3: Fix Settings Page Persistence

**Location:** `src/pages/Settings.tsx`

**Current State:** `handleSave()` uses fake `setTimeout` instead of API calls.

**Tasks:**

1. Create settings service:
   **File:** `src/services/settings.ts` (NEW)
   ```typescript
   import { api } from './api';

   export interface UserProfile {
     name: string;
     email: string;
     phone?: string;
     timezone?: string;
     avatar?: string;
   }

   export interface OrganizationSettings {
     name: string;
     industry?: string;
     size?: string;
     address?: string;
   }

   export const settingsService = {
     async getProfile(): Promise<UserProfile> {
       const response = await api.get('/api/users/me');
       return response.data;
     },

     async updateProfile(profile: Partial<UserProfile>): Promise<void> {
       await api.put('/api/users/me', profile);
     },

     async getOrganization(): Promise<OrganizationSettings> {
       const response = await api.get('/api/organization');
       return response.data;
     },

     async updateOrganization(settings: Partial<OrganizationSettings>): Promise<void> {
       await api.put('/api/organization', settings);
     },

     async getNotificationPreferences(): Promise<Record<string, boolean>> {
       const response = await api.get('/api/users/me/notifications');
       return response.data;
     },

     async updateNotificationPreferences(prefs: Record<string, boolean>): Promise<void> {
       await api.put('/api/users/me/notifications', prefs);
     }
   };
   ```

2. Update Settings.tsx:
   ```typescript
   // Load settings on mount
   useEffect(() => {
     const loadSettings = async () => {
       const [profile, org, notifications] = await Promise.all([
         settingsService.getProfile(),
         settingsService.getOrganization(),
         settingsService.getNotificationPreferences()
       ]);
       setProfile(profile);
       setOrganization(org);
       setNotifications(notifications);
     };
     loadSettings();
   }, []);

   // Save with real API
   const handleSave = async () => {
     try {
       setSaving(true);
       await settingsService.updateProfile(profile);
       toast.success('Settings saved');
     } catch (error) {
       toast.error('Failed to save settings');
     } finally {
       setSaving(false);
     }
   };
   ```

3. Update API key saving to use backend:
   ```typescript
   const handleSaveApiKey = async () => {
     try {
       await llmService.saveApiKey(selectedProvider, apiKey);
       toast.success('API key saved');
       setApiKey('');
     } catch (error) {
       toast.error('Failed to save API key');
     }
   };
   ```

---

### Priority 4: Add Error Boundaries and Loading States

**Tasks:**

1. Create ErrorBoundary component:
   **File:** `src/components/ErrorBoundary.tsx` (NEW)
   ```typescript
   import { Component, ErrorInfo, ReactNode } from 'react';

   interface Props {
     children: ReactNode;
     fallback?: ReactNode;
   }

   interface State {
     hasError: boolean;
     error?: Error;
   }

   export class ErrorBoundary extends Component<Props, State> {
     state: State = { hasError: false };

     static getDerivedStateFromError(error: Error): State {
       return { hasError: true, error };
     }

     componentDidCatch(error: Error, info: ErrorInfo) {
       console.error('Error caught by boundary:', error, info);
     }

     render() {
       if (this.state.hasError) {
         return this.props.fallback || (
           <div className="p-8 text-center">
             <h2 className="text-xl font-bold text-red-600">Something went wrong</h2>
             <p className="text-gray-600 mt-2">{this.state.error?.message}</p>
             <button
               onClick={() => this.setState({ hasError: false })}
               className="mt-4 btn-primary"
             >
               Try again
             </button>
           </div>
         );
       }
       return this.props.children;
     }
   }
   ```

2. Create loading skeleton components:
   **File:** `src/components/Skeletons.tsx` (NEW)
   ```typescript
   export const CardSkeleton = () => (
     <div className="animate-pulse bg-gray-200 rounded-lg h-32" />
   );

   export const TableRowSkeleton = () => (
     <tr className="animate-pulse">
       <td className="p-4"><div className="h-4 bg-gray-200 rounded w-3/4" /></td>
       <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/2" /></td>
       <td className="p-4"><div className="h-4 bg-gray-200 rounded w-1/4" /></td>
     </tr>
   );

   export const PageSkeleton = () => (
     <div className="space-y-4 animate-pulse">
       <div className="h-8 bg-gray-200 rounded w-1/3" />
       <div className="h-4 bg-gray-200 rounded w-2/3" />
       <div className="grid grid-cols-3 gap-4 mt-8">
         <CardSkeleton />
         <CardSkeleton />
         <CardSkeleton />
       </div>
     </div>
   );
   ```

3. Create toast notification system:
   **File:** `src/components/Toast.tsx` (NEW)
   ```typescript
   import { createContext, useContext, useState, ReactNode } from 'react';

   interface Toast {
     id: string;
     message: string;
     type: 'success' | 'error' | 'info';
   }

   interface ToastContextType {
     toasts: Toast[];
     success: (message: string) => void;
     error: (message: string) => void;
     info: (message: string) => void;
   }

   const ToastContext = createContext<ToastContextType | null>(null);

   export const useToast = () => {
     const context = useContext(ToastContext);
     if (!context) throw new Error('useToast must be used within ToastProvider');
     return context;
   };

   export const ToastProvider = ({ children }: { children: ReactNode }) => {
     const [toasts, setToasts] = useState<Toast[]>([]);

     const addToast = (message: string, type: Toast['type']) => {
       const id = Math.random().toString(36);
       setToasts(prev => [...prev, { id, message, type }]);
       setTimeout(() => {
         setToasts(prev => prev.filter(t => t.id !== id));
       }, 5000);
     };

     return (
       <ToastContext.Provider value={{
         toasts,
         success: (msg) => addToast(msg, 'success'),
         error: (msg) => addToast(msg, 'error'),
         info: (msg) => addToast(msg, 'info'),
       }}>
         {children}
         <ToastContainer toasts={toasts} />
       </ToastContext.Provider>
     );
   };
   ```

4. Wrap app with providers in `main.tsx`:
   ```typescript
   <ErrorBoundary>
     <ToastProvider>
       <AuthProvider>
         <App />
       </AuthProvider>
     </ToastProvider>
   </ErrorBoundary>
   ```

---

### Priority 5: Add Competitor Discovery UI

**Location:** `src/pages/modules/MarketplaceIntel.tsx`

**Tasks:**

1. Create discovery modal component:
   **File:** `src/components/marketplace/CompetitorDiscoveryModal.tsx` (NEW)
   ```typescript
   interface DiscoveryModalProps {
     isOpen: boolean;
     onClose: () => void;
     onDiscover: (params: DiscoveryParams) => Promise<void>;
   }

   interface DiscoveryParams {
     method: 'location' | 'similarity';
     // Location params
     address?: string;
     radiusMiles?: number;
     // Similarity params
     keywords?: string[];
     categories?: string[];
   }

   export const CompetitorDiscoveryModal = ({ isOpen, onClose, onDiscover }: DiscoveryModalProps) => {
     const [method, setMethod] = useState<'location' | 'similarity'>('location');
     const [address, setAddress] = useState('');
     const [radius, setRadius] = useState(10);
     const [keywords, setKeywords] = useState<string[]>([]);
     const [loading, setLoading] = useState(false);
     const [results, setResults] = useState<Competitor[]>([]);

     const handleDiscover = async () => {
       setLoading(true);
       try {
         const params: DiscoveryParams = method === 'location'
           ? { method, address, radiusMiles: radius }
           : { method, keywords, categories: [] };

         const response = await api.post('/api/modules/marketplace-intel/discover', params);
         setResults(response.data.competitors);
       } finally {
         setLoading(false);
       }
     };

     return (
       <Modal isOpen={isOpen} onClose={onClose}>
         <h2>Discover Competitors</h2>

         {/* Method selector */}
         <div className="flex gap-4 my-4">
           <button
             className={`btn ${method === 'location' ? 'btn-primary' : 'btn-secondary'}`}
             onClick={() => setMethod('location')}
           >
             By Location
           </button>
           <button
             className={`btn ${method === 'similarity' ? 'btn-primary' : 'btn-secondary'}`}
             onClick={() => setMethod('similarity')}
           >
             By Similarity
           </button>
         </div>

         {/* Location search */}
         {method === 'location' && (
           <div className="space-y-4">
             <input
               type="text"
               placeholder="Enter address or zip code"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               className="input w-full"
             />
             <div>
               <label>Radius: {radius} miles</label>
               <input
                 type="range"
                 min={1}
                 max={50}
                 value={radius}
                 onChange={(e) => setRadius(Number(e.target.value))}
                 className="w-full"
               />
             </div>
           </div>
         )}

         {/* Similarity search */}
         {method === 'similarity' && (
           <div className="space-y-4">
             <input
               type="text"
               placeholder="Enter keywords (comma separated)"
               onChange={(e) => setKeywords(e.target.value.split(',').map(k => k.trim()))}
               className="input w-full"
             />
           </div>
         )}

         <button onClick={handleDiscover} disabled={loading} className="btn-primary mt-4">
           {loading ? 'Searching...' : 'Discover'}
         </button>

         {/* Results */}
         {results.length > 0 && (
           <div className="mt-6">
             <h3>Found {results.length} competitors</h3>
             {results.map(comp => (
               <div key={comp.id} className="p-4 border rounded mt-2">
                 <h4>{comp.name}</h4>
                 <p>{comp.description}</p>
                 <button onClick={() => addCompetitor(comp)}>
                   Add to tracking
                 </button>
               </div>
             ))}
           </div>
         )}
       </Modal>
     );
   };
   ```

2. Add discovery button to MarketplaceIntel page:
   ```typescript
   <button
     onClick={() => setShowDiscoveryModal(true)}
     className="btn-primary flex items-center gap-2"
   >
     <Search className="h-4 w-4" />
     Discover Competitors
   </button>
   ```

---

### Priority 6: Create Services Index

**File:** `src/services/index.ts` (NEW)
```typescript
export { api } from './api';
export { llmService } from './llm';
export { connectorsService } from './connectors';
export { settingsService } from './settings';

// Create task service
export const taskService = {
  list: () => api.get('/api/modules/ops-copilot/tasks'),
  create: (task: CreateTaskInput) => api.post('/api/modules/ops-copilot/tasks', task),
  update: (id: string, updates: Partial<Task>) => api.put(`/api/modules/ops-copilot/tasks/${id}`, updates),
  delete: (id: string) => api.delete(`/api/modules/ops-copilot/tasks/${id}`),
};

// Create dashboard service
export const dashboardService = {
  list: () => api.get('/api/modules/mini-foundry/dashboards'),
  create: (dashboard: CreateDashboardInput) => api.post('/api/modules/mini-foundry/dashboards', dashboard),
  query: (query: string) => api.post('/api/modules/mini-foundry/query', { query }),
};

// Create marketplace service
export const marketplaceService = {
  getCompetitors: () => api.get('/api/modules/marketplace-intel/competitors'),
  addCompetitor: (comp: AddCompetitorInput) => api.post('/api/modules/marketplace-intel/competitors', comp),
  getProducts: () => api.get('/api/modules/marketplace-intel/products'),
  trackProduct: (product: TrackProductInput) => api.post('/api/modules/marketplace-intel/products', product),
  discover: (params: DiscoveryParams) => api.post('/api/modules/marketplace-intel/discover', params),
  getPricingInsights: () => api.get('/api/modules/marketplace-intel/pricing'),
};

// Create security service
export const securityService = {
  getPosture: () => api.get('/api/modules/cybersecurity-scanner/posture'),
  getDevices: () => api.get('/api/modules/cybersecurity-scanner/devices'),
  getCompliance: () => api.get('/api/modules/cybersecurity-scanner/compliance'),
  getAlerts: () => api.get('/api/modules/cybersecurity-scanner/alerts'),
};
```

---

## Type Definitions

**File:** `src/types/index.ts` (update or create)
```typescript
// Tasks
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  dueDate?: string;
  createdAt: string;
}

// Connectors
export interface Connector {
  id: string;
  type: string;
  name: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
}

// Competitors
export interface Competitor {
  id: string;
  name: string;
  website?: string;
  description?: string;
  category?: string;
  isActive: boolean;
}

// Tracked Products
export interface TrackedProduct {
  id: string;
  name: string;
  marketplace: string;
  currentPrice: number;
  url?: string;
  priceHistory: { date: string; price: number }[];
  competitorId?: string;
}

// Discovery
export interface DiscoveryParams {
  method: 'location' | 'similarity';
  address?: string;
  radiusMiles?: number;
  keywords?: string[];
  categories?: string[];
}
```

---

## Testing Requirements

1. Test each API integration manually
2. Verify loading states appear correctly
3. Verify error handling shows user-friendly messages
4. Test OAuth flow end-to-end with at least one connector
5. Verify token refresh works (set short expiry for testing)

---

## Commit Strategy

1. `feat(api): Add service layer for module APIs`
2. `feat(ops-copilot): Connect to backend API`
3. `feat(marketplace): Connect to backend and add discovery`
4. `feat(connectors): Implement OAuth flow UI`
5. `feat(settings): Add persistence with API`
6. `feat(ui): Add error boundaries and loading states`

---

## Verification Checklist

- [ ] All module pages fetch real data from API
- [ ] Loading spinners show during API calls
- [ ] Error messages display on failures
- [ ] Connector OAuth flow works (at least popup opens)
- [ ] Settings changes persist after refresh
- [ ] Token refresh works (no random logouts)
- [ ] Competitor discovery modal works
- [ ] Toast notifications appear for user actions
