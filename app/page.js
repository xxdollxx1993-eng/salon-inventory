'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Icons = {
  Save: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Star: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Package: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  TrendingUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  TrendingDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  Calculator: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  History: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
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
  const [staffPurchases, setStaffPurchases] = useState([])
  const [dealerBudgets, setDealerBudgets] = useState([])
  const [dealerAllocations, setDealerAllocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAllData() }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [staffRes, productsRes, categoriesRes, usageRes, stockInRes, inventoryRes, favoritesRes, purchasesRes, budgetsRes, allocationsRes] = await Promise.all([
        supabase.from('staff').select('*').order('id'),
        supabase.from('products').select('*').order('id'),
        supabase.from('categories').select('*').order('id'),
        supabase.from('usage_records').select('*').order('id'),
        supabase.from('stock_in').select('*').order('id'),
        supabase.from('inventory_history').select('*').order('id'),
        supabase.from('favorites').select('*').order('id'),
        supabase.from('staff_purchases').select('*').order('id'),
        supabase.from('dealer_budgets').select('*').order('id'),
        supabase.from('dealer_budget_allocation').select('*').order('id'),
      ])
      if (staffRes.data) setStaff(staffRes.data.map(s => ({ id: s.id, name: s.name, dealer: s.dealer || '' })))
      if (productsRes.data) setProducts(productsRes.data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(p => ({ id: p.id, largeCategory: p.large_category, mediumCategory: p.medium_category, name: p.name, purchasePrice: p.purchase_price, sellingPrice: p.selling_price, productType: p.product_type || 'business', sortOrder: p.sort_order || 0 })))
      if (categoriesRes.data) { 
        setCategories({ 
          large: categoriesRes.data.filter(c => c.type === 'large').map(c => ({ 
            name: c.name, 
            url: c.url || '', 
            orderMethod: c.order_method || 'web',
            loginId: c.login_id || '',
            loginPassword: c.login_password || ''
          })), 
          medium: categoriesRes.data.filter(c => c.type === 'medium').map(c => c.name) 
        }) 
      }
      if (usageRes.data) setUsage(usageRes.data.map(u => ({ id: u.id, staff: u.staff_name, productId: u.product_id, productName: u.product_name, largeCategory: u.large_category, mediumCategory: u.medium_category, purchasePrice: u.purchase_price, quantity: u.quantity, date: u.usage_date })))
      if (stockInRes.data) setStockIn(stockInRes.data.map(s => ({ id: s.id, productId: s.product_id, productName: s.product_name, largeCategory: s.large_category, quantity: s.quantity, date: s.stock_in_date })))
      if (inventoryRes.data) setInventoryHistory(inventoryRes.data.map(i => ({ id: i.id, date: i.inventory_date, staff: i.staff_name, data: i.data, totalPurchaseValue: i.total_purchase_value, totalUsageValue: i.total_usage_value })))
      if (favoritesRes.data) setFavorites(favoritesRes.data.map(f => f.product_id))
      if (purchasesRes.data) setStaffPurchases(purchasesRes.data.map(p => ({ id: p.id, staff: p.staff_name, productId: p.product_id, productName: p.product_name, largeCategory: p.large_category, mediumCategory: p.medium_category, purchasePrice: p.purchase_price, quantity: p.quantity, date: p.purchase_date })))
      if (budgetsRes.data) setDealerBudgets(budgetsRes.data.map(b => ({ id: b.id, yearMonth: b.year_month, targetSales: b.target_sales, targetRate: parseFloat(b.target_rate) })))
      if (allocationsRes.data) setDealerAllocations(allocationsRes.data.map(a => ({ id: a.id, yearMonth: a.year_month, dealerName: a.dealer_name, budget: a.budget })))
    } catch (e) { console.error('データ読み込みエラー:', e) }
    setLoading(false)
  }

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}><p>読み込み中...</p></div>

  const mainTabs = [
    { key: 'usage', label: '使用入力' },
    { key: 'stockin', label: '入荷' },
    { key: 'order', label: '発注リンク' }
  ]
  const otherTabs = [
    { key: 'inventory', label: '棚卸' },
    { key: 'dealer', label: '予算管理' },
    { key: 'purchase', label: 'スタッフ購入' },
    { key: 'products', label: '商品管理' },
    { key: 'staff', label: 'スタッフ' },
    { key: 'export', label: '出力' }
  ]
  const currentLabel = [...mainTabs, ...otherTabs].find(t => t.key === tab)?.label || '使用入力'
  const isOtherTab = otherTabs.some(t => t.key === tab)

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h1 className="text-2xl font-bold">美容室在庫管理</h1></div>
        <div className="flex gap-2 flex-wrap">
          {mainTabs.map(t => (
            <button key={t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
          <select 
            value={isOtherTab ? tab : ''} 
            onChange={e => e.target.value && setTab(e.target.value)} 
            className={`select ${isOtherTab ? 'bg-blue-100 border-blue-500' : ''}`}
            style={{ minWidth: '120px' }}
          >
            <option value="">{isOtherTab ? currentLabel : 'その他 ▼'}</option>
            {otherTabs.map(t => (
              <option key={t.key} value={t.key}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
      {tab === 'usage' && <UsageInput products={products} usage={usage} setUsage={setUsage} favorites={favorites} setFavorites={setFavorites} />}
      {tab === 'stockin' && <StockInInput products={products} stockIn={stockIn} setStockIn={setStockIn} categories={categories} />}
      {tab === 'inventory' && <InventoryInput products={products} staff={staff} usage={usage} stockIn={stockIn} inventoryHistory={inventoryHistory} setInventoryHistory={setInventoryHistory} />}
      {tab === 'dealer' && <DealerBudget products={products} usage={usage} stockIn={stockIn} categories={categories} dealerBudgets={dealerBudgets} setDealerBudgets={setDealerBudgets} dealerAllocations={dealerAllocations} setDealerAllocations={setDealerAllocations} />}
      {tab === 'order' && <OrderLinks categories={categories} setCategories={setCategories} />}
      {tab === 'purchase' && <StaffPurchase products={products} staff={staff} staffPurchases={staffPurchases} setStaffPurchases={setStaffPurchases} />}
      {tab === 'products' && <ProductManagement products={products} setProducts={setProducts} categories={categories} setCategories={setCategories} />}
      {tab === 'staff' && <StaffManagement staff={staff} setStaff={setStaff} categories={categories} />}
      {tab === 'export' && <DataExport products={products} staff={staff} usage={usage} stockIn={stockIn} inventoryHistory={inventoryHistory} />}
    </div>
  )
}

// ==================== 使用入力 ====================
function UsageInput({ products, usage, setUsage, favorites, setFavorites }) {
  const [entries, setEntries] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [showHistory, setShowHistory] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    const init = {}
    products.forEach(p => init[p.id] = 0)
    setEntries(init)
  }, [products])

  const favoriteProducts = products.filter(p => favorites.includes(p.id))

  const toggleFavorite = async (productId) => {
    if (favorites.includes(productId)) {
      await supabase.from('favorites').delete().eq('product_id', productId)
      setFavorites(favorites.filter(id => id !== productId))
    } else {
      await supabase.from('favorites').insert({ product_id: productId })
      setFavorites([...favorites, productId])
    }
  }

  const recordUsage = async () => {
    const newRecords = []
    for (const [productId, qty] of Object.entries(entries)) {
      if (qty > 0) {
        const product = products.find(p => p.id === parseInt(productId))
        if (product) {
          newRecords.push({
            staff_name: null,
            product_id: product.id,
            product_name: product.name,
            large_category: product.largeCategory,
            medium_category: product.mediumCategory,
            purchase_price: product.purchasePrice,
            quantity: qty,
            usage_date: date
          })
        }
      }
    }
    if (newRecords.length === 0) { alert('数量を入力してください'); return }
    const { data, error } = await supabase.from('usage_records').insert(newRecords).select()
    if (!error && data) {
      setUsage([...usage, ...data.map(d => ({
        id: d.id, staff: d.staff_name, productId: d.product_id, productName: d.product_name,
        largeCategory: d.large_category, mediumCategory: d.medium_category,
        purchasePrice: d.purchase_price, quantity: d.quantity, date: d.usage_date
      }))])
      alert(`${newRecords.length}件の使用を記録しました！`)
      const init = {}
      products.forEach(p => init[p.id] = 0)
      setEntries(init)
    }
  }

  const deleteUsage = async (id) => {
    if (!confirm('この記録を削除しますか？')) return
    const { error } = await supabase.from('usage_records').delete().eq('id', id)
    if (!error) setUsage(usage.filter(u => u.id !== id))
  }

  const startEdit = (record) => {
    setEditingId(record.id)
    setEditData({ quantity: record.quantity, date: record.date })
  }

  const saveEdit = async (id) => {
    const { error } = await supabase.from('usage_records').update({
      quantity: parseInt(editData.quantity) || 1,
      usage_date: editData.date
    }).eq('id', id)
    if (!error) {
      setUsage(usage.map(u => u.id === id ? { ...u, quantity: parseInt(editData.quantity) || 1, date: editData.date } : u))
      setEditingId(null)
    }
  }

  const totalCount = Object.values(entries).reduce((sum, qty) => sum + qty, 0)
  const totalAmount = Object.entries(entries).reduce((sum, [pid, qty]) => {
    const product = products.find(p => p.id === parseInt(pid))
    return sum + (product ? qty * product.purchasePrice : 0)
  }, 0)

  const recentUsage = [...usage].reverse().slice(0, 50)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📦 使用入力</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-blue' : 'btn-gray'}`}>
            <Icons.History /> {showHistory ? '入力に戻る' : '履歴'}
          </button>
        </div>

        {!showHistory ? (
          <>
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>使用日</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" style={{ width: 'auto' }} />
            </div>

            <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
              <div className="summary-card">
                <div className="label">入力数</div>
                <div className="value text-blue-600">{totalCount}個</div>
              </div>
              <div className="summary-card">
                <div className="label">合計金額</div>
                <div className="value text-blue-600">¥{totalAmount.toLocaleString()}</div>
              </div>
            </div>

            {favoriteProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">⭐ お気に入り商品がありません</p>
                <p className="text-sm">下の「お気に入り設定」から追加してください</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {favoriteProducts.map(p => (
                  <div key={p.id} className={`flex justify-between items-center p-3 rounded border ${entries[p.id] > 0 ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-sm text-gray-500">{p.largeCategory} / {p.mediumCategory}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setEntries({...entries, [p.id]: Math.max(0, (entries[p.id] || 0) - 1)})} className="btn btn-gray" style={{ width: '36px', height: '36px', padding: 0 }}>-</button>
                      <input type="number" value={entries[p.id] || 0} onChange={e => setEntries({...entries, [p.id]: parseInt(e.target.value) || 0})} className="input text-center" style={{ width: '60px' }} min="0" />
                      <button onClick={() => setEntries({...entries, [p.id]: (entries[p.id] || 0) + 1})} className="btn btn-blue" style={{ width: '36px', height: '36px', padding: 0 }}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button onClick={recordUsage} className="btn btn-green w-full py-3" style={{ fontSize: '1.1rem' }}>
              <Icons.Save /> まとめて登録（{totalCount}件）
            </button>

            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-gray-600">⭐ お気に入り設定</summary>
              <div className="mt-2 max-h-64 overflow-y-auto border rounded p-2">
                {products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-2 border-b">
                    <span className="text-sm">{p.largeCategory} / {p.mediumCategory} / {p.name}</span>
                    <button onClick={() => toggleFavorite(p.id)} className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}>
                      <Icons.Star filled={favorites.includes(p.id)} />
                    </button>
                  </div>
                ))}
              </div>
            </details>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-sm">
              <thead>
                <tr><th>日付</th><th>商品</th><th className="text-center">数量</th><th className="text-right">金額</th><th className="text-center">操作</th></tr>
              </thead>
              <tbody>
                {recentUsage.map(u => (
                  editingId === u.id ? (
                    <tr key={u.id} style={{ background: '#fef9c3' }}>
                      <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '130px' }} /></td>
                      <td>{u.productName}</td>
                      <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '60px' }} min="1" /></td>
                      <td className="text-right">¥{(u.purchasePrice * (parseInt(editData.quantity) || 1)).toLocaleString()}</td>
                      <td className="text-center">
                        <button onClick={() => saveEdit(u.id)} className="text-green-600 text-sm mr-2">保存</button>
                        <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={u.id}>
                      <td>{u.date}</td>
                      <td>{u.productName}</td>
                      <td className="text-center">{u.quantity}</td>
                      <td className="text-right">¥{(u.purchasePrice * u.quantity).toLocaleString()}</td>
                      <td className="text-center">
                        <button onClick={() => startEdit(u)} className="text-blue-500 text-sm mr-2">編集</button>
                        <button onClick={() => deleteUsage(u.id)} className="text-red-500 text-sm">削除</button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== 入荷入力 ====================
function StockInInput({ products, stockIn, setStockIn, categories }) {
  const [entries, setEntries] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedDealer, setSelectedDealer] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    const init = {}
    products.forEach(p => init[p.id] = 0)
    setEntries(init)
  }, [products])

  const dealers = categories.large.map(c => c.name)
  const dealerProducts = selectedDealer ? products.filter(p => p.largeCategory === selectedDealer) : []

  const recordStockIn = async () => {
    if (!selectedDealer) { alert('ディーラーを選択してください'); return }
    const newRecords = []
    for (const [productId, qty] of Object.entries(entries)) {
      if (qty > 0) {
        const product = products.find(p => p.id === parseInt(productId))
        if (product && product.largeCategory === selectedDealer) {
          newRecords.push({
            product_id: product.id,
            product_name: product.name,
            large_category: product.largeCategory,
            quantity: qty,
            stock_in_date: date
          })
        }
      }
    }
    if (newRecords.length === 0) { alert('数量を入力してください'); return }
    const { data, error } = await supabase.from('stock_in').insert(newRecords).select()
    if (!error && data) {
      setStockIn([...stockIn, ...data.map(d => ({
        id: d.id, productId: d.product_id, productName: d.product_name,
        largeCategory: d.large_category, quantity: d.quantity, date: d.stock_in_date
      }))])
      alert(`${newRecords.length}件の入荷を記録しました！`)
      const init = {}
      products.forEach(p => init[p.id] = 0)
      setEntries(init)
    }
  }

  const deleteStockIn = async (id) => {
    if (!confirm('この記録を削除しますか？')) return
    const { error } = await supabase.from('stock_in').delete().eq('id', id)
    if (!error) setStockIn(stockIn.filter(s => s.id !== id))
  }

  const startEdit = (record) => {
    setEditingId(record.id)
    setEditData({ quantity: record.quantity, date: record.date })
  }

  const saveEdit = async (id) => {
    const { error } = await supabase.from('stock_in').update({
      quantity: parseInt(editData.quantity) || 1,
      stock_in_date: editData.date
    }).eq('id', id)
    if (!error) {
      setStockIn(stockIn.map(s => s.id === id ? { ...s, quantity: parseInt(editData.quantity) || 1, date: editData.date } : s))
      setEditingId(null)
    }
  }

  const totalCount = Object.entries(entries).reduce((sum, [pid, qty]) => {
    const product = products.find(p => p.id === parseInt(pid))
    if (product && product.largeCategory === selectedDealer) return sum + qty
    return sum
  }, 0)

  const totalAmount = Object.entries(entries).reduce((sum, [pid, qty]) => {
    const product = products.find(p => p.id === parseInt(pid))
    if (product && product.largeCategory === selectedDealer) return sum + qty * product.purchasePrice
    return sum
  }, 0)

  const groupedProducts = dealerProducts.reduce((acc, p) => {
    if (!acc[p.mediumCategory]) acc[p.mediumCategory] = []
    acc[p.mediumCategory].push(p)
    return acc
  }, {})

  const recentStockIn = [...stockIn].reverse().slice(0, 50)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📥 入荷入力</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-purple' : 'btn-gray'}`}>
            <Icons.History /> {showHistory ? '入力に戻る' : '履歴'}
          </button>
        </div>

        {!showHistory ? (
          <>
            <div className="grid-2 mb-4">
              <div>
                <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>入荷日</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>ディーラー</label>
                <select value={selectedDealer} onChange={e => setSelectedDealer(e.target.value)} className="select">
                  <option value="">選択してください</option>
                  {dealers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {selectedDealer && (
              <>
                <div className="bg-purple-50 p-4 rounded mb-4 grid-2">
                  <div className="summary-card">
                    <div className="label">入荷数</div>
                    <div className="value text-purple-600">{totalCount}個</div>
                  </div>
                  <div className="summary-card">
                    <div className="label">入荷金額</div>
                    <div className="value text-purple-600">¥{totalAmount.toLocaleString()}</div>
                  </div>
                </div>

                {Object.entries(groupedProducts).map(([category, prods]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {prods.map(p => (
                        <div key={p.id} className={`flex justify-between items-center p-3 rounded border ${entries[p.id] > 0 ? 'bg-purple-50 border-purple-300' : 'bg-white border-gray-200'}`}>
                          <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-sm text-gray-500">¥{p.purchasePrice.toLocaleString()}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => setEntries({...entries, [p.id]: Math.max(0, (entries[p.id] || 0) - 1)})} className="btn btn-gray" style={{ width: '36px', height: '36px', padding: 0 }}>-</button>
                            <input type="number" value={entries[p.id] || 0} onChange={e => setEntries({...entries, [p.id]: parseInt(e.target.value) || 0})} className="input text-center" style={{ width: '60px' }} min="0" />
                            <button onClick={() => setEntries({...entries, [p.id]: (entries[p.id] || 0) + 1})} className="btn btn-purple" style={{ width: '36px', height: '36px', padding: 0 }}>+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <button onClick={recordStockIn} className="btn btn-purple w-full py-3" style={{ fontSize: '1.1rem' }}>
                  <Icons.TrendingUp /> まとめて入荷登録（{totalCount}件）
                </button>
              </>
            )}
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-sm">
              <thead>
                <tr><th>日付</th><th>ディーラー</th><th>商品</th><th className="text-center">数量</th><th className="text-center">操作</th></tr>
              </thead>
              <tbody>
                {recentStockIn.map(s => (
                  editingId === s.id ? (
                    <tr key={s.id} style={{ background: '#fef9c3' }}>
                      <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '130px' }} /></td>
                      <td>{s.largeCategory}</td>
                      <td>{s.productName}</td>
                      <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '60px' }} min="1" /></td>
                      <td className="text-center">
                        <button onClick={() => saveEdit(s.id)} className="text-green-600 text-sm mr-2">保存</button>
                        <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={s.id}>
                      <td>{s.date}</td>
                      <td>{s.largeCategory}</td>
                      <td>{s.productName}</td>
                      <td className="text-center">{s.quantity}</td>
                      <td className="text-center">
                        <button onClick={() => startEdit(s)} className="text-blue-500 text-sm mr-2">編集</button>
                        <button onClick={() => deleteStockIn(s.id)} className="text-red-500 text-sm">削除</button>
                      </td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== 棚卸入力 ====================
function InventoryInput({ products, staff, usage, stockIn, inventoryHistory, setInventoryHistory }) {
  const [inv, setInv] = useState({})
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [currStaff, setCurrStaff] = useState('')
  const [showOnlyDiff, setShowOnlyDiff] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [editingHistoryId, setEditingHistoryId] = useState(null)

  useEffect(() => {
    const init = {}
    products.forEach(p => init[p.id] = 0)
    setInv(init)
  }, [products])

  const getLastInventory = (pid) => {
    if (!inventoryHistory.length) return null
    const last = inventoryHistory[inventoryHistory.length - 1]
    const pd = last.data.find(d => d.id === pid)
    return pd ? pd.quantity : 0
  }
  const getLastInventoryDate = () => {
    if (!inventoryHistory.length) return null
    return inventoryHistory[inventoryHistory.length - 1].date
  }
  const getUsageSinceLastInventory = (pid) => {
    const lastDate = getLastInventoryDate()
    if (!lastDate) return 0
    return usage.filter(u => u.productId === pid && u.date > lastDate).reduce((sum, u) => sum + u.quantity, 0)
  }
  const getStockInSinceLastInventory = (pid) => {
    const lastDate = getLastInventoryDate()
    if (!lastDate) return 0
    return stockIn.filter(s => s.productId === pid && s.date > lastDate).reduce((sum, s) => sum + s.quantity, 0)
  }
  const getExpectedInventory = (pid) => {
    const lastInv = getLastInventory(pid)
    if (lastInv === null) return null
    return Math.max(0, lastInv - getUsageSinceLastInventory(pid) + getStockInSinceLastInventory(pid))
  }
  const getDifference = (pid) => {
    const expected = getExpectedInventory(pid)
    if (expected === null) return null
    return (inv[pid] || 0) - expected
  }
  const applyExpectedToAll = () => {
    const newInv = {}
    products.forEach(p => {
      const expected = getExpectedInventory(p.id)
      newInv[p.id] = expected !== null ? expected : 0
    })
    setInv(newInv)
  }

  const saveInv = async () => {
    if (!currStaff) { alert('担当者を選択してください'); return }
    const data = products.map(p => ({ id: p.id, name: p.name, quantity: inv[p.id] || 0, purchasePrice: p.purchasePrice }))
    const totalPurchaseValue = products.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
    const { data: resData, error } = await supabase.from('inventory_history').insert({
      inventory_date: date,
      staff_name: currStaff,
      data,
      total_purchase_value: totalPurchaseValue,
      total_usage_value: 0
    }).select()
    if (!error && resData) {
      setInventoryHistory([...inventoryHistory, { id: resData[0].id, date, staff: currStaff, data, totalPurchaseValue, totalUsageValue: 0 }])
      alert('棚卸を保存しました！')
      const init = {}
      products.forEach(p => init[p.id] = 0)
      setInv(init)
      setCurrStaff('')
    }
  }

  const deleteHistory = async (id) => {
    if (!confirm('この棚卸記録を削除しますか？')) return
    const { error } = await supabase.from('inventory_history').delete().eq('id', id)
    if (!error) setInventoryHistory(inventoryHistory.filter(h => h.id !== id))
  }

  const grouped = products.reduce((acc, p) => {
    if (!acc[p.largeCategory]) acc[p.largeCategory] = {}
    if (!acc[p.largeCategory][p.mediumCategory]) acc[p.largeCategory][p.mediumCategory] = []
    acc[p.largeCategory][p.mediumCategory].push(p)
    return acc
  }, {})

  const getFilteredProducts = (productList) => {
    if (!showOnlyDiff) return productList
    return productList.filter(p => {
      const diff = getDifference(p.id)
      return diff !== null && diff !== 0
    })
  }

  const totP = products.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
  const productsWithDiff = products.filter(p => {
    const diff = getDifference(p.id)
    return diff !== null && diff !== 0
  }).length
  const lastDate = getLastInventoryDate()

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📋 棚卸</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-green' : 'btn-gray'}`}>
            <Icons.History /> {showHistory ? '入力に戻る' : '履歴'}
          </button>
        </div>

        {!showHistory ? (
          <>
            <div className="grid-2 mb-4">
              <div>
                <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>棚卸日</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>担当者</label>
                <select value={currStaff} onChange={e => setCurrStaff(e.target.value)} className="select">
                  <option value="">選択</option>
                  {staff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {lastDate && (
              <>
                <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
                  前回棚卸日：<span className="font-semibold">{lastDate}</span>
                </div>
                <button onClick={applyExpectedToAll} className="btn btn-blue w-full py-3 mb-4">
                  <Icons.Calculator /> 予想在庫を自動入力
                </button>
              </>
            )}

            <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
              <div className="summary-card">
                <div className="label">在庫資産</div>
                <div className="value text-blue-600">¥{totP.toLocaleString()}</div>
              </div>
              <div className="summary-card">
                <div className="label">差異あり</div>
                <div className={`value ${productsWithDiff > 0 ? 'text-orange-600' : 'text-green-600'}`}>{productsWithDiff}件</div>
              </div>
            </div>

            {lastDate && (
              <button onClick={() => setShowOnlyDiff(!showOnlyDiff)} className={`btn w-full mb-4 ${showOnlyDiff ? 'btn-yellow' : 'btn-gray'}`}>
                <Icons.Filter /> {showOnlyDiff ? `差異ありのみ表示中（${productsWithDiff}件）` : '差異ありだけ表示'}
              </button>
            )}

            {Object.keys(grouped).map(lg => {
              const cats = Object.keys(grouped[lg]).filter(md => getFilteredProducts(grouped[lg][md]).length > 0)
              if (cats.length === 0) return null
              return (
                <div key={lg} className="card mb-4">
                  <h3 className="text-lg font-bold mb-4 text-blue-600">{lg}</h3>
                  {cats.map(md => {
                    const filtered = getFilteredProducts(grouped[lg][md])
                    if (filtered.length === 0) return null
                    return (
                      <div key={md} className="mb-4">
                        <h4 className="font-semibold mb-2 text-gray-700">{md}</h4>
                        <div className="overflow-x-auto">
                          <table className="text-sm">
                            <thead>
                              <tr>
                                <th>商品</th>
                                <th className="text-right">前回</th>
                                <th className="text-right text-red-600">使用</th>
                                <th className="text-right text-purple-600">入荷</th>
                                <th className="text-right text-blue-600">予想</th>
                                <th className="text-center">実際</th>
                                <th className="text-center">差異</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filtered.map(p => {
                                const q = inv[p.id] || 0
                                const last = getLastInventory(p.id)
                                const usageQty = getUsageSinceLastInventory(p.id)
                                const stockInQty = getStockInSinceLastInventory(p.id)
                                const expected = getExpectedInventory(p.id)
                                const diff = getDifference(p.id)
                                return (
                                  <tr key={p.id} style={{ background: diff !== null && diff !== 0 ? '#fefce8' : '' }}>
                                    <td>{p.name}</td>
                                    <td className="text-right text-gray-500">{last !== null ? last : '-'}</td>
                                    <td className="text-right text-red-600 font-semibold">{last !== null ? `-${usageQty}` : '-'}</td>
                                    <td className="text-right text-purple-600 font-semibold">{last !== null && stockInQty > 0 ? `+${stockInQty}` : '-'}</td>
                                    <td className="text-right text-blue-600 font-semibold">{expected !== null ? expected : '-'}</td>
                                    <td className="text-center">
                                      <input type="number" value={q} onChange={e => setInv({...inv, [p.id]: parseInt(e.target.value) || 0})} className="input" style={{ width: '5rem', textAlign: 'center' }} min="0" />
                                    </td>
                                    <td className="text-center">
                                      {diff !== null ? (
                                        <span className={`badge ${diff === 0 ? 'badge-green' : diff > 0 ? 'badge-blue' : 'badge-red'}`}>
                                          {diff === 0 ? <><Icons.Check /> OK</> : <><Icons.Alert /> {diff > 0 ? '+' : ''}{diff}</>}
                                        </span>
                                      ) : '-'}
                                    </td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )
            })}

            <button onClick={saveInv} className="btn btn-green w-full py-3" style={{ fontSize: '1.1rem' }}>
              <Icons.Save /> 棚卸保存
            </button>
          </>
        ) : (
          <div>
            <h4 className="font-semibold mb-4">棚卸履歴</h4>
            {inventoryHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-4">まだ棚卸記録がありません</p>
            ) : (
              <div className="space-y-3">
                {[...inventoryHistory].reverse().map(h => (
                  <div key={h.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold">{h.date}</div>
                        <div className="text-sm text-gray-500">担当: {h.staff}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">¥{h.totalPurchaseValue?.toLocaleString() || 0}</div>
                        <button onClick={() => deleteHistory(h.id)} className="text-red-500 text-sm">削除</button>
                      </div>
                    </div>
                    <details>
                      <summary className="cursor-pointer text-sm text-blue-500">詳細を見る</summary>
                      <div className="mt-2 max-h-48 overflow-y-auto">
                        <table className="text-xs">
                          <thead>
                            <tr><th>商品</th><th className="text-right">数量</th><th className="text-right">金額</th></tr>
                          </thead>
                          <tbody>
                            {h.data?.filter(d => d.quantity > 0).map((d, i) => (
                              <tr key={i}>
                                <td>{d.name}</td>
                                <td className="text-right">{d.quantity}</td>
                                <td className="text-right">¥{(d.quantity * d.purchasePrice).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== 予算管理（ディーラー集計） ====================
function DealerBudget({ products, usage, stockIn, categories, dealerBudgets, setDealerBudgets, dealerAllocations, setDealerAllocations }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [targetSales, setTargetSales] = useState('')
  const [targetRate, setTargetRate] = useState('20')
  const [allocations, setAllocations] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const budget = dealerBudgets.find(b => b.yearMonth === selectedMonth)
    if (budget) {
      setTargetSales(budget.targetSales.toString())
      setTargetRate(budget.targetRate.toString())
    } else {
      setTargetSales('')
      setTargetRate('20')
    }
    const allocs = dealerAllocations.filter(a => a.yearMonth === selectedMonth)
    const allocObj = {}
    allocs.forEach(a => allocObj[a.dealerName] = a.budget)
    setAllocations(allocObj)
  }, [selectedMonth, dealerBudgets, dealerAllocations])

  const dealers = categories.large.map(c => c.name)
  const targetBudget = Math.round((parseInt(targetSales) || 0) * (parseFloat(targetRate) || 20) / 100)

  const getMonthlyUsage = (dealerName) => {
    return usage
      .filter(u => u.largeCategory === dealerName && u.date?.startsWith(selectedMonth))
      .reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0)
  }

  const getMonthlyStockIn = (dealerName) => {
    return stockIn
      .filter(s => s.largeCategory === dealerName && s.date?.startsWith(selectedMonth))
      .reduce((sum, s) => {
        const product = products.find(p => p.id === s.productId)
        return sum + (product ? s.quantity * product.purchasePrice : 0)
      }, 0)
  }

  const getPast3MonthsAvg = (dealerName) => {
    const now = new Date(selectedMonth + '-01')
    let total = 0
    for (let i = 1; i <= 3; i++) {
      const d = new Date(now)
      d.setMonth(d.getMonth() - i)
      const ym = d.toISOString().slice(0, 7)
      total += usage
        .filter(u => u.largeCategory === dealerName && u.date?.startsWith(ym))
        .reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0)
    }
    return Math.round(total / 3)
  }

  const saveBudget = async () => {
    const existing = dealerBudgets.find(b => b.yearMonth === selectedMonth)
    if (existing) {
      await supabase.from('dealer_budgets').update({
        target_sales: parseInt(targetSales) || 0,
        target_rate: parseFloat(targetRate) || 20
      }).eq('id', existing.id)
      setDealerBudgets(dealerBudgets.map(b => b.id === existing.id ? { ...b, targetSales: parseInt(targetSales) || 0, targetRate: parseFloat(targetRate) || 20 } : b))
    } else {
      const { data } = await supabase.from('dealer_budgets').insert({
        year_month: selectedMonth,
        target_sales: parseInt(targetSales) || 0,
        target_rate: parseFloat(targetRate) || 20
      }).select()
      if (data) setDealerBudgets([...dealerBudgets, { id: data[0].id, yearMonth: selectedMonth, targetSales: parseInt(targetSales) || 0, targetRate: parseFloat(targetRate) || 20 }])
    }

    for (const [dealer, budget] of Object.entries(allocations)) {
      const existing = dealerAllocations.find(a => a.yearMonth === selectedMonth && a.dealerName === dealer)
      if (existing) {
        await supabase.from('dealer_budget_allocation').update({ budget: parseInt(budget) || 0 }).eq('id', existing.id)
      } else {
        await supabase.from('dealer_budget_allocation').insert({
          year_month: selectedMonth,
          dealer_name: dealer,
          budget: parseInt(budget) || 0
        })
      }
    }
    const { data: newAllocs } = await supabase.from('dealer_budget_allocation').select('*').eq('year_month', selectedMonth)
    if (newAllocs) {
      setDealerAllocations([
        ...dealerAllocations.filter(a => a.yearMonth !== selectedMonth),
        ...newAllocs.map(a => ({ id: a.id, yearMonth: a.year_month, dealerName: a.dealer_name, budget: a.budget }))
      ])
    }
    setIsEditing(false)
    alert('予算を保存しました！')
  }

  const totalUsage = dealers.reduce((sum, d) => sum + getMonthlyUsage(d), 0)
  const totalStockIn = dealers.reduce((sum, d) => sum + getMonthlyStockIn(d), 0)
  const totalAllocation = Object.values(allocations).reduce((sum, b) => sum + (parseInt(b) || 0), 0)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">💰 予算管理</h3>
          <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} />
        </div>

        <div className="bg-blue-50 p-4 rounded mb-4">
          <div className="grid-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>売上目標</label>
              <input type="number" value={targetSales} onChange={e => setTargetSales(e.target.value)} placeholder="例: 3000000" className="input" disabled={!isEditing} />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>仕入れ目標率（%）</label>
              <input type="number" value={targetRate} onChange={e => setTargetRate(e.target.value)} placeholder="20" className="input" disabled={!isEditing} step="0.1" />
            </div>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <div className="text-sm text-gray-500">仕入れ目標額</div>
            <div className="text-2xl font-bold text-blue-600">¥{targetBudget.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid-3 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded text-center">
            <div className="text-sm text-gray-600">今月の使用</div>
            <div className="text-xl font-bold text-green-600">¥{totalUsage.toLocaleString()}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded text-center">
            <div className="text-sm text-gray-600">今月の入荷</div>
            <div className="text-xl font-bold text-purple-600">¥{totalStockIn.toLocaleString()}</div>
          </div>
          <div className={`p-3 rounded text-center ${totalStockIn <= targetBudget ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="text-sm text-gray-600">予算残り</div>
            <div className={`text-xl font-bold ${totalStockIn <= targetBudget ? 'text-green-600' : 'text-red-600'}`}>
              ¥{(targetBudget - totalStockIn).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold">ディーラー別予算配分</h4>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="btn btn-blue">編集</button>
          ) : (
            <div className="flex gap-2">
              <button onClick={saveBudget} className="btn btn-green">保存</button>
              <button onClick={() => setIsEditing(false)} className="btn btn-gray">取消</button>
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>ディーラー</th>
                <th className="text-right">予算</th>
                <th className="text-right">過去3ヶ月平均</th>
                <th className="text-right">今月使用</th>
                <th className="text-right">今月入荷</th>
                <th className="text-right">予算残り</th>
              </tr>
            </thead>
            <tbody>
              {dealers.map(dealer => {
                const budget = parseInt(allocations[dealer]) || 0
                const usageAmt = getMonthlyUsage(dealer)
                const stockInAmt = getMonthlyStockIn(dealer)
                const avg = getPast3MonthsAvg(dealer)
                const remaining = budget - stockInAmt
                return (
                  <tr key={dealer}>
                    <td className="font-semibold">{dealer}</td>
                    <td className="text-right">
                      {isEditing ? (
                        <input type="number" value={allocations[dealer] || ''} onChange={e => setAllocations({...allocations, [dealer]: e.target.value})} className="input" style={{ width: '100px' }} />
                      ) : (
                        `¥${budget.toLocaleString()}`
                      )}
                    </td>
                    <td className="text-right text-gray-500">¥{avg.toLocaleString()}</td>
                    <td className="text-right text-green-600">¥{usageAmt.toLocaleString()}</td>
                    <td className="text-right text-purple-600">¥{stockInAmt.toLocaleString()}</td>
                    <td className={`text-right font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ¥{remaining.toLocaleString()}
                    </td>
                  </tr>
                )
              })}
              <tr className="font-bold bg-gray-50">
                <td>合計</td>
                <td className="text-right">¥{totalAllocation.toLocaleString()}</td>
                <td></td>
                <td className="text-right text-green-600">¥{totalUsage.toLocaleString()}</td>
                <td className="text-right text-purple-600">¥{totalStockIn.toLocaleString()}</td>
                <td className={`text-right ${totalAllocation - totalStockIn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ¥{(totalAllocation - totalStockIn).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==================== 発注リンク ====================
function OrderLinks({ categories, setCategories }) {
  const [editingDealer, setEditingDealer] = useState(null)
  const [editData, setEditData] = useState({})
  const [showPasswords, setShowPasswords] = useState({})

  const orderMethods = [
    { value: 'web', label: 'ネット注文' },
    { value: 'line', label: 'LINE' },
    { value: 'other', label: 'その他' }
  ]

  const startEdit = (dealer) => {
    setEditingDealer(dealer.name)
    setEditData({
      url: dealer.url || '',
      orderMethod: dealer.orderMethod || 'web',
      loginId: dealer.loginId || '',
      loginPassword: dealer.loginPassword || ''
    })
  }

  const saveEdit = async (dealerName) => {
    const { error } = await supabase.from('categories')
      .update({
        url: editData.url,
        order_method: editData.orderMethod,
        login_id: editData.loginId,
        login_password: editData.loginPassword
      })
      .eq('type', 'large')
      .eq('name', dealerName)

    if (!error) {
      setCategories({
        ...categories,
        large: categories.large.map(d => d.name === dealerName ? {
          ...d,
          url: editData.url,
          orderMethod: editData.orderMethod,
          loginId: editData.loginId,
          loginPassword: editData.loginPassword
        } : d)
      })
      setEditingDealer(null)
    }
  }

  const togglePassword = (dealerName) => {
    setShowPasswords({ ...showPasswords, [dealerName]: !showPasswords[dealerName] })
  }

  const getMethodLabel = (method) => {
    const found = orderMethods.find(m => m.value === method)
    return found ? found.label : 'ネット注文'
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📦 発注リンク</h3>
        <p className="text-sm text-gray-600 mb-4">ディーラーの発注ページにワンタップでアクセス</p>
      </div>

      {categories.large.length === 0 ? (
        <div className="card text-center text-gray-500">
          <p>ディーラーが登録されていません</p>
          <p className="text-sm">商品管理タブでディーラーを追加してください</p>
        </div>
      ) : (
        categories.large.map(dealer => (
          <div key={dealer.name} className="card">
            {editingDealer === dealer.name ? (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-blue-600">{dealer.name}</h4>
                <div>
                  <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>注文方法</label>
                  <select value={editData.orderMethod} onChange={e => setEditData({...editData, orderMethod: e.target.value})} className="select">
                    {orderMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>
                    {editData.orderMethod === 'line' ? 'LINEトークURL' : 'URL'}
                  </label>
                  <input type="url" value={editData.url} onChange={e => setEditData({...editData, url: e.target.value})} placeholder={editData.orderMethod === 'line' ? 'line://ti/p/xxxxx' : 'https://...'} className="input" />
                </div>
                {editData.orderMethod === 'web' && (
                  <>
                    <div>
                      <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>ログインID</label>
                      <input type="text" value={editData.loginId} onChange={e => setEditData({...editData, loginId: e.target.value})} className="input" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>パスワード</label>
                      <input type="text" value={editData.loginPassword} onChange={e => setEditData({...editData, loginPassword: e.target.value})} className="input" />
                    </div>
                  </>
                )}
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(dealer.name)} className="btn btn-green">保存</button>
                  <button onClick={() => setEditingDealer(null)} className="btn btn-gray">取消</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-blue-600">{dealer.name}</h4>
                    <span className="badge badge-gray">{getMethodLabel(dealer.orderMethod)}</span>
                  </div>
                  {dealer.url && (
                    <a href={dealer.url} target="_blank" rel="noopener noreferrer" className="btn btn-blue">
                      {dealer.orderMethod === 'line' ? 'LINEを開く' : '発注ページを開く'} →
                    </a>
                  )}
                </div>

                {dealer.orderMethod === 'web' && dealer.loginId && (
                  <div className="bg-gray-50 p-3 rounded mb-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ID:</span>
                      <span className="font-mono">{dealer.loginId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">パスワード:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{showPasswords[dealer.name] ? dealer.loginPassword : '••••••••'}</span>
                        <button onClick={() => togglePassword(dealer.name)} className="text-blue-500">
                          {showPasswords[dealer.name] ? <Icons.EyeOff /> : <Icons.Eye />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => startEdit(dealer)} className="text-blue-500 text-sm">編集</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  )
}

// ==================== スタッフ購入 ====================
function StaffPurchase({ products, staff, staffPurchases, setStaffPurchases }) {
  const [selectedStaff, setSelectedStaff] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const recordPurchase = async () => {
    if (!selectedStaff || !selectedProduct) { alert('スタッフと商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return
    const { data, error } = await supabase.from('staff_purchases').insert({
      staff_name: selectedStaff,
      product_id: product.id,
      product_name: product.name,
      large_category: product.largeCategory,
      medium_category: product.mediumCategory,
      purchase_price: product.purchasePrice,
      quantity,
      purchase_date: date
    }).select()
    if (!error && data) {
      setStaffPurchases([...staffPurchases, { id: data[0].id, staff: selectedStaff, productId: product.id, productName: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: product.purchasePrice, quantity, date }])
      alert('購入を記録しました！')
      setQuantity(1)
    }
  }

  const deletePurchase = async (id) => {
    if (!confirm('この購入記録を削除しますか？')) return
    const { error } = await supabase.from('staff_purchases').delete().eq('id', id)
    if (!error) setStaffPurchases(staffPurchases.filter(p => p.id !== id))
  }

  const startEdit = (record) => {
    setEditingId(record.id)
    setEditData({ staff: record.staff, quantity: record.quantity, date: record.date })
  }

  const saveEdit = async (id) => {
    const { error } = await supabase.from('staff_purchases').update({
      staff_name: editData.staff,
      quantity: parseInt(editData.quantity) || 1,
      purchase_date: editData.date
    }).eq('id', id)
    if (!error) {
      setStaffPurchases(staffPurchases.map(p => p.id === id ? { ...p, staff: editData.staff, quantity: parseInt(editData.quantity) || 1, date: editData.date } : p))
      setEditingId(null)
    }
  }

  const monthlyPurchases = staffPurchases.filter(p => p.date?.startsWith(selectedMonth))
  const staffSummary = {}
  monthlyPurchases.forEach(p => {
    if (!staffSummary[p.staff]) staffSummary[p.staff] = { items: [], total: 0 }
    staffSummary[p.staff].items.push(p)
    staffSummary[p.staff].total += p.purchasePrice * p.quantity
  })
  const grandTotal = Object.values(staffSummary).reduce((sum, s) => sum + s.total, 0)

  const printMonthlyReport = () => {
    const content = `
      <h2>${selectedMonth.replace('-', '年')}月 スタッフ購入一覧</h2>
      ${Object.entries(staffSummary).map(([staffName, data]) => `
        <div style="margin-bottom: 20px; page-break-inside: avoid;">
          <h3 style="background: #f0f0f0; padding: 8px;">${staffName}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead><tr style="background: #f9f9f9;"><th style="border: 1px solid #ddd; padding: 6px;">日付</th><th style="border: 1px solid #ddd; padding: 6px;">商品</th><th style="border: 1px solid #ddd; padding: 6px; text-align: right;">数量</th><th style="border: 1px solid #ddd; padding: 6px; text-align: right;">金額</th></tr></thead>
            <tbody>
              ${data.items.map(item => `<tr><td style="border: 1px solid #ddd; padding: 6px;">${item.date}</td><td style="border: 1px solid #ddd; padding: 6px;">${item.productName}</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${item.quantity}</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">¥${(item.purchasePrice * item.quantity).toLocaleString()}</td></tr>`).join('')}
              <tr style="font-weight: bold; background: #fff9e6;"><td colspan="3" style="border: 1px solid #ddd; padding: 6px;">合計（給料天引額）</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">¥${data.total.toLocaleString()}</td></tr>
            </tbody>
          </table>
        </div>
      `).join('')}
      <div style="margin-top: 20px; padding: 10px; background: #e6f3ff; font-weight: bold;">全スタッフ合計: ¥${grandTotal.toLocaleString()}</div>
    `
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`<!DOCTYPE html><html><head><title>スタッフ購入一覧 ${selectedMonth}</title><style>body { font-family: sans-serif; padding: 20px; }</style></head><body>${content}</body></html>`)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">🛒 スタッフ購入記録</h3>
        <div className="grid-2 mb-4">
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label>
            <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select">
              <option value="">選択</option>
              {staff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>購入日</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
          </div>
        </div>
        <div className="grid-2 mb-4">
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>商品</label>
            <select value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)} className="select">
              <option value="">選択</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}（¥{p.purchasePrice.toLocaleString()}）</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>数量</label>
            <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} min="1" className="input" />
          </div>
        </div>
        <button onClick={recordPurchase} className="btn btn-blue w-full py-3">購入を記録</button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h3 className="text-lg font-bold">📊 月次集計</h3>
          <input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} />
        </div>
        <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
          <div className="summary-card">
            <div className="label">購入件数</div>
            <div className="value text-blue-600">{monthlyPurchases.length}件</div>
          </div>
          <div className="summary-card">
            <div className="label">合計金額</div>
            <div className="value text-blue-600">¥{grandTotal.toLocaleString()}</div>
          </div>
        </div>
        <button onClick={printMonthlyReport} className="btn btn-blue mb-4">PDF出力（印刷）</button>

        {Object.keys(staffSummary).length === 0 ? (
          <p className="text-gray-500 text-center py-4">この月の購入記録はありません</p>
        ) : (
          Object.entries(staffSummary).map(([staffName, data]) => (
            <div key={staffName} className="mb-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 flex justify-between items-center">
                <span className="font-bold">{staffName}</span>
                <span className="text-green-600 font-bold">¥{data.total.toLocaleString()}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="text-sm">
                  <thead><tr><th>日付</th><th>商品</th><th className="text-center">数量</th><th className="text-right">金額</th><th className="text-center">操作</th></tr></thead>
                  <tbody>
                    {data.items.map(item => (
                      editingId === item.id ? (
                        <tr key={item.id} style={{ background: '#fef9c3' }}>
                          <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '120px' }} /></td>
                          <td>{item.productName}</td>
                          <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '60px' }} min="1" /></td>
                          <td className="text-right">¥{(item.purchasePrice * (parseInt(editData.quantity) || 1)).toLocaleString()}</td>
                          <td className="text-center">
                            <button onClick={() => saveEdit(item.id)} className="text-green-600 text-sm mr-2">保存</button>
                            <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>{item.productName}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-right">¥{(item.purchasePrice * item.quantity).toLocaleString()}</td>
                          <td className="text-center">
                            <button onClick={() => startEdit(item)} className="text-blue-500 text-sm mr-2">編集</button>
                            <button onClick={() => deletePurchase(item.id)} className="text-red-500 text-sm">削除</button>
                          </td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ==================== 商品管理 ====================
function ProductManagement({ products, setProducts, categories, setCategories }) {
  const [newLarge, setNewLarge] = useState('')
  const [newMedium, setNewMedium] = useState('')
  const [newProduct, setNewProduct] = useState({ largeCategory: '', mediumCategory: '', name: '', purchasePrice: '', sellingPrice: '', productType: 'business' })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [filterDealer, setFilterDealer] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [searchText, setSearchText] = useState('')

  const productTypes = [
    { value: 'business', label: '業務用' },
    { value: 'retail', label: '店販' },
    { value: 'both', label: '両方' }
  ]

  const addCategory = async (type, value, setter) => {
    const exists = type === 'large' ? categories.large.some(c => c.name === value) : categories.medium.includes(value)
    if (!value || exists) return
    const { error } = await supabase.from('categories').insert({ type, name: value })
    if (!error) {
      if (type === 'large') {
        setCategories({ ...categories, large: [...categories.large, { name: value, url: '', orderMethod: 'web', loginId: '', loginPassword: '' }] })
      } else {
        setCategories({ ...categories, medium: [...categories.medium, value] })
      }
      setter('')
    }
  }

  const deleteCategory = async (type, name) => {
    if (!confirm(`「${name}」を削除しますか？`)) return
    const { error } = await supabase.from('categories').delete().eq('type', type).eq('name', name)
    if (!error) {
      if (type === 'large') {
        setCategories({ ...categories, large: categories.large.filter(c => c.name !== name) })
      } else {
        setCategories({ ...categories, medium: categories.medium.filter(c => c !== name) })
      }
    }
  }

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.largeCategory || !newProduct.mediumCategory) return
    const maxOrder = products.length > 0 ? Math.max(...products.map(p => p.sortOrder || 0)) + 1 : 1
    const { data, error } = await supabase.from('products').insert({
      large_category: newProduct.largeCategory,
      medium_category: newProduct.mediumCategory,
      name: newProduct.name,
      purchase_price: parseFloat(newProduct.purchasePrice) || 0,
      selling_price: parseFloat(newProduct.sellingPrice) || 0,
      product_type: newProduct.productType,
      sort_order: maxOrder
    }).select()
    if (!error && data) {
      setProducts([...products, { id: data[0].id, largeCategory: newProduct.largeCategory, mediumCategory: newProduct.mediumCategory, name: newProduct.name, purchasePrice: parseFloat(newProduct.purchasePrice) || 0, sellingPrice: parseFloat(newProduct.sellingPrice) || 0, productType: newProduct.productType, sortOrder: maxOrder }])
      setNewProduct({ largeCategory: '', mediumCategory: '', name: '', purchasePrice: '', sellingPrice: '', productType: 'business' })
    }
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

  const saveEdit = async (id) => {
    const { error } = await supabase.from('products').update({
      name: editData.name,
      large_category: editData.largeCategory,
      medium_category: editData.mediumCategory,
      purchase_price: parseFloat(editData.purchasePrice) || 0,
      selling_price: parseFloat(editData.sellingPrice) || 0,
      product_type: editData.productType
    }).eq('id', id)
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, ...editData, purchasePrice: parseFloat(editData.purchasePrice) || 0, sellingPrice: parseFloat(editData.sellingPrice) || 0 } : p))
      setEditingId(null)
    }
  }

  const getTypeLabel = (type) => {
    const found = productTypes.find(t => t.value === type)
    return found ? found.label : '業務用'
  }

  const filteredProducts = products.filter(p => {
    if (filterDealer && p.largeCategory !== filterDealer) return false
    if (filterCategory && p.mediumCategory !== filterCategory) return false
    if (searchText && !p.name.toLowerCase().includes(searchText.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">カテゴリー管理</h3>
        <div className="grid-2">
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>ディーラー</label>
            <div className="flex gap-2">
              <input type="text" value={newLarge} onChange={e => setNewLarge(e.target.value)} placeholder="例：〇〇商事" className="input" />
              <button onClick={() => addCategory('large', newLarge, setNewLarge)} className="btn btn-blue">追加</button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {categories.large.map((c, i) => (
                <span key={i} className="bg-blue-50 px-3 py-1 rounded text-sm flex items-center gap-1">
                  {c.name}
                  <button onClick={() => deleteCategory('large', c.name)} className="text-red-500 ml-1">×</button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>種類</label>
            <div className="flex gap-2">
              <input type="text" value={newMedium} onChange={e => setNewMedium(e.target.value)} placeholder="例：シャンプー" className="input" />
              <button onClick={() => addCategory('medium', newMedium, setNewMedium)} className="btn btn-green">追加</button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {categories.medium.map((c, i) => (
                <span key={i} className="bg-green-50 px-3 py-1 rounded text-sm flex items-center gap-1">
                  {c}
                  <button onClick={() => deleteCategory('medium', c)} className="text-red-500 ml-1">×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">商品登録</h3>
        <div className="grid-2 mb-4">
          <select value={newProduct.largeCategory} onChange={e => setNewProduct({ ...newProduct, largeCategory: e.target.value })} className="select">
            <option value="">ディーラー</option>
            {categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
          </select>
          <select value={newProduct.mediumCategory} onChange={e => setNewProduct({ ...newProduct, mediumCategory: e.target.value })} className="select">
            <option value="">種類</option>
            {categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
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
        <button onClick={addProduct} className="btn btn-blue"><Icons.Plus /> 商品を追加</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">商品一覧 ({filteredProducts.length}件)</h3>
        <div className="grid-3 gap-2 mb-4">
          <select value={filterDealer} onChange={e => setFilterDealer(e.target.value)} className="select">
            <option value="">全ディーラー</option>
            {categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
          </select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="select">
            <option value="">全種類</option>
            {categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <Icons.Search />
            <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="商品名検索" className="input" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>タイプ</th>
                <th>ディーラー</th>
                <th>種類</th>
                <th>商品名</th>
                <th className="text-right">仕入れ</th>
                <th className="text-right">販売</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                editingId === p.id ? (
                  <tr key={p.id} style={{ background: '#fef9c3' }}>
                    <td>
                      <select value={editData.productType} onChange={e => setEditData({...editData, productType: e.target.value})} className="select">
                        {productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </td>
                    <td>
                      <select value={editData.largeCategory} onChange={e => setEditData({...editData, largeCategory: e.target.value})} className="select">
                        {categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                      </select>
                    </td>
                    <td>
                      <select value={editData.mediumCategory} onChange={e => setEditData({...editData, mediumCategory: e.target.value})} className="select">
                        {categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" /></td>
                    <td><input type="number" value={editData.purchasePrice} onChange={e => setEditData({...editData, purchasePrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td><input type="number" value={editData.sellingPrice} onChange={e => setEditData({...editData, sellingPrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td className="text-center">
                      <button onClick={() => saveEdit(p.id)} className="text-green-600 text-sm mr-2">保存</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={p.id}>
                    <td><span className={`badge ${p.productType === 'retail' ? 'badge-blue' : p.productType === 'both' ? 'badge-yellow' : 'badge-green'}`}>{getTypeLabel(p.productType)}</span></td>
                    <td>{p.largeCategory}</td>
                    <td>{p.mediumCategory}</td>
                    <td>{p.name}</td>
                    <td className="text-right">¥{p.purchasePrice.toLocaleString()}</td>
                    <td className="text-right">¥{p.sellingPrice.toLocaleString()}</td>
                    <td className="text-center">
                      <button onClick={() => startEdit(p)} className="text-blue-500 text-sm mr-2">編集</button>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 text-sm">削除</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==================== スタッフ管理 ====================
function StaffManagement({ staff, setStaff, categories }) {
  const [newStaff, setNewStaff] = useState('')
  const [newDealers, setNewDealers] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({ name: '', dealers: [] })

  const toggleNewDealer = (dealer) => {
    if (newDealers.includes(dealer)) {
      setNewDealers(newDealers.filter(d => d !== dealer))
    } else {
      setNewDealers([...newDealers, dealer])
    }
  }

  const toggleEditDealer = (dealer) => {
    if (editData.dealers.includes(dealer)) {
      setEditData({...editData, dealers: editData.dealers.filter(d => d !== dealer)})
    } else {
      setEditData({...editData, dealers: [...editData.dealers, dealer]})
    }
  }

  const addStaff = async () => {
    if (!newStaff || staff.find(s => s.name === newStaff)) return
    const dealerStr = newDealers.join(',')
    const { data, error } = await supabase.from('staff').insert({ name: newStaff, dealer: dealerStr }).select()
    if (!error && data) {
      setStaff([...staff, { id: data[0].id, name: newStaff, dealer: dealerStr }])
      setNewStaff('')
      setNewDealers([])
    }
  }

  const deleteStaff = async (id, name) => {
    if (!confirm(`「${name}」を削除しますか？`)) return
    const { error } = await supabase.from('staff').delete().eq('id', id)
    if (!error) setStaff(staff.filter(s => s.id !== id))
  }

  const startEdit = (s) => {
    setEditingId(s.id)
    const dealers = s.dealer ? s.dealer.split(',').filter(d => d) : []
    setEditData({ name: s.name, dealers })
  }

  const saveEdit = async (id) => {
    const dealerStr = editData.dealers.join(',')
    const { error } = await supabase.from('staff').update({ name: editData.name, dealer: dealerStr }).eq('id', id)
    if (!error) {
      setStaff(staff.map(s => s.id === id ? { ...s, name: editData.name, dealer: dealerStr } : s))
      setEditingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ追加</h3>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ名</label>
          <input type="text" value={newStaff} onChange={e => setNewStaff(e.target.value)} placeholder="名前" className="input" />
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>発注担当ディーラー</label>
          <div className="flex flex-wrap gap-2">
            {categories.large.map((c, i) => (
              <label key={i} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer border ${newDealers.includes(c.name) ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'}`}>
                <input type="checkbox" checked={newDealers.includes(c.name)} onChange={() => toggleNewDealer(c.name)} />
                <span className="text-sm">{c.name}</span>
              </label>
            ))}
          </div>
        </div>
        <button onClick={addStaff} className="btn btn-blue">追加</button>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ一覧 ({staff.length}名)</h3>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>スタッフ名</th>
                <th>発注担当</th>
                <th className="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              {staff.map(s => (
                editingId === s.id ? (
                  <tr key={s.id} style={{ background: '#fef9c3' }}>
                    <td><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" /></td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {categories.large.map((c, i) => (
                          <label key={i} className={`flex items-center gap-1 px-2 py-1 rounded cursor-pointer text-xs border ${editData.dealers.includes(c.name) ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'}`}>
                            <input type="checkbox" checked={editData.dealers.includes(c.name)} onChange={() => toggleEditDealer(c.name)} className="w-3 h-3" />
                            <span>{c.name}</span>
                          </label>
                        ))}
                      </div>
                    </td>
                    <td className="text-center">
                      <button onClick={() => saveEdit(s.id)} className="text-green-600 text-sm mr-2">保存</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={s.id}>
                    <td className="font-semibold">{s.name}</td>
                    <td>
                      {s.dealer ? (
                        <div className="flex flex-wrap gap-1">
                          {s.dealer.split(',').filter(d => d).map((d, i) => (
                            <span key={i} className="badge badge-blue">{d}</span>
                          ))}
                        </div>
                      ) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="text-center">
                      <button onClick={() => startEdit(s)} className="text-blue-500 text-sm mr-2">編集</button>
                      <button onClick={() => deleteStaff(s.id, s.name)} className="text-red-500 text-sm">削除</button>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==================== データ出力 ====================
function DataExport({ products, staff, usage, stockIn, inventoryHistory }) {
  const downloadCSV = (filename, headers, rows) => {
    const BOM = '\uFEFF'
    const csvContent = BOM + [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
  }

  const exportProductsCSV = () => {
    const headers = ['ディーラー', '種類', '商品名', '仕入れ価格', '販売価格']
    const rows = products.map(p => [p.largeCategory, p.mediumCategory, p.name, p.purchasePrice, p.sellingPrice])
    downloadCSV('商品一覧.csv', headers, rows)
  }

  const exportUsageCSV = () => {
    const headers = ['日付', 'ディーラー', '種類', '商品名', '数量', '金額']
    const rows = usage.map(u => [u.date, u.largeCategory, u.mediumCategory, u.productName, u.quantity, u.purchasePrice * u.quantity])
    downloadCSV('使用履歴.csv', headers, rows)
  }

  const exportStockInCSV = () => {
    const headers = ['日付', 'ディーラー', '商品名', '入荷数']
    const rows = stockIn.map(s => [s.date, s.largeCategory, s.productName, s.quantity])
    downloadCSV('入荷履歴.csv', headers, rows)
  }

  const exportInventoryCSV = () => {
    if (inventoryHistory.length === 0) { alert('棚卸履歴がありません'); return }
    const latest = inventoryHistory[inventoryHistory.length - 1]
    const headers = ['商品名', '数量', '仕入れ価格', '在庫金額']
    const rows = latest.data.map(d => [d.name, d.quantity, d.purchasePrice, d.quantity * d.purchasePrice])
    downloadCSV(`棚卸_${latest.date}.csv`, headers, rows)
  }

  const items = [
    { label: '商品一覧', fn: exportProductsCSV, count: products.length },
    { label: '使用履歴', fn: exportUsageCSV, count: usage.length },
    { label: '入荷履歴', fn: exportStockInCSV, count: stockIn.length },
    { label: '最新棚卸', fn: exportInventoryCSV, count: inventoryHistory.length },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">📊 データ出力</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded">
            <div>
              <span className="font-semibold">{item.label}</span>
              <span className="text-sm text-gray-500 ml-2">({item.count}件)</span>
            </div>
            <button onClick={item.fn} className="btn btn-green">CSV出力</button>
          </div>
        ))}
      </div>
    </div>
  )
}
