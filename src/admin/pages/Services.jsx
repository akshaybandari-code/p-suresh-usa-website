import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { 
  Briefcase, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  ShieldAlert,
  Scale,
  BadgePercent,
  Globe,
  Award,
  HelpCircle,
  FileCheck,
  Landmark,
  Percent,
  Receipt,
  ShieldCheck,
  Users,
  BookOpen,
  Calendar,
  TrendingUp
} from 'lucide-react';

const iconMap = {
  Briefcase,
  FileText,
  ShieldAlert,
  Scale,
  BadgePercent,
  Globe,
  Award,
  HelpCircle,
  FileCheck,
  Landmark,
  Percent,
  Receipt,
  ShieldCheck,
  Users,
  BookOpen,
  Calendar,
  TrendingUp
};

export default function Services() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'individual',
    description: '',
    icon: 'FileText',
    features: '',
    benefits: '',
  });

  // Delete dialog states
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Toast status banners
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getServices();
      setServices(data || []);
    } catch (err) {
      showToast('Error retrieving services database.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Sync / filter
  useEffect(() => {
    const output = services.filter((item) => {
      const matchSearch = 
        (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

      return matchSearch && matchCategory;
    });

    setFilteredServices(output);
    setCurrentPage(1);
  }, [services, searchTerm, selectedCategory]);

  // Paginated chunk
  const paginatedItems = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreateForm = () => {
    setFormData({
      id: '',
      title: '',
      category: 'individual',
      description: '',
      icon: 'FileText',
      features: '',
      benefits: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setFormData({
      id: item.id,
      title: item.title || '',
      category: item.category || 'individual',
      description: item.description || '',
      icon: item.icon || 'FileText',
      features: Array.isArray(item.features) ? item.features.join('\n') : (item.features || ''),
      benefits: Array.isArray(item.benefits) ? item.benefits.join('\n') : (item.benefits || ''),
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast('A distinct service title is required.', 'danger');
      return;
    }

    // Convert newline-separated strings into formal lists
    const featuresList = formData.features
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f !== '');
    
    const benefitsList = formData.benefits
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b !== '');

    const parsedItem = {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      icon: formData.icon.trim() || 'FileText',
      features: featuresList,
      benefits: benefitsList,
    };

    try {
      if (isEditing) {
        await cmsService.updateService(formData.id, parsedItem);
        showToast('Service updated successfully.');
      } else {
        parsedItem.id = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await cmsService.createService(parsedItem);
        showToast('Service created successfully.');
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (err) {
      showToast(`Action failed: ${err.message}`, 'danger');
    }
  };

  const handleOpenDeleteDialog = (item) => {
    setItemToDelete(item);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await cmsService.deleteService(itemToDelete.id);
      showToast('Service deleted permanently.');
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchServices();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const columns = [
    {
      header: 'Icon',
      accessor: 'icon',
      render: (row, val) => {
        const IconComponent = iconMap[val] || FileText;
        return (
          <div className="flex items-center gap-2 select-none">
            <span className="p-1.5 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 flex items-center justify-center">
              <IconComponent className="w-4 h-4 shrink-0" />
            </span>
            <span className="text-[10px] font-mono text-theme-text-secondary select-all font-semibold uppercase">
              {val || 'FileText'}
            </span>
          </div>
        );
      }
    },
    {
      header: 'Title',
      accessor: 'title',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary">
          <p>{val}</p>
          <p className="text-[10px] font-mono text-theme-text-secondary font-medium select-all opacity-60">ID: {row.id}</p>
        </div>
      )
    },
    {
      header: 'Category',
      accessor: 'category',
      render: (row, val) => (
        <span className={`px-2.5 py-0.5 rounded-full font-mono font-bold text-[9px] border uppercase select-none ${
          val === 'corporate' 
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
            : 'bg-theme-surface text-theme-text-secondary border-theme-border'
        }`}>
          {val}
        </span>
      )
    },
    {
      header: 'Features count',
      accessor: 'features',
      render: (row, val) => <span className="font-mono font-bold">{(val || []).length} lines</span>
    },
    {
      header: 'Client Benefits count',
      accessor: 'benefits',
      render: (row, val) => <span className="font-mono font-bold">{(val || []).length} items</span>
    }
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Alert capsule */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'danger' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
        }`}>
          {toast.type === 'danger' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span className="font-sans font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header element */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase">MODULE</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Corporate & Individual Services
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Create, modify, and manage advisory services offered to overseas and resident clients.
          </p>
        </div>
      </div>

      {/* Control panel: SearchBar and Category selectors */}
      <SearchBar
        id="services-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Filter services by title or description details..."
        categories={[
          { label: 'All Categories', value: 'all' },
          { label: 'Individual Clients', value: 'individual' },
          { label: 'Corporate Ventures', value: 'corporate' }
        ]}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onCreate={handleOpenCreateForm}
        createLabel="Add New Service"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel="No matching services located in database."
      />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredServices.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Create/Edit Modal Container */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Service Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. US Expat Streamlined Compliance Program"
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Client Segment Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-theme-surface border border-theme-border focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
              >
                <option value="individual">Individual Practitioner</option>
                <option value="corporate">Corporate Venture</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Lucide Icon Identifier
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g. FileText, ShieldAlert, Scale, Globe"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide a comprehensive detailed overview of the legal/tax target..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
                <span>Key Features Checklist</span>
                <span className="text-[9px] lowercase font-normal italic opacity-60">separate lines by enter key</span>
              </label>
              <textarea
                rows={5}
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Detailed compliance step 1&#10;Detailed compliance step 2&#10;Structured reporting analysis"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary font-mono focus:outline-hidden leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
                <span>Direct Client Benefits</span>
                <span className="text-[9px] lowercase font-normal italic opacity-60">separate lines by enter key</span>
              </label>
              <textarea
                rows={5}
                value={formData.benefits}
                onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                placeholder="Prevents duplication under treaty rules&#10;Minimizes aggregate exposure&#10;Verified filing portal proofs"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary font-mono focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-theme-border flex items-center justify-end gap-3.5">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-theme-surface border border-theme-border rounded-lg text-xs font-semibold text-theme-text-secondary hover:text-theme-text-primary transition-colors cursor-pointer"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-3xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : 'Create Service'}</span>
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Verifier dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Confirm Service Deletion"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this service'}" permanently? This action cannot be undone.`}
      />
    </div>
  );
}
