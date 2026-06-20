import { useState, useEffect } from 'react';
import { checkIfConfigured } from '../cms/sanityClient';
import { cmsService } from '../admin/services/cmsService';

export const useServices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        // cmsService automatically pulls from Sanity if configured, otherwise falls back to local cache
        const result = await cmsService.getServices();
        if (active) {
          setData(result);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(err);
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
};

export default useServices;
