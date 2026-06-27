import { createClient } from '@sanity/client';
import { safeLocalStorage as localStorage } from '../../utils/safeLocalStorage';
import {
  mockServices,
  mockArticles,
  mockTaxUpdates,
  mockResources,
  mockTeam,
  mockTaxDeadlines
} from '../../data/mockData';

// Dynamic Sanity client creator for administrative CRUD mutations
export const getCustomSanityClient = () => {
  const projectId = localStorage.getItem('sanity_project_id') || import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = localStorage.getItem('sanity_dataset') || import.meta.env.VITE_SANITY_DATASET || 'production';
  const token = localStorage.getItem('sanity_write_token');
  const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-06-20';

  const isConfigured = projectId && projectId.trim() !== '' && projectId !== 'YOUR_SANITY_PROJECT_ID';

  if (!isConfigured) return null;

  try {
    return createClient({
      projectId: projectId.trim(),
      dataset: dataset.trim(),
      apiVersion,
      token: token ? token.trim() : undefined,
      useCdn: false, // Must be false for mutations and real-time operations
    });
  } catch (err) {
    console.error('Failed to create custom Sanity client:', err);
    return null;
  }
};

const initLocalStorage = () => {};

/**
 * UTILS FOR LOCAL STORAGE CRUD
 */
const getLocalStorageData = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn(`Error parsing localStorage key ${key}`, err);
  }

  // Return the mock fallback data if localStorage has no data for the key or it is empty
  switch (key) {
    case 'cms_services':
      return mockServices;
    case 'cms_articles':
      return mockArticles;
    case 'cms_tax_updates':
      return mockTaxUpdates;
    case 'cms_resources':
      return mockResources;
    case 'cms_team':
      return mockTeam;
    case 'cms_tax_deadlines':
      return mockTaxDeadlines;
    default:
      return [];
  }
};

const saveLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Helper to prevent infinite hangs on Sanity fetch
const withTimeout = (promise, ms = 8000) => {
  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Sanity request timed out')), ms);
  });
  return Promise.race([ promise, timeoutPromise ]).finally(() => clearTimeout(timeoutId));
};

