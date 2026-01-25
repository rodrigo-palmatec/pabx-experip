import { useState, useEffect } from 'react';
import { Phone, PhoneCall, PhoneOff, Clock, User, Hash } from 'lucide-react';
import api from '../services/api';

function ClickToCall() {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [loading, setLoading] = useState(false);
  const [callStatus, setCallStatus] = useState(null);
  const [error, setError] = useState('');
  const [extensions, setExtensions] = useState([]);
  const [recentCalls, setRecentCalls] = useState([]);

  useEffect(() => {
    fetchExtensions();
    loadRecentCalls();
  }, []);

  const fetchExtensions = async () => {
    try {
      const response = await api.get('/api/extensions');
      setExtensions(response.data);
    } catch (err) {
      console.error('Error fetching extensions:', err);
    }
  };

  const loadRecentCalls = () => {
    const saved = localStorage.getItem('recentClickToCalls');
    if (saved) {
      setRecentCalls(JSON.parse(saved));
    }
  };

  const saveRecentCall = (call) => {
    const updated = [call, ...recentCalls.filter(c => 
      !(c.origem === call.origem && c.destino === call.destino)
    )].slice(0, 10);
    setRecentCalls(updated);
    localStorage.setItem('recentClickToCalls', JSON.stringify(updated));
  };

  const handleCall = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCallStatus(null);

    try {
      const response = await api.post('/api/clickToCall', {
        origem,
        destino
      });

      setCallStatus({
        success: true,
        message: 'Chamada iniciada com sucesso!',
        data: response.data
      });

      saveRecentCall({
        origem,
        destino,
        timestamp: new Date().toISOString()
      });

    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao iniciar chamada');
      setCallStatus({
        success: false,
        message: err.response?.data?.error || 'Falha ao iniciar chamada'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickCall = (call) => {
    setOrigem(call.origem);
    setDestino(call.destino);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Click-to-Call</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formulário de Chamada */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <PhoneCall className="w-6 h-6 text-blue-600" />
            <h2 className="text-lg font-semibold">Iniciar Chamada</h2>
          </div>

          <form onSubmit={handleCall} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 inline mr-1" />
                Ramal de Origem *
              </label>
              <select
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Selecione o ramal</option>
                {extensions.map(ext => (
                  <option key={ext.extension} value={ext.extension}>
                    {ext.extension} - {ext.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Ramal que receberá a chamada primeiro
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Hash className="w-4 h-4 inline mr-1" />
                Número de Destino *
              </label>
              <input
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Ex: 11999999999 ou 1001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Número externo ou ramal interno para conectar
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !origem || !destino}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Chamando...
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  Iniciar Chamada
                </>
              )}
            </button>
          </form>

          {/* Status da Chamada */}
          {callStatus && (
            <div className={`mt-4 p-4 rounded-lg ${
              callStatus.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {callStatus.success ? (
                  <PhoneCall className="w-5 h-5 text-green-600" />
                ) : (
                  <PhoneOff className="w-5 h-5 text-red-600" />
                )}
                <span className={callStatus.success ? 'text-green-700' : 'text-red-700'}>
                  {callStatus.message}
                </span>
              </div>
              {callStatus.data && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>ID: {callStatus.data.uniqueid}</p>
                </div>
              )}
            </div>
          )}

          {error && !callStatus && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
        </div>

        {/* Chamadas Recentes */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-gray-600" />
            <h2 className="text-lg font-semibold">Chamadas Recentes</h2>
          </div>

          {recentCalls.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma chamada recente
            </p>
          ) : (
            <div className="space-y-2">
              {recentCalls.map((call, index) => (
                <div
                  key={index}
                  onClick={() => handleQuickCall(call)}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-800">
                        {call.origem} → {call.destino}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(call.timestamp).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOrigem(call.origem);
                      setDestino(call.destino);
                    }}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instruções */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Como funciona o Click-to-Call?</h3>
        <ol className="list-decimal list-inside text-sm text-blue-700 space-y-1">
          <li>Selecione o ramal de origem (seu ramal ou do atendente)</li>
          <li>Digite o número de destino (externo ou ramal interno)</li>
          <li>Clique em "Iniciar Chamada"</li>
          <li>O ramal de origem irá tocar primeiro</li>
          <li>Ao atender, o sistema discará automaticamente para o destino</li>
        </ol>
      </div>
    </div>
  );
}

export default ClickToCall;
