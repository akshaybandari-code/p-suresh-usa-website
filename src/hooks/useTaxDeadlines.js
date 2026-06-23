import { useState, useEffect } from 'react';
import { cmsService } from '../admin/services/cmsService';

export const useTaxDeadlines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await cmsService.getTaxDeadlines();
        if (active) {
          setData(result || []);
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

export default useTaxDeadlines;
