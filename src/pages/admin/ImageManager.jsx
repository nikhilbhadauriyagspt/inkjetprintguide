import { useState, useEffect } from 'react';
import { Image, CheckCircle2, AlertCircle, Zap, RefreshCw, FolderOpen, ImageIcon } from 'lucide-react';
import API_BASE_URL from '../../config';

const LOCAL_BRIDGE_URL = 'http://localhost:5050';

export default function ImageManager() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'optimized'
  const [folders, setFolders] = useState([
    { name: 'public/products', total: 0, optimized: 0, pending: 0 },
    { name: 'public/category', total: 0, optimized: 0, pending: 0 },
    { name: 'public/newproimges', total: 0, optimized: 0, pending: 0 },
    { name: 'public/about', total: 0, optimized: 0, pending: 0 },
    { name: 'public/midbanner', total: 0, optimized: 0, pending: 0 },
    { name: 'public/banner', total: 0, optimized: 0, pending: 0 },
    { name: 'public/productsgrid', total: 0, optimized: 0, pending: 0 }
  ]);
  const [images, setImages] = useState([]);
  const [optimizing, setOptimizing] = useState(false);
  const [status, setStatus] = useState('');
  const [usingLocalBridge, setUsingLocalBridge] = useState(false);

  useEffect(() => {
    fetchImageStatus();
  }, []);

  const fetchImageStatus = async () => {
    setLoading(true);
    try {
      // Try local bridge first
      const response = await fetch(`${LOCAL_BRIDGE_URL}/images/status`);
      const data = await response.json();
      if (data.status === 'success') {
        setFolders(data.data.folders || []);
        setImages(data.data.images || []);
        setUsingLocalBridge(true);
        setStatus('Connected to local admin-bridge');
      } else {
        mockData();
      }
    } catch (err) {
      console.warn('Local bridge not running, using mock data.');
      setUsingLocalBridge(false);
      mockData();
    } finally {
      setLoading(false);
    }
  };

  const mockData = () => {
    // Mock folders with more realistic counts
    setFolders([
      { name: 'public/products', total: 20, optimized: 18, pending: 2 },
      { name: 'public/category', total: 12, optimized: 12, pending: 0 },
      { name: 'public/newproimges', total: 15, optimized: 10, pending: 5 },
      { name: 'public/about', total: 8, optimized: 8, pending: 0 },
      { name: 'public/midbanner', total: 10, optimized: 10, pending: 0 },
      { name: 'public/banner', total: 4, optimized: 1, pending: 3 },
      { name: 'public/productsgrid', total: 30, optimized: 30, pending: 0 }
    ]);

    // Mock images including the ones user mentioned in banner
    const mockImages = [
      { id: 1, name: 'banner_01.png', folder: '/banner', size: '1.4 MB', status: 'pending', formats: [] },
      { id: 2, name: 'banner_02.png', folder: '/banner', size: '433 KB', status: 'pending', formats: [] },
      { id: 3, name: 'banner_03.png', folder: '/banner', size: '1.2 MB', status: 'pending', formats: [] },
      { id: 4, name: 'banner-5.png', folder: '/banner', size: '1.5 MB', status: 'optimized', formats: ['AVIF', 'WEBP'] },
      { id: 5, name: 'product-101.jpg', folder: '/products', size: '890 KB', status: 'pending', formats: [] },
      { id: 6, name: 'category-icon.png', folder: '/category', size: '120 KB', status: 'optimized', formats: ['AVIF', 'WEBP'] },
      { id: 7, name: 'about-hero.jpg', folder: '/about', size: '2.1 MB', status: 'optimized', formats: ['AVIF', 'WEBP'] },
    ];

    for (let i = 8; i <= 20; i++) {
      mockImages.push({
        id: i,
        name: `asset-${i}.jpg`,
        folder: '/products',
        size: '500 KB',
        status: 'optimized',
        formats: ['AVIF', 'WEBP']
      });
    }

    setImages(mockImages);
  };

  const handleOptimize = async (folderName = 'all') => {
    setOptimizing(true);
    setStatus(`Optimizing ${folderName === 'all' ? 'all images' : folderName}...`);

    if (usingLocalBridge) {
      try {
        const response = await fetch(`${LOCAL_BRIDGE_URL}/images/optimize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: folderName })
        });
        const data = await response.json();
        if (data.status === 'success') {
          setStatus('Success: Local optimization complete!');
          fetchImageStatus();
        } else {
          setStatus('Error: ' + data.message);
        }
      } catch (err) {
        setStatus('Error: Could not connect to local bridge.');
      } finally {
        setOptimizing(false);
      }
    } else {
      // Simulate process for mock
      setTimeout(() => {
        setImages(prev => prev.map(img => ({ ...img, status: 'optimized' })));
        setFolders(prev => prev.map(f => ({ ...f, optimized: f.total, pending: 0 })));
        setStatus('Success: Mock optimization complete!');
        setOptimizing(false);
        setActiveTab('optimized');
      }, 2000);
    }
  };

  const filteredImages = images.filter(img => img.status === activeTab);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Image Management</h1>
          <p className="text-slate-500 mt-1">Monitor and optimize your website assets for better performance.</p>
        </div>

        <button
          onClick={() => handleOptimize('all')}
          disabled={optimizing || images.filter(i => i.status === 'pending').length === 0}
          className="flex items-center gap-2 bg-[#4254e8] hover:bg-[#045a6e] text-white px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-[#4254e8]/20"
        >
          {optimizing ? <RefreshCw size={20} className="animate-spin" /> : <Zap size={20} />}
          Optimize All Pending
        </button>
      </div>

      {status && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${status.includes('Error') ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-blue-50 text-blue-700 border border-blue-100'}`}>
          {status.includes('Error') ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          <p className="text-sm font-bold">{status}</p>
        </div>
      )}

      {/* Folders Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {folders.map((folder, index) => (
          <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 truncate text-sm">{folder.name.split('/').pop()}</h3>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">{folder.pending}</p>
                <p className="text-[10px] font-bold text-orange-400 uppercase">Pending</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-500">{folder.optimized}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Optimized</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs and Image List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100">
          <div className="flex px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'pending' ? 'border-[#4254e8] text-[#4254e8]' : 'border-transparent text-slate-400'}`}
            >
              Pending ({images.filter(i => i.status === 'pending').length})
            </button>
            <button
              onClick={() => setActiveTab('optimized')}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'optimized' ? 'border-[#4254e8] text-[#4254e8]' : 'border-transparent text-slate-400'}`}
            >
              Optimized ({images.filter(i => i.status === 'optimized').length})
            </button>
          </div>
        </div>

        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Folder</th>
                <th className="px-6 py-4">Status</th>
                {activeTab === 'optimized' && <th className="px-6 py-4">Formats</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredImages.length > 0 ? (
                filteredImages.map((img) => (
                  <tr key={img.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="h-10 w-10 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                        <img src={`/logo/fabicon.png`} alt="" className="h-full w-full object-cover" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{img.name}</p>
                      <p className="text-[10px] text-slate-400">{img.size}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{img.folder}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 font-bold text-xs ${img.status === 'optimized' ? 'text-emerald-500' : 'text-orange-400'}`}>
                        {img.status === 'optimized' ? <CheckCircle2 size={14} /> : <RefreshCw size={14} className={optimizing ? "animate-spin" : ""} />}
                        {img.status.charAt(0).toUpperCase() + img.status.slice(1)}
                      </div>
                    </td>
                    {activeTab === 'optimized' && (
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {img.formats.map(f => (
                            <span key={f} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-bold">{f}</span>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center">
                      <ImageIcon size={40} className="text-slate-200 mb-3" />
                      <p className="text-slate-400 font-medium">No {activeTab} images found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
