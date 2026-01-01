'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const Icons = {
  Save: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
  Plus: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Star: ({ filled }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Package: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  TrendingUp: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  Building: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>,
  Calculator: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/><line x1="8" y1="18" x2="12" y2="18"/></svg>,
  Filter: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  Check: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Alert: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Eye: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  Search: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  History: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Lock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Logout: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [passwords, setPasswords] = useState({ admin: '', staff: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPasswords()
    const saved = localStorage.getItem('salon_login')
    if (saved) {
      const { role } = JSON.parse(saved)
      setUserRole(role)
      setIsLoggedIn(true)
    }
  }, [])

  const loadPasswords = async () => {
    const { data } = await supabase.from('app_settings').select('*')
    if (data) {
      const admin = data.find(d => d.setting_key === 'admin_password')?.setting_value || 'admin123'
      const staff = data.find(d => d.setting_key === 'staff_password')?.setting_value || 'staff123'
      setPasswords({ admin, staff })
    }
    setLoading(false)
  }

  const handleLogin = (role) => {
    setUserRole(role)
    setIsLoggedIn(true)
    localStorage.setItem('salon_login', JSON.stringify({ role }))
  }

  const handleLogout = () => {
    setUserRole(null)
    setIsLoggedIn(false)
    localStorage.removeItem('salon_login')
  }

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}><p>読み込み中...</p></div>

  if (!isLoggedIn) {
    return <LoginScreen passwords={passwords} onLogin={handleLogin} />
  }

  return <MainApp userRole={userRole} onLogout={handleLogout} passwords={passwords} setPasswords={setPasswords} />
}

// ==================== ログイン画面 ====================
function LoginScreen({ passwords, onLogin }) {
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputPassword === passwords.admin) {
      onLogin('admin')
    } else if (inputPassword === passwords.staff) {
      onLogin('staff')
    } else {
      setError('パスワードが違います')
    }
  }

  return (
    <div className="container" style={{ paddingTop: '4rem' }}>
      <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="text-center mb-6">
          <Icons.Lock />
          <h1 className="text-2xl font-bold mt-2">美容室在庫管理</h1>
          <p className="text-sm text-gray-500 mt-1">ログインしてください</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>パスワード</label>
            <input
              type="password"
              value={inputPassword}
              onChange={e => { setInputPassword(e.target.value); setError('') }}
              className="input w-full"
              placeholder="パスワードを入力"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button type="submit" className="btn btn-blue w-full py-3">ログイン</button>
        </form>
      </div>
    </div>
  )
}

