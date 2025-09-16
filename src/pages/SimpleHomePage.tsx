import React, { useState, useEffect } from 'react';
import simpleApi from '../api/simpleApi';
import ApiTest from '../components/ApiTest';

const SimpleHomePage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load products and categories
      const [productsData, categoriesData] = await Promise.all([
        simpleApi.getProducts(),
        simpleApi.getCategories()
      ]);
      
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '15px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            color: '#2c3e50', 
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            🚀 KFL Karshak Food Life
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#7f8c8d' }}>
            Premium Natural Foods - Direct from Farms
          </p>
        </div>

        {/* API Test Component */}
        <ApiTest />

        {/* Products Section */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>🛍️ Our Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px' 
            }}>
              {products.map(product => (
                <div key={product.id} style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '10px',
                  padding: '20px',
                  background: '#f8f9fa',
                  transition: 'transform 0.3s ease'
                }}>
                  <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>{product.name}</h3>
                  <p style={{ color: '#e74c3c', fontSize: '1.5rem', fontWeight: 'bold' }}>
                    ₹{product.price}
                  </p>
                  <p style={{ color: '#7f8c8d', marginBottom: '10px' }}>{product.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ 
                      background: '#27ae60', 
                      color: 'white', 
                      padding: '5px 10px', 
                      borderRadius: '5px',
                      fontSize: '0.9rem'
                    }}>
                      {product.category}
                    </span>
                    <span style={{ color: '#7f8c8d' }}>
                      Stock: {product.stock || 0}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </div>

        {/* Categories Section */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>📂 Categories</h2>
          {categories.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '15px' 
            }}>
              {categories.map(category => (
                <div key={category.id} style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  padding: '15px',
                  background: 'white',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease'
                }}>
                  <h4 style={{ color: '#2c3e50', marginBottom: '5px' }}>{category.name}</h4>
                  <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>{category.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No categories available</p>
          )}
        </div>

        {/* Admin Panel Link */}
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>🔧 Admin Panel</h3>
          <p style={{ color: '#7f8c8d', marginBottom: '20px' }}>
            Manage your products and categories
          </p>
          <a 
            href="/admin" 
            style={{
              display: 'inline-block',
              background: '#3498db',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'background 0.3s ease'
            }}
          >
            🚀 Open Admin Panel
          </a>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '40px', 
          textAlign: 'center', 
          padding: '20px',
          borderTop: '1px solid #dee2e6',
          color: '#7f8c8d'
        }}>
          <p>© 2025 KFL Karshak Food Life. All rights reserved.</p>
          <p>🌐 Live at: <strong>ogbar.in</strong></p>
        </div>
      </div>
    </div>
  );
};

export default SimpleHomePage;
