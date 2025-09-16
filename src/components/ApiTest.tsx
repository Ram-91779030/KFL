import React, { useState, useEffect } from 'react';
import simpleApi from '../api/simpleApi';

const ApiTest: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<string>('Testing...');
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      // Test health endpoint
      const health = await simpleApi.health();
      console.log('Health check:', health);
      
      // Test products endpoint
      const productsData = await simpleApi.getProducts();
      console.log('Products:', productsData);
      setProducts(productsData.products || []);
      
      // Test categories endpoint
      const categoriesData = await simpleApi.getCategories();
      console.log('Categories:', categoriesData);
      setCategories(categoriesData.categories || []);
      
      setApiStatus('✅ API Connected Successfully!');
    } catch (error) {
      console.error('API Error:', error);
      setApiStatus('❌ API Connection Failed: ' + error);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8f9fa', 
      border: '1px solid #dee2e6', 
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>🔗 API Connection Test</h3>
      <p><strong>Status:</strong> {apiStatus}</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <div>
          <h4>Products ({products.length})</h4>
          {products.length > 0 ? (
            <ul style={{ fontSize: '14px' }}>
              {products.slice(0, 3).map(product => (
                <li key={product.id}>{product.name} - ₹{product.price}</li>
              ))}
            </ul>
          ) : (
            <p>No products loaded</p>
          )}
        </div>
        
        <div>
          <h4>Categories ({categories.length})</h4>
          {categories.length > 0 ? (
            <ul style={{ fontSize: '14px' }}>
              {categories.slice(0, 3).map(category => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          ) : (
            <p>No categories loaded</p>
          )}
        </div>
      </div>
      
      <button 
        onClick={testApiConnection}
        style={{
          marginTop: '15px',
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        🔄 Test Again
      </button>
    </div>
  );
};

export default ApiTest;