// ==================== メインアプリ ====================
function MainApp({ userRole, onLogout, passwords, setPasswords }) {
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
  const [bonusSettings, setBonusSettings] = useState([])
  const [monthlyReports, setMonthlyReports] = useState([])
  const [timeRecords, setTimeRecords] = useState([])
  const [leaveGrants, setLeaveGrants] = useState([])
  const [leaveRequests, setLeaveRequests] = useState([])
  const [notifications, setNotifications] = useState([])
  const [lossRecords, setLossRecords] = useState([])
  const [lossPrices, setLossPrices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAllData() }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [staffRes, productsRes, categoriesRes, usageRes, stockInRes, inventoryRes, favoritesRes, purchasesRes, budgetsRes, allocationsRes, bonusRes, lossRes, lossPricesRes, monthlyRes, timeRes, leaveGrantsRes, leaveRequestsRes, notificationsRes] = await Promise.all([
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
        supabase.from('bonus_settings').select('*').order('id'),
        supabase.from('loss_records').select('*').order('id'),
        supabase.from('loss_price_settings').select('*').order('id'),
        supabase.from('monthly_reports').select('*').order('year').order('month'),
        supabase.from('time_records').select('*').order('record_date', { ascending: false }),
        supabase.from('leave_grants').select('*').order('fiscal_year', { ascending: false }),
        supabase.from('leave_requests').select('*').order('leave_date', { ascending: false }),
        supabase.from('notifications').select('*').order('created_at', { ascending: false }),
      ])
      if (staffRes.data) setStaff(staffRes.data.map(s => ({
        id: s.id, name: s.name, dealer: s.dealer || '',
        joinDate: s.join_date, tenureRate: s.tenure_rate || 100,
        workType: s.work_type || 'full', partTimeRate: s.part_time_rate || 100,
        isOpeningStaff: s.is_opening_staff || false, specialRate: s.special_rate || 0,
        isManagement: s.is_management || false, workDaysPerWeek: s.work_days_per_week || 5
      })))
      if (productsRes.data) setProducts(productsRes.data.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)).map(p => ({ id: p.id, largeCategory: p.large_category, mediumCategory: p.medium_category, name: p.name, purchasePrice: p.purchase_price, sellingPrice: p.selling_price, productType: p.product_type || 'business', sortOrder: p.sort_order || 0 })))
      if (categoriesRes.data) {
        setCategories({
          large: categoriesRes.data.filter(c => c.type === 'large').map(c => ({
            name: c.name, url: c.url || '', orderMethod: c.order_method || 'web',
            loginId: c.login_id || '', loginPassword: c.login_password || ''
          })),
          medium: categoriesRes.data.filter(c => c.type === 'medium').map(c => c.name)
        })
      }
      if (usageRes.data) setUsage(usageRes.data.map(u => ({ id: u.id, staff: u.staff_name, productId: u.product_id, productName: u.product_name, largeCategory: u.large_category, mediumCategory: u.medium_category, purchasePrice: u.purchase_price, quantity: u.quantity, date: u.usage_date })))
      if (stockInRes.data) setStockIn(stockInRes.data.map(s => ({ id: s.id, productId: s.product_id, productName: s.product_name, largeCategory: s.large_category, quantity: s.quantity, date: s.stock_in_date })))
      if (inventoryRes.data) setInventoryHistory(inventoryRes.data.map(i => ({ id: i.id, date: i.inventory_date, staff: i.staff_name, data: i.data, totalPurchaseValue: i.total_purchase_value, totalUsageValue: i.total_usage_value })))
      if (favoritesRes.data) setFavorites(favoritesRes.data.map(f => f.product_id))
      if (purchasesRes.data) setStaffPurchases(purchasesRes.data.map(p => ({ id: p.id, staff: p.staff_name, productId: p.product_id, productName: p.product_name, largeCategory: p.large_category, mediumCategory: p.medium_category, purchasePrice: p.purchase_price, quantity: p.quantity, date: p.purchase_date, saleTag: p.sale_tag || '' })))
      if (budgetsRes.data) setDealerBudgets(budgetsRes.data.map(b => ({ id: b.id, yearMonth: b.year_month, targetSales: b.target_sales, targetRate: parseFloat(b.target_rate) })))
      if (allocationsRes.data) setDealerAllocations(allocationsRes.data.map(a => ({ id: a.id, yearMonth: a.year_month, dealerName: a.dealer_name, budget: a.budget })))
      if (bonusRes.data) setBonusSettings(bonusRes.data.map(b => ({ id: b.id, periodStart: b.period_start, periodEnd: b.period_end, targetSales: b.target_sales, retailSales: b.retail_sales || 0, targetRate: parseFloat(b.target_rate), actualPurchase: b.actual_purchase, manualMaterialCost: b.manual_material_cost, dealerPurchase: b.dealer_purchase || 0, memo: b.memo })))
      if (lossRes.data) setLossRecords(lossRes.data.map(l => ({ id: l.id, date: l.record_date, categoryName: l.category_name, pricePerGram: parseFloat(l.price_per_gram), lossGrams: parseFloat(l.loss_grams), lossAmount: parseFloat(l.loss_amount), memo: l.memo })))
      if (lossPricesRes.data) setLossPrices(lossPricesRes.data.map(p => ({ id: p.id, categoryName: p.category_name, pricePerGram: parseFloat(p.price_per_gram) })))
      if (monthlyRes.data) setMonthlyReports(monthlyRes.data.map(m => ({ id: m.id, year: m.year, month: m.month, totalSales: m.total_sales, retailSales: m.retail_sales, materialCost: m.material_cost, prolaboPurchase: m.prolabo_purchase })))
      if (timeRes.data) setTimeRecords(timeRes.data.map(t => ({ id: t.id, staffId: t.staff_id, staffName: t.staff_name, date: t.record_date, clockIn: t.clock_in, clockOut: t.clock_out, isSpecial: t.is_special, specialNote: t.special_note, inputType: t.input_type })))
      if (leaveGrantsRes.data) setLeaveGrants(leaveGrantsRes.data.map(g => ({ id: g.id, staffId: g.staff_id, staffName: g.staff_name, fiscalYear: g.fiscal_year, leaveType: g.leave_type, grantedDays: parseFloat(g.granted_days), carriedDays: parseFloat(g.carried_days) })))
      if (leaveRequestsRes.data) setLeaveRequests(leaveRequestsRes.data.map(r => ({ id: r.id, staffId: r.staff_id, staffName: r.staff_name, leaveType: r.leave_type, leaveDate: r.leave_date, dayType: r.day_type, dayValue: parseFloat(r.day_value), status: r.status, memo: r.memo, approvedBy: r.approved_by, approvedAt: r.approved_at })))
      if (notificationsRes.data) setNotifications(notificationsRes.data.map(n => ({ id: n.id, targetRole: n.target_role, targetStaffId: n.target_staff_id, message: n.message, linkTo: n.link_to, isRead: n.is_read, createdAt: n.created_at })))
    } catch (e) { console.error('データ読み込みエラー:', e) }
    setLoading(false)
  }

  const isAdmin = userRole === 'admin'

  const mainTabs = [
    { key: 'usage', label: '使用入力' },
    { key: 'stockin', label: '入荷' },
    { key: 'timecard', label: '🕐 打刻' },
    { key: 'order', label: '発注リンク' }
  ]
  const otherTabs = [
    { key: 'inventory', label: '棚卸' },
    { key: 'dealer', label: '予算管理' },
    { key: 'purchase', label: 'スタッフ購入' },
    { key: 'loss', label: 'ロス入力' },
    { key: 'monthly', label: '📊 月次レポート' },
    { key: 'bonus', label: '材料費達成率' },
    { key: 'leave', label: '🏖️ 有給管理' },
    { key: 'products', label: '商品管理' },
    { key: 'staff', label: 'スタッフ' },
    { key: 'export', label: '出力' },
    ...(isAdmin ? [
      { key: 'lossprice', label: 'ロス単価設定' },
      { key: 'settings', label: '設定' }
    ] : [])
  ]
  const allTabs = [...mainTabs, ...otherTabs]
  const currentLabel = allTabs.find(t => t.key === tab)?.label || '使用入力'
  const isOtherTab = otherTabs.some(t => t.key === tab)

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}><p>読み込み中...</p></div>

  return (
    <div className="container">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">美容室在庫管理</h1>
          <div className="flex items-center gap-2">
            <span className={`badge ${isAdmin ? 'badge-red' : 'badge-blue'}`}>{isAdmin ? '管理者' : 'スタッフ'}</span>
            <button onClick={onLogout} className="btn btn-gray" style={{ padding: '0.25rem 0.5rem' }}><Icons.Logout /></button>
          </div>
        </div>
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
      {tab === 'timecard' && <TimeCard staff={staff} timeRecords={timeRecords} setTimeRecords={setTimeRecords} isAdmin={isAdmin} />}
      {tab === 'order' && <OrderLinks categories={categories} setCategories={setCategories} />}
      {tab === 'inventory' && <InventoryInput products={products} staff={staff} usage={usage} stockIn={stockIn} inventoryHistory={inventoryHistory} setInventoryHistory={setInventoryHistory} />}
      {tab === 'dealer' && <DealerBudget products={products} usage={usage} stockIn={stockIn} categories={categories} dealerBudgets={dealerBudgets} setDealerBudgets={setDealerBudgets} dealerAllocations={dealerAllocations} setDealerAllocations={setDealerAllocations} isAdmin={isAdmin} />}
      {tab === 'purchase' && <StaffPurchase products={products} staff={staff} staffPurchases={staffPurchases} setStaffPurchases={setStaffPurchases} />}
      {tab === 'products' && <ProductManagement products={products} setProducts={setProducts} categories={categories} setCategories={setCategories} />}
      {tab === 'staff' && <StaffManagement staff={staff} setStaff={setStaff} categories={categories} isAdmin={isAdmin} />}
      {tab === 'export' && <DataExport products={products} staff={staff} usage={usage} stockIn={stockIn} inventoryHistory={inventoryHistory} />}
      {tab === 'bonus' && <BonusManagement staff={staff} bonusSettings={bonusSettings} setBonusSettings={setBonusSettings} stockIn={stockIn} products={products} staffPurchases={staffPurchases} isAdmin={isAdmin} />}
      {tab === 'leave' && <LeaveManagement staff={staff} leaveGrants={leaveGrants} setLeaveGrants={setLeaveGrants} leaveRequests={leaveRequests} setLeaveRequests={setLeaveRequests} notifications={notifications} setNotifications={setNotifications} isAdmin={isAdmin} userRole={userRole} />}
      {tab === 'monthly' && <MonthlyReport monthlyReports={monthlyReports} setMonthlyReports={setMonthlyReports} stockIn={stockIn} products={products} staffPurchases={staffPurchases} isAdmin={isAdmin} />}
      {tab === 'loss' && <LossInput lossRecords={lossRecords} setLossRecords={setLossRecords} lossPrices={lossPrices} isAdmin={isAdmin} />}
      {tab === 'lossprice' && isAdmin && <LossPriceSettings lossPrices={lossPrices} setLossPrices={setLossPrices} />}
      {tab === 'settings' && isAdmin && <AppSettings passwords={passwords} setPasswords={setPasswords} />}
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
  const [viewMode, setViewMode] = useState('favorites') // 'favorites' or 'search'
  const [filterDealer, setFilterDealer] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  useEffect(() => { const init = {}; products.forEach(p => init[p.id] = 0); setEntries(init) }, [products])

  const favoriteProducts = products.filter(p => favorites.includes(p.id))
  const dealers = [...new Set(products.map(p => p.largeCategory))]
  const categories = [...new Set(products.map(p => p.mediumCategory))]
  
  // 検索モード用のフィルター済み商品
  const filteredProducts = products.filter(p => {
    if (filterDealer && p.largeCategory !== filterDealer) return false
    if (filterCategory && p.mediumCategory !== filterCategory) return false
    return true
  })

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
          newRecords.push({ staff_name: null, product_id: product.id, product_name: product.name, large_category: product.largeCategory, medium_category: product.mediumCategory, purchase_price: product.purchasePrice, quantity: qty, usage_date: date })
        }
      }
    }
    if (newRecords.length === 0) { alert('数量を入力してください'); return }
    const { data, error } = await supabase.from('usage_records').insert(newRecords).select()
    if (!error && data) {
      setUsage([...usage, ...data.map(d => ({ id: d.id, staff: d.staff_name, productId: d.product_id, productName: d.product_name, largeCategory: d.large_category, mediumCategory: d.medium_category, purchasePrice: d.purchase_price, quantity: d.quantity, date: d.usage_date }))])
      alert(`${newRecords.length}件の使用を記録しました！`)
      const init = {}; products.forEach(p => init[p.id] = 0); setEntries(init)
    }
  }

  const deleteUsage = async (id) => {
    if (!confirm('この記録を削除しますか？')) return
    const { error } = await supabase.from('usage_records').delete().eq('id', id)
    if (!error) setUsage(usage.filter(u => u.id !== id))
  }

  const startEdit = (record) => { setEditingId(record.id); setEditData({ quantity: record.quantity, date: record.date }) }
  const saveEdit = async (id) => {
    const { error } = await supabase.from('usage_records').update({ quantity: parseInt(editData.quantity) || 1, usage_date: editData.date }).eq('id', id)
    if (!error) { setUsage(usage.map(u => u.id === id ? { ...u, quantity: parseInt(editData.quantity) || 1, date: editData.date } : u)); setEditingId(null) }
  }

  const displayProducts = viewMode === 'favorites' ? favoriteProducts : filteredProducts
  const totalCount = Object.values(entries).reduce((sum, qty) => sum + qty, 0)
  const totalAmount = Object.entries(entries).reduce((sum, [pid, qty]) => { const product = products.find(p => p.id === parseInt(pid)); return sum + (product ? qty * product.purchasePrice : 0) }, 0)
  const recentUsage = [...usage].reverse().slice(0, 50)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📦 使用入力</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-blue' : 'btn-gray'}`}><Icons.History /> {showHistory ? '入力に戻る' : '履歴'}</button>
        </div>
        {!showHistory ? (
          <>
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>使用日</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" style={{ width: 'auto' }} />
            </div>
            <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
              <div className="summary-card"><div className="label">入力数</div><div className="value text-blue-600">{totalCount}個</div></div>
              <div className="summary-card"><div className="label">合計金額</div><div className="value text-blue-600">¥{totalAmount.toLocaleString()}</div></div>
            </div>
            
            {/* モード切替 */}
            <div className="flex gap-2 mb-4">
              <button onClick={() => setViewMode('favorites')} className={`btn flex-1 ${viewMode === 'favorites' ? 'btn-blue' : 'btn-gray'}`}>⭐ お気に入り</button>
              <button onClick={() => setViewMode('search')} className={`btn flex-1 ${viewMode === 'search' ? 'btn-blue' : 'btn-gray'}`}>🔍 検索</button>
            </div>

            {viewMode === 'search' && (
              <div className="grid-2 gap-2 mb-4">
                <select value={filterDealer} onChange={e => setFilterDealer(e.target.value)} className="select">
                  <option value="">全ディーラー</option>
                  {dealers.map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
                <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="select">
                  <option value="">全カテゴリ</option>
                  {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            )}

            {viewMode === 'favorites' && favoriteProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">⭐ お気に入り商品がありません</p>
                <p className="text-sm">「検索」モードから商品を選んでお気に入り登録してください</p>
              </div>
            ) : viewMode === 'search' && !filterDealer && !filterCategory ? (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-2">🔍 ディーラーまたはカテゴリを選択</p>
                <p className="text-sm">絞り込むと商品が表示されます</p>
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {displayProducts.map(p => (
                  <div key={p.id} className={`flex justify-between items-center p-3 rounded border ${entries[p.id] > 0 ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <button onClick={() => toggleFavorite(p.id)} className={`favorite-btn ${favorites.includes(p.id) ? 'active' : ''}`}><Icons.Star filled={favorites.includes(p.id)} /></button>
                        <div>
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-sm text-gray-500">{p.largeCategory} / {p.mediumCategory}</div>
                        </div>
                      </div>
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
            <button onClick={recordUsage} className="btn btn-green w-full py-3" style={{ fontSize: '1.1rem' }}><Icons.Save /> まとめて登録（{totalCount}件）</button>
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-sm">
              <thead><tr><th>日付</th><th>商品</th><th className="text-center">数量</th><th className="text-right">金額</th><th className="text-center">操作</th></tr></thead>
              <tbody>
                {recentUsage.map(u => (
                  editingId === u.id ? (
                    <tr key={u.id} style={{ background: '#fef9c3' }}>
                      <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '130px' }} /></td>
                      <td>{u.productName}</td>
                      <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '60px' }} min="1" /></td>
                      <td className="text-right">¥{(u.purchasePrice * (parseInt(editData.quantity) || 1)).toLocaleString()}</td>
                      <td className="text-center"><button onClick={() => saveEdit(u.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                    </tr>
                  ) : (
                    <tr key={u.id}>
                      <td>{u.date}</td><td>{u.productName}</td><td className="text-center">{u.quantity}</td><td className="text-right">¥{(u.purchasePrice * u.quantity).toLocaleString()}</td>
                      <td className="text-center"><button onClick={() => startEdit(u)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteUsage(u.id)} className="text-red-500 text-sm">削除</button></td>
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

  useEffect(() => { const init = {}; products.forEach(p => init[p.id] = 0); setEntries(init) }, [products])

  const dealers = categories.large.map(c => c.name)
  const dealerProducts = selectedDealer ? products.filter(p => p.largeCategory === selectedDealer) : []

  const recordStockIn = async () => {
    if (!selectedDealer) { alert('ディーラーを選択してください'); return }
    const newRecords = []
    for (const [productId, qty] of Object.entries(entries)) {
      if (qty > 0) {
        const product = products.find(p => p.id === parseInt(productId))
        if (product && product.largeCategory === selectedDealer) {
          newRecords.push({ product_id: product.id, product_name: product.name, large_category: product.largeCategory, quantity: qty, stock_in_date: date })
        }
      }
    }
    if (newRecords.length === 0) { alert('数量を入力してください'); return }
    const { data, error } = await supabase.from('stock_in').insert(newRecords).select()
    if (!error && data) {
      setStockIn([...stockIn, ...data.map(d => ({ id: d.id, productId: d.product_id, productName: d.product_name, largeCategory: d.large_category, quantity: d.quantity, date: d.stock_in_date }))])
      alert(`${newRecords.length}件の入荷を記録しました！`)
      const init = {}; products.forEach(p => init[p.id] = 0); setEntries(init)
    }
  }

  const deleteStockIn = async (id) => {
    if (!confirm('この記録を削除しますか？')) return
    const { error } = await supabase.from('stock_in').delete().eq('id', id)
    if (!error) setStockIn(stockIn.filter(s => s.id !== id))
  }

  const startEdit = (record) => { setEditingId(record.id); setEditData({ quantity: record.quantity, date: record.date }) }
  const saveEdit = async (id) => {
    const { error } = await supabase.from('stock_in').update({ quantity: parseInt(editData.quantity) || 1, stock_in_date: editData.date }).eq('id', id)
    if (!error) { setStockIn(stockIn.map(s => s.id === id ? { ...s, quantity: parseInt(editData.quantity) || 1, date: editData.date } : s)); setEditingId(null) }
  }

  const totalCount = Object.entries(entries).reduce((sum, [pid, qty]) => { const product = products.find(p => p.id === parseInt(pid)); if (product && product.largeCategory === selectedDealer) return sum + qty; return sum }, 0)
  const totalAmount = Object.entries(entries).reduce((sum, [pid, qty]) => { const product = products.find(p => p.id === parseInt(pid)); if (product && product.largeCategory === selectedDealer) return sum + qty * product.purchasePrice; return sum }, 0)
  const groupedProducts = dealerProducts.reduce((acc, p) => { if (!acc[p.mediumCategory]) acc[p.mediumCategory] = []; acc[p.mediumCategory].push(p); return acc }, {})
  const recentStockIn = [...stockIn].reverse().slice(0, 50)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📥 入荷入力</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-purple' : 'btn-gray'}`}><Icons.History /> {showHistory ? '入力に戻る' : '履歴'}</button>
        </div>
        {!showHistory ? (
          <>
            <div className="grid-2 mb-4">
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>入荷日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div>
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>ディーラー</label><select value={selectedDealer} onChange={e => setSelectedDealer(e.target.value)} className="select"><option value="">選択してください</option>{dealers.map((d, i) => <option key={i} value={d}>{d}</option>)}</select></div>
            </div>
            {selectedDealer && (
              <>
                <div className="bg-purple-50 p-4 rounded mb-4 grid-2">
                  <div className="summary-card"><div className="label">入荷数</div><div className="value text-purple-600">{totalCount}個</div></div>
                  <div className="summary-card"><div className="label">入荷金額</div><div className="value text-purple-600">¥{totalAmount.toLocaleString()}</div></div>
                </div>
                {Object.entries(groupedProducts).map(([category, prods]) => (
                  <div key={category} className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {prods.map(p => (
                        <div key={p.id} className={`flex justify-between items-center p-3 rounded border ${entries[p.id] > 0 ? 'bg-purple-50 border-purple-300' : 'bg-white border-gray-200'}`}>
                          <div><div className="font-semibold">{p.name}</div><div className="text-sm text-gray-500">¥{p.purchasePrice.toLocaleString()}</div></div>
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
                <button onClick={recordStockIn} className="btn btn-purple w-full py-3" style={{ fontSize: '1.1rem' }}><Icons.TrendingUp /> まとめて入荷登録（{totalCount}件）</button>
              </>
            )}
          </>
        ) : (
          <div className="overflow-x-auto">
            <table className="text-sm">
              <thead><tr><th>日付</th><th>ディーラー</th><th>商品</th><th className="text-center">数量</th><th className="text-center">操作</th></tr></thead>
              <tbody>
                {recentStockIn.map(s => (
                  editingId === s.id ? (
                    <tr key={s.id} style={{ background: '#fef9c3' }}>
                      <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '130px' }} /></td>
                      <td>{s.largeCategory}</td><td>{s.productName}</td>
                      <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '60px' }} min="1" /></td>
                      <td className="text-center"><button onClick={() => saveEdit(s.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                    </tr>
                  ) : (
                    <tr key={s.id}><td>{s.date}</td><td>{s.largeCategory}</td><td>{s.productName}</td><td className="text-center">{s.quantity}</td>
                      <td className="text-center"><button onClick={() => startEdit(s)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteStockIn(s.id)} className="text-red-500 text-sm">削除</button></td>
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

  useEffect(() => { const init = {}; products.forEach(p => init[p.id] = 0); setInv(init) }, [products])

  const getLastInventory = (pid) => { if (!inventoryHistory.length) return null; const last = inventoryHistory[inventoryHistory.length - 1]; const pd = last.data.find(d => d.id === pid); return pd ? pd.quantity : 0 }
  const getLastInventoryDate = () => { if (!inventoryHistory.length) return null; return inventoryHistory[inventoryHistory.length - 1].date }
  const getUsageSinceLastInventory = (pid) => { const lastDate = getLastInventoryDate(); if (!lastDate) return 0; return usage.filter(u => u.productId === pid && u.date > lastDate).reduce((sum, u) => sum + u.quantity, 0) }
  const getStockInSinceLastInventory = (pid) => { const lastDate = getLastInventoryDate(); if (!lastDate) return 0; return stockIn.filter(s => s.productId === pid && s.date > lastDate).reduce((sum, s) => sum + s.quantity, 0) }
  const getExpectedInventory = (pid) => { const lastInv = getLastInventory(pid); if (lastInv === null) return null; return Math.max(0, lastInv - getUsageSinceLastInventory(pid) + getStockInSinceLastInventory(pid)) }
  const getDifference = (pid) => { const expected = getExpectedInventory(pid); if (expected === null) return null; return (inv[pid] || 0) - expected }
  const applyExpectedToAll = () => { const newInv = {}; products.forEach(p => { const expected = getExpectedInventory(p.id); newInv[p.id] = expected !== null ? expected : 0 }); setInv(newInv) }

  const saveInv = async () => {
    if (!currStaff) { alert('担当者を選択してください'); return }
    const data = products.map(p => ({ id: p.id, name: p.name, quantity: inv[p.id] || 0, purchasePrice: p.purchasePrice }))
    const totalPurchaseValue = products.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
    const { data: resData, error } = await supabase.from('inventory_history').insert({ inventory_date: date, staff_name: currStaff, data, total_purchase_value: totalPurchaseValue, total_usage_value: 0 }).select()
    if (!error && resData) { setInventoryHistory([...inventoryHistory, { id: resData[0].id, date, staff: currStaff, data, totalPurchaseValue, totalUsageValue: 0 }]); alert('棚卸を保存しました！'); const init = {}; products.forEach(p => init[p.id] = 0); setInv(init); setCurrStaff('') }
  }

  const deleteHistory = async (id) => {
    if (!confirm('この棚卸記録を削除しますか？')) return
    const { error } = await supabase.from('inventory_history').delete().eq('id', id)
    if (!error) setInventoryHistory(inventoryHistory.filter(h => h.id !== id))
  }

  const grouped = products.reduce((acc, p) => { if (!acc[p.largeCategory]) acc[p.largeCategory] = {}; if (!acc[p.largeCategory][p.mediumCategory]) acc[p.largeCategory][p.mediumCategory] = []; acc[p.largeCategory][p.mediumCategory].push(p); return acc }, {})
  const getFilteredProducts = (productList) => { if (!showOnlyDiff) return productList; return productList.filter(p => { const diff = getDifference(p.id); return diff !== null && diff !== 0 }) }
  const totP = products.reduce((s, p) => s + ((inv[p.id] || 0) * p.purchasePrice), 0)
  const productsWithDiff = products.filter(p => { const diff = getDifference(p.id); return diff !== null && diff !== 0 }).length
  const lastDate = getLastInventoryDate()

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📋 棚卸</h3>
          <button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-green' : 'btn-gray'}`}><Icons.History /> {showHistory ? '入力に戻る' : '履歴'}</button>
        </div>
        {!showHistory ? (
          <>
            <div className="grid-2 mb-4">
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>棚卸日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div>
              <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>担当者</label><select value={currStaff} onChange={e => setCurrStaff(e.target.value)} className="select"><option value="">選択</option>{staff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select></div>
            </div>
            {lastDate && (<><div className="bg-gray-50 p-3 rounded mb-4 text-sm">前回棚卸日：<span className="font-semibold">{lastDate}</span></div><button onClick={applyExpectedToAll} className="btn btn-blue w-full py-3 mb-4"><Icons.Calculator /> 予想在庫を自動入力</button></>)}
            <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
              <div className="summary-card"><div className="label">在庫資産</div><div className="value text-blue-600">¥{totP.toLocaleString()}</div></div>
              <div className="summary-card"><div className="label">差異あり</div><div className={`value ${productsWithDiff > 0 ? 'text-orange-600' : 'text-green-600'}`}>{productsWithDiff}件</div></div>
            </div>
            {lastDate && (<button onClick={() => setShowOnlyDiff(!showOnlyDiff)} className={`btn w-full mb-4 ${showOnlyDiff ? 'btn-yellow' : 'btn-gray'}`}><Icons.Filter /> {showOnlyDiff ? `差異ありのみ表示中（${productsWithDiff}件）` : '差異ありだけ表示'}</button>)}
            {Object.keys(grouped).map(lg => { const cats = Object.keys(grouped[lg]).filter(md => getFilteredProducts(grouped[lg][md]).length > 0); if (cats.length === 0) return null; return (
              <div key={lg} className="card mb-4">
                <h3 className="text-lg font-bold mb-4 text-blue-600">{lg}</h3>
                {cats.map(md => { const filtered = getFilteredProducts(grouped[lg][md]); if (filtered.length === 0) return null; return (
                  <div key={md} className="mb-4">
                    <h4 className="font-semibold mb-2 text-gray-700">{md}</h4>
                    <div className="overflow-x-auto">
                      <table className="text-sm">
                        <thead><tr><th>商品</th><th className="text-right">前回</th><th className="text-right text-red-600">使用</th><th className="text-right text-purple-600">入荷</th><th className="text-right text-blue-600">予想</th><th className="text-center">実際</th><th className="text-center">差異</th></tr></thead>
                        <tbody>{filtered.map(p => { const q = inv[p.id] || 0; const last = getLastInventory(p.id); const usageQty = getUsageSinceLastInventory(p.id); const stockInQty = getStockInSinceLastInventory(p.id); const expected = getExpectedInventory(p.id); const diff = getDifference(p.id); return (
                          <tr key={p.id} style={{ background: diff !== null && diff !== 0 ? '#fefce8' : '' }}>
                            <td>{p.name}</td><td className="text-right text-gray-500">{last !== null ? last : '-'}</td><td className="text-right text-red-600 font-semibold">{last !== null ? `-${usageQty}` : '-'}</td><td className="text-right text-purple-600 font-semibold">{last !== null && stockInQty > 0 ? `+${stockInQty}` : '-'}</td><td className="text-right text-blue-600 font-semibold">{expected !== null ? expected : '-'}</td>
                            <td className="text-center"><input type="number" value={inv[p.id] === 0 ? '' : inv[p.id]} onChange={e => setInv({...inv, [p.id]: e.target.value === '' ? 0 : parseInt(e.target.value) || 0})} className="input" style={{ width: '5rem', textAlign: 'center' }} min="0" placeholder="0" /></td>
                            <td className="text-center">{diff !== null ? (<span className={`badge ${diff === 0 ? 'badge-green' : diff > 0 ? 'badge-blue' : 'badge-red'}`}>{diff === 0 ? <><Icons.Check /> OK</> : <><Icons.Alert /> {diff > 0 ? '+' : ''}{diff}</>}</span>) : '-'}</td>
                          </tr>
                        ) })}</tbody>
                      </table>
                    </div>
                  </div>
                ) })}
              </div>
            ) })}
            <button onClick={saveInv} className="btn btn-green w-full py-3" style={{ fontSize: '1.1rem' }}><Icons.Save /> 棚卸保存</button>
          </>
        ) : (
          <div>
            <h4 className="font-semibold mb-4">棚卸履歴</h4>
            {inventoryHistory.length === 0 ? (<p className="text-gray-500 text-center py-4">まだ棚卸記録がありません</p>) : (
              <div className="space-y-3">
                {[...inventoryHistory].reverse().map(h => (
                  <div key={h.id} className="border rounded p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div><div className="font-bold">{h.date}</div><div className="text-sm text-gray-500">担当: {h.staff}</div></div>
                      <div className="text-right"><div className="font-bold text-blue-600">¥{h.totalPurchaseValue?.toLocaleString() || 0}</div><button onClick={() => deleteHistory(h.id)} className="text-red-500 text-sm">削除</button></div>
                    </div>
                    <details>
                      <summary className="cursor-pointer text-sm text-blue-500">詳細を見る</summary>
                      <div className="mt-2 max-h-48 overflow-y-auto">
                        <table className="text-xs"><thead><tr><th>商品</th><th className="text-right">数量</th><th className="text-right">金額</th></tr></thead>
                          <tbody>{h.data?.filter(d => d.quantity > 0).map((d, i) => (<tr key={i}><td>{d.name}</td><td className="text-right">{d.quantity}</td><td className="text-right">¥{(d.quantity * d.purchasePrice).toLocaleString()}</td></tr>))}</tbody>
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

// ==================== 予算管理 ====================
function DealerBudget({ products, usage, stockIn, categories, dealerBudgets, setDealerBudgets, dealerAllocations, setDealerAllocations, isAdmin }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [targetSales, setTargetSales] = useState('')
  const [targetRate, setTargetRate] = useState('20')
  const [allocations, setAllocations] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const budget = dealerBudgets.find(b => b.yearMonth === selectedMonth)
    if (budget) { setTargetSales(budget.targetSales.toString()); setTargetRate(budget.targetRate.toString()) } else { setTargetSales(''); setTargetRate('20') }
    const allocs = dealerAllocations.filter(a => a.yearMonth === selectedMonth)
    const allocObj = {}; allocs.forEach(a => allocObj[a.dealerName] = a.budget); setAllocations(allocObj)
  }, [selectedMonth, dealerBudgets, dealerAllocations])

  const dealers = categories.large.map(c => c.name)
  const targetBudget = Math.round((parseInt(targetSales) || 0) * (parseFloat(targetRate) || 20) / 100)

  const getMonthlyUsage = (dealerName) => usage.filter(u => u.largeCategory === dealerName && u.date?.startsWith(selectedMonth)).reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0)
  const getMonthlyStockIn = (dealerName) => stockIn.filter(s => s.largeCategory === dealerName && s.date?.startsWith(selectedMonth)).reduce((sum, s) => { const product = products.find(p => p.id === s.productId); return sum + (product ? s.quantity * product.purchasePrice : 0) }, 0)
  const getPast3MonthsAvg = (dealerName) => { const now = new Date(selectedMonth + '-01'); let total = 0; for (let i = 1; i <= 3; i++) { const d = new Date(now); d.setMonth(d.getMonth() - i); const ym = d.toISOString().slice(0, 7); total += usage.filter(u => u.largeCategory === dealerName && u.date?.startsWith(ym)).reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0) }; return Math.round(total / 3) }

  const saveBudget = async () => {
    const existing = dealerBudgets.find(b => b.yearMonth === selectedMonth)
    if (existing) { await supabase.from('dealer_budgets').update({ target_sales: parseInt(targetSales) || 0, target_rate: parseFloat(targetRate) || 20 }).eq('id', existing.id); setDealerBudgets(dealerBudgets.map(b => b.id === existing.id ? { ...b, targetSales: parseInt(targetSales) || 0, targetRate: parseFloat(targetRate) || 20 } : b)) }
    else { const { data } = await supabase.from('dealer_budgets').insert({ year_month: selectedMonth, target_sales: parseInt(targetSales) || 0, target_rate: parseFloat(targetRate) || 20 }).select(); if (data) setDealerBudgets([...dealerBudgets, { id: data[0].id, yearMonth: selectedMonth, targetSales: parseInt(targetSales) || 0, targetRate: parseFloat(targetRate) || 20 }]) }
    for (const [dealer, budget] of Object.entries(allocations)) {
      const existing = dealerAllocations.find(a => a.yearMonth === selectedMonth && a.dealerName === dealer)
      if (existing) { await supabase.from('dealer_budget_allocation').update({ budget: parseInt(budget) || 0 }).eq('id', existing.id) }
      else { await supabase.from('dealer_budget_allocation').insert({ year_month: selectedMonth, dealer_name: dealer, budget: parseInt(budget) || 0 }) }
    }
    const { data: newAllocs } = await supabase.from('dealer_budget_allocation').select('*').eq('year_month', selectedMonth)
    if (newAllocs) { setDealerAllocations([...dealerAllocations.filter(a => a.yearMonth !== selectedMonth), ...newAllocs.map(a => ({ id: a.id, yearMonth: a.year_month, dealerName: a.dealer_name, budget: a.budget }))]) }
    setIsEditing(false); alert('予算を保存しました！')
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
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>売上目標</label><input type="number" value={targetSales} onChange={e => setTargetSales(e.target.value)} placeholder="例: 3000000" className="input" disabled={!isAdmin || !isEditing} /></div>
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>仕入れ目標率（%）</label><input type="number" value={targetRate} onChange={e => setTargetRate(e.target.value)} placeholder="20" className="input" disabled={!isAdmin || !isEditing} step="0.1" /></div>
          </div>
          <div className="text-center p-3 bg-white rounded"><div className="text-sm text-gray-500">仕入れ目標額</div><div className="text-2xl font-bold text-blue-600">¥{targetBudget.toLocaleString()}</div></div>
        </div>
        <div className="grid-3 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded text-center"><div className="text-sm text-gray-600">今月の使用</div><div className="text-xl font-bold text-green-600">¥{totalUsage.toLocaleString()}</div></div>
          <div className="bg-purple-50 p-3 rounded text-center"><div className="text-sm text-gray-600">今月の入荷</div><div className="text-xl font-bold text-purple-600">¥{totalStockIn.toLocaleString()}</div></div>
          <div className={`p-3 rounded text-center ${totalStockIn <= targetBudget ? 'bg-green-50' : 'bg-red-50'}`}><div className="text-sm text-gray-600">予算残り</div><div className={`text-xl font-bold ${totalStockIn <= targetBudget ? 'text-green-600' : 'text-red-600'}`}>¥{(targetBudget - totalStockIn).toLocaleString()}</div></div>
        </div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold">ディーラー別予算配分</h4>
          {isAdmin && (!isEditing ? (<button onClick={() => setIsEditing(true)} className="btn btn-blue">編集</button>) : (<div className="flex gap-2"><button onClick={saveBudget} className="btn btn-green">保存</button><button onClick={() => setIsEditing(false)} className="btn btn-gray">取消</button></div>))}
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>ディーラー</th><th className="text-right">予算</th><th className="text-right">過去3ヶ月平均</th><th className="text-right">今月使用</th><th className="text-right">今月入荷</th><th className="text-right">予算残り</th></tr></thead>
            <tbody>
              {dealers.map(dealer => { const budget = parseInt(allocations[dealer]) || 0; const usageAmt = getMonthlyUsage(dealer); const stockInAmt = getMonthlyStockIn(dealer); const avg = getPast3MonthsAvg(dealer); const remaining = budget - stockInAmt; return (
                <tr key={dealer}>
                  <td className="font-semibold">{dealer}</td>
                  <td className="text-right">{isEditing ? (<input type="number" value={allocations[dealer] || ''} onChange={e => setAllocations({...allocations, [dealer]: e.target.value})} className="input" style={{ width: '100px' }} />) : (`¥${budget.toLocaleString()}`)}</td>
                  <td className="text-right text-gray-500">¥{avg.toLocaleString()}</td><td className="text-right text-green-600">¥{usageAmt.toLocaleString()}</td><td className="text-right text-purple-600">¥{stockInAmt.toLocaleString()}</td>
                  <td className={`text-right font-semibold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>¥{remaining.toLocaleString()}</td>
                </tr>
              ) })}
              <tr className="font-bold bg-gray-50"><td>合計</td><td className="text-right">¥{totalAllocation.toLocaleString()}</td><td></td><td className="text-right text-green-600">¥{totalUsage.toLocaleString()}</td><td className="text-right text-purple-600">¥{totalStockIn.toLocaleString()}</td><td className={`text-right ${totalAllocation - totalStockIn >= 0 ? 'text-green-600' : 'text-red-600'}`}>¥{(totalAllocation - totalStockIn).toLocaleString()}</td></tr>
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

  const orderMethods = [{ value: 'web', label: 'ネット注文' }, { value: 'line', label: 'LINE' }, { value: 'other', label: 'その他' }]

  const startEdit = (dealer) => { setEditingDealer(dealer.name); setEditData({ url: dealer.url || '', orderMethod: dealer.orderMethod || 'web', loginId: dealer.loginId || '', loginPassword: dealer.loginPassword || '' }) }
  const saveEdit = async (dealerName) => {
    const { error } = await supabase.from('categories').update({ url: editData.url, order_method: editData.orderMethod, login_id: editData.loginId, login_password: editData.loginPassword }).eq('type', 'large').eq('name', dealerName)
    if (!error) { setCategories({ ...categories, large: categories.large.map(d => d.name === dealerName ? { ...d, url: editData.url, orderMethod: editData.orderMethod, loginId: editData.loginId, loginPassword: editData.loginPassword } : d) }); setEditingDealer(null) }
  }
  const togglePassword = (dealerName) => { setShowPasswords({ ...showPasswords, [dealerName]: !showPasswords[dealerName] }) }
  const getMethodLabel = (method) => { const found = orderMethods.find(m => m.value === method); return found ? found.label : 'ネット注文' }

  return (
    <div className="space-y-4">
      <div className="card"><h3 className="text-lg font-bold mb-4">📦 発注リンク</h3><p className="text-sm text-gray-600 mb-4">ディーラーの発注ページにワンタップでアクセス</p></div>
      {categories.large.length === 0 ? (<div className="card text-center text-gray-500"><p>ディーラーが登録されていません</p><p className="text-sm">商品管理タブでディーラーを追加してください</p></div>) : (
        categories.large.map(dealer => (
          <div key={dealer.name} className="card">
            {editingDealer === dealer.name ? (
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-blue-600">{dealer.name}</h4>
                <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>注文方法</label><select value={editData.orderMethod} onChange={e => setEditData({...editData, orderMethod: e.target.value})} className="select">{orderMethods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}</select></div>
                <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>{editData.orderMethod === 'line' ? 'LINEトークURL' : 'URL'}</label><input type="url" value={editData.url} onChange={e => setEditData({...editData, url: e.target.value})} placeholder={editData.orderMethod === 'line' ? 'line://ti/p/xxxxx' : 'https://...'} className="input" /></div>
                {editData.orderMethod === 'web' && (<><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>ログインID</label><input type="text" value={editData.loginId} onChange={e => setEditData({...editData, loginId: e.target.value})} className="input" /></div><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>パスワード</label><input type="text" value={editData.loginPassword} onChange={e => setEditData({...editData, loginPassword: e.target.value})} className="input" /></div></>)}
                <div className="flex gap-2"><button onClick={() => saveEdit(dealer.name)} className="btn btn-green">保存</button><button onClick={() => setEditingDealer(null)} className="btn btn-gray">取消</button></div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div><h4 className="text-xl font-bold text-blue-600">{dealer.name}</h4><span className="badge badge-gray">{getMethodLabel(dealer.orderMethod)}</span></div>
                  {dealer.url && (<a href={dealer.url} target="_blank" rel="noopener noreferrer" className="btn btn-blue">{dealer.orderMethod === 'line' ? 'LINEを開く' : '発注ページを開く'} →</a>)}
                </div>
                {dealer.orderMethod === 'web' && dealer.loginId && (
                  <div className="bg-gray-50 p-3 rounded mb-3 space-y-2">
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">ID:</span><span className="font-mono">{dealer.loginId}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-600">パスワード:</span><div className="flex items-center gap-2"><span className="font-mono">{showPasswords[dealer.name] ? dealer.loginPassword : '••••••••'}</span><button onClick={() => togglePassword(dealer.name)} className="text-blue-500">{showPasswords[dealer.name] ? <Icons.EyeOff /> : <Icons.Eye />}</button></div></div>
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
  const [customPrice, setCustomPrice] = useState('')
  const [saleTag, setSaleTag] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [cart, setCart] = useState([])

  // 商品選択時に価格をセット
  const handleProductChange = (productId) => {
    setSelectedProduct(productId)
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId))
      if (product) {
        setCustomPrice(product.purchasePrice.toString())
        setSaleTag('')
      }
    } else {
      setCustomPrice('')
      setSaleTag('')
    }
  }

  // カートに追加
  const addToCart = () => {
    if (!selectedProduct) { alert('商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return
    const finalPrice = parseInt(customPrice) || product.purchasePrice
    const tag = finalPrice !== product.purchasePrice ? (saleTag || 'セール') : ''
    
    setCart([...cart, {
      tempId: Date.now(),
      productId: product.id,
      productName: product.name,
      largeCategory: product.largeCategory,
      mediumCategory: product.mediumCategory,
      purchasePrice: finalPrice,
      originalPrice: product.purchasePrice,
      quantity,
      saleTag: tag
    }])
    
    // リセット
    setSelectedProduct('')
    setCustomPrice('')
    setSaleTag('')
    setQuantity(1)
  }

  // カートから削除
  const removeFromCart = (tempId) => {
    setCart(cart.filter(item => item.tempId !== tempId))
  }

  // カート合計
  const cartTotal = cart.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0)

  // まとめて登録
  const submitCart = async () => {
    if (!selectedStaff) { alert('スタッフを選択してください'); return }
    if (cart.length === 0) { alert('カートに商品がありません'); return }
    
    const insertData = cart.map(item => ({
      staff_name: selectedStaff,
      product_id: item.productId,
      product_name: item.productName,
      large_category: item.largeCategory,
      medium_category: item.mediumCategory,
      purchase_price: item.purchasePrice,
      quantity: item.quantity,
      purchase_date: date,
      sale_tag: item.saleTag
    }))
    
    const { data, error } = await supabase.from('staff_purchases').insert(insertData).select()
    
    if (!error && data) {
      const newPurchases = data.map((d, i) => ({
        id: d.id,
        staff: selectedStaff,
        productId: cart[i].productId,
        productName: cart[i].productName,
        largeCategory: cart[i].largeCategory,
        mediumCategory: cart[i].mediumCategory,
        purchasePrice: cart[i].purchasePrice,
        quantity: cart[i].quantity,
        date,
        saleTag: cart[i].saleTag
      }))
      setStaffPurchases([...staffPurchases, ...newPurchases])
      setCart([])
      alert(`${data.length}件の購入を記録しました！`)
    }
  }

  // 単品登録（従来機能も残す）
  const recordSingle = async () => {
    if (!selectedStaff || !selectedProduct) { alert('スタッフと商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return
    const finalPrice = parseInt(customPrice) || product.purchasePrice
    const tag = finalPrice !== product.purchasePrice ? (saleTag || 'セール') : ''
    const { data, error } = await supabase.from('staff_purchases').insert({ 
      staff_name: selectedStaff, 
      product_id: product.id, 
      product_name: product.name, 
      large_category: product.largeCategory, 
      medium_category: product.mediumCategory, 
      purchase_price: finalPrice, 
      quantity, 
      purchase_date: date,
      sale_tag: tag
    }).select()
    if (!error && data) { 
      setStaffPurchases([...staffPurchases, { 
        id: data[0].id, 
        staff: selectedStaff, 
        productId: product.id, 
        productName: product.name, 
        largeCategory: product.largeCategory, 
        mediumCategory: product.mediumCategory, 
        purchasePrice: finalPrice,
        originalPrice: product.purchasePrice,
        quantity, 
        date,
        saleTag: tag
      }])
      alert('購入を記録しました！')
      setQuantity(1)
      setCustomPrice('')
      setSaleTag('')
      setSelectedProduct('')
    }
  }

  const deletePurchase = async (id) => { 
    if (!confirm('この購入記録を削除しますか？')) return
    const { error } = await supabase.from('staff_purchases').delete().eq('id', id)
    if (!error) setStaffPurchases(staffPurchases.filter(p => p.id !== id)) 
  }
  
  const startEdit = (record) => { 
    const product = products.find(p => p.id === record.productId)
    setEditingId(record.id)
    setEditData({ 
      staff: record.staff, 
      quantity: record.quantity, 
      date: record.date,
      price: record.purchasePrice,
      originalPrice: product?.purchasePrice || record.purchasePrice,
      saleTag: record.saleTag || ''
    }) 
  }
  
  const saveEdit = async (id) => { 
    const finalPrice = parseInt(editData.price) || editData.originalPrice
    const tag = editData.saleTag || (finalPrice !== editData.originalPrice ? 'セール' : '')
    const { error } = await supabase.from('staff_purchases').update({ 
      staff_name: editData.staff, 
      quantity: parseInt(editData.quantity) || 1, 
      purchase_date: editData.date,
      purchase_price: finalPrice,
      sale_tag: tag
    }).eq('id', id)
    if (!error) { 
      setStaffPurchases(staffPurchases.map(p => p.id === id ? { 
        ...p, 
        staff: editData.staff, 
        quantity: parseInt(editData.quantity) || 1, 
        date: editData.date,
        purchasePrice: finalPrice,
        saleTag: tag
      } : p))
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

  // 選択中の商品
  const selectedProductData = selectedProduct ? products.find(p => p.id === parseInt(selectedProduct)) : null

  const printMonthlyReport = () => {
    const content = `<h2>${selectedMonth.replace('-', '年')}月 スタッフ購入一覧</h2>${Object.entries(staffSummary).map(([staffName, data]) => `<div style="margin-bottom: 20px; page-break-inside: avoid;"><h3 style="background: #f0f0f0; padding: 8px;">${staffName}</h3><table style="width: 100%; border-collapse: collapse;"><thead><tr style="background: #f9f9f9;"><th style="border: 1px solid #ddd; padding: 6px;">日付</th><th style="border: 1px solid #ddd; padding: 6px;">商品</th><th style="border: 1px solid #ddd; padding: 6px; text-align: right;">数量</th><th style="border: 1px solid #ddd; padding: 6px; text-align: right;">金額</th></tr></thead><tbody>${data.items.map(item => `<tr><td style="border: 1px solid #ddd; padding: 6px;">${item.date}</td><td style="border: 1px solid #ddd; padding: 6px;">${item.productName}${item.saleTag ? ` <span style="color: #dc2626; font-size: 12px;">(${item.saleTag})</span>` : ''}</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">${item.quantity}</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">¥${(item.purchasePrice * item.quantity).toLocaleString()}</td></tr>`).join('')}<tr style="font-weight: bold; background: #fff9e6;"><td colspan="3" style="border: 1px solid #ddd; padding: 6px;">合計（給料天引額）</td><td style="border: 1px solid #ddd; padding: 6px; text-align: right;">¥${data.total.toLocaleString()}</td></tr></tbody></table></div>`).join('')}<div style="margin-top: 20px; padding: 10px; background: #e6f3ff; font-weight: bold;">全スタッフ合計: ¥${grandTotal.toLocaleString()}</div>`
    const printWindow = window.open('', '_blank'); printWindow.document.write(`<!DOCTYPE html><html><head><title>スタッフ購入一覧 ${selectedMonth}</title><style>body { font-family: sans-serif; padding: 20px; }</style></head><body>${content}</body></html>`); printWindow.document.close(); printWindow.print()
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">🛒 スタッフ購入記録</h3>
        <div className="grid-2 mb-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label><select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select"><option value="">選択</option>{staff.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>購入日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div>
        </div>
        <div className="mb-4">
          <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>商品</label>
          <select value={selectedProduct} onChange={e => handleProductChange(e.target.value)} className="select">
            <option value="">選択</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}（通常¥{p.purchasePrice.toLocaleString()}）</option>)}
          </select>
        </div>
        {selectedProductData && (
          <div className="bg-gray-50 p-3 rounded mb-4">
            <div className="grid-2 gap-4 mb-3">
              <div>
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>単価</label>
                <input 
                  type="number" 
                  value={customPrice} 
                  onChange={e => setCustomPrice(e.target.value)} 
                  className="input" 
                  placeholder={selectedProductData.purchasePrice.toString()}
                />
                {parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (
                  <p className="text-xs text-red-500 mt-1">通常価格: ¥{selectedProductData.purchasePrice.toLocaleString()}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>数量</label>
                <input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} min="1" className="input" />
              </div>
            </div>
            {parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (
              <div className="mb-3">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>タグ（任意）</label>
                <input 
                  type="text" 
                  value={saleTag} 
                  onChange={e => setSaleTag(e.target.value)} 
                  className="input" 
                  placeholder="例: セール、キャンペーン、福袋"
                />
              </div>
            )}
            <div className="bg-white p-2 rounded text-center mb-3">
              <span className="text-gray-500">小計: </span>
              <span className="text-xl font-bold text-blue-600">¥{((parseInt(customPrice) || selectedProductData.purchasePrice) * quantity).toLocaleString()}</span>
              {parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (
                <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">{saleTag || 'セール'}</span>
              )}
            </div>
            <div className="grid-2 gap-2">
              <button onClick={addToCart} className="btn btn-green py-2">🛒 カートに追加</button>
              <button onClick={recordSingle} className="btn btn-blue py-2">⚡ 直接登録</button>
            </div>
          </div>
        )}
        
        {/* カート表示 */}
        {cart.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-3 mt-4">
            <h4 className="font-bold mb-2">🛒 カート（{cart.length}件）</h4>
            <div className="space-y-2 mb-3">
              {cart.map(item => (
                <div key={item.tempId} className="flex justify-between items-center bg-white p-2 rounded text-sm">
                  <div className="flex-1">
                    <span className="font-semibold">{item.productName}</span>
                    {item.saleTag && <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded">{item.saleTag}</span>}
                    <span className="text-gray-500 ml-2">×{item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">¥{(item.purchasePrice * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.tempId)} className="text-red-500 text-xs">✕</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-3 rounded mb-3 text-center">
              <span className="text-gray-500">合計: </span>
              <span className="text-2xl font-bold text-green-600">¥{cartTotal.toLocaleString()}</span>
            </div>
            <button onClick={submitCart} className="btn btn-green w-full py-3 text-lg">✓ まとめて登録（{cart.length}件）</button>
          </div>
        )}
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2"><h3 className="text-lg font-bold">📊 月次集計</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        <div className="bg-blue-50 p-4 rounded mb-4 grid-2">
          <div className="summary-card"><div className="label">購入件数</div><div className="value text-blue-600">{monthlyPurchases.length}件</div></div>
          <div className="summary-card"><div className="label">合計金額</div><div className="value text-blue-600">¥{grandTotal.toLocaleString()}</div></div>
        </div>
        <button onClick={printMonthlyReport} className="btn btn-blue mb-4">PDF出力（印刷）</button>
        {Object.keys(staffSummary).length === 0 ? (<p className="text-gray-500 text-center py-4">この月の購入記録はありません</p>) : (
          Object.entries(staffSummary).map(([staffName, data]) => (
            <div key={staffName} className="mb-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 flex justify-between items-center"><span className="font-bold">{staffName}</span><span className="text-green-600 font-bold">¥{data.total.toLocaleString()}</span></div>
              <div className="overflow-x-auto">
                <table className="text-sm"><thead><tr><th>日付</th><th>商品</th><th className="text-right">単価</th><th className="text-center">数量</th><th className="text-right">金額</th><th className="text-center">操作</th></tr></thead>
                  <tbody>
                    {data.items.map(item => {
                      const product = products.find(p => p.id === item.productId)
                      const originalPrice = product?.purchasePrice || item.purchasePrice
                      const isSale = item.purchasePrice !== originalPrice || item.saleTag
                      
                      return editingId === item.id ? (
                        <tr key={item.id} style={{ background: '#fef9c3' }}>
                          <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '110px', fontSize: '12px' }} /></td>
                          <td style={{ fontSize: '12px' }}>
                            {item.productName}
                            <input type="text" value={editData.saleTag} onChange={e => setEditData({...editData, saleTag: e.target.value})} className="input" style={{ width: '100%', fontSize: '11px', marginTop: '4px' }} placeholder="タグ（例: セール）" />
                          </td>
                          <td><input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} className="input" style={{ width: '70px', fontSize: '12px' }} /></td>
                          <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '50px', fontSize: '12px' }} min="1" /></td>
                          <td className="text-right" style={{ fontSize: '12px' }}>¥{((parseInt(editData.price) || 0) * (parseInt(editData.quantity) || 1)).toLocaleString()}</td>
                          <td className="text-center">
                            <button onClick={() => saveEdit(item.id)} className="text-green-600 text-xs mr-1">保存</button>
                            <button onClick={() => setEditingId(null)} className="text-gray-500 text-xs">取消</button>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item.id}>
                          <td>{item.date}</td>
                          <td>
                            {item.productName}
                            {isSale && <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded">{item.saleTag || 'セール'}</span>}
                          </td>
                          <td className="text-right">¥{item.purchasePrice.toLocaleString()}</td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-right">¥{(item.purchasePrice * item.quantity).toLocaleString()}</td>
                          <td className="text-center">
                            <button onClick={() => startEdit(item)} className="text-blue-500 text-xs mr-1">編集</button>
                            <button onClick={() => deletePurchase(item.id)} className="text-red-500 text-xs">削除</button>
                          </td>
                        </tr>
                      )
                    })}
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

  const productTypes = [{ value: 'business', label: '業務用' }, { value: 'retail', label: '店販' }, { value: 'both', label: '両方' }]

  const addCategory = async (type, value, setter) => {
    const exists = type === 'large' ? categories.large.some(c => c.name === value) : categories.medium.includes(value)
    if (!value || exists) return
    const { error } = await supabase.from('categories').insert({ type, name: value })
    if (!error) {
      if (type === 'large') { setCategories({ ...categories, large: [...categories.large, { name: value, url: '', orderMethod: 'web', loginId: '', loginPassword: '' }] }) }
      else { setCategories({ ...categories, medium: [...categories.medium, value] }) }
      setter('')
    }
  }
  const deleteCategory = async (type, name) => {
    if (!confirm(`「${name}」を削除しますか？`)) return
    const { error } = await supabase.from('categories').delete().eq('type', type).eq('name', name)
    if (!error) {
      if (type === 'large') { setCategories({ ...categories, large: categories.large.filter(c => c.name !== name) }) }
      else { setCategories({ ...categories, medium: categories.medium.filter(c => c !== name) }) }
    }
  }
  const addProduct = async () => {
    if (!newProduct.name || !newProduct.largeCategory || !newProduct.mediumCategory) return
    const maxOrder = products.length > 0 ? Math.max(...products.map(p => p.sortOrder || 0)) + 1 : 1
    const { data, error } = await supabase.from('products').insert({ large_category: newProduct.largeCategory, medium_category: newProduct.mediumCategory, name: newProduct.name, purchase_price: parseFloat(newProduct.purchasePrice) || 0, selling_price: parseFloat(newProduct.sellingPrice) || 0, product_type: newProduct.productType, sort_order: maxOrder }).select()
    if (!error && data) { setProducts([...products, { id: data[0].id, largeCategory: newProduct.largeCategory, mediumCategory: newProduct.mediumCategory, name: newProduct.name, purchasePrice: parseFloat(newProduct.purchasePrice) || 0, sellingPrice: parseFloat(newProduct.sellingPrice) || 0, productType: newProduct.productType, sortOrder: maxOrder }]); setNewProduct({ largeCategory: '', mediumCategory: '', name: '', purchasePrice: '', sellingPrice: '', productType: 'business' }) }
  }
  const deleteProduct = async (id) => { if (!confirm('この商品を削除しますか？')) return; const { error } = await supabase.from('products').delete().eq('id', id); if (!error) setProducts(products.filter(p => p.id !== id)) }
  const startEdit = (product) => { setEditingId(product.id); setEditData({ name: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: product.purchasePrice, sellingPrice: product.sellingPrice, productType: product.productType || 'business' }) }
  const saveEdit = async (id) => { const { error } = await supabase.from('products').update({ name: editData.name, large_category: editData.largeCategory, medium_category: editData.mediumCategory, purchase_price: parseFloat(editData.purchasePrice) || 0, selling_price: parseFloat(editData.sellingPrice) || 0, product_type: editData.productType }).eq('id', id); if (!error) { setProducts(products.map(p => p.id === id ? { ...p, ...editData, purchasePrice: parseFloat(editData.purchasePrice) || 0, sellingPrice: parseFloat(editData.sellingPrice) || 0 } : p)); setEditingId(null) } }
  const getTypeLabel = (type) => { const found = productTypes.find(t => t.value === type); return found ? found.label : '業務用' }
  const filteredProducts = products.filter(p => { if (filterDealer && p.largeCategory !== filterDealer) return false; if (filterCategory && p.mediumCategory !== filterCategory) return false; if (searchText && !p.name.toLowerCase().includes(searchText.toLowerCase())) return false; return true })

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">カテゴリー管理</h3>
        <div className="grid-2">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>ディーラー</label><div className="flex gap-2"><input type="text" value={newLarge} onChange={e => setNewLarge(e.target.value)} placeholder="例：〇〇商事" className="input" /><button onClick={() => addCategory('large', newLarge, setNewLarge)} className="btn btn-blue">追加</button></div><div className="flex gap-2 mt-2 flex-wrap">{categories.large.map((c, i) => (<span key={i} className="bg-blue-50 px-3 py-1 rounded text-sm flex items-center gap-1">{c.name}<button onClick={() => deleteCategory('large', c.name)} className="text-red-500 ml-1">×</button></span>))}</div></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>種類</label><div className="flex gap-2"><input type="text" value={newMedium} onChange={e => setNewMedium(e.target.value)} placeholder="例：シャンプー" className="input" /><button onClick={() => addCategory('medium', newMedium, setNewMedium)} className="btn btn-green">追加</button></div><div className="flex gap-2 mt-2 flex-wrap">{categories.medium.map((c, i) => (<span key={i} className="bg-green-50 px-3 py-1 rounded text-sm flex items-center gap-1">{c}<button onClick={() => deleteCategory('medium', c)} className="text-red-500 ml-1">×</button></span>))}</div></div>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">商品登録</h3>
        <div className="grid-2 mb-4"><select value={newProduct.largeCategory} onChange={e => setNewProduct({ ...newProduct, largeCategory: e.target.value })} className="select"><option value="">ディーラー</option>{categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}</select><select value={newProduct.mediumCategory} onChange={e => setNewProduct({ ...newProduct, mediumCategory: e.target.value })} className="select"><option value="">種類</option>{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></div>
        <div className="grid-2 mb-4"><input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="商品名" className="input" /><select value={newProduct.productType} onChange={e => setNewProduct({ ...newProduct, productType: e.target.value })} className="select">{productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
        <div className="grid-2 mb-4"><input type="number" value={newProduct.purchasePrice} onChange={e => setNewProduct({ ...newProduct, purchasePrice: e.target.value })} placeholder="仕入れ価格" className="input" /><input type="number" value={newProduct.sellingPrice} onChange={e => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} placeholder="販売価格" className="input" /></div>
        <button onClick={addProduct} className="btn btn-blue"><Icons.Plus /> 商品を追加</button>
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">商品一覧 ({filteredProducts.length}件)</h3>
        <div className="grid-3 gap-2 mb-4">
          <select value={filterDealer} onChange={e => setFilterDealer(e.target.value)} className="select"><option value="">全ディーラー</option>{categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}</select>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="select"><option value="">全種類</option>{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select>
          <div className="flex items-center gap-2"><Icons.Search /><input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="商品名検索" className="input" /></div>
        </div>
        <div className="overflow-x-auto">
          <table><thead><tr><th>タイプ</th><th>ディーラー</th><th>種類</th><th>商品名</th><th className="text-right">仕入れ</th><th className="text-right">販売</th><th className="text-center">操作</th></tr></thead>
            <tbody>
              {filteredProducts.map(p => (
                editingId === p.id ? (
                  <tr key={p.id} style={{ background: '#fef9c3' }}>
                    <td><select value={editData.productType} onChange={e => setEditData({...editData, productType: e.target.value})} className="select">{productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></td>
                    <td><select value={editData.largeCategory} onChange={e => setEditData({...editData, largeCategory: e.target.value})} className="select">{categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}</select></td>
                    <td><select value={editData.mediumCategory} onChange={e => setEditData({...editData, mediumCategory: e.target.value})} className="select">{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></td>
                    <td><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" /></td>
                    <td><input type="number" value={editData.purchasePrice} onChange={e => setEditData({...editData, purchasePrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td><input type="number" value={editData.sellingPrice} onChange={e => setEditData({...editData, sellingPrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td className="text-center"><button onClick={() => saveEdit(p.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                  </tr>
                ) : (
                  <tr key={p.id}>
                    <td><span className={`badge ${p.productType === 'retail' ? 'badge-blue' : p.productType === 'both' ? 'badge-yellow' : 'badge-green'}`}>{getTypeLabel(p.productType)}</span></td>
                    <td>{p.largeCategory}</td><td>{p.mediumCategory}</td><td>{p.name}</td><td className="text-right">¥{p.purchasePrice.toLocaleString()}</td><td className="text-right">¥{p.sellingPrice.toLocaleString()}</td>
                    <td className="text-center"><button onClick={() => startEdit(p)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteProduct(p.id)} className="text-red-500 text-sm">削除</button></td>
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
function StaffManagement({ staff, setStaff, categories, isAdmin }) {
  const [newStaff, setNewStaff] = useState('')
  const [newDealers, setNewDealers] = useState([])
  const [newJoinDate, setNewJoinDate] = useState('')
  const [newTenureRate, setNewTenureRate] = useState(100)
  const [newWorkType, setNewWorkType] = useState('full')
  const [newWorkDaysPerWeek, setNewWorkDaysPerWeek] = useState(5)
  const [newPartTimeRate, setNewPartTimeRate] = useState(100)
  const [newIsOpening, setNewIsOpening] = useState(false)
  const [newSpecialRate, setNewSpecialRate] = useState(0)
  const [newIsManagement, setNewIsManagement] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const tenureRateOptions = [100, 110, 120, 130, 140, 150]
  const partTimeRateOptions = [50, 60, 70, 80, 90, 100]
  const specialRateOptions = [0, 10, 20, 30, 40, 50]

  const toggleNewDealer = (dealer) => { if (newDealers.includes(dealer)) { setNewDealers(newDealers.filter(d => d !== dealer)) } else { setNewDealers([...newDealers, dealer]) } }
  const toggleEditDealer = (dealer) => { if (editData.dealers.includes(dealer)) { setEditData({...editData, dealers: editData.dealers.filter(d => d !== dealer)}) } else { setEditData({...editData, dealers: [...editData.dealers, dealer]}) } }

  const calcTenure = (joinDate) => {
    if (!joinDate) return '-'
    const join = new Date(joinDate)
    const now = new Date()
    const years = now.getFullYear() - join.getFullYear()
    const months = now.getMonth() - join.getMonth()
    const totalMonths = years * 12 + months
    const y = Math.floor(totalMonths / 12)
    const m = totalMonths % 12
    return y > 0 ? `${y}年${m}ヶ月` : `${m}ヶ月`
  }

  const addStaff = async () => {
    if (!newStaff || staff.find(s => s.name === newStaff)) return
    const dealerStr = newDealers.join(',')
    const { data, error } = await supabase.from('staff').insert({ name: newStaff, dealer: dealerStr, join_date: newJoinDate || null, tenure_rate: newTenureRate, work_type: newWorkType, part_time_rate: newPartTimeRate, work_days_per_week: newWorkDaysPerWeek, is_opening_staff: newIsOpening, special_rate: newSpecialRate, is_management: newIsManagement }).select()
    if (!error && data) {
      setStaff([...staff, { id: data[0].id, name: newStaff, dealer: dealerStr, joinDate: newJoinDate || null, tenureRate: newTenureRate, workType: newWorkType, partTimeRate: newPartTimeRate, workDaysPerWeek: newWorkDaysPerWeek, isOpeningStaff: newIsOpening, specialRate: newSpecialRate, isManagement: newIsManagement }])
      setNewStaff(''); setNewDealers([]); setNewJoinDate(''); setNewTenureRate(100); setNewWorkType('full'); setNewPartTimeRate(100); setNewWorkDaysPerWeek(5); setNewIsOpening(false); setNewSpecialRate(0); setNewIsManagement(false)
    }
  }
  const deleteStaff = async (id, name) => { if (!confirm(`「${name}」を削除しますか？`)) return; const { error } = await supabase.from('staff').delete().eq('id', id); if (!error) setStaff(staff.filter(s => s.id !== id)) }
  const startEdit = (s) => { setEditingId(s.id); setEditData({ name: s.name, dealers: s.dealer ? s.dealer.split(',').filter(d => d) : [], joinDate: s.joinDate || '', tenureRate: s.tenureRate || 100, workType: s.workType || 'full', partTimeRate: s.partTimeRate || 100, workDaysPerWeek: s.workDaysPerWeek || 5, isOpeningStaff: s.isOpeningStaff || false, specialRate: s.specialRate || 0, isManagement: s.isManagement || false }) }
  const saveEdit = async (id) => {
    const dealerStr = editData.dealers.join(',')
    const { error } = await supabase.from('staff').update({ name: editData.name, dealer: dealerStr, join_date: editData.joinDate || null, tenure_rate: editData.tenureRate, work_type: editData.workType, part_time_rate: editData.partTimeRate, work_days_per_week: editData.workDaysPerWeek, is_opening_staff: editData.isOpeningStaff, special_rate: editData.specialRate, is_management: editData.isManagement }).eq('id', id)
    if (!error) { setStaff(staff.map(s => s.id === id ? { ...s, name: editData.name, dealer: dealerStr, joinDate: editData.joinDate || null, tenureRate: editData.tenureRate, workType: editData.workType, partTimeRate: editData.partTimeRate, workDaysPerWeek: editData.workDaysPerWeek, isOpeningStaff: editData.isOpeningStaff, specialRate: editData.specialRate, isManagement: editData.isManagement } : s)); setEditingId(null) }
  }

  // スタッフ用のシンプル表示
  if (!isAdmin) {
    return (
      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ一覧 ({staff.length}名)</h3>
        <div className="space-y-3">
          {staff.map(s => (
            <div key={s.id} className="border rounded p-4">
              <div className="font-bold text-lg mb-2">{s.name}</div>
              {s.dealer && (
                <div>
                  <span className="text-sm text-gray-500">発注担当：</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.dealer.split(',').filter(d => d).map((d, i) => (
                      <span key={i} className="bg-blue-50 px-2 py-1 rounded text-sm">{d}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 管理者用のフル表示
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">スタッフ追加</h3>
        <div className="grid-2 mb-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ名</label><input type="text" value={newStaff} onChange={e => setNewStaff(e.target.value)} placeholder="名前" className="input" /></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>入社日</label><input type="date" value={newJoinDate} onChange={e => setNewJoinDate(e.target.value)} className="input" /></div>
        </div>
        <div className="grid-2 mb-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>勤続係数</label><select value={newTenureRate} onChange={e => setNewTenureRate(parseInt(e.target.value))} className="select">{tenureRateOptions.map(r => <option key={r} value={r}>{r}%</option>)}</select></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>勤務形態</label><select value={newWorkType} onChange={e => setNewWorkType(e.target.value)} className="select"><option value="full">フル</option><option value="part">時短</option></select></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>週勤務日数</label><select value={newWorkDaysPerWeek} onChange={e => setNewWorkDaysPerWeek(parseInt(e.target.value))} className="select"><option value={5}>5日</option><option value={4}>4日</option><option value={3}>3日</option></select></div>
        </div>
        {newWorkType === 'part' && (
          <div className="mb-4"><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>時短係数</label><select value={newPartTimeRate} onChange={e => setNewPartTimeRate(parseInt(e.target.value))} className="select">{partTimeRateOptions.map(r => <option key={r} value={r}>{r}%</option>)}</select></div>
        )}
        <div className="grid-2 mb-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>オープニングスタッフ</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={newIsOpening} onChange={e => setNewIsOpening(e.target.checked)} /><span>はい</span></label></div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>特別係数</label><select value={newSpecialRate} onChange={e => setNewSpecialRate(parseInt(e.target.value))} className="select">{specialRateOptions.map(r => <option key={r} value={r}>+{r}%</option>)}</select></div>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer p-3 bg-red-50 rounded border border-red-200">
            <input type="checkbox" checked={newIsManagement} onChange={e => setNewIsManagement(e.target.checked)} />
            <span className="font-semibold text-red-700">👑 経営陣（ボーナス対象外・内部留保）</span>
          </label>
        </div>
        <div className="mb-4"><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>発注担当ディーラー</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
        <div className="space-y-4">
          {staff.map(s => (
            editingId === s.id ? (
              <div key={s.id} className="border rounded p-4 bg-yellow-50">
                <h4 className="font-bold mb-4">✏️ {s.name} を編集中</h4>
                <div className="grid-2 mb-3">
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>名前</label><input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" /></div>
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>入社日</label><input type="date" value={editData.joinDate} onChange={e => setEditData({...editData, joinDate: e.target.value})} className="input" /></div>
                </div>
                <div className="grid-2 mb-3">
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>勤続係数</label><select value={editData.tenureRate} onChange={e => setEditData({...editData, tenureRate: parseInt(e.target.value)})} className="select">{tenureRateOptions.map(r => <option key={r} value={r}>{r}%</option>)}</select></div>
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>勤務形態</label><select value={editData.workType} onChange={e => setEditData({...editData, workType: e.target.value})} className="select"><option value="full">フル</option><option value="part">時短</option></select></div>
                </div>
                {editData.workType === 'part' && (<div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>時短係数</label><select value={editData.partTimeRate} onChange={e => setEditData({...editData, partTimeRate: parseInt(e.target.value)})} className="select" style={{ width: 'auto' }}>{partTimeRateOptions.map(r => <option key={r} value={r}>{r}%</option>)}</select></div>)}
                <div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>週勤務日数</label><select value={editData.workDaysPerWeek} onChange={e => setEditData({...editData, workDaysPerWeek: parseInt(e.target.value)})} className="select" style={{ width: 'auto' }}><option value={5}>5日</option><option value={4}>4日</option><option value={3}>3日</option></select></div>
                <div className="grid-2 mb-3">
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>オープニング</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={editData.isOpeningStaff} onChange={e => setEditData({...editData, isOpeningStaff: e.target.checked})} /><span>はい</span></label></div>
                  <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>特別係数</label><select value={editData.specialRate} onChange={e => setEditData({...editData, specialRate: parseInt(e.target.value)})} className="select">{specialRateOptions.map(r => <option key={r} value={r}>+{r}%</option>)}</select></div>
                </div>
                <div className="mb-3">
                  <label className="flex items-center gap-2 cursor-pointer p-3 bg-red-50 rounded border border-red-200">
                    <input type="checkbox" checked={editData.isManagement} onChange={e => setEditData({...editData, isManagement: e.target.checked})} />
                    <span className="font-semibold text-red-700">👑 経営陣（ボーナス対象外）</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>発注担当</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.large.map((c, i) => (
                      <label key={i} className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer text-sm border ${editData.dealers.includes(c.name) ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-200'}`}>
                        <input type="checkbox" checked={editData.dealers.includes(c.name)} onChange={() => toggleEditDealer(c.name)} className="w-4 h-4" />
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2"><button onClick={() => saveEdit(s.id)} className="btn btn-green">保存</button><button onClick={() => setEditingId(null)} className="btn btn-gray">取消</button></div>
              </div>
            ) : (
              <div key={s.id} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-lg">{s.name}</div>
                    <div className="text-sm text-gray-500">入社: {s.joinDate || '-'} ({calcTenure(s.joinDate)})</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {s.isManagement && <span className="badge badge-red">👑 経営陣</span>}
                      <span className="badge badge-blue">勤続{s.tenureRate}%</span>
                      <span className="badge badge-green">{s.workType === 'full' ? 'フル' : `時短${s.partTimeRate}%`}</span>
                      {s.isOpeningStaff && <span className="badge badge-yellow">オープニング</span>}
                      {s.specialRate > 0 && <span className="badge badge-red">特別+{s.specialRate}%</span>}
                    </div>
                    {s.dealer && (<div className="flex flex-wrap gap-1 mt-2">{s.dealer.split(',').filter(d => d).map((d, i) => (<span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs">{d}</span>))}</div>)}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(s)} className="text-blue-500 text-sm">編集</button>
                    <button onClick={() => deleteStaff(s.id, s.name)} className="text-red-500 text-sm">削除</button>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== データ出力 ====================
function DataExport({ products, staff, usage, stockIn, inventoryHistory }) {
  const downloadCSV = (filename, headers, rows) => { const BOM = '\uFEFF'; const csvContent = BOM + [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n'); const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = filename; link.click() }
  const exportProductsCSV = () => { const headers = ['ディーラー', '種類', '商品名', '仕入れ価格', '販売価格']; const rows = products.map(p => [p.largeCategory, p.mediumCategory, p.name, p.purchasePrice, p.sellingPrice]); downloadCSV('商品一覧.csv', headers, rows) }
  const exportUsageCSV = () => { const headers = ['日付', 'ディーラー', '種類', '商品名', '数量', '金額']; const rows = usage.map(u => [u.date, u.largeCategory, u.mediumCategory, u.productName, u.quantity, u.purchasePrice * u.quantity]); downloadCSV('使用履歴.csv', headers, rows) }
  const exportStockInCSV = () => { const headers = ['日付', 'ディーラー', '商品名', '入荷数']; const rows = stockIn.map(s => [s.date, s.largeCategory, s.productName, s.quantity]); downloadCSV('入荷履歴.csv', headers, rows) }
  const exportInventoryCSV = () => { if (inventoryHistory.length === 0) { alert('棚卸履歴がありません'); return }; const latest = inventoryHistory[inventoryHistory.length - 1]; const headers = ['商品名', '数量', '仕入れ価格', '在庫金額']; const rows = latest.data.map(d => [d.name, d.quantity, d.purchasePrice, d.quantity * d.purchasePrice]); downloadCSV(`棚卸_${latest.date}.csv`, headers, rows) }
  const items = [{ label: '商品一覧', fn: exportProductsCSV, count: products.length }, { label: '使用履歴', fn: exportUsageCSV, count: usage.length }, { label: '入荷履歴', fn: exportStockInCSV, count: stockIn.length }, { label: '最新棚卸', fn: exportInventoryCSV, count: inventoryHistory.length }]

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">📊 データ出力</h3>
      <div className="space-y-3">{items.map((item, i) => (<div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded"><div><span className="font-semibold">{item.label}</span><span className="text-sm text-gray-500 ml-2">({item.count}件)</span></div><button onClick={item.fn} className="btn btn-green">CSV出力</button></div>))}</div>
    </div>
  )
}

// ==================== タイムカード ====================
function TimeCard({ staff, timeRecords, setTimeRecords, isAdmin }) {
  const [selectedStaff, setSelectedStaff] = useState('')
  const [mode, setMode] = useState('punch') // 'punch' or 'manual' or 'list'
  const [manualDate, setManualDate] = useState('')
  const [manualClockIn, setManualClockIn] = useState('09:00')
  const [manualClockOut, setManualClockOut] = useState('15:00')
  const [isSpecial, setIsSpecial] = useState(false)
  const [specialNote, setSpecialNote] = useState('')
  const [viewMonth, setViewMonth] = useState(`${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`)

  const today = new Date().toISOString().split('T')[0]
  const now = new Date()

  // 15分単位の時間オプションを生成
  const timeOptions = []
  for (let h = 5; h <= 23; h++) {
    for (let m = 0; m < 60; m += 15) {
      timeOptions.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
    }
  }

  // 今日の記録を取得
  const getTodayRecord = (staffId) => {
    return timeRecords.find(r => r.staffId === staffId && r.date === today)
  }

  // 現在時刻を取得（HH:MM形式）
  const getCurrentTime = () => {
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  }

  // 出勤打刻
  const punchIn = async () => {
    if (!selectedStaff) { alert('スタッフを選択してください'); return }
    const staffMember = staff.find(s => s.id === parseInt(selectedStaff))
    const existing = getTodayRecord(parseInt(selectedStaff))
    
    if (existing) {
      alert('今日は既に出勤打刻されています')
      return
    }

    const currentTime = getCurrentTime()
    const { data, error } = await supabase.from('time_records').insert({
      staff_id: parseInt(selectedStaff),
      staff_name: staffMember.name,
      record_date: today,
      clock_in: currentTime,
      input_type: 'punch'
    }).select()

    if (!error && data) {
      setTimeRecords([...timeRecords, {
        id: data[0].id,
        staffId: parseInt(selectedStaff),
        staffName: staffMember.name,
        date: today,
        clockIn: currentTime,
        clockOut: null,
        isSpecial: false,
        specialNote: '',
        inputType: 'punch'
      }])
      alert(`${staffMember.name}さん、出勤しました！ (${currentTime})`)
    }
  }

  // 退勤打刻
  const punchOut = async () => {
    if (!selectedStaff) { alert('スタッフを選択してください'); return }
    const staffMember = staff.find(s => s.id === parseInt(selectedStaff))
    const existing = getTodayRecord(parseInt(selectedStaff))
    
    if (!existing) {
      alert('先に出勤打刻をしてください')
      return
    }
    if (existing.clockOut) {
      alert('今日は既に退勤打刻されています')
      return
    }

    const currentTime = getCurrentTime()
    const { error } = await supabase.from('time_records').update({
      clock_out: currentTime
    }).eq('id', existing.id)

    if (!error) {
      setTimeRecords(timeRecords.map(r => r.id === existing.id ? { ...r, clockOut: currentTime } : r))
      alert(`${staffMember.name}さん、お疲れ様でした！ (${currentTime})`)
    }
  }

  // 手入力で保存
  const saveManual = async () => {
    if (!selectedStaff || !manualDate) { alert('スタッフと日付を選択してください'); return }
    const staffMember = staff.find(s => s.id === parseInt(selectedStaff))
    const existing = timeRecords.find(r => r.staffId === parseInt(selectedStaff) && r.date === manualDate)

    if (existing) {
      // 更新
      const { error } = await supabase.from('time_records').update({
        clock_in: manualClockIn,
        clock_out: manualClockOut,
        is_special: isSpecial,
        special_note: specialNote,
        input_type: 'manual'
      }).eq('id', existing.id)

      if (!error) {
        setTimeRecords(timeRecords.map(r => r.id === existing.id ? {
          ...r,
          clockIn: manualClockIn,
          clockOut: manualClockOut,
          isSpecial,
          specialNote,
          inputType: 'manual'
        } : r))
        alert('更新しました！')
      }
    } else {
      // 新規
      const { data, error } = await supabase.from('time_records').insert({
        staff_id: parseInt(selectedStaff),
        staff_name: staffMember.name,
        record_date: manualDate,
        clock_in: manualClockIn,
        clock_out: manualClockOut,
        is_special: isSpecial,
        special_note: specialNote,
        input_type: 'manual'
      }).select()

      if (!error && data) {
        setTimeRecords([...timeRecords, {
          id: data[0].id,
          staffId: parseInt(selectedStaff),
          staffName: staffMember.name,
          date: manualDate,
          clockIn: manualClockIn,
          clockOut: manualClockOut,
          isSpecial,
          specialNote,
          inputType: 'manual'
        }])
        alert('保存しました！')
      }
    }
    setManualDate('')
    setIsSpecial(false)
    setSpecialNote('')
  }

  // レコード削除
  const deleteRecord = async (id) => {
    if (!confirm('この記録を削除しますか？')) return
    const { error } = await supabase.from('time_records').delete().eq('id', id)
    if (!error) setTimeRecords(timeRecords.filter(r => r.id !== id))
  }

  // 労働時間を計算（分）
  const calcWorkMinutes = (clockIn, clockOut) => {
    if (!clockIn || !clockOut) return 0
    const [inH, inM] = clockIn.split(':').map(Number)
    const [outH, outM] = clockOut.split(':').map(Number)
    return (outH * 60 + outM) - (inH * 60 + inM)
  }

  // 分を「○時間○分」形式に変換
  const formatMinutes = (minutes) => {
    if (minutes <= 0) return '-'
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h${String(m).padStart(2, '0')}m`
  }

  // 月次集計
  const getMonthlyStats = (staffId, yearMonth) => {
    const [year, month] = yearMonth.split('-').map(Number)
    const records = timeRecords.filter(r => {
      if (staffId && r.staffId !== staffId) return false
      const d = new Date(r.date)
      return d.getFullYear() === year && d.getMonth() + 1 === month
    })
    
    const totalMinutes = records.reduce((sum, r) => sum + calcWorkMinutes(r.clockIn, r.clockOut), 0)
    const workDays = records.filter(r => r.clockIn && r.clockOut).length
    
    return { records, totalMinutes, workDays }
  }

  const todayRecord = selectedStaff ? getTodayRecord(parseInt(selectedStaff)) : null
  const monthlyStats = getMonthlyStats(selectedStaff ? parseInt(selectedStaff) : null, viewMonth)

  return (
    <div className="space-y-4">
      {/* スタッフ選択 */}
      <div className="card">
        <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label>
        <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select">
          <option value="">選択してください</option>
          {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* モード切替 */}
      <div className="flex gap-2">
        <button onClick={() => setMode('punch')} className={`btn flex-1 ${mode === 'punch' ? 'btn-blue' : 'btn-gray'}`}>🕐 打刻</button>
        <button onClick={() => setMode('manual')} className={`btn flex-1 ${mode === 'manual' ? 'btn-blue' : 'btn-gray'}`}>✏️ 手入力</button>
        <button onClick={() => setMode('list')} className={`btn flex-1 ${mode === 'list' ? 'btn-blue' : 'btn-gray'}`}>📋 一覧</button>
      </div>

      {/* 打刻モード */}
      {mode === 'punch' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">🕐 出勤・退勤打刻</h3>
          
          {!selectedStaff ? (
            <p className="text-gray-500 text-center py-4">スタッフを選択してください</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold mb-4">{getCurrentTime()}</p>
              <p className="text-gray-500 mb-4">{today}</p>
              
              {todayRecord ? (
                <div className="bg-gray-50 p-4 rounded mb-4">
                  <p>出勤: <span className="font-bold text-green-600">{todayRecord.clockIn}</span></p>
                  {todayRecord.clockOut ? (
                    <p>退勤: <span className="font-bold text-blue-600">{todayRecord.clockOut}</span></p>
                  ) : (
                    <p className="text-gray-400">退勤: 未打刻</p>
                  )}
                  {todayRecord.clockIn && todayRecord.clockOut && (
                    <p className="mt-2 font-bold">労働時間: {formatMinutes(calcWorkMinutes(todayRecord.clockIn, todayRecord.clockOut))}</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 mb-4">今日の記録はありません</p>
              )}
              
              <div className="grid-2 gap-4">
                <button 
                  onClick={punchIn} 
                  disabled={todayRecord?.clockIn}
                  className={`btn py-4 text-lg ${todayRecord?.clockIn ? 'btn-gray opacity-50' : 'btn-green'}`}
                >
                  出勤
                </button>
                <button 
                  onClick={punchOut} 
                  disabled={!todayRecord?.clockIn || todayRecord?.clockOut}
                  className={`btn py-4 text-lg ${!todayRecord?.clockIn || todayRecord?.clockOut ? 'btn-gray opacity-50' : 'btn-blue'}`}
                >
                  退勤
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 手入力モード */}
      {mode === 'manual' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">✏️ 手入力（15分単位）</h3>
          
          {!selectedStaff ? (
            <p className="text-gray-500 text-center py-4">スタッフを選択してください</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>日付</label>
                <input type="date" value={manualDate} onChange={e => setManualDate(e.target.value)} max={today} className="input" />
              </div>
              
              <div className="grid-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>出勤</label>
                  <select value={manualClockIn} onChange={e => setManualClockIn(e.target.value)} className="select">
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>退勤</label>
                  <select value={manualClockOut} onChange={e => setManualClockOut(e.target.value)} className="select">
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              
              {isAdmin && (
                <div className="mb-4 bg-yellow-50 p-3 rounded">
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input type="checkbox" checked={isSpecial} onChange={e => setIsSpecial(e.target.checked)} />
                    <span className="font-semibold">特殊勤務（早朝・ブライダル等）</span>
                  </label>
                  {isSpecial && (
                    <input 
                      type="text" 
                      value={specialNote} 
                      onChange={e => setSpecialNote(e.target.value)} 
                      placeholder="メモ（例：ブライダル出張）" 
                      className="input mt-2" 
                    />
                  )}
                </div>
              )}
              
              {manualDate && (
                <div className="bg-gray-50 p-3 rounded mb-4 text-center">
                  <p className="text-sm text-gray-600">労働時間</p>
                  <p className="text-2xl font-bold">{formatMinutes(calcWorkMinutes(manualClockIn, manualClockOut))}</p>
                </div>
              )}
              
              <button onClick={saveManual} className="btn btn-blue w-full">保存</button>
            </>
          )}
        </div>
      )}

      {/* 一覧モード */}
      {mode === 'list' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">📋 勤務記録</h3>
          
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>表示月</label>
            <input type="month" value={viewMonth} onChange={e => setViewMonth(e.target.value)} className="input" />
          </div>
          
          {/* 月次集計 */}
          <div className="bg-blue-50 p-4 rounded mb-4">
            <div className="grid-2 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">出勤日数</p>
                <p className="text-2xl font-bold text-blue-600">{monthlyStats.workDays}日</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">総労働時間</p>
                <p className="text-2xl font-bold text-blue-600">
                  {Math.floor(monthlyStats.totalMinutes / 60)}時間{monthlyStats.totalMinutes % 60}分
                </p>
              </div>
            </div>
          </div>
          
          {/* 記録一覧 */}
          {monthlyStats.records.length === 0 ? (
            <p className="text-gray-500 text-center py-4">この月の記録はありません</p>
          ) : (
            <div className="space-y-2">
              {[...monthlyStats.records].sort((a, b) => new Date(b.date) - new Date(a.date)).map(record => {
                const d = new Date(record.date)
                const dayNames = ['日', '月', '火', '水', '木', '金', '土']
                const dayName = dayNames[d.getDay()]
                const isWeekend = d.getDay() === 0 || d.getDay() === 6
                
                return (
                  <div key={record.id} className={`border rounded p-3 ${record.isSpecial ? 'bg-yellow-50 border-yellow-300' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <span className={`font-bold ${isWeekend ? 'text-red-500' : ''}`}>
                          {record.date.slice(5)} ({dayName})
                        </span>
                        {!selectedStaff && <span className="text-gray-500 text-sm ml-2">{record.staffName}</span>}
                        {record.isSpecial && <span className="ml-2 text-yellow-600 text-xs">⚡特殊</span>}
                        {record.inputType === 'punch' && <span className="ml-2 text-green-600 text-xs">●打刻</span>}
                      </div>
                      {isAdmin && (
                        <button onClick={() => deleteRecord(record.id)} className="text-red-500 text-sm">削除</button>
                      )}
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-green-600">{record.clockIn || '-'}</span>
                      <span className="text-gray-400 mx-2">→</span>
                      <span className="text-blue-600">{record.clockOut || '-'}</span>
                      <span className="text-gray-600 ml-4 font-semibold">
                        {formatMinutes(calcWorkMinutes(record.clockIn, record.clockOut))}
                      </span>
                    </div>
                    {record.specialNote && <p className="text-xs text-yellow-700 mt-1">{record.specialNote}</p>}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ==================== 有給管理 ====================
function LeaveManagement({ staff, leaveGrants, setLeaveGrants, leaveRequests, setLeaveRequests, notifications, setNotifications, isAdmin, userRole }) {
  const [selectedStaff, setSelectedStaff] = useState('')
  const [mode, setMode] = useState('calendar') // 'calendar', 'status', 'request', 'approve', 'settings'
  const [requestDate, setRequestDate] = useState('')
  const [requestType, setRequestType] = useState('paid') // 'paid' or 'summer'
  const [dayType, setDayType] = useState('full') // 'full', 'am', 'pm'
  const [requestMemo, setRequestMemo] = useState('')
  const [calendarMonth, setCalendarMonth] = useState(new Date())
  const [editingGrantId, setEditingGrantId] = useState(null)
  const [editGrantData, setEditGrantData] = useState({})

  // 現在の年度を取得（4月始まり）
  const getCurrentFiscalYear = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    return month >= 4 ? now.getFullYear() : now.getFullYear() - 1
  }

  const fiscalYear = getCurrentFiscalYear()

  // 勤続年数を計算（月単位）
  const calcTenureMonths = (joinDate) => {
    if (!joinDate) return 0
    const join = new Date(joinDate)
    const now = new Date()
    return (now.getFullYear() - join.getFullYear()) * 12 + (now.getMonth() - join.getMonth())
  }

  // フルタイムの有給日数（法定）
  const getPaidLeaveDaysFull = (tenureMonths) => {
    if (tenureMonths < 6) return 0
    if (tenureMonths < 18) return 10
    if (tenureMonths < 30) return 11
    if (tenureMonths < 42) return 12
    if (tenureMonths < 54) return 14
    if (tenureMonths < 66) return 16
    if (tenureMonths < 78) return 18
    return 20
  }

  // 週4日の有給日数（比例付与）
  const getPaidLeaveDaysPartTime = (tenureMonths) => {
    if (tenureMonths < 6) return 0
    if (tenureMonths < 18) return 7
    if (tenureMonths < 30) return 8
    if (tenureMonths < 42) return 9
    if (tenureMonths < 54) return 10
    if (tenureMonths < 66) return 12
    if (tenureMonths < 78) return 13
    return 15
  }

  // スタッフの有給日数を取得
  const getGrantedDays = (staffMember) => {
    const tenureMonths = calcTenureMonths(staffMember.joinDate)
    if (staffMember.workDaysPerWeek <= 4) {
      return getPaidLeaveDaysPartTime(tenureMonths)
    }
    return getPaidLeaveDaysFull(tenureMonths)
  }

  // 年度内の使用日数を取得
  const getUsedDays = (staffId, year, leaveType) => {
    const startDate = `${year}-04-01`
    const endDate = `${year + 1}-03-31`
    return leaveRequests
      .filter(r => r.staffId === staffId && r.leaveType === leaveType && r.status === 'approved' && r.leaveDate >= startDate && r.leaveDate <= endDate)
      .reduce((sum, r) => sum + r.dayValue, 0)
  }

  // 残日数を取得
  const getRemainingDays = (staffId, year, leaveType) => {
    const grant = leaveGrants.find(g => g.staffId === staffId && g.fiscalYear === year && g.leaveType === leaveType)
    const total = grant ? (grant.grantedDays + grant.carriedDays) : 0
    const used = getUsedDays(staffId, year, leaveType)
    return total - used
  }

  // 有給申請
  const submitRequest = async () => {
    if (!selectedStaff || !requestDate) { alert('スタッフと日付を選択してください'); return }
    const staffMember = staff.find(s => s.id === parseInt(selectedStaff))
    const dayValue = dayType === 'full' ? 1.0 : 0.5
    
    // 残日数チェック
    const remaining = getRemainingDays(parseInt(selectedStaff), fiscalYear, requestType)
    if (remaining < dayValue) {
      alert('残日数が足りません')
      return
    }

    const { data, error } = await supabase.from('leave_requests').insert({
      staff_id: parseInt(selectedStaff),
      staff_name: staffMember.name,
      leave_type: requestType,
      leave_date: requestDate,
      day_type: dayType,
      day_value: dayValue,
      status: 'pending',
      memo: requestMemo
    }).select()

    if (!error && data) {
      setLeaveRequests([{
        id: data[0].id,
        staffId: parseInt(selectedStaff),
        staffName: staffMember.name,
        leaveType: requestType,
        leaveDate: requestDate,
        dayType,
        dayValue,
        status: 'pending',
        memo: requestMemo,
        approvedBy: null,
        approvedAt: null
      }, ...leaveRequests])
      
      // 管理者へ通知
      const dayTypeLabel = { full: '全休', am: '午前休', pm: '午後休' }
      const { data: notifData } = await supabase.from('notifications').insert({
        target_role: 'admin',
        target_staff_id: null,
        message: `${staffMember.name}さんが${requestType === 'paid' ? '有給' : '夏休み'}を申請（${requestDate} ${dayTypeLabel[dayType]}）`,
        link_to: 'leave',
        is_read: false
      }).select()
      
      if (notifData) {
        setNotifications([{ id: notifData[0].id, targetRole: 'admin', targetStaffId: null, message: notifData[0].message, linkTo: 'leave', isRead: false, createdAt: notifData[0].created_at }, ...notifications])
      }
      
      alert('申請しました！')
      setRequestDate('')
      setRequestMemo('')
    }
  }

  // 承認
  const approveRequest = async (id) => {
    const request = leaveRequests.find(r => r.id === id)
    const { error } = await supabase.from('leave_requests').update({
      status: 'approved',
      approved_by: '管理者',
      approved_at: new Date().toISOString()
    }).eq('id', id)

    if (!error) {
      setLeaveRequests(leaveRequests.map(r => r.id === id ? {
        ...r,
        status: 'approved',
        approvedBy: '管理者',
        approvedAt: new Date().toISOString()
      } : r))
      
      // スタッフへ通知
      if (request) {
        const { data: notifData } = await supabase.from('notifications').insert({
          target_role: 'staff',
          target_staff_id: request.staffId,
          message: `${request.leaveDate}の${request.leaveType === 'paid' ? '有給' : '夏休み'}申請が承認されました`,
          link_to: 'leave',
          is_read: false
        }).select()
        
        if (notifData) {
          setNotifications([{ id: notifData[0].id, targetRole: 'staff', targetStaffId: request.staffId, message: notifData[0].message, linkTo: 'leave', isRead: false, createdAt: notifData[0].created_at }, ...notifications])
        }
      }
      
      alert('承認しました')
    }
  }

  // 却下
  const rejectRequest = async (id) => {
    if (!confirm('この申請を却下しますか？')) return
    const request = leaveRequests.find(r => r.id === id)
    const { error } = await supabase.from('leave_requests').update({
      status: 'rejected'
    }).eq('id', id)

    if (!error) {
      setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
      
      // スタッフへ通知
      if (request) {
        const { data: notifData } = await supabase.from('notifications').insert({
          target_role: 'staff',
          target_staff_id: request.staffId,
          message: `${request.leaveDate}の${request.leaveType === 'paid' ? '有給' : '夏休み'}申請が却下されました`,
          link_to: 'leave',
          is_read: false
        }).select()
        
        if (notifData) {
          setNotifications([{ id: notifData[0].id, targetRole: 'staff', targetStaffId: request.staffId, message: notifData[0].message, linkTo: 'leave', isRead: false, createdAt: notifData[0].created_at }, ...notifications])
        }
      }
    }
  }

  // 付与設定を保存
  const saveGrant = async (staffId, staffName, leaveType, grantedDays, carriedDays) => {
    const existing = leaveGrants.find(g => g.staffId === staffId && g.fiscalYear === fiscalYear && g.leaveType === leaveType)
    
    if (existing) {
      const { error } = await supabase.from('leave_grants').update({
        granted_days: grantedDays,
        carried_days: carriedDays
      }).eq('id', existing.id)
      
      if (!error) {
        setLeaveGrants(leaveGrants.map(g => g.id === existing.id ? { ...g, grantedDays, carriedDays } : g))
      }
    } else {
      const { data, error } = await supabase.from('leave_grants').insert({
        staff_id: staffId,
        staff_name: staffName,
        fiscal_year: fiscalYear,
        leave_type: leaveType,
        granted_days: grantedDays,
        carried_days: carriedDays
      }).select()
      
      if (!error && data) {
        setLeaveGrants([...leaveGrants, {
          id: data[0].id,
          staffId,
          staffName,
          fiscalYear,
          leaveType,
          grantedDays,
          carriedDays
        }])
      }
    }
  }

  // 全スタッフに自動付与
  const autoGrantAll = async () => {
    if (!confirm(`${fiscalYear}年度の有給・夏休みを全スタッフに付与しますか？`)) return
    
    for (const s of staff) {
      const paidDays = getGrantedDays(s)
      // 前年度の残りを繰越（最大で付与日数まで）
      const prevRemaining = getRemainingDays(s.id, fiscalYear - 1, 'paid')
      const carriedDays = Math.min(prevRemaining, paidDays)
      
      await saveGrant(s.id, s.name, 'paid', paidDays, carriedDays > 0 ? carriedDays : 0)
      await saveGrant(s.id, s.name, 'summer', 3, 0)
    }
    alert('付与完了！')
  }

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending')
  const myRequests = selectedStaff ? leaveRequests.filter(r => r.staffId === parseInt(selectedStaff)) : []
  
  // 自分宛の通知を取得
  const myNotifications = notifications.filter(n => {
    if (isAdmin && n.targetRole === 'admin') return true
    if (!isAdmin && n.targetRole === 'staff' && n.targetStaffId === parseInt(selectedStaff)) return true
    return false
  })
  
  // 通知を既読にする
  const markAsRead = async (id) => {
    const { error } = await supabase.from('notifications').update({ is_read: true }).eq('id', id)
    if (!error) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n))
    }
  }

  const dayTypeLabel = { full: '全休', am: '午前休', pm: '午後休' }
  const statusLabel = { pending: '申請中', approved: '承認済', rejected: '却下' }
  const statusColor = { pending: 'text-yellow-600', approved: 'text-green-600', rejected: 'text-red-600' }

  return (
    <div className="space-y-4">
      {/* スタッフ選択 */}
      <div className="card">
        <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>スタッフ</label>
        <select value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)} className="select">
          <option value="">選択してください</option>
          {staff.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      </div>

      {/* モード切替 */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setMode('calendar')} className={`btn flex-1 ${mode === 'calendar' ? 'btn-blue' : 'btn-gray'}`}>📅 カレンダー</button>
        <button onClick={() => setMode('status')} className={`btn flex-1 ${mode === 'status' ? 'btn-blue' : 'btn-gray'}`}>📊 残日数</button>
        <button onClick={() => setMode('request')} className={`btn flex-1 ${mode === 'request' ? 'btn-blue' : 'btn-gray'}`}>📝 申請</button>
        {isAdmin && <button onClick={() => setMode('approve')} className={`btn flex-1 ${mode === 'approve' ? 'btn-blue' : 'btn-gray'}`}>✅ 承認{pendingRequests.length > 0 && <span className="ml-1 bg-red-500 text-white text-xs px-1 rounded">{pendingRequests.length}</span>}</button>}
        {isAdmin && <button onClick={() => setMode('settings')} className={`btn flex-1 ${mode === 'settings' ? 'btn-blue' : 'btn-gray'}`}>⚙️ 設定</button>}
      </div>

      {/* 通知表示 */}
      {myNotifications.filter(n => !n.isRead).length > 0 && (
        <div className="card bg-yellow-50 border-yellow-300">
          <h4 className="font-bold mb-2">🔔 新着通知</h4>
          <div className="space-y-2">
            {myNotifications.filter(n => !n.isRead).map(n => (
              <div key={n.id} className="flex justify-between items-center bg-white p-2 rounded text-sm">
                <span>{n.message}</span>
                <button onClick={() => markAsRead(n.id)} className="text-blue-500 text-xs">既読</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* カレンダー表示 */}
      {mode === 'calendar' && (
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))} className="btn btn-gray" style={{ padding: '0.5rem 1rem' }}>◀</button>
            <h3 className="text-xl font-bold">{calendarMonth.getFullYear()}年{calendarMonth.getMonth() + 1}月</h3>
            <button onClick={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))} className="btn btn-gray" style={{ padding: '0.5rem 1rem' }}>▶</button>
          </div>
          
          {/* 凡例 */}
          <div className="flex gap-3 mb-3 text-xs justify-center flex-wrap">
            <span><span className="inline-block w-3 h-3 bg-gray-300 rounded mr-1"></span>定休日</span>
            <span><span className="inline-block w-3 h-3 bg-blue-100 rounded mr-1"></span>有給</span>
            <span><span className="inline-block w-3 h-3 bg-green-100 rounded mr-1"></span>夏休み</span>
          </div>
          
          {/* 曜日ヘッダー */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '2px' }}>
            {['日', '月', '火', '水', '木', '金', '土'].map((d, i) => (
              <div key={d} style={{ 
                textAlign: 'center', 
                padding: '8px 0', 
                fontWeight: 'bold',
                backgroundColor: i === 1 || i === 2 ? '#e5e7eb' : '#f9fafb',
                color: i === 0 ? '#ef4444' : i === 6 ? '#3b82f6' : i === 1 || i === 2 ? '#9ca3af' : '#374151'
              }}>{d}</div>
            ))}
          </div>
          
          {/* カレンダー本体 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {(() => {
              const year = calendarMonth.getFullYear()
              const month = calendarMonth.getMonth()
              const firstDay = new Date(year, month, 1).getDay()
              const lastDate = new Date(year, month + 1, 0).getDate()
              const cells = []
              
              // 第三日曜日を計算
              let sundayCount = 0
              let thirdSunday = null
              for (let d = 1; d <= lastDate; d++) {
                if (new Date(year, month, d).getDay() === 0) {
                  sundayCount++
                  if (sundayCount === 3) { thirdSunday = d; break }
                }
              }
              
              // 空白セル
              for (let i = 0; i < firstDay; i++) {
                cells.push(<div key={`empty-${i}`} style={{ minHeight: '70px', backgroundColor: '#f9fafb' }}></div>)
              }
              
              // 日付セル
              for (let date = 1; date <= lastDate; date++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
                const dayRequests = leaveRequests.filter(r => r.leaveDate === dateStr && r.status === 'approved')
                const dayOfWeek = new Date(year, month, date).getDay()
                const isHoliday = dayOfWeek === 1 || dayOfWeek === 2 || date === thirdSunday
                const isToday = dateStr === new Date().toISOString().split('T')[0]
                
                let bgColor = '#ffffff'
                if (isHoliday) bgColor = '#d1d5db'
                else if (dayOfWeek === 0) bgColor = '#fef2f2'
                else if (dayOfWeek === 6) bgColor = '#eff6ff'
                
                cells.push(
                  <div key={date} style={{ 
                    minHeight: '70px', 
                    backgroundColor: bgColor,
                    border: isToday ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    padding: '4px',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '14px',
                      color: isHoliday ? '#9ca3af' : dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : '#374151',
                      marginBottom: '2px'
                    }}>
                      {date}
                      {isToday && <span style={{ marginLeft: '4px', fontSize: '10px', color: '#3b82f6' }}>今日</span>}
                    </div>
                    {!isHoliday && dayRequests.length > 0 && (
                      <div style={{ fontSize: '11px', lineHeight: '1.3' }}>
                        {dayRequests.slice(0, 3).map(r => (
                          <div key={r.id} style={{ 
                            backgroundColor: r.leaveType === 'paid' ? '#dbeafe' : '#dcfce7',
                            color: r.leaveType === 'paid' ? '#1d4ed8' : '#166534',
                            padding: '1px 3px',
                            borderRadius: '2px',
                            marginBottom: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {r.staffName}{r.dayType === 'am' ? '(午前)' : r.dayType === 'pm' ? '(午後)' : ''}
                          </div>
                        ))}
                        {dayRequests.length > 3 && (
                          <div style={{ color: '#6b7280', fontSize: '10px' }}>+{dayRequests.length - 3}人</div>
                        )}
                      </div>
                    )}
                    {isHoliday && (
                      <div style={{ fontSize: '10px', color: '#9ca3af' }}>定休日</div>
                    )}
                  </div>
                )
              }
              
              return cells
            })()}
          </div>
        </div>
      )}

      {/* 残日数表示 */}
      {mode === 'status' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">📊 {fiscalYear}年度 有給残日数</h3>
          
          {!selectedStaff ? (
            <div className="space-y-3">
              {staff.map(s => {
                const paidGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'paid')
                const summerGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'summer')
                const paidTotal = paidGrant ? (paidGrant.grantedDays + paidGrant.carriedDays) : 0
                const summerTotal = summerGrant ? summerGrant.grantedDays : 0
                const paidUsed = getUsedDays(s.id, fiscalYear, 'paid')
                const summerUsed = getUsedDays(s.id, fiscalYear, 'summer')
                
                return (
                  <div key={s.id} className="border rounded p-3">
                    <div className="font-bold mb-2">{s.name}</div>
                    <div className="grid-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">有給: </span>
                        <span className="font-bold text-blue-600">{paidTotal - paidUsed}日</span>
                        <span className="text-gray-400 text-xs ml-1">/ {paidTotal}日</span>
                      </div>
                      <div>
                        <span className="text-gray-500">夏休: </span>
                        <span className="font-bold text-green-600">{summerTotal - summerUsed}日</span>
                        <span className="text-gray-400 text-xs ml-1">/ {summerTotal}日</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>
              {(() => {
                const s = staff.find(st => st.id === parseInt(selectedStaff))
                if (!s) return null
                const paidGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'paid')
                const summerGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'summer')
                const paidTotal = paidGrant ? (paidGrant.grantedDays + paidGrant.carriedDays) : 0
                const summerTotal = summerGrant ? summerGrant.grantedDays : 0
                const paidUsed = getUsedDays(s.id, fiscalYear, 'paid')
                const summerUsed = getUsedDays(s.id, fiscalYear, 'summer')
                const paidRemaining = paidTotal - paidUsed
                const summerRemaining = summerTotal - summerUsed
                
                return (
                  <>
                    <div className="text-center mb-4">
                      <p className="text-gray-500 text-sm">入社日: {s.joinDate || '未設定'}</p>
                      <p className="text-gray-500 text-sm">週{s.workDaysPerWeek}日勤務</p>
                    </div>
                    
                    <div className="grid-2 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded text-center">
                        <p className="text-sm text-gray-600 mb-1">有給休暇</p>
                        <p className="text-3xl font-bold text-blue-600">{paidRemaining}日</p>
                        <p className="text-xs text-gray-500">付与{paidGrant?.grantedDays || 0} + 繰越{paidGrant?.carriedDays || 0} - 使用{paidUsed}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${paidTotal > 0 ? (paidRemaining / paidTotal) * 100 : 0}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded text-center">
                        <p className="text-sm text-gray-600 mb-1">夏季休暇</p>
                        <p className="text-3xl font-bold text-green-600">{summerRemaining}日</p>
                        <p className="text-xs text-gray-500">付与{summerTotal} - 使用{summerUsed}</p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${summerTotal > 0 ? (summerRemaining / summerTotal) * 100 : 0}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 履歴 */}
                    <h4 className="font-bold mb-2">取得履歴</h4>
                    {myRequests.filter(r => r.status === 'approved').length === 0 ? (
                      <p className="text-gray-500 text-center py-4">まだ取得履歴がありません</p>
                    ) : (
                      <div className="space-y-2">
                        {myRequests.filter(r => r.status === 'approved').map(r => (
                          <div key={r.id} className="border rounded p-2 text-sm">
                            <span className="font-semibold">{r.leaveDate}</span>
                            <span className={`ml-2 ${r.leaveType === 'paid' ? 'text-blue-600' : 'text-green-600'}`}>
                              {r.leaveType === 'paid' ? '有給' : '夏休'}
                            </span>
                            <span className="ml-2">{dayTypeLabel[r.dayType]}</span>
                            {r.memo && <span className="ml-2 text-gray-500">({r.memo})</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          )}
        </div>
      )}

      {/* 申請フォーム */}
      {mode === 'request' && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">📝 有給申請</h3>
          
          {!selectedStaff ? (
            <p className="text-gray-500 text-center py-4">スタッフを選択してください</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>休暇種類</label>
                <div className="flex gap-2">
                  <button onClick={() => setRequestType('paid')} className={`btn flex-1 ${requestType === 'paid' ? 'btn-blue' : 'btn-gray'}`}>有給休暇</button>
                  <button onClick={() => setRequestType('summer')} className={`btn flex-1 ${requestType === 'summer' ? 'btn-green' : 'btn-gray'}`}>夏季休暇</button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>日付</label>
                <input type="date" value={requestDate} onChange={e => setRequestDate(e.target.value)} className="input" />
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>種別</label>
                <div className="flex gap-2">
                  <button onClick={() => setDayType('full')} className={`btn flex-1 ${dayType === 'full' ? 'btn-blue' : 'btn-gray'}`}>全休</button>
                  <button onClick={() => setDayType('am')} className={`btn flex-1 ${dayType === 'am' ? 'btn-blue' : 'btn-gray'}`}>午前休</button>
                  <button onClick={() => setDayType('pm')} className={`btn flex-1 ${dayType === 'pm' ? 'btn-blue' : 'btn-gray'}`}>午後休</button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>メモ（任意）</label>
                <input type="text" value={requestMemo} onChange={e => setRequestMemo(e.target.value)} placeholder="理由など" className="input" />
              </div>
              
              <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
                <p>申請内容: {requestType === 'paid' ? '有給休暇' : '夏季休暇'} {dayTypeLabel[dayType]}（{dayType === 'full' ? '1日' : '0.5日'}）</p>
                <p>残日数: {getRemainingDays(parseInt(selectedStaff), fiscalYear, requestType)}日</p>
              </div>
              
              <button onClick={submitRequest} className="btn btn-blue w-full">申請する</button>
              
              {/* 自分の申請履歴 */}
              {myRequests.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-bold mb-2">申請履歴</h4>
                  <div className="space-y-2">
                    {myRequests.slice(0, 5).map(r => (
                      <div key={r.id} className="border rounded p-2 text-sm flex justify-between items-center">
                        <div>
                          <span className="font-semibold">{r.leaveDate}</span>
                          <span className={`ml-2 ${r.leaveType === 'paid' ? 'text-blue-600' : 'text-green-600'}`}>
                            {r.leaveType === 'paid' ? '有給' : '夏休'}
                          </span>
                          <span className="ml-2">{dayTypeLabel[r.dayType]}</span>
                        </div>
                        <span className={`font-bold ${statusColor[r.status]}`}>{statusLabel[r.status]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* 承認画面（管理者のみ） */}
      {mode === 'approve' && isAdmin && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">✅ 承認待ち</h3>
          
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-center py-4">承認待ちの申請はありません</p>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map(r => (
                <div key={r.id} className="border rounded p-3 bg-yellow-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold">{r.staffName}</span>
                      <span className={`ml-2 ${r.leaveType === 'paid' ? 'text-blue-600' : 'text-green-600'}`}>
                        {r.leaveType === 'paid' ? '有給' : '夏休'}
                      </span>
                    </div>
                    <span className="text-yellow-600 font-bold">申請中</span>
                  </div>
                  <p className="text-sm mb-2">
                    {r.leaveDate} {dayTypeLabel[r.dayType]}
                    {r.memo && <span className="text-gray-500 ml-2">({r.memo})</span>}
                  </p>
                  <div className="flex gap-2">
                    <button onClick={() => approveRequest(r.id)} className="btn btn-green flex-1">承認</button>
                    <button onClick={() => rejectRequest(r.id)} className="btn btn-red flex-1">却下</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 設定画面（管理者のみ） */}
      {mode === 'settings' && isAdmin && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">⚙️ {fiscalYear}年度 付与設定</h3>
          
          <button onClick={autoGrantAll} className="btn btn-blue w-full mb-4">
            🎁 全スタッフに自動付与（法定日数）
          </button>
          
          <div className="space-y-4">
            {staff.map(s => {
              const paidGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'paid')
              const summerGrant = leaveGrants.find(g => g.staffId === s.id && g.fiscalYear === fiscalYear && g.leaveType === 'summer')
              const suggestedDays = getGrantedDays(s)
              const isEditing = editingGrantId === s.id
              
              return (
                <div key={s.id} className="border rounded p-3">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="font-bold">{s.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        （{s.workType === 'full' ? 'フル' : '時短'}・週{s.workDaysPerWeek}日）
                      </span>
                    </div>
                    {!isEditing && (
                      <button onClick={() => {
                        setEditingGrantId(s.id)
                        setEditGrantData({
                          paidGranted: paidGrant?.grantedDays || suggestedDays,
                          paidCarried: paidGrant?.carriedDays || 0,
                          summerGranted: summerGrant?.grantedDays || 3
                        })
                      }} className="text-blue-500 text-sm">編集</button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="grid-3 gap-3 mb-3">
                        <div>
                          <label className="text-xs text-gray-500">有給付与</label>
                          <input type="number" value={editGrantData.paidGranted} onChange={e => setEditGrantData({...editGrantData, paidGranted: parseFloat(e.target.value) || 0})} className="input" min="0" max="40" step="0.5" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">繰越（上限{suggestedDays}日）</label>
                          <input type="number" value={editGrantData.paidCarried} onChange={e => setEditGrantData({...editGrantData, paidCarried: Math.min(parseFloat(e.target.value) || 0, suggestedDays)})} className="input" min="0" max={suggestedDays} step="0.5" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500">夏休み</label>
                          <input type="number" value={editGrantData.summerGranted} onChange={e => setEditGrantData({...editGrantData, summerGranted: parseFloat(e.target.value) || 0})} className="input" min="0" max="10" step="1" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">
                        法定付与: {suggestedDays}日（{s.workDaysPerWeek === 5 ? 'フルタイム' : '週4日'}）
                      </div>
                      <div className="flex gap-2">
                        <button onClick={async () => {
                          await saveGrant(s.id, s.name, 'paid', editGrantData.paidGranted, editGrantData.paidCarried)
                          await saveGrant(s.id, s.name, 'summer', editGrantData.summerGranted, 0)
                          setEditingGrantId(null)
                          alert('保存しました')
                        }} className="btn btn-green flex-1">保存</button>
                        <button onClick={() => setEditingGrantId(null)} className="btn btn-gray flex-1">取消</button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid-2 gap-2 text-sm">
                      <div className="bg-blue-50 p-2 rounded">
                        <span className="text-gray-500">有給: </span>
                        <span className="font-bold text-blue-600">
                          {paidGrant ? `${paidGrant.grantedDays}日` : '未設定'}
                        </span>
                        {paidGrant && paidGrant.carriedDays > 0 && (
                          <span className="text-blue-400 text-xs ml-1">+ 繰越{paidGrant.carriedDays}日</span>
                        )}
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <span className="text-gray-500">夏休: </span>
                        <span className="font-bold text-green-600">
                          {summerGrant ? `${summerGrant.grantedDays}日` : '未設定'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== 月次レポート ====================
function MonthlyReport({ monthlyReports, setMonthlyReports, stockIn, products, staffPurchases, isAdmin }) {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1)
  const [totalSales, setTotalSales] = useState('')
  const [retailSales, setRetailSales] = useState('')
  const [prolaboPurchase, setProlaboPurchase] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [chartType, setChartType] = useState('material') // 'material' or 'retail'

  const BASE_RATE = 20

  // 指定月の入荷金額を計算
  const calcMonthlyStockIn = (year, month) => {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = month === 12 
      ? `${year + 1}-01-01` 
      : `${year}-${String(month + 1).padStart(2, '0')}-01`
    
    return stockIn.filter(s => s.date >= startDate && s.date < endDate).reduce((sum, s) => {
      const product = products.find(p => p.id === s.productId)
      return sum + (product ? s.quantity * product.purchasePrice : 0)
    }, 0)
  }

  // 指定月のスタッフ購入金額を計算
  const calcMonthlyStaffPurchases = (year, month) => {
    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = month === 12 
      ? `${year + 1}-01-01` 
      : `${year}-${String(month + 1).padStart(2, '0')}-01`
    
    return staffPurchases.filter(p => p.date >= startDate && p.date < endDate).reduce((sum, p) => {
      return sum + (p.purchasePrice * p.quantity)
    }, 0)
  }

  // 材料費（自動計算）
  const calcAutoMaterialCost = (year, month) => {
    return calcMonthlyStockIn(year, month) - calcMonthlyStaffPurchases(year, month)
  }

  // 材料費率を計算
  const calcMaterialRate = (report) => {
    if (!report.totalSales || report.totalSales <= 0) return 0
    const effectiveCost = (report.materialCost || 0) - (report.prolaboPurchase || 0)
    return (effectiveCost / report.totalSales) * 100
  }

  // 店販比率を計算
  const calcRetailRate = (report) => {
    if (!report.totalSales || report.totalSales <= 0) return 0
    return ((report.retailSales || 0) / report.totalSales) * 100
  }

  const saveReport = async () => {
    if (!totalSales) { alert('売上を入力してください'); return }
    
    const autoMaterialCost = calcAutoMaterialCost(selectedYear, selectedMonth)
    const existing = monthlyReports.find(r => r.year === selectedYear && r.month === selectedMonth)
    
    if (existing) {
      const { error } = await supabase.from('monthly_reports').update({
        total_sales: parseInt(totalSales) || 0,
        retail_sales: parseInt(retailSales) || 0,
        material_cost: autoMaterialCost,
        prolabo_purchase: parseInt(prolaboPurchase) || 0
      }).eq('id', existing.id)
      
      if (!error) {
        setMonthlyReports(monthlyReports.map(r => r.id === existing.id ? {
          ...r,
          totalSales: parseInt(totalSales) || 0,
          retailSales: parseInt(retailSales) || 0,
          materialCost: autoMaterialCost,
          prolaboPurchase: parseInt(prolaboPurchase) || 0
        } : r))
        alert('更新しました！')
      }
    } else {
      const { data, error } = await supabase.from('monthly_reports').insert({
        year: selectedYear,
        month: selectedMonth,
        total_sales: parseInt(totalSales) || 0,
        retail_sales: parseInt(retailSales) || 0,
        material_cost: autoMaterialCost,
        prolabo_purchase: parseInt(prolaboPurchase) || 0
      }).select()
      
      if (!error && data) {
        setMonthlyReports([...monthlyReports, {
          id: data[0].id,
          year: selectedYear,
          month: selectedMonth,
          totalSales: parseInt(totalSales) || 0,
          retailSales: parseInt(retailSales) || 0,
          materialCost: autoMaterialCost,
          prolaboPurchase: parseInt(prolaboPurchase) || 0
        }])
        alert('保存しました！')
      }
    }
    setTotalSales(''); setRetailSales(''); setProlaboPurchase('')
  }

  const deleteReport = async (id) => {
    if (!confirm('この月のデータを削除しますか？')) return
    const { error } = await supabase.from('monthly_reports').delete().eq('id', id)
    if (!error) setMonthlyReports(monthlyReports.filter(r => r.id !== id))
  }

  // 既存データがあれば入力欄に反映
  const loadExistingData = () => {
    const existing = monthlyReports.find(r => r.year === selectedYear && r.month === selectedMonth)
    if (existing) {
      setTotalSales(existing.totalSales?.toString() || '')
      setRetailSales(existing.retailSales?.toString() || '')
      setProlaboPurchase(existing.prolaboPurchase?.toString() || '')
    } else {
      setTotalSales(''); setRetailSales(''); setProlaboPurchase('')
    }
  }

  // 年月が変わったら既存データを読み込む
  React.useEffect(() => { loadExistingData() }, [selectedYear, selectedMonth])

  // グラフ用データ（直近12ヶ月）
  const getChartData = () => {
    const data = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const report = monthlyReports.find(r => r.year === year && r.month === month)
      data.push({
        label: `${month}月`,
        year,
        month,
        materialRate: report ? calcMaterialRate(report) : null,
        retailRate: report ? calcRetailRate(report) : null,
        hasData: !!report
      })
    }
    return data
  }

  const chartData = getChartData()
  const existingReport = monthlyReports.find(r => r.year === selectedYear && r.month === selectedMonth)
  const autoMaterial = calcAutoMaterialCost(selectedYear, selectedMonth)

  // SVGで折れ線グラフを描画
  const renderChart = () => {
    const data = chartData
    const width = 350
    const height = 200
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    const values = data.map(d => chartType === 'material' ? d.materialRate : d.retailRate).filter(v => v !== null)
    const maxValue = chartType === 'material' ? Math.max(25, ...values) : Math.max(20, ...values)
    const minValue = 0

    const getX = (i) => padding.left + (i / (data.length - 1)) * chartWidth
    const getY = (v) => v === null ? null : padding.top + chartHeight - ((v - minValue) / (maxValue - minValue)) * chartHeight

    const points = data.map((d, i) => {
      const value = chartType === 'material' ? d.materialRate : d.retailRate
      return value !== null ? `${getX(i)},${getY(value)}` : null
    }).filter(p => p !== null)

    const targetY = chartType === 'material' ? getY(BASE_RATE) : null

    return (
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: '400px' }}>
        {/* 背景のグリッド */}
        {[0, 5, 10, 15, 20, 25].filter(v => v <= maxValue).map(v => (
          <g key={v}>
            <line x1={padding.left} y1={getY(v)} x2={width - padding.right} y2={getY(v)} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padding.left - 5} y={getY(v) + 4} textAnchor="end" fontSize="10" fill="#6b7280">{v}%</text>
          </g>
        ))}
        
        {/* 目標ライン（材料費率のみ） */}
        {chartType === 'material' && targetY && (
          <line x1={padding.left} y1={targetY} x2={width - padding.right} y2={targetY} stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
        )}
        
        {/* 折れ線 */}
        {points.length > 1 && (
          <polyline
            fill="none"
            stroke={chartType === 'material' ? '#3b82f6' : '#10b981'}
            strokeWidth="2"
            points={points.join(' ')}
          />
        )}
        
        {/* データポイント */}
        {data.map((d, i) => {
          const value = chartType === 'material' ? d.materialRate : d.retailRate
          if (value === null) return null
          const isGood = chartType === 'material' ? value <= BASE_RATE : true
          return (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(value)}
                r="5"
                fill={chartType === 'material' ? (isGood ? '#10b981' : '#ef4444') : '#10b981'}
                stroke="white"
                strokeWidth="2"
              />
              <text x={getX(i)} y={getY(value) - 10} textAnchor="middle" fontSize="9" fill="#374151">
                {value.toFixed(1)}%
              </text>
            </g>
          )
        })}
        
        {/* X軸ラベル */}
        {data.map((d, i) => (
          <text key={i} x={getX(i)} y={height - 5} textAnchor="middle" fontSize="9" fill="#6b7280">
            {d.label}
          </text>
        ))}
      </svg>
    )
  }

  return (
    <div className="space-y-4">
      {/* グラフ */}
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📊 推移グラフ</h3>
        
        {/* 切り替えボタン */}
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setChartType('material')} 
            className={`btn flex-1 ${chartType === 'material' ? 'btn-blue' : 'btn-gray'}`}
          >
            材料費率
          </button>
          <button 
            onClick={() => setChartType('retail')} 
            className={`btn flex-1 ${chartType === 'retail' ? 'btn-green' : 'btn-gray'}`}
          >
            店販比率
          </button>
        </div>
        
        {/* グラフ表示 */}
        <div className="flex justify-center">
          {renderChart()}
        </div>
        
        {chartType === 'material' && (
          <div className="text-center text-sm text-gray-500 mt-2">
            <span className="inline-block w-3 h-0.5 bg-red-500 mr-1"></span>
            目標ライン（{BASE_RATE}%）
          </div>
        )}
      </div>

      {/* 月次データ入力（管理者のみ） */}
      {isAdmin && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">✏️ 月次データ入力</h3>
          
          <div className="grid-2 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>年</label>
              <select value={selectedYear} onChange={e => setSelectedYear(parseInt(e.target.value))} className="select">
                {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}年</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>月</label>
              <select value={selectedMonth} onChange={e => setSelectedMonth(parseInt(e.target.value))} className="select">
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(m => <option key={m} value={m}>{m}月</option>)}
              </select>
            </div>
          </div>
          
          {existingReport && (
            <div className="bg-blue-50 p-3 rounded mb-4 text-sm">
              <p className="font-semibold text-blue-700">📝 {selectedYear}年{selectedMonth}月のデータが登録済み</p>
            </div>
          )}
          
          <div className="grid-2 mb-4">
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>値引き後総売上</label>
              <input type="number" value={totalSales} onChange={e => setTotalSales(e.target.value)} placeholder="例: 7500000" className="input" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>店販売上</label>
              <input type="number" value={retailSales} onChange={e => setRetailSales(e.target.value)} placeholder="例: 800000" className="input" />
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
            <p className="font-semibold mb-1">材料費（自動計算）</p>
            <p>入荷: ¥{calcMonthlyStockIn(selectedYear, selectedMonth).toLocaleString()}</p>
            <p>スタッフ購入: -¥{calcMonthlyStaffPurchases(selectedYear, selectedMonth).toLocaleString()}</p>
            <p className="font-bold">= ¥{autoMaterial.toLocaleString()}</p>
          </div>
          
          <div className="mb-4">
            <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>−）プロラボ分</label>
            <input type="number" value={prolaboPurchase} onChange={e => setProlaboPurchase(e.target.value)} placeholder="例: 80000" className="input" />
          </div>
          
          {totalSales && (
            <div className="bg-green-50 p-3 rounded mb-4">
              <div className="grid-2 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">材料費率</div>
                  <div className={`text-2xl font-bold ${((autoMaterial - (parseInt(prolaboPurchase) || 0)) / parseInt(totalSales) * 100) <= BASE_RATE ? 'text-green-600' : 'text-red-600'}`}>
                    {((autoMaterial - (parseInt(prolaboPurchase) || 0)) / parseInt(totalSales) * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">店販比率</div>
                  <div className="text-2xl font-bold text-green-600">
                    {((parseInt(retailSales) || 0) / parseInt(totalSales) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <button onClick={saveReport} className="btn btn-blue w-full">
            {existingReport ? '更新する' : '保存する'}
          </button>
        </div>
      )}

      {/* 月次データ一覧 */}
      <div className="card">
        <h4 className="font-bold mb-4">📋 月次データ一覧</h4>
        {monthlyReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>データがありません</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...monthlyReports].sort((a, b) => b.year - a.year || b.month - a.month).map(report => {
              const materialRate = calcMaterialRate(report)
              const retailRate = calcRetailRate(report)
              const effectiveCost = (report.materialCost || 0) - (report.prolaboPurchase || 0)
              const isGood = materialRate <= BASE_RATE
              
              return (
                <div key={report.id} className="border rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold">{report.year}年{report.month}月</div>
                    {isAdmin && (
                      <button onClick={() => deleteReport(report.id)} className="text-red-500 text-sm">削除</button>
                    )}
                  </div>
                  <div className="grid-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">売上: </span>
                      <span className="font-semibold">¥{report.totalSales?.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">店販: </span>
                      <span className="font-semibold">¥{report.retailSales?.toLocaleString()}</span>
                      <span className="text-green-600 text-xs ml-1">({retailRate.toFixed(1)}%)</span>
                    </div>
                    <div>
                      <span className="text-gray-500">材料費: </span>
                      <span className="font-semibold">¥{effectiveCost.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">材料費率: </span>
                      <span className={`font-bold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
                        {materialRate.toFixed(1)}% {isGood ? '✅' : '⚠️'}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== ボーナス原資管理 ====================
function BonusManagement({ staff, bonusSettings, setBonusSettings, stockIn, products, staffPurchases, isAdmin }) {
  const [periodStart, setPeriodStart] = useState('')
  const [periodEnd, setPeriodEnd] = useState('')
  const [totalSales, setTotalSales] = useState('')
  const [retailSales, setRetailSales] = useState('')
  const [manualMaterialCost, setManualMaterialCost] = useState('')
  const [dealerPurchase, setDealerPurchase] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const BASE_RATE = 20 // 基準材料費率 20%
  const LABOR_RATE = 40 // 人件費率 40%

  // 期間内の入荷金額を計算（全入荷）
  const calcTotalStockIn = (start, end) => {
    return stockIn.filter(s => s.date >= start && s.date <= end).reduce((sum, s) => {
      const product = products.find(p => p.id === s.productId)
      return sum + (product ? s.quantity * product.purchasePrice : 0)
    }, 0)
  }

  // 期間内のスタッフ購入金額を計算
  const calcStaffPurchases = (start, end) => {
    return staffPurchases.filter(p => p.date >= start && p.date <= end).reduce((sum, p) => {
      return sum + (p.purchasePrice * p.quantity)
    }, 0)
  }

  // 材料費 = 全入荷 - スタッフ購入（自動計算）
  const calcMaterialCost = (start, end) => {
    return calcTotalStockIn(start, end) - calcStaffPurchases(start, end)
  }

  // 実際に使用する材料費（手入力優先、プロラボ分を引く）
  const getEffectiveMaterialCost = (setting) => {
    let baseCost = 0
    if (setting.manualMaterialCost !== null && setting.manualMaterialCost !== undefined && setting.manualMaterialCost !== '') {
      baseCost = setting.manualMaterialCost
    } else {
      baseCost = setting.actualPurchase || 0
    }
    // プロラボ分を引く
    const dealerPurch = setting.dealerPurchase || 0
    return baseCost - dealerPurch
  }

  // ボーナス原資の計算
  const calcBonusPool = (sales, materialCost) => {
    if (!sales || sales <= 0) return { rate: 0, diff: 0, pool: 0 }
    const rate = (materialCost / sales) * 100
    const diff = BASE_RATE - rate
    const pool = diff > 0 ? Math.round(sales * (diff / 100) * (LABOR_RATE / 100)) : 0
    return { rate, diff, pool }
  }

  // 配分計算
  const calcDistribution = (pool) => {
    if (pool <= 0) return []
    let totalCoef = 0
    const staffCoefs = staff.map(s => {
      const workCoef = s.workType === 'part' ? (s.partTimeRate / 100) : 1
      const coef = (s.tenureRate / 100) * workCoef * (1 + s.specialRate / 100)
      totalCoef += coef
      return { ...s, coef }
    })
    return staffCoefs.map(s => ({ 
      ...s, 
      share: totalCoef > 0 ? Math.round(pool * s.coef / totalCoef) : 0 
    }))
  }

  const savePeriod = async () => {
    if (!periodStart || !periodEnd || !totalSales) { alert('期間と売上を入力してください'); return }
    const autoMaterialCost = calcMaterialCost(periodStart, periodEnd)
    const manualCost = manualMaterialCost ? parseInt(manualMaterialCost) : null
    const dealerPurch = dealerPurchase ? parseInt(dealerPurchase) : 0
    const { data, error } = await supabase.from('bonus_settings').insert({ 
      period_start: periodStart, 
      period_end: periodEnd, 
      target_sales: parseInt(totalSales) || 0,
      retail_sales: parseInt(retailSales) || 0,
      target_rate: BASE_RATE, 
      actual_purchase: autoMaterialCost,
      manual_material_cost: manualCost,
      dealer_purchase: dealerPurch,
      memo: '' 
    }).select()
    if (!error && data) {
      setBonusSettings([...bonusSettings, { 
        id: data[0].id, 
        periodStart, 
        periodEnd, 
        targetSales: parseInt(totalSales) || 0,
        retailSales: parseInt(retailSales) || 0,
        targetRate: BASE_RATE, 
        actualPurchase: autoMaterialCost,
        manualMaterialCost: manualCost,
        dealerPurchase: dealerPurch,
        memo: '' 
      }])
      alert('保存しました！'); setPeriodStart(''); setPeriodEnd(''); setTotalSales(''); setRetailSales(''); setManualMaterialCost(''); setDealerPurchase('')
    }
  }

  const deletePeriod = async (id) => {
    if (!confirm('この期間を削除しますか？')) return
    const { error } = await supabase.from('bonus_settings').delete().eq('id', id)
    if (!error) setBonusSettings(bonusSettings.filter(b => b.id !== id))
  }

  const startEdit = (setting) => {
    setEditingId(setting.id)
    setEditData({ 
      totalSales: setting.targetSales, 
      retailSales: setting.retailSales || 0,
      manualMaterialCost: setting.manualMaterialCost || '',
      dealerPurchase: setting.dealerPurchase || ''
    })
  }

  const saveEditedPeriod = async (id) => {
    const setting = bonusSettings.find(b => b.id === id)
    const autoMaterialCost = calcMaterialCost(setting.periodStart, setting.periodEnd)
    const manualCost = editData.manualMaterialCost ? parseInt(editData.manualMaterialCost) : null
    const dealerPurch = editData.dealerPurchase ? parseInt(editData.dealerPurchase) : 0
    const { error } = await supabase.from('bonus_settings').update({ 
      target_sales: parseInt(editData.totalSales) || 0,
      retail_sales: parseInt(editData.retailSales) || 0,
      actual_purchase: autoMaterialCost,
      manual_material_cost: manualCost,
      dealer_purchase: dealerPurch
    }).eq('id', id)
    if (!error) {
      setBonusSettings(bonusSettings.map(b => b.id === id ? { 
        ...b, 
        targetSales: parseInt(editData.totalSales) || 0,
        retailSales: parseInt(editData.retailSales) || 0,
        actualPurchase: autoMaterialCost,
        manualMaterialCost: manualCost,
        dealerPurchase: dealerPurch
      } : b))
      setEditingId(null)
    }
  }

  // 最新の期間設定を取得
  const latestSetting = bonusSettings.length > 0 ? bonusSettings[bonusSettings.length - 1] : null
  const latestMaterialCost = latestSetting ? getEffectiveMaterialCost(latestSetting) : 0
  const latestCalc = latestSetting ? calcBonusPool(latestSetting.targetSales, latestMaterialCost) : null

  // スタッフ用のシンプル表示
  if (!isAdmin) {
    return (
      <div className="space-y-4">
        <div className="card">
          <h3 className="text-lg font-bold mb-4">🎯 材料費達成率</h3>
          {!latestSetting ? (
            <div className="text-center py-8 text-gray-500">
              <p>まだ期間が設定されていません</p>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-sm text-gray-500 mb-2">
                {latestSetting.periodStart} 〜 {latestSetting.periodEnd}
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">目標</div>
                <div className="text-2xl font-bold">{BASE_RATE}%以内</div>
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-1">実績</div>
                <div className={`text-4xl font-bold ${latestCalc.rate <= BASE_RATE ? 'text-green-600' : 'text-red-600'}`}>
                  {latestCalc.rate.toFixed(1)}%
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div 
                  className={`h-4 rounded-full ${latestCalc.rate <= BASE_RATE ? 'bg-green-500' : 'bg-red-500'}`}
                  style={{ width: `${Math.min(100, (latestCalc.rate / BASE_RATE) * 100)}%` }}
                ></div>
              </div>
              {latestCalc.diff > 0 ? (
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-green-700 font-bold text-lg">🎉 {latestCalc.diff.toFixed(1)}%の削減達成！</p>
                  <p className="text-green-600 text-sm mt-1">みんなの頑張りがボーナスに反映されます💪</p>
                </div>
              ) : (
                <div className="bg-yellow-50 p-4 rounded">
                  <p className="text-yellow-700 font-bold">もう少しで目標達成！</p>
                  <p className="text-yellow-600 text-sm mt-1">材料を大切に使っていこう✨</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // 管理者用の詳細表示
  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">💎 ボーナス原資管理</h3>
        <div className="bg-blue-50 p-3 rounded mb-4 text-sm">
          <p><strong>計算式：</strong></p>
          <p>原資 = 売上 × (20% − 材料費率) × 40%</p>
        </div>
        <div className="grid-2 mb-4">
          <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>期間開始</label><input type="date" value={periodStart} onChange={e => setPeriodStart(e.target.value)} className="input" /></div>
          <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>期間終了</label><input type="date" value={periodEnd} onChange={e => setPeriodEnd(e.target.value)} className="input" /></div>
        </div>
        <div className="grid-2 mb-4">
          <div>
            <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>値引き後総売上</label>
            <input type="number" value={totalSales} onChange={e => setTotalSales(e.target.value)} placeholder="例: 45000000" className="input" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>店販売上</label>
            <input type="number" value={retailSales} onChange={e => setRetailSales(e.target.value)} placeholder="例: 5000000" className="input" />
          </div>
        </div>
        {totalSales && (
          <div className="bg-gray-50 p-3 rounded mb-4 text-sm">
            <p>施術売上（自動）：¥{((parseInt(totalSales) || 0) - (parseInt(retailSales) || 0)).toLocaleString()}</p>
          </div>
        )}
        
        {periodStart && periodEnd && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <p className="font-semibold mb-2">📊 材料費（自動計算・参考）</p>
            <div className="text-sm text-gray-600 mb-2">
              <p>入荷: ¥{calcTotalStockIn(periodStart, periodEnd).toLocaleString()}</p>
              <p>スタッフ購入: -¥{calcStaffPurchases(periodStart, periodEnd).toLocaleString()}</p>
              <p className="font-bold">= ¥{calcMaterialCost(periodStart, periodEnd).toLocaleString()}</p>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>✏️ 材料費（手入力・試算表の数字）</label>
          <input type="number" value={manualMaterialCost} onChange={e => setManualMaterialCost(e.target.value)} placeholder="空欄なら自動計算を使用" className="input" />
        </div>
        
        <div className="mb-4">
          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>−）プロラボ分（スタッフ購入用）</label>
          <input type="number" value={dealerPurchase} onChange={e => setDealerPurchase(e.target.value)} placeholder="例: 500000" className="input" />
          <p className="text-xs text-gray-500 mt-1">※材料費から引かれます</p>
        </div>
        
        {manualMaterialCost && (
          <div className="bg-green-50 p-3 rounded mb-4 text-sm">
            <p className="font-bold">材料費（実質）：¥{((parseInt(manualMaterialCost) || 0) - (parseInt(dealerPurchase) || 0)).toLocaleString()}</p>
          </div>
        )}
        
        <button onClick={savePeriod} className="btn btn-blue">期間を追加</button>
      </div>

      {bonusSettings.length > 0 && (
        <div className="card">
          <h4 className="font-bold mb-4">登録済み期間</h4>
          <div className="space-y-4">
            {[...bonusSettings].reverse().map(setting => {
              const effectiveMaterialCost = getEffectiveMaterialCost(setting)
              const { rate, diff, pool } = calcBonusPool(setting.targetSales, effectiveMaterialCost)
              const distribution = calcDistribution(pool)
              const staffBonus = distribution.filter(s => !s.isManagement).reduce((sum, s) => sum + s.share, 0)
              const internalReserve = distribution.filter(s => s.isManagement).reduce((sum, s) => sum + s.share, 0)
              const serviceSales = (setting.targetSales || 0) - (setting.retailSales || 0)
              const isManualCost = setting.manualMaterialCost !== null && setting.manualMaterialCost !== undefined
              const baseMaterialCost = isManualCost ? setting.manualMaterialCost : setting.actualPurchase
              
              return (
                <div key={setting.id} className="border rounded p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-bold text-lg">{setting.periodStart} 〜 {setting.periodEnd}</div>
                    </div>
                    <div className="flex gap-2">
                      {editingId !== setting.id && (
                        <>
                          <button onClick={() => startEdit(setting)} className="text-blue-500 text-sm">編集</button>
                          <button onClick={() => deletePeriod(setting.id)} className="text-red-500 text-sm">削除</button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingId === setting.id ? (
                    <div className="bg-yellow-50 p-4 rounded mb-4">
                      <div className="grid-2 mb-4">
                        <div>
                          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>値引き後総売上</label>
                          <input type="number" value={editData.totalSales} onChange={e => setEditData({...editData, totalSales: e.target.value})} className="input" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>店販売上</label>
                          <input type="number" value={editData.retailSales} onChange={e => setEditData({...editData, retailSales: e.target.value})} className="input" />
                        </div>
                      </div>
                      <div className="grid-2 mb-4">
                        <div>
                          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>材料費（試算表）</label>
                          <input type="number" value={editData.manualMaterialCost} onChange={e => setEditData({...editData, manualMaterialCost: e.target.value})} placeholder="空欄なら自動計算" className="input" />
                        </div>
                        <div>
                          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>プロラボ分</label>
                          <input type="number" value={editData.dealerPurchase} onChange={e => setEditData({...editData, dealerPurchase: e.target.value})} placeholder="0" className="input" />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => saveEditedPeriod(setting.id)} className="btn btn-green">保存</button>
                        <button onClick={() => setEditingId(null)} className="btn btn-gray">取消</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-sm text-gray-600">値引き後総売上</div>
                          <div className="text-xl font-bold">¥{setting.targetSales?.toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-sm text-gray-600">店販売上</div>
                          <div className="text-xl font-bold">¥{(setting.retailSales || 0).toLocaleString()}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="text-sm text-gray-600">施術売上</div>
                          <div className="text-xl font-bold">¥{serviceSales.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className={`p-3 rounded mb-4 ${isManualCost ? 'bg-yellow-50 border border-yellow-300' : 'bg-gray-50'}`}>
                        <div className="text-sm text-gray-600 mb-1">
                          材料費 {isManualCost && <span className="text-yellow-600">（試算表）</span>}
                        </div>
                        <div className="text-sm">
                          <span className="text-lg font-bold">¥{baseMaterialCost?.toLocaleString()}</span>
                          {setting.dealerPurchase > 0 && (
                            <>
                              <span className="text-gray-500 mx-2">−</span>
                              <span className="text-red-600">¥{setting.dealerPurchase.toLocaleString()}</span>
                              <span className="text-gray-500 text-xs ml-1">(プロラボ分)</span>
                            </>
                          )}
                        </div>
                        <div className="text-xl font-bold text-blue-600 mt-1">
                          = ¥{effectiveMaterialCost.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="grid-3 gap-4 mb-4">
                        <div className={`p-3 rounded text-center ${rate <= BASE_RATE ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className="text-sm text-gray-600">材料費率</div>
                          <div className={`text-2xl font-bold ${rate <= BASE_RATE ? 'text-green-600' : 'text-red-600'}`}>{rate.toFixed(1)}%</div>
                        </div>
                        <div className={`p-3 rounded text-center ${diff > 0 ? 'bg-green-50' : 'bg-gray-50'}`}>
                          <div className="text-sm text-gray-600">基準との差</div>
                          <div className={`text-2xl font-bold ${diff > 0 ? 'text-green-600' : 'text-gray-400'}`}>{diff > 0 ? `-${diff.toFixed(1)}%` : `+${Math.abs(diff).toFixed(1)}%`}</div>
                        </div>
                        <div className={`p-3 rounded text-center ${pool > 0 ? 'bg-blue-50' : 'bg-gray-50'}`}>
                          <div className="text-sm text-gray-600">ボーナス原資</div>
                          <div className={`text-2xl font-bold ${pool > 0 ? 'text-blue-600' : 'text-gray-400'}`}>¥{pool.toLocaleString()}</div>
                        </div>
                      </div>

                      {pool > 0 && (
                        <>
                          <div className="grid-2 gap-4 mb-4">
                            <div className="bg-green-50 p-3 rounded text-center">
                              <div className="text-sm text-gray-600">スタッフへ</div>
                              <div className="text-xl font-bold text-green-600">¥{staffBonus.toLocaleString()}</div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-center">
                              <div className="text-sm text-gray-600">🏠 お店の成長へ</div>
                              <div className="text-xl font-bold text-blue-600">¥{internalReserve.toLocaleString()}</div>
                            </div>
                          </div>

                          <details>
                            <summary className="cursor-pointer text-blue-500 font-semibold">📊 配分シミュレーション</summary>
                            <div className="mt-4 overflow-x-auto">
                              <table className="text-sm">
                                <thead>
                                  <tr>
                                    <th>スタッフ</th>
                                    <th className="text-center">係数</th>
                                    <th className="text-right">配分</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {distribution.map(s => (
                                    <tr key={s.id} className={s.isManagement ? 'bg-blue-50' : ''}>
                                      <td className="font-semibold">
                                        {s.name}
                                        {s.isManagement && <span className="ml-2 text-blue-600 text-xs">👑</span>}
                                      </td>
                                      <td className="text-center">{(s.coef * 100).toFixed(0)}%</td>
                                      <td className="text-right font-bold">
                                        {s.isManagement ? (
                                          <span className="text-blue-600">→ お店の成長へ</span>
                                        ) : (
                                          <span className="text-green-600">¥{s.share.toLocaleString()}</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </details>
                        </>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== ロス入力（スタッフも使用可） ====================
function LossInput({ lossRecords, setLossRecords, lossPrices, isAdmin }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [lossGrams, setLossGrams] = useState('')
  const [memo, setMemo] = useState('')

  const selectedPrice = lossPrices.find(p => p.categoryName === selectedCategory)
  const pricePerGram = selectedPrice ? selectedPrice.pricePerGram : 0
  const lossAmount = pricePerGram * (parseFloat(lossGrams) || 0)

  const recordLoss = async () => {
    if (!selectedCategory || !lossGrams) { alert('カテゴリとロスg数を入力してください'); return }
    const { data, error } = await supabase.from('loss_records').insert({ record_date: date, category_name: selectedCategory, price_per_gram: pricePerGram, loss_grams: parseFloat(lossGrams), loss_amount: lossAmount, memo }).select()
    if (!error && data) {
      setLossRecords([...lossRecords, { id: data[0].id, date, categoryName: selectedCategory, pricePerGram, lossGrams: parseFloat(lossGrams), lossAmount, memo }])
      alert('ロスを記録しました！'); setLossGrams(''); setMemo('')
    }
  }

  const deleteLoss = async (id) => {
    if (!confirm('このロス記録を削除しますか？')) return
    const { error } = await supabase.from('loss_records').delete().eq('id', id)
    if (!error) setLossRecords(lossRecords.filter(l => l.id !== id))
  }

  const totalLoss = lossRecords.reduce((sum, l) => sum + l.lossAmount, 0)

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📉 ロス入力</h3>
        {lossPrices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">単価設定がありません</p>
            <p className="text-sm">{isAdmin ? '下の「単価設定」でカテゴリを追加してください' : '管理者に単価設定を依頼してください'}</p>
          </div>
        ) : (
          <>
            <div className="grid-2 mb-4">
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>記録日</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div>
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>カテゴリー</label>
                <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="select">
                  <option value="">選択してください</option>
                  {lossPrices.map(p => <option key={p.id} value={p.categoryName}>{p.categoryName}（¥{p.pricePerGram}/g）</option>)}
                </select>
              </div>
            </div>
            {selectedCategory && (
              <>
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <div className="text-sm text-gray-600">単価：<span className="font-bold">¥{pricePerGram}/g</span></div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>ロスg数</label>
                  <input type="number" value={lossGrams} onChange={e => setLossGrams(e.target.value)} placeholder="例: 500" className="input" step="0.1" />
                </div>
                <div className="bg-red-50 p-4 rounded mb-4 text-center">
                  <div className="text-sm text-gray-600">ロス金額（自動計算）</div>
                  <div className="text-2xl font-bold text-red-600">¥{lossAmount.toLocaleString()}</div>
                </div>
                <div className="mb-4"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>メモ（任意）</label><input type="text" value={memo} onChange={e => setMemo(e.target.value)} placeholder="備考" className="input" /></div>
                <button onClick={recordLoss} className="btn btn-red w-full py-3">ロスを記録</button>
              </>
            )}
          </>
        )}
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold">ロス履歴</h4>
          <div className="text-red-600 font-bold">累計: ¥{totalLoss.toLocaleString()}</div>
        </div>
        {lossRecords.length === 0 ? (<p className="text-gray-500 text-center py-4">ロス記録はありません</p>) : (
          <div className="overflow-x-auto">
            <table className="text-sm">
              <thead><tr><th>日付</th><th>カテゴリー</th><th className="text-right">単価/g</th><th className="text-right">ロスg</th><th className="text-right">金額</th><th>メモ</th>{isAdmin && <th className="text-center">操作</th>}</tr></thead>
              <tbody>
                {[...lossRecords].reverse().map(l => (
                  <tr key={l.id}>
                    <td>{l.date}</td><td>{l.categoryName}</td><td className="text-right">¥{l.pricePerGram}</td><td className="text-right">{l.lossGrams}g</td><td className="text-right text-red-600 font-semibold">¥{l.lossAmount.toLocaleString()}</td><td className="text-gray-500">{l.memo || '-'}</td>
                    {isAdmin && <td className="text-center"><button onClick={() => deleteLoss(l.id)} className="text-red-500 text-sm">削除</button></td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== ロス単価設定（管理者のみ） ====================
function LossPriceSettings({ lossPrices, setLossPrices }) {
  const [newCategory, setNewCategory] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const addPrice = async () => {
    if (!newCategory || !newPrice) { alert('カテゴリと単価を入力してください'); return }
    if (lossPrices.find(p => p.categoryName === newCategory)) { alert('このカテゴリは既に登録されています'); return }
    const { data, error } = await supabase.from('loss_price_settings').insert({ category_name: newCategory, price_per_gram: parseFloat(newPrice) }).select()
    if (!error && data) {
      setLossPrices([...lossPrices, { id: data[0].id, categoryName: newCategory, pricePerGram: parseFloat(newPrice) }])
      setNewCategory(''); setNewPrice('')
    }
  }

  const startEdit = (p) => { setEditingId(p.id); setEditPrice(p.pricePerGram.toString()) }
  const saveEdit = async (id) => {
    const { error } = await supabase.from('loss_price_settings').update({ price_per_gram: parseFloat(editPrice) }).eq('id', id)
    if (!error) { setLossPrices(lossPrices.map(p => p.id === id ? { ...p, pricePerGram: parseFloat(editPrice) } : p)); setEditingId(null) }
  }

  const deletePrice = async (id) => {
    if (!confirm('この単価設定を削除しますか？')) return
    const { error } = await supabase.from('loss_price_settings').delete().eq('id', id)
    if (!error) setLossPrices(lossPrices.filter(p => p.id !== id))
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">⚙️ ロス単価設定</h3>
      <div className="grid-2 mb-4">
        <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>カテゴリー名</label><input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="例: カラー材" className="input" /></div>
        <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>1gあたり金額（円）</label><input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} placeholder="例: 10" className="input" step="0.1" /></div>
      </div>
      <button onClick={addPrice} className="btn btn-blue mb-4"><Icons.Plus /> 単価を追加</button>

      {lossPrices.length === 0 ? (<p className="text-gray-500 text-center py-4">単価設定がありません</p>) : (
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>カテゴリー</th><th className="text-right">単価/g</th><th className="text-center">操作</th></tr></thead>
            <tbody>
              {lossPrices.map(p => (
                editingId === p.id ? (
                  <tr key={p.id} style={{ background: '#fef9c3' }}>
                    <td className="font-semibold">{p.categoryName}</td>
                    <td className="text-right"><input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="input" style={{ width: '100px' }} step="0.1" /></td>
                    <td className="text-center"><button onClick={() => saveEdit(p.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                  </tr>
                ) : (
                  <tr key={p.id}>
                    <td className="font-semibold">{p.categoryName}</td>
                    <td className="text-right">¥{p.pricePerGram}</td>
                    <td className="text-center"><button onClick={() => startEdit(p)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deletePrice(p.id)} className="text-red-500 text-sm">削除</button></td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ==================== アプリ設定（管理者のみ） ====================
function AppSettings({ passwords, setPasswords }) {
  const [adminPw, setAdminPw] = useState(passwords.admin)
  const [staffPw, setStaffPw] = useState(passwords.staff)
  const [showAdmin, setShowAdmin] = useState(false)
  const [showStaff, setShowStaff] = useState(false)

  const savePasswords = async () => {
    await supabase.from('app_settings').update({ setting_value: adminPw }).eq('setting_key', 'admin_password')
    await supabase.from('app_settings').update({ setting_value: staffPw }).eq('setting_key', 'staff_password')
    setPasswords({ admin: adminPw, staff: staffPw })
    alert('パスワードを更新しました！')
  }

  return (
    <div className="card">
      <h3 className="text-lg font-bold mb-4">⚙️ アプリ設定</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>管理者パスワード</label>
          <div className="flex gap-2">
            <input type={showAdmin ? 'text' : 'password'} value={adminPw} onChange={e => setAdminPw(e.target.value)} className="input" />
            <button onClick={() => setShowAdmin(!showAdmin)} className="btn btn-gray">{showAdmin ? <Icons.EyeOff /> : <Icons.Eye />}</button>
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>スタッフパスワード</label>
          <div className="flex gap-2">
            <input type={showStaff ? 'text' : 'password'} value={staffPw} onChange={e => setStaffPw(e.target.value)} className="input" />
            <button onClick={() => setShowStaff(!showStaff)} className="btn btn-gray">{showStaff ? <Icons.EyeOff /> : <Icons.Eye />}</button>
          </div>
        </div>
        <button onClick={savePasswords} className="btn btn-green"><Icons.Save /> パスワードを保存</button>
      </div>
    </div>
  )
}
