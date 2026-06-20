import { createClient } from '@sanity/client';
import { servicesData, blogPosts, govUpdatesData, resourcesData, teamData } from '../../data/mockData';

// Dynamic Sanity client creator for administrative CRUD mutations
export const getCustomSanityClient = () => {
  const projectId = localStorage.getItem('sanity_project_id') || import.meta.env.VITE_SANITY_PROJECT_ID;
  const dataset = localStorage.getItem('sanity_dataset') || import.meta.env.VITE_SANITY_DATASET || 'production';
  const token = localStorage.getItem('sanity_write_token');
  const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2026-06-20';

  const isConfigured = projectId && projectId.trim() !== '' && projectId !== 'YOUR_SANITY_PROJECT_ID';

  if (!isConfigured) return null;

  return createClient({
    projectId: projectId.trim(),
    dataset: dataset.trim(),
    apiVersion,
    token: token ? token.trim() : undefined,
    useCdn: false, // Must be false for mutations and real-time operations
  });
};

// Initialize localStorage fallback state if not already populated
const initLocalStorage = () => {
  if (!localStorage.getItem('cms_services')) {
    localStorage.setItem('cms_services', JSON.stringify(servicesData));
  }
  if (!localStorage.getItem('cms_articles')) {
    localStorage.setItem('cms_articles', JSON.stringify(blogPosts));
  }
  if (!localStorage.getItem('cms_tax_updates')) {
    localStorage.setItem('cms_tax_updates', JSON.stringify(govUpdatesData));
  }
  if (!localStorage.getItem('cms_resources')) {
    localStorage.setItem('cms_resources', JSON.stringify(resourcesData));
  }
  if (!localStorage.getItem('cms_team')) {
    localStorage.setItem('cms_team', JSON.stringify(teamData));
  }
};

initLocalStorage();

/**
 * UTILS FOR LOCAL STORAGE CRUD
 */
const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

const saveLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
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
        const docs = await client.fetch(query);
        if (docs && docs.length > 0) {
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
    if (client && localStorage.getItem('sanity_write_token')) {
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
        await client.createOrReplace(doc);
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
    return freshItem;
  },

  async updateService(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client
          .patch(id)
          .set({
            title: updated.title,
            category: updated.category,
            description: updated.description,
            icon: updated.icon,
            features: updated.features || [],
            benefits: updated.benefits || [],
          })
          .commit();
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
    return updated;
  },

  async deleteService(id) {
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client.delete(id);
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_services');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_services', filtered);
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
        const docs = await client.fetch(query);
        if (docs && docs.length > 0) {
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
    if (client && localStorage.getItem('sanity_write_token')) {
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
        await client.createOrReplace(doc);
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
    return freshItem;
  },

  async updateArticle(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client
          .patch(id)
          .set({
            title: updated.title,
            excerpt: updated.excerpt,
            content: updated.content,
            category: updated.category,
            readTime: updated.readTime || '5 min read',
            author: updated.author || 'P. Suuresh, FCA',
            featured: updated.featured || false,
          })
          .commit();
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
    return updated;
  },

  async deleteArticle(id) {
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client.delete(id);
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_articles');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_articles', filtered);
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
        const docs = await client.fetch(query);
        if (docs && docs.length > 0) {
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
    if (client && localStorage.getItem('sanity_write_token')) {
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
        await client.createOrReplace(doc);
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
    return freshItem;
  },

  async updateTaxUpdate(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client
          .patch(id)
          .set({
            title: updated.title,
            summary: updated.summary,
            source: updated.source,
            importance: updated.importance,
            category: updated.category || updated.topic,
            guidelines: updated.guidelines || [],
          })
          .commit();
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
    return updated;
  },

  async deleteTaxUpdate(id) {
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client.delete(id);
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_tax_updates');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_tax_updates', filtered);
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
        const docs = await client.fetch(query);
        if (docs && docs.length > 0) {
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
    if (client && localStorage.getItem('sanity_write_token')) {
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
        await client.createOrReplace(doc);
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
    return freshItem;
  },

  async updateResource(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client
          .patch(id)
          .set({
            title: updated.title,
            type: updated.type,
            description: updated.description,
            fileSize: updated.fileSize,
            downloadLink: updated.downloadLink,
            category: updated.category,
          })
          .commit();
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
    return updated;
  },

  async deleteResource(id) {
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client.delete(id);
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_resources');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_resources', filtered);
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
        const docs = await client.fetch(query);
        if (docs && docs.length > 0) {
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
    if (client && localStorage.getItem('sanity_write_token')) {
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
        await client.createOrReplace(doc);
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
    return freshItem;
  },

  async updateTeamMember(id, item) {
    const updated = { ...item, id };
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client
          .patch(id)
          .set({
            name: updated.name,
            designation: updated.role,
            bio: updated.bio,
            expertise: updated.expertise || [],
            credentials: updated.credentials || [],
          })
          .commit();
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
    return updated;
  },

  async deleteTeamMember(id) {
    const client = getCustomSanityClient();
    if (client && localStorage.getItem('sanity_write_token')) {
      try {
        await client.delete(id);
      } catch (err) {
        console.error('Sanity delete failed:', err);
        throw new Error(`Sanity delete failed: ${err.message}`);
      }
    }

    const items = getLocalStorageData('cms_team');
    const filtered = items.filter(i => i.id !== id);
    saveLocalStorageData('cms_team', filtered);
    return true;
  }
};