export const cmsService = {
  // SERVICES
  async getServices() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "service"] {
          "id": _id,
          title,
          "slug": slug.current,
          category,
          description,
          icon,
          features,
          benefits
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          // Sync to cache
          saveLocalStorageData('cms_services', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_services');
  },

  async createService(item) {
    const freshItem = {
      id: item.id || `service-${Date.now()}`,
      ...item,
    };

    // 1. Sanity Mutation (if configured)
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'service',
          _id: freshItem.id,
          title: freshItem.title,
          slug: { _type: 'slug', current: freshItem.id },
          category: freshItem.category,
          description: freshItem.description,
          icon: freshItem.icon,
          features: freshItem.features || [],
          benefits: freshItem.benefits || [],
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity creation failed:', err);
        throw new Error(`Sanity upload failed: ${err.message}`);
      }
    }

    // 2. Local fallback
    const items = getLocalStorageData('cms_services');
    const existingIdx = items.findIndex(i => i.id === freshItem.id);
    if (existingIdx > -1) {
      items[existingIdx] = freshItem;
    } else {
      items.unshift(freshItem);
    }
    saveLocalStorageData('cms_services', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateService(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(
          client.patch(id)
          .set({
            title: updated.title,
            category: updated.category,
            description: updated.description,
            icon: updated.icon,
            features: updated.features || [],
            benefits: updated.benefits || [],
          })
          .commit());
      } catch (err) {
        console.error('Sanity update failed:', err);
        throw new Error(`Sanity patch failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_services');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_services', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteService(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_services');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_services', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  },

  // ARTICLES
  async getArticles() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "article" || _type == "insight"] | order(publishDate desc) {
          "id": _id,
          title,
          "slug": slug.current,
          excerpt,
          content,
          "date": coalesce(publishDate, _createdAt),
          category,
          "featuredImage": featuredImage.asset->url,
          "readTime": readTime,
          "author": author,
          featured
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          saveLocalStorageData('cms_articles', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_articles');
  },

  async createArticle(item) {
    const freshItem = {
      id: item.id || `article-${Date.now()}`,
      date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      ...item,
    };

    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'article',
          _id: freshItem.id,
          title: freshItem.title,
          slug: { _type: 'slug', current: freshItem.id },
          excerpt: freshItem.excerpt,
          content: freshItem.content,
          publishDate: new Date().toISOString().split('T')[0],
          category: freshItem.category,
          readTime: freshItem.readTime || '5 min read',
          author: freshItem.author || 'P. Suuresh, FCA',
          featured: freshItem.featured || false,
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity creation failed:', err);
        throw new Error(`Sanity upload failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_articles');
    const existingIdx = items.findIndex(i => i.id === freshItem.id);
    if (existingIdx > -1) {
      items[existingIdx] = freshItem;
    } else {
      items.unshift(freshItem);
    }
    saveLocalStorageData('cms_articles', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateArticle(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(
          client.patch(id)
          .set({
            title: updated.title,
            excerpt: updated.excerpt,
            content: updated.content,
            category: updated.category,
            readTime: updated.readTime || '5 min read',
            author: updated.author || 'P. Suuresh, FCA',
            featured: updated.featured || false,
          })
          .commit());
      } catch (err) {
        console.error('Sanity update failed:', err);
        throw new Error(`Sanity patch failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_articles');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_articles', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteArticle(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_articles');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_articles', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  },

  // TAX UPDATES
  async getTaxUpdates() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "taxUpdate" || _type == "govUpdate"] | order(publishDate desc) {
          "id": _id,
          title,
          "slug": slug.current,
          summary,
          content,
          "date": coalesce(publishDate, _createdAt),
          source,
          importance,
          category,
          guidelines
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          saveLocalStorageData('cms_tax_updates', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_tax_updates');
  },

  async createTaxUpdate(item) {
    const freshItem = {
      id: item.id || `tax-update-${Date.now()}`,
      date: item.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      guidelines: item.guidelines || [],
      ...item,
    };

    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'taxUpdate',
          _id: freshItem.id,
          title: freshItem.title,
          slug: { _type: 'slug', current: freshItem.id },
          summary: freshItem.summary,
          content: freshItem.content || freshItem.summary,
          publishDate: new Date().toISOString().split('T')[0],
          source: freshItem.source || 'Internal Revenue Service (IRS)',
          importance: freshItem.importance || 'medium',
          category: freshItem.category || 'IRS Updates',
          guidelines: freshItem.guidelines || [],
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity creation failed:', err);
        throw new Error(`Sanity upload failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_tax_updates');
    const existingIdx = items.findIndex(i => i.id === freshItem.id);
    if (existingIdx > -1) {
      items[existingIdx] = freshItem;
    } else {
      items.unshift(freshItem);
    }
    saveLocalStorageData('cms_tax_updates', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateTaxUpdate(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(
          client.patch(id)
          .set({
            title: updated.title,
            summary: updated.summary,
            source: updated.source,
            importance: updated.importance,
            category: updated.category || updated.topic,
            guidelines: updated.guidelines || [],
          })
          .commit());
      } catch (err) {
        console.error('Sanity update failed:', err);
        throw new Error(`Sanity patch failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_tax_updates');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_tax_updates', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteTaxUpdate(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_tax_updates');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_tax_updates', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  },

  // RESOURCES
  async getResources() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "resource"] {
          "id": _id,
          title,
          type,
          description,
          downloadLink,
          "fileSize": coalesce(fileSize, "N/A"),
          category
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          saveLocalStorageData('cms_resources', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_resources');
  },

  async createResource(item) {
    const freshItem = {
      id: item.id || `resource-${Date.now()}`,
      ...item,
    };

    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'resource',
          _id: freshItem.id,
          title: freshItem.title,
          type: freshItem.type,
          description: freshItem.description,
          fileSize: freshItem.fileSize || '1.0 MB',
          downloadLink: freshItem.downloadLink || '#',
          category: freshItem.category,
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity creation failed:', err);
        throw new Error(`Sanity upload failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_resources');
    const existingIdx = items.findIndex(i => i.id === freshItem.id);
    if (existingIdx > -1) {
      items[existingIdx] = freshItem;
    } else {
      items.unshift(freshItem);
    }
    saveLocalStorageData('cms_resources', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateResource(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(
          client.patch(id)
          .set({
            title: updated.title,
            type: updated.type,
            description: updated.description,
            fileSize: updated.fileSize,
            downloadLink: updated.downloadLink,
            category: updated.category,
          })
          .commit());
      } catch (err) {
        console.error('Sanity update failed:', err);
        throw new Error(`Sanity patch failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_resources');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_resources', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteResource(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_resources');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_resources', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  },

  // TEAM MEMBERS
  async getTeam() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "teamMember" || _type == "team"] {
          "id": _id,
          name,
          "role": coalesce(designation, role),
          bio,
          "profileImage": profileImage.asset->url,
          expertise,
          credentials
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          saveLocalStorageData('cms_team', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_team');
  },

  async createTeamMember(item) {
    const freshItem = {
      id: item.id || `team-${Date.now()}`,
      expertise: item.expertise || [],
      credentials: item.credentials || [],
      ...item,
    };

    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'teamMember',
          _id: freshItem.id,
          name: freshItem.name,
          designation: freshItem.role,
          bio: freshItem.bio,
          expertise: freshItem.expertise || [],
          credentials: freshItem.credentials || [],
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity creation failed:', err);
        throw new Error(`Sanity upload failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_team');
    const existingIdx = items.findIndex(i => i.id === freshItem.id);
    if (existingIdx > -1) {
      items[existingIdx] = freshItem;
    } else {
      items.unshift(freshItem);
    }
    saveLocalStorageData('cms_team', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateTeamMember(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(
          client.patch(id)
          .set({
            name: updated.name,
            designation: updated.role,
            bio: updated.bio,
            expertise: updated.expertise || [],
            credentials: updated.credentials || [],
          })
          .commit());
      } catch (err) {
        console.error('Sanity update failed:', err);
        throw new Error(`Sanity patch failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_team');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_team', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteTeamMember(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_team');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_team', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  },

  async getTaxDeadlines() {
    const client = getCustomSanityClient();
    if (client) {
      try {
        const query = `*[_type == "taxDeadline"] {
          "id": _id,
          event,
          date,
          category,
          description
        }`;
        const docs = await withTimeout(client.fetch(query));
        if (Array.isArray(docs) && docs.length > 0) {
          saveLocalStorageData('cms_tax_deadlines', docs);
          return docs;
        }
      } catch (err) {
        console.warn('Sanity read failed, using localStorage cache:', err);
      }
    }
    return getLocalStorageData('cms_tax_deadlines');
  },

  async createTaxDeadline(item) {
    const freshItem = {
      id: item.id || `deadline-${Date.now()}`,
      ...item,
    };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        const doc = {
          _type: 'taxDeadline',
          _id: freshItem.id,
          event: freshItem.event,
          date: freshItem.date,
          category: freshItem.category,
          description: freshItem.description,
        };
        await withTimeout(client.createOrReplace(doc));
      } catch (err) {
        console.error('Sanity write failed:', err);
      }
    }

    const items = getLocalStorageData('cms_tax_deadlines');
    items.unshift(freshItem);
    saveLocalStorageData('cms_tax_deadlines', items);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return freshItem;
  },

  async updateTaxDeadline(id, item) {
    const updated = { id, ...item };
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.patch(id).set({
          event: updated.event,
          date: updated.date,
          category: updated.category,
          description: updated.description,
        }).commit());
      } catch (err) {
        console.error('Sanity patch failed:', err);
      }
    }

    const items = getLocalStorageData('cms_tax_deadlines');
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      items[idx] = updated;
      saveLocalStorageData('cms_tax_deadlines', items);
    }
    if (client) await new Promise(r => setTimeout(r, 1200));
    return updated;
  },

  async deleteTaxDeadline(id) {
    const client = getCustomSanityClient();
    if (client) {
      if (!localStorage.getItem('sanity_write_token')) {
        throw new Error('Sanity Project ID is configured, but Write Token is missing. Please add it in Settings.');
      }
      try {
        await withTimeout(client.delete(id));
      } catch (err) {
        console.error('Sanity delete failed:', err);
      }
    }

    const items = getLocalStorageData('cms_tax_deadlines');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_tax_deadlines', filtered);
    if (client) await new Promise(r => setTimeout(r, 1200));
    return true;
  }
};
