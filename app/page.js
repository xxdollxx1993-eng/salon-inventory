'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Icons = {
  Save: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Star: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  ShoppingCart: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>,
  Package: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  TrendingUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendingDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  Calculator: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="8" y2="18"/><line x1="12" y1="18" x2="12" y2="18"/><line x1="16" y1="18" x2="16" y2="18"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
}

export default function Home() {
  const [tab, setTab] = useState('usage')
  const [staff, setStaff] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState({ large: [], medium: [] })
  const [usage, setUsage] = useState([])
  const [stockIn, setStockIn] = useState([])
  const [inventoryHistory, setInventoryHistory] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAllData() }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [staffRes, productsRes, categoriesRes, usageRes, stockInRes, inventoryRes, favoritesRes] = await Promise.all([
        supabase.from('staff').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('categories').select('*').order('id'),
        supabase.from('usage_records').select('*').order('id'),
        supabase.from('stock_in').select('*').order('id'),
        supabase.from('inventory_history').select('*').order('id'),
        supabase.from('favorites').select('*').order('id'),
      ])
      if (staffRes.data) setStaff(staffRes.data.map(s => s.name))
      if (productsRes.data) setProducts(productsRes.data.map(p => ({ id: p.id, largeCategory: p.large_category, mediumCategory: p.medium_category, name: p.name, purchasePrice: p.purchase_price, sellingPrice: p.selling_price, productType: p.product_type || 'business' })))
      if (categoriesRes.data) { setCategories({ large: categoriesRes.data.filter(c => c.type === 'large').map(c => c.name), medium: categoriesRes.data.filter(c => c.type === 'medium').map(c => c.name) }) }
      if (usageRes.data) setUsage(usageRes.data.map(u => ({ id: u.id, staff: u.staff_name, productId: u.product_id, productName: u.product_name, largeCategory: u.large_category, mediumCategory: u.medium_category, purchasePrice: u.purchase_price, quantity: u.quantity, date: u.usage_date })))
      if (stockInRes.data) setStockIn(stockInRes.data.map(s => ({ id: s.id, productId: s.product_id, productName: s.product_name, largeCategory: s.large_category, quantity: s.quantity, date: s.stock_in_date })))
      if (inventoryRes.data) setInventoryHistory(inventoryRes.data.map(i => ({ id: i.id, date: i.inventory_date, staff: i.staff_name, data: i.data, totalPurchaseValue: i.total_purchase_value, totalUsageValue: i.total_usage_value })))
      if (favoritesRes.data) setFavorites(favoritesRes.data.map(f => f.product_id))
    } catch (e) { console.error('データ読み込みエラー:', e) }
    setLoading(false)
  }

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}><p>読み込み中...</p></div>

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-bold">美容室棚卸管理システム</h1></div>
        <div className="tabs">
          {[{ key: 'staff', label: 'スタッフ管理' }, { key: 'products', label: '商品管理' }, { key: 'usage', label: '使用・入荷' }, { key: 'inventory', label: '棚卸入力' }, { key: 'dealer', label: 'ディーラー集計' }].map(t => (
            <button key={t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
      </div>
      {tab === 'staff' && <StaffManagement staff={staff} setStaff={setStaff} />}
      {tab === 'products' && <ProductManagement products={products} setProducts={setProducts} categories={categories} setCategories={setCategories} />}
      {tab === 'usage' && <UsageTracking products={products} staff={staff} usage={usage} setUsage={setUsage} stockIn={stockIn} setStockIn={setStockIn} favorites={favorites} setFavorites={setFavorites} />}
      {tab === 'inventory' && <InventoryInput products={products} staff={staff} usage={usage} stockIn={stockIn} inventoryHistory={inventoryHistory} setInventoryHistory={setInventoryHistory} />}
      {tab === 'dealer' && <DealerSummary products={products} usage={usage} />}
    </div>
  )
}

function StaffManagement({ staff, setStaff }) {
  const [newStaff, setNewStaff] = useState('')
  const addStaff = async () => {
    if (!newStaff || staff.includes(newStaff)) return
    const { error } = await supabase.from('staff').insert({ name: newStaff })
    if (!error) { setStaff([...staff, newStaff]); setNewStaff('') }
  }
  const deleteStaff = async (name) => {
    const { error } = await supabase.from('staff').delete().eq('name', name)
    if (!error) setStaff(staff.filter(s => s !== name))
  }
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ追加</h3>
        <div className="flex gap-2">
          <input type="text" value={newStaff} onChange={e => setNewStaff(e.target.value)} onKeyPress={e => e.key === 'Enter' && addStaff()} placeholder="スタッフ名" className="input" style={{ flex: 1 }} />
          <button onClick={addStaff} className="btn btn-blue">追加</button>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ一覧 ({staff.length}名)</h3>
        <div className="grid-3">
          {staff.map((s, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span className="font-semibold">{s}</span>
              <button onClick={() => deleteStaff(s)} className="text-red-500"><Icons.Trash /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductManagement({ products, setProducts, categories, setCategories }) {
  const [newLarge, setNewLarge] = useState('')
  const [newMedium, setNewMedium] = useState('')
  const [newProduct, setNewProduct] = useState({ largeCategory: '', mediumCategory: '', name: '', purchasePrice: '', sellingPrice: '', productType: 'business' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [filterType, setFilterType] = useState('all')

  const productTypes = [
    { value: 'business', label: '業務用' },
    { value: 'retail', label: '店販' },
    { value: 'both', label: '両方' }
  ]

  const addCategory = async (type, value, setter) => {
    if (!value || categories[type].includes(value)) return
    const { error } = await supabase.from('categories').insert({ type, name: value })
    if (!error) { setCategories({ ...categories, [type]: [...categories[type], value] }); setter('') }
  }
  const deleteCategory = async (type, name) => {
    if (!confirm(`「${name}」を削除しますか？`)) return
    const { error } = await supabase.from('categories').delete().eq('type', type).eq('name', name)
    if (!error) { setCategories({ ...categories, [type]: categories[type].filter(c => c !== name) }) }
  }
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.largeCategory || !newProduct.mediumCategory) return
    const { data, error } = await supabase.from('products').insert({ large_category: newProduct.largeCategory, medium_category: newProduct.mediumCategory, name: newProduct.name, purchase_price: parseFloat(newProduct.purchasePrice) || 0, selling_price: parseFloat(newProduct.sellingPrice) || 0, product_type: newProduct.productType }).select()
    if (!error && data) { setProducts([...products, { id: data[0].id, largeCategory: newProduct.largeCategory, mediumCategory: newProduct.mediumCategory, name: newProduct.name, purchasePrice: parseFloat(newProduct.purchasePrice) || 0, sellingPrice: parseFloat(newProduct.sellingPrice) || 0, productType: newProduct.productType }]); setNewProduct({ largeCategory: '', mediumCategory: '', name: '', purchasePrice: '', sellingPrice: '', productType: 'business' }) }
  }
  const deleteProduct = async (id) => {
    if (!confirm('この商品を削除しますか？')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (!error) setProducts(products.filter(p => p.id !== id))
  }
  const startEdit = (product) => {
    setEditingId(product.id)
    setEditData({ name: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: product.purchasePrice, sellingPrice: product.sellingPrice, productType: product.productType || 'business' })
  }
  const cancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }
  const saveEdit = async (id) => {
    const { error } = await supabase.from('products').update({ name: editData.name, large_category: editData.largeCategory, medium_category: editData.mediumCategory, purchase_price: parseFloat(editData.purchasePrice) || 0, selling_price: parseFloat(editData.sellingPrice) || 0, product_type: editData.productType }).eq('id', id)
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, name: editData.name, largeCategory: editData.largeCategory, mediumCategory: editData.mediumCategory, purchasePrice: parseFloat(editData.purchasePrice) || 0, sellingPrice: parseFloat(editData.sellingPrice) || 0, productType: editData.productType } : p))
      setEditingId(null)
      setEditData({})
    }
  }
  const getTypeLabel = (type) => {
    const found = productTypes.find(t => t.value === type)
    return found ? found.label : '業務用'
  }
  const getTypeBadgeClass = (type) => {
    if (type === 'retail') return 'badge-blue'
    if (type === 'both') return 'badge-yellow'
    return 'badge-green'
  }
  const filteredProducts = filterType === 'all' ? products : products.filter(p => p.productType === filterType)

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">カテゴリー管理</h3>
        <div className="grid-2">
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>大カテゴリー（ディーラー）</label>
            <div className="flex gap-2"><input type="text" value={newLarge} onChange={e => setNewLarge(e.target.value)} placeholder="例：〇〇商事" className="input" /><button onClick={() => addCategory('large', newLarge, setNewLarge)} className="btn btn-blue">追加</button></div>
            <div className="flex gap-2 mt-2" style={{ flexWrap: 'wrap' }}>{categories.large.map((c, i) => <span key={i} className="bg-blue-50 px-3 py-1 rounded text-sm flex items-center gap-1">{c}<button onClick={() => deleteCategory('large', c)} className="text-red-500 ml-1 hover:text-red-700">×</button></span>)}</div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>中カテゴリー（種類）</label>
            <div className="flex gap-2"><input type="text" value={newMedium} onChange={e => setNewMedium(e.target.value)} placeholder="例：シャンプー" className="input" /><button onClick={() => addCategory('medium', newMedium, setNewMedium)} className="btn btn-green">追加</button></div>
            <div className="flex gap-2 mt-2" style={{ flexWrap: 'wrap' }}>{categories.medium.map((c, i) => <span key={i} className="bg-green-50 px-3 py-1 rounded text-sm flex items-center gap-1">{c}<button onClick={() => deleteCategory('medium', c)} className="text-red-500 ml-1 hover:text-red-700">×</button></span>)}</div>
          </div>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">商品登録</h3>
        <div className="grid-2 mb-4">
          <select value={newProduct.largeCategory} onChange={e => setNewProduct({ ...newProduct, largeCategory: e.target.value })} className="select"><option value="">大カテゴリー</option>{categories.large.map((c, i) => <option key={i} value={c}>{c}</option>)}</select>
          <select value={newProduct.mediumCategory} onChange={e => setNewProduct({ ...newProduct, mediumCategory: e.target.value })} className="select"><option value="">中カテゴリー</option>{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select>
        </div>
        <div className="grid-2 mb-4">
          <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="商品名" className="input" />
          <select value={newProduct.productType} onChange={e => setNewProduct({ ...newProduct, productType: e.target.value })} className="select">
            {productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="grid-2 mb-4">
          <input type="number" value={newProduct.purchasePrice} onChange={e => setNewProduct({ ...newProduct, purchasePrice: e.target.value })} placeholder="仕入れ価格" className="input" />
          <input type="number" value={newProduct.sellingPrice} onChange={e => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} placeholder="販売価格" className="input" />
        </div>
        <button onClick={addProduct} className="btn btn-blue"><Icons.Plus />商品を追加</button>
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">商品一覧 ({filteredProducts.length}件)</h3>
          <div className="flex gap-2">
            <button onClick={() => setFilterType('all')} className={`btn ${filterType === 'all' ? 'btn-blue' : 'btn-gray'}`}>全て</button>
            <button onClick={() => setFilterType('business')} className={`btn ${filterType === 'business' ? 'btn-green' : 'btn-gray'}`}>業務用</button>
            <button onClick={() => setFilterType('retail')} className={`btn ${filterType === 'retail' ? 'btn-blue' : 'btn-gray'}`}>店販</button>
            <button onClick={() => setFilterType('both')} className={`btn ${filterType === 'both' ? 'btn-yellow' : 'btn-gray'}`}>両方</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table><thead><tr><th>タイプ</th><th>ディーラー</th><th>カテゴリー</th><th>商品名</th><th className="text-right">仕入れ</th><th className="text-right">販売</th><th className="text-center">操作</th></tr></thead>
            <tbody>{filteredProducts.map(p => (
              editingId === p.id ? (
                <tr key={p.id} style={{ background: '#fef9c3' }}>
                  <td><select value={editData.productType} onChange={e => setEditData({...editData, productType: e.target.value})} className="select">{productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></td>
                  <td><select value={editData.largeCategory} onChange={e => setEditData({...editData, largeCategory: e.target.value})} className="select">{categories.large.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></td>
                  <td><select value={editData.mediumCategory} onChange={e => setEditData({...editData, mediumCategory: e.target.value})} className="select">{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></td>
                  <td><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" /></td>
                  <td><input type="number" value={editData.purchasePrice} onChange={e => setEditData({...editData, purchasePrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                  <td><input type="number" value={editData.sellingPrice} onChange={e => setEditData({...editData, sellingPrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                  <td className="text-center"><button onClick={() => saveEdit(p.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={cancelEdit} className="text-gray-500 text-sm">取消</button></td>
                </tr>
              ) : (
                <tr key={p.id}>
                  <td><span className={`badge ${getTypeBadgeClass(p.productType)}`}>{getTypeLabel(p.productType)}</span></td>
                  <td>{p.largeCategory}</td>
                  <td>{p.mediumCategory}</td>
                  <td>{p.name}</td>
                  <td className="text-right">¥{p.purchasePrice.toLocaleString()}</td>
                  <td className="text-right">¥{p.sellingPrice.toLocaleString()}</td>
                  <td className="text-center"><button onClick={() => startEdit(p)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteProduct(p.id)} className="text-red-500 text-sm">削除</button></td>
                </tr>
              )
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function UsageTracking({ products, staff, usage, setUsage, stockIn, setStockIn, favorites, setFavorites }) {
  const [inputMode, setInputMode] = useState('quick')
  const [selectedStaff, setSelectedStaff] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [bulkEntries, setBulkEntries] = useState({})
  const [bulkStaff, setBulkStaff] = useState('')
  const [bulkDate, setBulkDate] = useState(new Date().toISOString().split('T')[0])
  const [stockInProduct, setStockInProduct] = useState('')
  const [stockInQty, setStockInQty] = useState(1)
  const [stockInDate, setStockInDate] = useState(new Date().toISOString().split('T')[0])
  const [filterType, setFilterType] = useState('all')

  const productTypes = [
    { value: 'all', label: '全て' },
    { value: 'business', label: '業務用' },
    { value: 'retail', label: '店販' },
    { value: 'both', label: '両方' }
  ]

  const filteredProducts = filterType === 'all' ? products : products.filter(p => p.productType === filterType || p.productType === 'both')

  useEffect(() => { const init = {}; products.forEach(p => init[p.id] = 0); setBulkEntries(init) }, [products])

  const toggleFavorite = async (productId) => {
    if (favorites.includes(productId)) { await supabase.from('favorites').delete().eq('product_id', productId); setFavorites(favorites.filter(id => id !== productId)) }
    else { await supabase.from('favorites').insert({ product_id: productId }); setFavorites([...favorites, productId]) }
  }
  const quickRecord = async (productId) => {
    if (!selectedStaff) { alert('先にスタッフを選択してください'); return }
    const product = products.find(p => p.id === productId)
    if (!product) return
    const { data, error } = await supabase.from('usage_records').insert({ staff_name: selectedStaff, product_id: product.id, product_name: product.name, large_category: product.largeCategory, medium_category: product.mediumCategory, purchase_price: product.purchasePrice, quantity: 1, usage_date: new Date().toISOString().split('T')[0] }).select()
    if (!error && data) setUsage([...usage, { id: data[0].id, staff: selectedStaff, productId: product.id, productName: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: product.purchasePrice, quantity: 1, date: new Date().toISOString().split('T')[0] }])
  }
  const recordUsage = async () => {
    if (!selectedStaff || !selectedProduct) { alert('スタッフと商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    const { data, error } = await supabase.from('usage_records').insert({ staff_name: selectedStaff, product_id: product.id, product_name: product.name, large_category: product.largeCategory, medium_category: product.mediumCategory, purchase_price: product.purchasePrice, quantity, usage_date: date }).select()
    if (!error && data) { setUsage([...usage, { id: data[0].id, staff: selectedStaff, productId: product.id, productName: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: product.purchasePrice, quantity, date }]); alert('記録しました！'); setQuantity(1) }
  }
  const recordBulkUsage = async () => {
    if (!bulkStaff) { alert('スタッフを選択してください'); return }
    const newRecords = []
    for (const [productId, qty] of Object.entries(bulkEntries)) {
      if (qty > 0) { const product = products.find(p => p.id === parseInt(productId)); if (product) newRecords.push({ staff_name: bulkStaff, product_id: product.id, product_name: product.name, large_category: product.largeCategory, medium_category: product.mediumCategory, purchase_price: product.purchasePrice, quantity: qty, usage_date: bulkDate }) }
    }
    if (newRecords.length === 0) { alert('使用数量を入力してください'); return }
    const { data, error } = await supabase.from('usage_records').insert(newRecords).select()
    if (!error && data) { setUsage([...usage, ...data.map(d => ({ id: d.id, staff: d.staff_name, productId: d.product_id, productName: d.product_name, largeCategory: d.large_category, mediumCategory: d.medium_category, purchasePrice: d.purchase_price, quantity: d.quantity, date: d.usage_date }))]); alert(`${newRecords.length}件の使用記録を保存しました！`); const init = {}; products.forEach(p => init[p.id] = 0); setBulkEntries(init); setBulkStaff('') }
  }
  const recordStockIn = async () => {
    if (!stockInProduct) { alert('商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(stockInProduct))
    if (!product) return
    const { data, error } = await supabase.from('stock_in').insert({ product_id: product.id, product_name: product.name, large_category: product.largeCategory, quantity: stockInQty, stock_in_date: stockInDate }).select()
    if (!error && data) { setStockIn([...stockIn, { id: data[0].id, productId: product.id, productName: product.name, largeCategory: product.largeCategory, quantity: stockInQty, date: stockInDate }]); alert('入荷を記録しました！'); setStockInQty(1); setStockInProduct('') }
  }

  const getTypeLabel = (type) => {
    if (type === 'retail') return '店販'
    if (type === 'both') return '両方'
    return '業務用'
  }
  const getTypeBadgeClass = (type) => {
    if (type === 'retail') return 'badge-blue'
    if (type === 'both') return 'badge-yellow'
    return 'badge-green'
  }

  const favoriteProducts = filteredProducts.filter(p => favorites.includes(p.id))
  const groupedProducts = filteredProducts.reduce((acc, p) => { if (!acc[p.largeCategory]) acc[p.largeCategory] = {}; if (!acc[p.largeCategory][p.mediumCategory]) acc[p.largeCategory][p.mediumCategory] = []; acc[p.largeCategory][p.mediumCategory].push(p); return acc }, {})
  const bulkTotal = Object.entries(bulkEntries).reduce((sum, [pid, qty]) => { const product = products.find(p => p.id === parseInt(pid)); return sum + (product ? qty * product.purchasePrice : 0) }, 0)
  const bulkCount = Object.values(bulkEntries).reduce((sum, qty) => sum + qty, 0)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="grid-4">
          {[{ key: 'quick', label: 'クイック', icon: <Icons.Star filled={false} />, color: 'btn-yellow' }, { key: 'single', label: '単品入力', icon: <Icons.ShoppingCart />, color: 'btn-blue' }, { key: 'bulk', label: 'まとめて', icon: <Icons.Package />, color: 'btn-green' }, { key: 'stockin', label: '入荷', icon: <Icons.TrendingUp />, color: 'btn-purple' }].map(m => (
            <button key={m.key} onClick={() => setInputMode(m.key)} className={`btn ${inputMode === m.key ? m.color : 'btn-gray'}`} style={{ flexDirection: 'column', padding: '0.75rem' }}>{m.icon}<span className="text-sm">{m.label}</span></button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">商品タイプで絞り込み</span>
          <div className="flex gap-2">
            {productTypes.map(t => (
              <button key={t.value} onClick={() => setFilterType(t.value)} className={`btn ${filterType === t.value ? (t.value === 'business' ? 'btn-green' : t.value === 'retail' ? 'btn-blue' : t.value === 'both' ? 'btn-yellow' : 'btn-blue') : 'btn-gray'}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {inputMode === 'quick' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Icons.Star filled={true} className="text-yellow-500" />クイック入力</h3>
            <p className="text-sm text-gray-600 mb-4">よく使う商品を1タップで記録できます</p>
            <div className="mb-4"><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ選択（必須）</label><select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select" style={{ fontSize: '1.1rem', padding: '0.75rem' }}><option value="">選択してください</option>{staff.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div>
            {favoriteProducts.length === 0 ? (<div className="text-center py-4 text-gray-500"><p>お気に入り商品がありません</p><p className="text-sm">下の商品一覧から★をタップして追加</p></div>) : (<div className="grid-3">{favoriteProducts.map(p => (<button key={p.id} onClick={() => quickRecord(p.id)} disabled={!selectedStaff} className="quick-card" style={{ opacity: selectedStaff ? 1 : 0.5 }}><div className="font-semibold text-sm mb-1">{p.name}</div><div className="text-sm text-gray-500">{p.mediumCategory}</div><span className={`badge ${getTypeBadgeClass(p.productType)}`} style={{ fontSize: '0.7rem' }}>{getTypeLabel(p.productType)}</span></button>))}</div>)}
            {selectedStaff && favoriteProducts.length > 0 && <p className="text-center text-sm text-green-600 mt-4">✓ タップすると即記録されます</p>}
          </div>
          <div className="card"><h4 className="font-semibold mb-3">お気に入り設定</h4><div style={{ maxHeight: '300px', overflowY: 'auto' }}>{filteredProducts.map(p => (<div key={p.id} className="flex justify-between items-center p-2 border-t"><span className="text-sm">{p.largeCategory} - {p.mediumCategory} - {p.name} <span className={`badge ${getTypeBadgeClass(p.productType)}`} style={{ fontSize: '0.7rem' }}>{getTypeLabel(p.productType)}</span></span><button onClick={() => toggleFavorite(p.id)} className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}><Icons.Star filled={favorites.includes(p.id)} /></button></div>))}</div></div>
        </div>
      )}

      {inputMode === 'single' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">使用記録（単品）</h3>
          <div className="space-y-4">
            <div className="grid-2"><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label><select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select"><option value="">選択</option>{staff.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>使用日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div></div>
            <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>商品</label><select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="select"><option value="">選択</option>{filteredProducts.map(p => <option key={p.id} value={p.id}>[{getTypeLabel(p.productType)}] {p.largeCategory} - {p.mediumCategory} - {p.name}</option>)}</select></div>
            <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>数量</label><input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} min="1" className="input" /></div>
            <button onClick={recordUsage} className="btn btn-blue w-full py-3" style={{ fontSize: '1.1rem' }}><Icons.TrendingDown />使用を記録</button>
          </div>
        </div>
      )}

      {inputMode === 'bulk' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-bold mb-4">まとめて入力</h3>
            <div className="grid-2 mb-4"><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label><select value={bulkStaff} onChange={e => setBulkStaff(e.target.value)} className="select"><option value="">選択</option>{staff.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>使用日</label><input type="date" value={bulkDate} onChange={e => setBulkDate(e.target.value)} className="input" /></div></div>
            <div className="bg-green-50 p-4 rounded grid-2"><div className="summary-card"><div className="label">入力商品数</div><div className="value text-green-600">{bulkCount}個</div></div><div className="summary-card"><div className="label">合計金額</div><div className="value text-green-600">¥{bulkTotal.toLocaleString()}</div></div></div>
          </div>
          {Object.keys(groupedProducts).map(dealer => (<div key={dealer} className="card"><h4 className="text-lg font-bold mb-4 text-blue-600 flex items-center gap-2"><Icons.Building />{dealer}</h4>{Object.keys(groupedProducts[dealer]).map(category => (<div key={category} className="mb-4"><h5 className="font-semibold mb-2 text-gray-700">{category}</h5><div className="grid-3">{groupedProducts[dealer][category].map(p => (<div key={p.id} className={`product-card ${bulkEntries[p.id] > 0 ? 'selected' : ''}`}><div className="name">{p.name}</div><div className="price">¥{p.purchasePrice.toLocaleString()} <span className={`badge ${getTypeBadgeClass(p.productType)}`} style={{ fontSize: '0.6rem' }}>{getTypeLabel(p.productType)}</span></div><div className="counter"><button className="minus" onClick={() => setBulkEntries({...bulkEntries, [p.id]: Math.max(0, (bulkEntries[p.id] || 0) - 1)})}>-</button><input type="number" value={bulkEntries[p.id] || 0} onChange={e => setBulkEntries({...bulkEntries, [p.id]: parseInt(e.target.value) || 0})} min="0" /><button className="plus" onClick={() => setBulkEntries({...bulkEntries, [p.id]: (bulkEntries[p.id] || 0) + 1})}>+</button></div></div>))}</div></div>))}</div>))}
          <div className="text-center"><button onClick={recordBulkUsage} className="btn btn-green py-3 px-4" style={{ fontSize: '1.1rem' }}><Icons.Save />まとめて記録（{bulkCount}件）</button></div>
        </div>
      )}

      {inputMode === 'stockin' && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2"><Icons.TrendingUp className="text-purple-600" />入荷記録</h3>
            <p className="text-sm text-gray-600 mb-4">商品の入荷を記録すると、棚卸の予想在庫が正確になります</p>
            <div className="space-y-4">
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>入荷日</label><input type="date" value={stockInDate} onChange={e => setStockInDate(e.target.value)} className="input" /></div>
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>商品</label><select value={stockInProduct} onChange={e => setStockInProduct(e.target.value)} className="select"><option value="">選択</option>{filteredProducts.map(p => <option key={p.id} value={p.id}>[{getTypeLabel(p.productType)}] {p.largeCategory} - {p.mediumCategory} - {p.name}</option>)}</select></div>
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>入荷数</label><input type="number" value={stockInQty} onChange={e => setStockInQty(parseInt(e.target.value) || 1)} min="1" className="input" /></div>
              <button onClick={recordStockIn} className="btn btn-purple w-full py-3" style={{ fontSize: '1.1rem' }}><Icons.TrendingUp />入荷を記録</button>
            </div>
          </div>
          <div className="card"><h4 className="font-semibold mb-3">最近の入荷履歴</h4>{stockIn.length === 0 ? (<p className="text-gray-500 text-center py-4">まだ入荷記録がありません</p>) : (<div style={{ maxHeight: '250px', overflowY: 'auto' }}>{[...stockIn].reverse().slice(0, 20).map(s => (<div key={s.id} className="flex justify-between items-center p-2 bg-purple-50 rounded mb-2"><div><span className="text-sm font-semibold">{s.productName}</span><span className="text-sm text-gray-500 ml-2">{s.date}</span></div><span className="text-purple-600 font-bold">+{s.quantity}</span></div>))}</div>)}</div>
        </div>
      )}
    </div>
  )
}

function InventoryInput({ products, staff, usage, stockIn, inventoryHistory, setInventoryHistory }) {
  const [inv, setInv] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [currStaff, setCurrStaff] = useState('')
  const [showOnlyDiff, setShowOnlyDiff] = useState(false)
  const [filterType, setFilterType] = useState('all')

  const productTypes = [
    { value: 'all', label: '全て' },
    { value: 'business', label: '業務用' },
    { value: 'retail', label: '店販' },
    { value: 'both', label: '両方' }
  ]

  const filteredProducts = filterType === 'all' ? products : products.filter(p => p.productType === filterType || p.productType === 'both')

  useEffect(() => { const init = {}; products.forEach(p => init[p.id] = 0); setInv(init) }, [products])

  const getLastInventory = (pid) => { if (!inventoryHistory.length) return null; const last = inventoryHistory[inventoryHistory.length - 1]; const pd = last.data.find(d => d.id === pid); return pd ? pd.quantity : 0 }
  const getLastInventoryDate = () => { if (!inventoryHistory.length) return null; return inventoryHistory[inventoryHistory.length - 1].date }
  const getUsageSinceLastInventory = (pid) => { const lastDate = getLastInventoryDate(); if (!lastDate) return 0; return usage.filter(u => u.productId === pid && u.date > lastDate).reduce((sum, u) => sum + u.quantity, 0) }
  const getStockInSinceLastInventory = (pid) => { const lastDate = getLastInventoryDate(); if (!lastDate) return 0; return stockIn.filter(s => s.productId === pid && s.date > lastDate).reduce((sum, s) => sum + s.quantity, 0) }
  const getExpectedInventory = (pid) => { const lastInv = getLastInventory(pid); if (lastInv === null) return null; return Math.max(0, lastInv - getUsageSinceLastInventory(pid) + getStockInSinceLastInventory(pid)) }
  const getDifference = (pid) => { const expected = getExpectedInventory(pid); if (expected === null) return null; return (inv[pid] || 0) - expected }
  const applyExpectedToAll = () => { const newInv = {}; products.forEach(p => { const expected = getExpectedInventory(p.id); newInv[p.id] = expected !== null ? expected : 0 }); setInv(newInv) }

  const saveInv = async () => {
    if (!currStaff) { alert('スタッフを選択してください'); return }
    const data = products.map(p => ({ id: p.id, name: p.name, quantity: inv[p.id] || 0, purchasePrice: p.purchasePrice }))
    const totalPurchaseValue = products.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
    const { data: resData, error } = await supabase.from('inventory_history').insert({ inventory_date: date, staff_name: currStaff, data, total_purchase_value: totalPurchaseValue, total_usage_value: 0 }).select()
    if (!error && resData) { setInventoryHistory([...inventoryHistory, { id: resData[0].id, date, staff: currStaff, data, totalPurchaseValue, totalUsageValue: 0 }]); alert('保存完了！'); const init = {}; products.forEach(p => init[p.id] = 0); setInv(init); setCurrStaff('') }
  }

  const getTypeLabel = (type) => {
    if (type === 'retail') return '店販'
    if (type === 'both') return '両方'
    return '業務用'
  }
  const getTypeBadgeClass = (type) => {
    if (type === 'retail') return 'badge-blue'
    if (type === 'both') return 'badge-yellow'
    return 'badge-green'
  }

  const getFilteredProducts = (productList) => { 
    let result = productList
    if (filterType !== 'all') {
      result = result.filter(p => p.productType === filterType || p.productType === 'both')
    }
    if (!showOnlyDiff) return result
    return result.filter(p => { const diff = getDifference(p.id); return diff !== null && diff !== 0 }) 
  }
  
  const grouped = filteredProducts.reduce((acc, p) => { if (!acc[p.largeCategory]) acc[p.largeCategory] = {}; if (!acc[p.largeCategory][p.mediumCategory]) acc[p.largeCategory][p.mediumCategory] = []; acc[p.largeCategory][p.mediumCategory].push(p); return acc }, {})
  const totP = filteredProducts.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
  const productsWithDiff = filteredProducts.filter(p => { const diff = getDifference(p.id); return diff !== null && diff !== 0 }).length
  const lastDate = getLastInventoryDate()

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="grid-2 mb-4"><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>棚卸日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div><div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>担当</label><select value={currStaff} onChange={e => setCurrStaff(e.target.value)} className="select"><option value="">選択</option>{staff.map((s, i) => <option key={i} value={s}>{s}</option>)}</select></div></div>
        {lastDate && (<><div className="bg-gray-50 p-4 rounded mb-4"><div className="text-sm text-gray-600">前回棚卸日：<span className="font-semibold">{lastDate}</span></div></div><button onClick={applyExpectedToAll} className="btn btn-blue w-full py-3 mb-4"><Icons.Calculator />予想在庫を自動入力</button></>)}
        <div className="bg-blue-50 p-4 rounded grid-2"><div className="summary-card"><div className="label">在庫資産</div><div className="value text-blue-600">¥{totP.toLocaleString()}</div></div><div className="summary-card"><div className="label">差異あり</div><div className={`value ${productsWithDiff > 0 ? 'text-orange-600' : 'text-green-600'}`}>{productsWithDiff}件</div></div></div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">商品タイプで絞り込み</span>
          <div className="flex gap-2">
            {productTypes.map(t => (
              <button key={t.value} onClick={() => setFilterType(t.value)} className={`btn ${filterType === t.value ? (t.value === 'business' ? 'btn-green' : t.value === 'retail' ? 'btn-blue' : t.value === 'both' ? 'btn-yellow' : 'btn-blue') : 'btn-gray'}`}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      {lastDate && (<div className="card"><button onClick={() => setShowOnlyDiff(!showOnlyDiff)} className={`btn w-full py-3 ${showOnlyDiff ? 'btn-yellow' : 'btn-gray'}`}><Icons.Filter />{showOnlyDiff ? `差異ありのみ表示中（${productsWithDiff}件）` : '差異ありだけ表示'}</button></div>)}
      
      {Object.keys(grouped).map(lg => { const cats = Object.keys(grouped[lg]).filter(md => getFilteredProducts(grouped[lg][md]).length > 0); if (cats.length === 0) return null; return (<div key={lg} className="card"><h3 className="text-xl font-bold mb-4 text-blue-600">{lg}</h3>{cats.map(md => { const filtered = getFilteredProducts(grouped[lg][md]); if (filtered.length === 0) return null; return (<div key={md} className="mb-4"><h4 className="font-semibold mb-2 text-gray-700">{md}</h4><div className="overflow-x-auto"><table className="text-sm"><thead><tr><th>タイプ</th><th>商品</th><th className="text-right">前回</th><th className="text-right text-red-600">使用</th><th className="text-right text-purple-600">入荷</th><th className="text-right text-blue-600">予想</th><th className="text-center">実際</th><th className="text-center">差異</th></tr></thead><tbody>{filtered.map(p => { const q = inv[p.id] || 0; const last = getLastInventory(p.id); const usageQty = getUsageSinceLastInventory(p.id); const stockInQty = getStockInSinceLastInventory(p.id); const expected = getExpectedInventory(p.id); const diff = getDifference(p.id); return (<tr key={p.id} style={{ background: diff !== null && diff !== 0 ? '#fefce8' : '' }}><td><span className={`badge ${getTypeBadgeClass(p.productType)}`}>{getTypeLabel(p.productType)}</span></td><td>{p.name}</td><td className="text-right text-gray-500">{last !== null ? last : '-'}</td><td className="text-right text-red-600 font-semibold">{last !== null ? `-${usageQty}` : '-'}</td><td className="text-right text-purple-600 font-semibold">{last !== null && stockInQty > 0 ? `+${stockInQty}` : '-'}</td><td className="text-right text-blue-600 font-semibold">{expected !== null ? expected : '-'}</td><td className="text-center"><input type="number" value={q} onChange={e => setInv({...inv, [p.id]: parseInt(e.target.value) || 0})} className="input" style={{ width: '5rem', textAlign: 'center' }} min="0" /></td><td className="text-center">{diff !== null ? (<span className={`badge ${diff === 0 ? 'badge-green' : diff > 0 ? 'badge-blue' : 'badge-red'}`}>{diff === 0 ? <><Icons.Check /> OK</> : <><Icons.Alert /> {diff > 0 ? '+' : ''}{diff}</>}</span>) : '-'}</td></tr>) })}</tbody></table></div></div>) })}</div>) })}
      
      <div className="text-center"><button onClick={saveInv} className="btn btn-green py-3 px-4" style={{ fontSize: '1.1rem' }}><Icons.Save />棚卸保存</button></div>
    </div>
  )
}

function DealerSummary({ products, usage }) {
  const [periodType, setPeriodType] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const filteredUsage = usage.filter(r => { if (periodType === 'all') return true; if (periodType === 'month') return r.date && r.date.startsWith(selectedMonth); return true })
  const dealerSummary = {}
  filteredUsage.forEach(r => { const dealer = r.largeCategory || '不明'; if (!dealerSummary[dealer]) dealerSummary[dealer] = { totalQuantity: 0, totalAmount: 0, categories: {} }; dealerSummary[dealer].totalQuantity += r.quantity; dealerSummary[dealer].totalAmount += (r.purchasePrice || 0) * r.quantity; const cat = r.mediumCategory || '不明'; if (!dealerSummary[dealer].categories[cat]) dealerSummary[dealer].categories[cat] = { quantity: 0, amount: 0 }; dealerSummary[dealer].categories[cat].quantity += r.quantity; dealerSummary[dealer].categories[cat].amount += (r.purchasePrice || 0) * r.quantity })
  const grandTotal = Object.values(dealerSummary).reduce((sum, d) => ({ quantity: sum.quantity + d.totalQuantity, amount: sum.amount + d.totalAmount }), { quantity: 0, amount: 0 })
  const sortedDealers = Object.entries(dealerSummary).sort((a, b) => b[1].totalAmount - a[1].totalAmount)

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Icons.Building />ディーラー別集計</h3>
        <div className="mb-4"><div className="flex gap-2 mb-3"><button onClick={() => setPeriodType('all')} className={`btn ${periodType === 'all' ? 'btn-blue' : 'btn-gray'}`}>全期間</button><button onClick={() => setPeriodType('month')} className={`btn ${periodType === 'month' ? 'btn-blue' : 'btn-gray'}`}>月別</button></div>{periodType === 'month' && (<input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} />)}</div>
        <div className="gradient-header"><div className="grid-2 text-center"><div><div className="text-sm" style={{ opacity: 0.8 }}>総使用数</div><div className="text-2xl font-bold">{grandTotal.quantity.toLocaleString()}個</div></div><div><div className="text-sm" style={{ opacity: 0.8 }}>総使用金額</div><div className="text-2xl font-bold">¥{grandTotal.amount.toLocaleString()}</div></div></div></div>
      </div>
      {sortedDealers.length === 0 ? (<div className="card text-center text-gray-500">使用記録がありません</div>) : (sortedDealers.map(([dealer, data]) => (<div key={dealer} className="card"><div className="flex justify-between items-center mb-4"><h4 className="text-xl font-bold text-blue-600">{dealer}</h4><div className="text-right"><div className="text-sm text-gray-500">使用金額</div><div className="text-xl font-bold text-green-600">¥{data.totalAmount.toLocaleString()}</div></div></div><div className="mb-4"><div className="flex justify-between text-sm text-gray-600 mb-1"><span>全体の {grandTotal.amount > 0 ? ((data.totalAmount / grandTotal.amount) * 100).toFixed(1) : 0}%</span><span>{data.totalQuantity}個</span></div><div className="progress-bar"><div className="fill" style={{ width: `${grandTotal.amount > 0 ? (data.totalAmount / grandTotal.amount) * 100 : 0}%` }}></div></div></div><div className="grid-3">{Object.entries(data.categories).sort((a, b) => b[1].amount - a[1].amount).map(([cat, catData]) => (<div key={cat} className="bg-gray-50 p-3 rounded"><div className="text-sm text-gray-600">{cat}</div><div className="font-bold text-blue-600">{catData.quantity}個</div><div className="text-sm text-green-600">¥{catData.amount.toLocaleString()}</div></div>))}</div></div>)))}
    </div>
  )
}
