import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MAIN_CATEGORIES = [
  { id: 'all', label: 'Tất cả phân loại', path: 'all' },
  { id: 'su-kien', label: 'Sự kiện', path: 'sukien' },
  { id: 'di-lam', label: 'Đi làm', path: 'dilam' },
  { id: 'mua-he', label: 'Mùa hè', path: 'muahe' },
  { id: 'mua-dong', label: 'Mùa đông', path: 'muadong' },
  { id: 'streetwear', label: 'Streetwear', path: 'streetwear' }
];

const SUB_CATEGORIES = [
  { id: 'all', label: 'Tất cả' },
  { id: 'ao', label: 'Áo' },
  { id: 'quan', label: 'Quần' },
  { id: 'vay-dam', label: 'Váy - Đầm' },
  { id: 'vest-suit', label: 'Vest - Suit' }
];

const getSubCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('váy') || t.includes('đầm')) return 'vay-dam';
  if (t.includes('vest') || t.includes('suit')) return 'vest-suit';
  if (t.includes('áo')) return 'ao';
  if (t.includes('quần')) return 'quan';
  return 'other';
};

const Categories = ({ products }) => {
  const { categoryParam } = useParams();
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const currentMainCat = MAIN_CATEGORIES.find(c => c.path === categoryParam) || MAIN_CATEGORIES[0];
  const mainCategory = currentMainCat.id;

  const mainProducts = mainCategory === 'all'
    ? products
    : products.filter(p => p.category === mainCategory);

  let finalProducts = mainProducts.filter((p) => {
    const matchesSub = subCategory === 'all' || getSubCategory(p.title) === subCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSub && matchesSearch;
  });

  if (sortOption === 'az') {
    finalProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'za') {
    finalProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortOption === 'price_desc') {
    finalProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'price_asc') {
    finalProducts.sort((a, b) => a.price - b.price);
  }

  return (
    <div>
      <div style={{ border: '2px solid black', padding: '8px 16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm sản phẩm..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px 12px',
              fontSize: '16px',
              border: '2px solid black',
              borderRadius: '4px',
              width: '250px',
              outline: 'none'
            }}
          />
{MAIN_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { 
                navigate(`/${cat.path}`);
                setSubCategory('all');
              }} 
              style={{
                padding: '8px 16px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: mainCategory === cat.id ? '2px solid black' : 'none',
                backgroundColor: mainCategory === cat.id ? 'black' : 'transparent',
                color: mainCategory === cat.id ? 'white' : 'black',
                cursor: 'pointer',
                borderRadius: '4px'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            border: '2px solid black',
            borderRadius: '4px',
            outline: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          <option value="default">Sắp xếp</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
          <option value="price_desc">Giá: Cao đến thấp</option>
          <option value="price_asc">Giá: Thấp đến cao</option>
        </select>

      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <aside style={{ width: '250px', border: '2px solid #ff0000', padding: '16px', flexShrink: 0 }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SUB_CATEGORIES.map((sub) => (
              <li key={sub.id}>
                <button
                  onClick={() => setSubCategory(sub.id)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '8px 16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', borderRadius: '4px',
                    backgroundColor: subCategory === sub.id ? '#000000' : 'transparent',
                    color: subCategory === sub.id ? 'white' : 'black',
                    fontSize: '16px'
                  }}
                >
                  {sub.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main style={{ flex: 1 }}>
          {finalProducts.length === 0 ? (
            <p style={{ fontWeight: 'bold', color: 'gray', textAlign: 'center', marginTop: '40px', fontSize: '18px' }}>
              Không có sản phẩm nào được tìm thấy.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {finalProducts.map((product) => (
<div key={product.id} style={{ border: '2px solid #000000', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: '1 / 1', marginBottom: '12px', backgroundColor: '#f3f4f6', overflow: 'hidden' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/${product.img}`}
                      alt={product.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image' }}
                    />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center', margin: '0 0 8px 0', width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={product.title}>
                    {product.title}
                  </h3>
                  <p style={{ fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
                    {product.price.toLocaleString('vi-VN')}₫
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Categories;
// test git