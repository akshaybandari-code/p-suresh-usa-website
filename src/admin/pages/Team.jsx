import React, { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { cmsService } from '../services/cmsService';
import { Users, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    bio: '',
    expertise: '',
    credentials: '',
    profileImage: '',
    usMarketExperience: '',
  });

  // Delete checklist triggers
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Status warnings
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  };

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getTeam();
      setTeam(data || []);
    } catch (err) {
      showToast('Error loading partner rosters.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Sync list filtering
  useEffect(() => {
    const output = team.filter((item) => {
      const matchSearch = 
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.bio || '').toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchSearch;
    });

    setFilteredTeam(output);
    setCurrentPage(1);
  }, [team, searchTerm]);

  const paginatedItems = filteredTeam.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenCreateForm = () => {
    setFormData({
      id: '',
      name: '',
      role: 'Cross-Border Advisory Partner',
      bio: '',
      expertise: 'Bilateral Double Taxation\nFEMA Capital Outflow Rules\nForm 8938 threshold reviews',
      credentials: 'Chartered Accountant (ACA / FCA), ICAI\nOver 10 years of practice licensing',
      profileImage: '',
      usMarketExperience: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (item) => {
    setFormData({
      id: item.id,
      name: item.name || '',
      role: item.role || item.designation || '',
      bio: item.bio || '',
      expertise: Array.isArray(item.expertise) ? item.expertise.join('\n') : (item.expertise || ''),
      credentials: Array.isArray(item.credentials) ? item.credentials.join('\n') : (item.credentials || ''),
      profileImage: item.profileImage || '',
      usMarketExperience: item.usMarketExperience || '',
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('A team member name is required.', 'danger');
      return;
    }

    const expertiseArr = formData.expertise
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const credentialsArr = formData.credentials
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const parsedItem = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      designation: formData.role.trim(), // Support dual role key terms
      bio: formData.bio.trim(),
      expertise: expertiseArr,
      credentials: credentialsArr,
      profileImage: formData.profileImage.trim(),
      usMarketExperience: formData.usMarketExperience.trim(),
    };

    try {
      if (isEditing) {
        await cmsService.updateTeamMember(formData.id, parsedItem);
        showToast('Team member updated successfully.');
      } else {
        parsedItem.id = formData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
        await cmsService.createTeamMember(parsedItem);
        showToast('Team member created successfully.');
      }
      setIsModalOpen(false);
      fetchTeam();
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
      await cmsService.deleteTeamMember(itemToDelete.id);
      showToast('Team member deleted successfully.');
      setIsConfirmOpen(false);
      setItemToDelete(null);
      fetchTeam();
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'danger');
    }
  };

  const columns = [
    {
      header: 'Profile Photo',
      accessor: 'profileImage',
      render: (row, val) => {
        const initials = (row.name || '').split(' ').map((n) => n[0]).join('').replace(',', '').substring(0, 2);
        return (
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-500/20 to-amber-500/5 border border-theme-border flex items-center justify-center font-bold text-amber-500 text-xs overflow-hidden select-none shrink-0">
            {val ? (
              <img src={val} alt={row.name} className="w-full h-full object-cover" />
            ) : (
              <span>{initials}</span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Member Name',
      accessor: 'name',
      render: (row, val) => (
        <div className="text-left font-semibold text-theme-text-primary space-y-0.5">
          <p>{val}</p>
          <p className="text-[10px] font-mono text-theme-text-secondary select-none opacity-60">
            Role: {row.role || row.designation}
          </p>
        </div>
      )
    },
    {
      header: 'Credentials',
      accessor: 'credentials',
      render: (row, val) => {
        const items = Array.isArray(val) ? val : [];
        return (
          <div className="flex flex-col gap-0.5 max-w-xs select-none text-left">
            {items.slice(0, 2).map((cred, idx) => (
              <span key={idx} className="font-sans text-[10px] text-theme-text-secondary truncate font-semibold" title={cred}>
                • {cred}
              </span>
            ))}
            {items.length > 2 && (
              <span className="text-[9px] font-mono font-bold text-amber-500 pl-2">+{items.length - 2} more</span>
            )}
          </div>
        );
      }
    },
    {
      header: 'Expertise Count',
      accessor: 'expertise',
      render: (row, val) => (
        <span className="font-mono font-bold text-[10px] px-2.5 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full inline-block">
          {Array.isArray(val) ? val.length : 0} Areas
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6 select-none animate-in fade-in duration-200 text-left relative">
      
      {/* Toast Warnings */}
      {toast.message && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg border text-xs flex items-center gap-3 animate-in slide-in-from-top-4 duration-350 ${
          toast.type === 'danger' 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
        }`}>
          {toast.type === 'danger' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          <span className="font-sans font-bold">{toast.message}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-amber-500 font-bold uppercase font-sans">MODULE</p>
          <h2 className="text-2xl font-extrabold font-display tracking-tight text-theme-text-primary">
            Team Members
          </h2>
          <p className="text-xs text-theme-text-secondary">
            Manage your professional team, credentials, and profile details.
          </p>
        </div>
      </div>

      {/* Filters SearchBar */}
      <SearchBar
        id="team-search-filter-panel"
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Filter partners by name, designation role descriptions..."
        onCreate={handleOpenCreateForm}
        createLabel="Add Team Member"
      />

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={paginatedItems}
        loading={loading}
        onEdit={handleOpenEditForm}
        onDelete={handleOpenDeleteDialog}
        emptyLabel="No team members found."
      />

      {/* Pagination control */}
      <Pagination
        currentPage={currentPage}
        totalItems={filteredTeam.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Form editing modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? 'Edit Team Member' : 'Add Team Member'}
      >
        <form onSubmit={handleSaveSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5 font-sans">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Patel, CPA"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans font-semibold"
              />
            </div>

            <div className="space-y-1.5 font-sans">
              <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
                Role
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Managing Partner - Cross-Border Tax"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-sans"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
              <span>Profile Image URL</span>
              <span className="text-[10px] lowercase font-normal italic opacity-60">Leave empty to auto-generate letter-initial avatar</span>
            </label>
            <input
              type="text"
              value={formData.profileImage}
              onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              placeholder="e.g. https://images.unsplash.com/photo-..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all font-mono text-[10px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
                <span>Expertise</span>
                <span className="text-[9px] lowercase font-normal italic opacity-60">separate by new lines</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.expertise}
                onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                placeholder="Core treaty applications&#10;FEMA outward remittances&#10;Form 8938 asset indexes"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary font-mono focus:outline-hidden leading-relaxed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-wider font-extrabold text-theme-text-secondary flex justify-between">
                <span>Credentials</span>
                <span className="text-[9px] lowercase font-normal italic opacity-60">separate by new lines</span>
              </label>
              <textarea
                rows={4}
                required
                value={formData.credentials}
                onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                placeholder="Fellow Chartered Accountant (FCA), ICAI&#10;Certified Public Accountant (CPA), New York&#10;Over 15 Years of active practice"
                className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg p-3 text-xs text-theme-text-primary font-mono focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              Biography
            </label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Ramesh focuses on dual-jurisdiction expatriate compliances, Streamlined Disclosures, and FEMA outward certifications..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all leading-relaxed text-[11px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono text-2xs uppercase tracking-wider font-extrabold text-theme-text-secondary">
              US Market Experience
            </label>
            <textarea
              rows={2}
              value={formData.usMarketExperience}
              onChange={(e) => setFormData({ ...formData, usMarketExperience: e.target.value })}
              placeholder="e.g. Managing cross-border compliance for non-resident Indian clients filing US returns..."
              className="w-full bg-theme-surface border border-theme-border hover:border-theme-border/80 focus:border-amber-500 rounded-lg px-3 py-2 text-xs text-theme-text-primary focus:outline-hidden transition-all leading-relaxed text-[11px]"
            />
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
              <span>{isEditing ? 'Save Member' : 'Create Member'}</span>
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
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${itemToDelete?.name || 'this profile'}"? This action cannot be undone.`}
      />
    </div>
  );
}
