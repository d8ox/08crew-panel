/*
08Crew — Unified Services Dashboard (single-file)
Este archivo es la interfaz principal. Para integración real se requiere backend.
*/
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiSettings, FiExternalLink } from 'react-icons/fi';
import { SiAsana, SiZoho, SiGooglemeet, SiSlack, SiGithub } from 'react-icons/si';

const services = [
  {
    id: 'asana',
    name: 'Asana',
    icon: <SiAsana className="w-6 h-6" />,
    description: 'Project & task management',
    url: 'https://app.asana.com/',
    color: 'from-pink-400 to-pink-600',
  },
  {
    id: 'zoho',
    name: 'Zoho CRM',
    icon: <SiZoho className="w-6 h-6" />,
    description: 'CRM & sales pipeline',
    url: 'https://crm.zoho.com/',
    color: 'from-emerald-400 to-emerald-600',
  },
  {
    id: 'meet',
    name: 'Google Meet',
    icon: <SiGooglemeet className="w-6 h-6" />,
    description: 'Video meetings & calls',
    url: 'https://meet.google.com/',
    color: 'from-cyan-400 to-cyan-600',
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: <SiSlack className="w-6 h-6" />,
    description: 'Team chat & notifications',
    url: 'https://slack.com/',
    color: 'from-violet-400 to-violet-600',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: <SiGithub className="w-6 h-6" />,
    description: 'Code & deployments',
    url: 'https://github.com/',
    color: 'from-slate-400 to-slate-700',
  },
];

function TopBar({ onOpenSettings, query, setQuery }) {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center gap-2 bg-white/5 backdrop-blur p-2 rounded-full w-full md:w-80">
        <FiSearch />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar servicios..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>
      <button
        onClick={onOpenSettings}
        aria-label="settings"
        className="p-2 rounded-full bg-white/5 hover:bg-white/8 transition"
      >
        <FiSettings />
      </button>
    </div>
  );
}

function Sidebar({ onSelect, active }) {
  return (
    <aside className="w-20 md:w-64 bg-gradient-to-b from-gray-900/60 to-gray-900/40 p-4 rounded-xl">
      <div className="hidden md:block mb-6">
        <h1 className="text-xl font-bold">08 Crew</h1>
        <p className="text-sm text-gray-300">Unified panel</p>
      </div>
      <nav className="flex flex-col gap-3">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition ${active === s.id ? 'ring-2 ring-white/10 bg-white/3' : ''}`}
          >
            <div className="bg-white/6 p-2 rounded-md">{s.icon}</div>
            <span className="hidden md:inline-block">{s.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function ServiceCard({ s, onConnect, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="p-4 rounded-2xl bg-gradient-to-r shadow-lg from-white/3 to-white/6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color} text-white`}>{s.icon}</div>
          <div>
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-300">{s.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href={s.url} target="_blank" rel="noreferrer" className="text-sm p-2 rounded-md bg-white/5 hover:bg-white/8 transition flex items-center gap-2">
            Abrir <FiExternalLink />
          </a>
          <button onClick={() => onConnect(s.id)} className="px-3 py-2 rounded-lg bg-white text-black font-medium">Conectar</button>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onOpen(s.id)} className="text-xs px-2 py-1 rounded-md bg-white/3">Ver integración</button>
        <button className="text-xs px-2 py-1 rounded-md bg-white/3">Opciones</button>
      </div>
    </motion.div>
  );
}

function IntegrationModal({ service, onClose }) {
  if (!service) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative max-w-4xl w-full bg-gradient-to-b from-gray-900/90 to-gray-900/80 p-6 rounded-2xl shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${service.color}`}>{service.icon}</div>
            <div>
              <h2 className="text-xl font-bold">{service.name} — Integración</h2>
              <p className="text-sm text-gray-300">Vista previa y opciones de integración.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-sm px-3 py-1 bg-white/5 rounded">Cerrar</button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/3">
            <p className="text-sm text-gray-200">Panel embebido (si el servicio lo permite):</p>
            <div className="mt-3 h-64 bg-black/10 rounded overflow-hidden">
              {/* Example iframe — muchos servicios no permiten embedding por X-Frame-Options; esto es solo ilustrativo */}
              <iframe title={service.name} src={service.url} className="w-full h-full" />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/3">
            <p className="text-sm text-gray-200">Acciones rápidas:</p>
            <ul className="mt-3 flex flex-col gap-2">
              <li className="flex items-center justify-between">
                <span>Conectar cuenta</span>
                <button className="px-3 py-1 rounded bg-white text-black">OAuth</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Configurar webhooks</span>
                <button className="px-3 py-1 rounded bg-white/5">Editar</button>
              </li>
              <li className="flex items-center justify-between">
                <span>Probar conexión</span>
                <button className="px-3 py-1 rounded bg-white/5">Test</button>
              </li>
            </ul>

            <div className="mt-4 text-xs text-gray-400">
              <p>Nota: Para un panel real necesitas un backend que gestione tokens y secretos.</p>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState(services[0].id);
  const [query, setQuery] = useState('');
  const [connected, setConnected] = useState({});
  const [openIntegration, setOpenIntegration] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const filtered = services.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()));

  function handleConnect(id) {
    setConnected((c) => ({ ...c, [id]: true }));
    alert(`Simulado: cuenta de ${id} conectada (implementa OAuth real en back-end).`);
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          <Sidebar onSelect={setActive} active={active} />
        </div>

        <div className="md:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <TopBar onOpenSettings={() => setShowSettings(true)} query={query} setQuery={setQuery} />
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm">Hola, Admin</div>
                <div className="text-xs text-gray-300">08 Crew • Agencia</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((s) => (
              <ServiceCard key={s.id} s={s} onConnect={handleConnect} onOpen={(id) => setOpenIntegration(services.find((x) => x.id === id))} />
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/5">
            <h3 className="font-semibold mb-2">Estado de conexiones</h3>
            <div className="flex flex-wrap gap-3">
              {services.map((s) => (
                <div key={s.id} className="px-3 py-2 rounded-md bg-white/3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: connected[s.id] ? '#34D399' : '#F97316' }} />
                  <div className="text-sm">{s.name} — {connected[s.id] ? 'Conectado' : 'No conectado'}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {openIntegration && (
          <IntegrationModal service={openIntegration} onClose={() => setOpenIntegration(null)} />
        )}

        {showSettings && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowSettings(false)} />
            <motion.div initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} className="relative max-w-2xl w-full p-6 bg-gradient-to-b from-gray-900/95 to-gray-900/80 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Ajustes del panel</h4>
                <button onClick={() => setShowSettings(false)} className="px-3 py-1 rounded bg-white/5">Cerrar</button>
              </div>
              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <label className="block mb-1">Dominio de la agencia</label>
                  <input className="w-full rounded p-2 bg-white/5 outline-none" placeholder="tu-dominio.com" />
                </div>
                <div>
                  <label className="block mb-1">Notificaciones</label>
                  <select className="w-full rounded p-2 bg-white/5 outline-none">
                    <option>Email</option>
                    <option>Slack</option>
                    <option>Webhooks</option>
                  </select>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Recuerda: los secretos y client IDs deben guardarse en el backend y en variables de entorno.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
