import { useState, useEffect } from 'react';
import { getPrivateFile } from '../services/fileService';

const SecureImage = ({ src, alt, ...props }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageBlob = await getPrivateFile(src);
        const localUrl = URL.createObjectURL(imageBlob);
        setImageUrl(localUrl);
      } catch (error) {
        console.error("Failed to load secure image:", src, error);
      } finally {
        setLoading(false);
      }
    };

    if (src) {
      fetchImage();
    }
  }, [src]);

  if (loading) return <div>Loading Image...</div>;

  return <img src={imageUrl} alt={alt} {...props} />;
};

export default SecureImage;