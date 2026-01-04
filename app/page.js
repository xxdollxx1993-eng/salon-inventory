'use client'

import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

// ==================== アイコン ====================
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
  // v4で追加したアイコン
  Home: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Users: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  Palette: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>,
  Book: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Menu: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevronRight: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>,
  HelpCircle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
}

// ==================== ユーティリティ関数 ====================
const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const getWeekStart = (date) => {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  return formatDate(monday)
}

const isHoliday = (date) => {
  const d = new Date(date)
  const dayOfWeek = d.getDay()
  if (dayOfWeek === 1 || dayOfWeek === 2) return true
  // 第三日曜日
  if (dayOfWeek === 0) {
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1)
    let sundayCount = 0
    for (let i = 1; i <= d.getDate(); i++) {
      if (new Date(d.getFullYear(), d.getMonth(), i).getDay() === 0) sundayCount++
    }
    if (sundayCount === 3) return true
  }
  return false
}

// スタッフごとの色
const staffColors = [
  { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' },
  { bg: '#fce7f3', text: '#9d174d', border: '#ec4899' },
  { bg: '#e0e7ff', text: '#3730a3', border: '#6366f1' },
  { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
  { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' },
  { bg: '#e0f2fe', text: '#075985', border: '#0ea5e9' },
  { bg: '#f3e8ff', text: '#6b21a8', border: '#a855f7' },
  { bg: '#fef9c3', text: '#854d0e', border: '#eab308' },
]

// ==================== メインエクスポート ====================
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
          <h1 className="text-2xl font-bold mt-2">DOLL 在庫管理</h1>
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
  const [tab, setTab] = useState('home')
  const [showHelp, setShowHelp] = useState(false)
  const [showOtherMenu, setShowOtherMenu] = useState(false)
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
  const [practiceReservations, setPracticeReservations] = useState([])
  const [modelRules, setModelRules] = useState('')
  const [contactGoals, setContactGoals] = useState([])
  const [contactWeekly, setContactWeekly] = useState([])
  const [contactReplies, setContactReplies] = useState([])
  const [contactMonthly, setContactMonthly] = useState([])
  const [lossRecords, setLossRecords] = useState([])
  const [lossPrices, setLossPrices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAllData() }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [staffRes, productsRes, categoriesRes, usageRes, stockInRes, inventoryRes, favoritesRes, purchasesRes, budgetsRes, allocationsRes, bonusRes, lossRes, lossPricesRes, monthlyRes, timeRes, leaveGrantsRes, leaveRequestsRes, notificationsRes, practiceRes, modelRulesRes, contactGoalsRes, contactWeeklyRes, contactRepliesRes, contactMonthlyRes] = await Promise.all([
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
        supabase.from('practice_reservations').select('*').order('practice_date', { ascending: true }),
        supabase.from('app_settings').select('*').eq('key', 'model_rules').single(),
        supabase.from('contact_goals').select('*').order('id'),
        supabase.from('contact_weekly').select('*').order('week_start', { ascending: false }),
        supabase.from('contact_replies').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_monthly').select('*').order('year_month', { ascending: false }),
      ])
      if (staffRes.data) setStaff(staffRes.data.map(s => ({
        id: s.id, name: s.name, dealer: s.dealer || '',
        joinDate: s.join_date, tenureRate: s.tenure_rate || 100,
        workType: s.work_type || 'full', partTimeRate: s.part_time_rate || 100,
        isOpeningStaff: s.is_opening_staff || false, specialRate: s.special_rate || 0,
        isManagement: s.is_management || false, workDaysPerWeek: s.work_days_per_week || 5,
        contactEnabled: s.contact_enabled || false
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
      if (practiceRes.data) setPracticeReservations(practiceRes.data.map(p => ({ id: p.id, staffId: p.staff_id, staffName: p.staff_name, date: p.practice_date, time: p.practice_time, menu: p.menu, memo: p.memo })))
      if (modelRulesRes?.data?.value) setModelRules(modelRulesRes.data.value)
      if (contactGoalsRes.data) setContactGoals(contactGoalsRes.data.map(g => ({ id: g.id, staffId: g.staff_id, staffName: g.staff_name, yearMonth: g.year_month, monthlyGoal: g.monthly_goal, weeklyTask: g.weekly_task })))
      if (contactWeeklyRes.data) setContactWeekly(contactWeeklyRes.data.map(w => ({ id: w.id, staffId: w.staff_id, staffName: w.staff_name, weekStart: w.week_start, checks: [w.check_mon, w.check_tue, w.check_wed, w.check_thu, w.check_fri, w.check_sat, w.check_sun], zeroReason: w.zero_reason, nextAction: w.next_action, nextActionDetail: w.next_action_detail, submittedAt: w.submitted_at })))
      if (contactRepliesRes.data) setContactReplies(contactRepliesRes.data.map(r => ({ id: r.id, weeklyId: r.weekly_id, replyText: r.reply_text, repliedBy: r.replied_by, createdAt: r.created_at })))
      if (contactMonthlyRes.data) setContactMonthly(contactMonthlyRes.data.map(m => ({ id: m.id, staffId: m.staff_id, staffName: m.staff_name, yearMonth: m.year_month, q1: m.q1_answer, q2: m.q2_answer, q3: m.q3_answer, submittedAt: m.submitted_at })))
    } catch (e) { console.error('データ読み込みエラー:', e) }
    setLoading(false)
  }

  const isAdmin = userRole === 'admin'

  // ヘルプコンテンツ
  const helpContents = {
    home: {
      title: '🏠 ホーム',
      staff: `🎯 ホーム画面
今日の予定や休みの情報をまとめて確認できます。

✅ 表示内容
・今日のお休み（承認済みの有給・夏休み）
・今日の練習予約
・今週の予定カレンダー

💡 ポイント
・画面下のナビから各機能に移動できます
・「その他」から詳細な機能にアクセス`,
      admin: `🎯 ホーム画面
今日の予定や休みの情報をまとめて確認できます。

✅ 管理者向け
・スタッフの休み状況を一目で確認
・練習予約の把握
・業務の流れを把握`
    },
    usage: {
      title: '📦 使用入力',
      staff: `🎯 目的
施術で使った商品の数を記録して、在庫を正確に管理します。

✅ 使い方
1. 日付を選択（今日が初期値）
2. ⭐お気に入り or 🔍検索で商品を探す
3. 数量を入力して「記録」

💡 ポイント
・お気に入り登録すると次から楽！
・履歴から過去の記録も確認・修正できます`,
      admin: `🎯 目的
施術で使った商品の数を記録して、在庫を正確に管理します。

✅ 使い方
1. 日付を選択（今日が初期値）
2. ⭐お気に入り or 🔍検索で商品を探す
3. 数量を入力して「記録」

💡 管理者メモ
・使用データは月次レポートに反映
・棚卸時の理論在庫計算に使用`
    },
    stockin: {
      title: '📥 入荷',
      staff: `🎯 目的
届いた商品を登録して、在庫数を更新します。

✅ 使い方
1. 日付を選択
2. ディーラー → 種類 → 商品を選択
3. 数量を入力して「入荷登録」

💡 ポイント
・伝票を見ながら正確に入力
・間違えたら履歴から修正できます`,
      admin: `🎯 目的
届いた商品を登録して、在庫数を更新します。

✅ 使い方
1. 日付を選択
2. ディーラー → 種類 → 商品を選択
3. 数量を入力して「入荷登録」

💡 管理者メモ
・入荷データは仕入れ額の計算に使用
・月次レポートに自動反映`
    },
    timecard: {
      title: '🕐 打刻',
      staff: `🎯 目的
出勤・退勤時間を記録します。

✅ 使い方
【打刻モード】
・出勤時 → 「出勤」ボタン
・退勤時 → 「退勤」ボタン

【手動入力】
・過去の記録を修正したい場合に使用

💡 ポイント
・打刻忘れは早めに手動入力で修正
・月次サマリーで勤務時間を確認できます`,
      admin: `🎯 目的
出勤・退勤時間を記録します。

✅ 管理機能
・全スタッフの打刻履歴を確認
・月次サマリーで勤務時間を集計
・データは給与計算の参考に`
    },
    practice: {
      title: '🎨 練習予約',
      staff: `🎯 目的
モデル練習の日時を予約して共有します。

✅ 使い方
1. スタッフを選択
2. 日付・時間を選択
3. メニューを選ぶ or 自由入力
4. 「予約登録」

💡 ポイント
・カレンダーで他の人の予約も確認
・定休日（月火・第三日曜）は予約不可
・モデルルールも確認してね`,
      admin: `🎯 目的
モデル練習の日時を予約して共有します。

✅ 管理機能
・モデルルールの編集が可能
・全スタッフの予約状況を一覧で確認`
    },
    contact: {
      title: '📓 連絡帳',
      staff: `📒✨ 連絡帳とは？

🎯 目的
・これは「管理」じゃなくて、あなたのための連絡帳だよ☺️
・毎日の積み重ねを見える化して、自分のペースを知るためのツール
・怒られるためのものじゃないから、安心して使ってね🌱

✅ 使い方
・週1回、できた日に✔をつけて提出するだけ
・0日の週だけ、理由を選択式で選ぼう（考え込まなくてOK）
・月末は3つの質問に答えて、今月を振り返ろう✍️

💭 心構え
・完璧じゃなくて大丈夫
・できた日を大切にしよう◎`,
      admin: `🗂️👀 連絡帳（管理者）

🎯 目的
・スタッフの「調子」と「ペース」を静かに見守るためのツール
・できている／できていないを判断するものではないよ🌿

✅ 各タブの使い方
・📊管理：今週の提出状況を一覧で確認
・🎯目標：面談内容をもとに目標と毎日やることを設定
・👥対象者：連絡帳を使うスタッフを選択
・👤詳細：個人の週次・月次の流れを確認

💡 関わり方のポイント
・返信は0日の人だけ、事実確認＋質問1つまで
・アドバイスはしない、深追いしない◎`
    },
    order: {
      title: '🔗 発注リンク',
      staff: `🎯 目的
各ディーラーの発注サイトにすぐアクセスできます。

✅ 使い方
・リンクをタップするだけ！
・新しいタブで発注サイトが開きます`,
      admin: `🎯 目的
各ディーラーの発注サイトにすぐアクセスできます。

✅ 管理機能
・発注リンクの追加・編集・削除が可能
・ディーラーごとに管理`
    },
    inventory: {
      title: '📋 棚卸',
      staff: `🎯 目的
月末に実際の在庫を数えて記録します。

✅ 使い方
1. 担当者を選択
2. 商品ごとに実在庫を入力
3. 「棚卸保存」で確定

💡 ポイント
・理論在庫との差が自動計算される
・差が大きい場合は原因を確認`,
      admin: `🎯 目的
月末に実際の在庫を数えて記録します。

💡 管理者メモ
・棚卸データは月次レポートに反映
・ロス計算の基準になります`
    },
    purchase: {
      title: '🛒 スタッフ購入',
      staff: `🎯 目的
スタッフが商品を購入した記録をつけます。

✅ 使い方
1. スタッフと日付を選択
2. 商品を選ぶ（ディーラーで絞り込み可）
3. 🛒カートに追加 or ⚡直接登録
4. カートの場合は「まとめて登録」

💡 ポイント
・金額は自動で仕入れ値が入る
・セール品は金額変更＆タグ付け可能`,
      admin: `🎯 目的
スタッフが商品を購入した記録をつけます。

💡 管理者メモ
・購入データは材料費計算から除外
・PDF出力で一覧確認可能`
    },
    dealer: {
      title: '💰 予算管理',
      staff: `🎯 目的
ディーラーごとの仕入れ予算と実績を確認できます。`,
      admin: `🎯 目的
ディーラーごとの仕入れ予算を設定・管理します。

✅ 使い方
1. 年月を選択
2. 各ディーラーの予算を入力
3. 実績は自動集計

💡 ポイント
・前月データのコピーも可能
・達成率で仕入れ状況を把握`
    },
    loss: {
      title: '📉 ロス入力',
      staff: `🎯 目的
破損・期限切れなどのロスを記録します。

✅ 使い方
1. ロス区分を選択
2. 数量を入力
3. 「記録」

💡 ポイント
・正直に記録することが大切
・ロス削減はお店の利益につながる`,
      admin: `🎯 目的
破損・期限切れなどのロスを記録・管理します。

💡 管理者メモ
・ロス単価は別途設定可能
・ロス削減達成でボーナス加算の仕組みあり`
    },
    monthly: {
      title: '📊 月次レポート',
      staff: `🎯 目的
月ごとの仕入れ・使用・売上データを確認できます。`,
      admin: `🎯 目的
月ごとの経営データをまとめて確認・管理します。

✅ 機能
・仕入れ額・使用額の自動集計
・売上・材料比率の入力
・グラフで推移を可視化
・PDF出力で帳簿作成`
    },
    bonus: {
      title: '🎁 材料費達成率',
      staff: `🎯 目的
材料費の目標達成率を確認できます。`,
      admin: `🎯 目的
材料費目標の達成状況を管理します。

✅ 機能
・基準額の設定
・達成率の自動計算
・賞与計算との連動`
    },
    leave: {
      title: '🏖️ 有給管理',
      staff: `🌴📅 有給管理

✅ 使い方
・カレンダーでお店とみんなの休みをチェック👀
・休みたい日を選んで、有給・夏休み・半休を申請しよう
・申請すると管理者に通知が届くよ📩

🔍 確認できること
・自分の残り有給日数
・誰がいつ休みか、全体の流れ

⚠️ 注意点
・月火・第三日曜は定休日でグレー表示だよ
・シフト調整のため、できるだけ早めの申請が助かる🙏`,
      admin: `🛠️📘 有給管理（管理者）

🎯 目的
・休みの偏りを防ぎながら、安心して有給を使える環境をつくるため
・法定ルールを守りつつ、現場が回る状態を保つ👥

✅ 各タブの使い方
・📅カレンダー：全員の休みを一目で確認
・📝申請一覧：承認待ち・承認済みを管理
・⚙️設定：スタッフごとの付与日数を調整

💡 運用のコツ
・申請は早めに確認してシフト調整
・同日休みが重なる時は無理のない相談を◎`
    },
    products: {
      title: '📦 商品管理',
      staff: `🎯 目的
登録されている商品を確認できます。`,
      admin: `🎯 目的
商品の追加・編集・削除を行います。

✅ 使い方
1. ディーラー → カテゴリ → 商品名を入力
2. 仕入れ値・売値を設定
3. 「追加」で登録

💡 ポイント
・並び替えで表示順を変更可能
・業務用/店販の区分あり`
    },
    staff: {
      title: '👥 スタッフ',
      staff: `🎯 目的
登録されているスタッフを確認できます。`,
      admin: `🎯 目的
スタッフの追加・編集・設定を行います。

✅ 設定項目
・名前・入社日
・勤務形態（正社員/パート）
・在籍率・特別手当
・連絡帳の対象設定`
    },
    export: {
      title: '📤 出力',
      staff: `🎯 目的
データをCSVファイルで出力します。`,
      admin: `🎯 目的
各種データをCSVファイルで出力します。

✅ 出力可能なデータ
・使用履歴
・入荷履歴
・棚卸履歴
・商品マスタ
・スタッフマスタ`
    },
    lossprice: {
      title: '⚙️ ロス単価設定',
      staff: ``,
      admin: `🎯 目的
ロス区分ごとの単価を設定します。

✅ 使い方
1. ロス区分（カラー剤残、期限切れ等）を選択
2. 単価を入力
3. 保存

💡 ポイント
・ロス金額の計算に使用
・ロス削減ボーナスに影響`
    },
    settings: {
      title: '⚙️ 設定',
      staff: ``,
      admin: `🎯 目的
アプリ全体の設定を管理します。

✅ 設定項目
・スタッフ用パスワード
・管理者用パスワード

⚠️ 注意
パスワードは忘れないように！`
    }
  }

  // スタッフ用メニュー
  const staffOtherMenuItems = [
    { key: 'order', icon: '🔗', label: '発注リンク' },
    { key: 'inventory', icon: '📋', label: '棚卸' },
    { key: 'purchase', icon: '🛒', label: 'スタッフ購入' },
    { key: 'loss', icon: '📉', label: 'ロス入力' },
    { key: 'leave', icon: '🏖️', label: '有給管理' },
    { key: 'contact', icon: '📓', label: '連絡帳' },
    { key: 'practice', icon: '🎨', label: '練習予約' },
    { key: 'monthly', icon: '📊', label: '月次レポート' },
    { key: 'bonus', icon: '🎁', label: '材料費達成率' },
    { key: 'dealer', icon: '💰', label: '予算管理' },
    { key: 'products', icon: '📦', label: '商品管理' },
    { key: 'staff', icon: '👥', label: 'スタッフ' },
    { key: 'export', icon: '📤', label: '出力' },
  ]

  // 管理者用メニュー（スタッフ用 + 管理者専用）
  const adminOtherMenuItems = [
    ...staffOtherMenuItems,
    { key: 'lossprice', icon: '⚙️', label: 'ロス単価設定' },
    { key: 'settings', icon: '🔧', label: 'アプリ設定' },
  ]

  const otherMenuItems = isAdmin ? adminOtherMenuItems : staffOtherMenuItems

  // タブ名からラベルを取得
  const getTabLabel = (key) => {
    const labels = {
      home: 'ホーム',
      usage: '使用入力',
      stockin: '入荷',
      timecard: '打刻',
      practice: '練習予約',
      contact: '連絡帳',
      order: '発注リンク',
      inventory: '棚卸',
      dealer: '予算管理',
      purchase: 'スタッフ購入',
      loss: 'ロス入力',
      monthly: '月次レポート',
      bonus: '材料費達成率',
      leave: '有給管理',
      products: '商品管理',
      staff: 'スタッフ',
      export: '出力',
      lossprice: 'ロス単価設定',
      settings: '設定',
    }
    return labels[key] || key
  }

  if (loading) return <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}><p>読み込み中...</p></div>

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* ヘッダー */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">DOLL</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowHelp(true)} className="btn btn-gray" style={{ padding: '0.25rem 0.5rem', fontSize: '14px' }}>
              <Icons.HelpCircle />
            </button>
            <span className={`badge ${isAdmin ? 'badge-red' : 'badge-blue'}`}>{isAdmin ? '管理者' : 'スタッフ'}</span>
            <button onClick={onLogout} className="btn btn-gray" style={{ padding: '0.25rem 0.5rem' }}><Icons.Logout /></button>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      {tab === 'home' && <HomeScreen leaveRequests={leaveRequests} practiceReservations={practiceReservations} staff={staff} setTab={setTab} isAdmin={isAdmin} />}
      {tab === 'usage' && (
        <>
          <MiniLeaveCalendar leaveRequests={leaveRequests} practiceReservations={practiceReservations} staff={staff} />
          <UsageInput products={products} usage={usage} setUsage={setUsage} favorites={favorites} setFavorites={setFavorites} />
        </>
      )}
      {tab === 'stockin' && <StockInInput products={products} stockIn={stockIn} setStockIn={setStockIn} categories={categories} />}
      {tab === 'timecard' && <TimeCard staff={staff} timeRecords={timeRecords} setTimeRecords={setTimeRecords} isAdmin={isAdmin} />}
      {tab === 'practice' && <PracticeReservation staff={staff} practiceReservations={practiceReservations} setPracticeReservations={setPracticeReservations} modelRules={modelRules} setModelRules={setModelRules} isAdmin={isAdmin} />}
      {tab === 'contact' && <ContactBook staff={staff} setStaff={setStaff} contactGoals={contactGoals} setContactGoals={setContactGoals} contactWeekly={contactWeekly} setContactWeekly={setContactWeekly} contactReplies={contactReplies} setContactReplies={setContactReplies} contactMonthly={contactMonthly} setContactMonthly={setContactMonthly} notifications={notifications} setNotifications={setNotifications} isAdmin={isAdmin} />}
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

      {/* 下部固定ナビゲーション */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '8px 0',
        zIndex: 100,
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setTab('home')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'none',
            border: 'none',
            color: tab === 'home' ? '#3b82f6' : '#6b7280',
            cursor: 'pointer'
          }}
        >
          <Icons.Home />
          <span style={{ fontSize: '10px', marginTop: '2px' }}>ホーム</span>
        </button>
        <button
          onClick={() => setTab('usage')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'none',
            border: 'none',
            color: tab === 'usage' ? '#3b82f6' : '#6b7280',
            cursor: 'pointer'
          }}
        >
          <Icons.Package />
          <span style={{ fontSize: '10px', marginTop: '2px' }}>使用</span>
        </button>
        <button
          onClick={() => setTab('stockin')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'none',
            border: 'none',
            color: tab === 'stockin' ? '#3b82f6' : '#6b7280',
            cursor: 'pointer'
          }}
        >
          <Icons.TrendingUp />
          <span style={{ fontSize: '10px', marginTop: '2px' }}>入荷</span>
        </button>
        <button
          onClick={() => setTab('timecard')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'none',
            border: 'none',
            color: tab === 'timecard' ? '#3b82f6' : '#6b7280',
            cursor: 'pointer'
          }}
        >
          <Icons.Clock />
          <span style={{ fontSize: '10px', marginTop: '2px' }}>打刻</span>
        </button>
        <button
          onClick={() => setShowOtherMenu(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 12px',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer'
          }}
        >
          <Icons.Menu />
          <span style={{ fontSize: '10px', marginTop: '2px' }}>その他</span>
        </button>
      </div>

      {/* その他メニュー（モーダル） */}
      {showOtherMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'flex-end'
        }} onClick={() => setShowOtherMenu(false)}>
          <div style={{
            backgroundColor: 'white',
            width: '100%',
            maxHeight: '70vh',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            overflow: 'hidden'
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: '16px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>その他のメニュー</h3>
              <button onClick={() => setShowOtherMenu(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <Icons.X />
              </button>
            </div>
            <div style={{ padding: '8px', maxHeight: '60vh', overflowY: 'auto' }}>
              {otherMenuItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => { setTab(item.key); setShowOtherMenu(false) }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '14px 16px',
                    background: tab === item.key ? '#eff6ff' : 'none',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    marginBottom: '4px'
                  }}
                >
                  <span style={{ fontSize: '20px', marginRight: '12px' }}>{item.icon}</span>
                  <span style={{ flex: 1, fontWeight: tab === item.key ? 'bold' : 'normal', color: tab === item.key ? '#3b82f6' : '#374151' }}>{item.label}</span>
                  <Icons.ChevronRight />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ヘルプモーダル */}
      {showHelp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', maxWidth: '500px', width: '100%', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>{helpContents[tab]?.title || '📖 ヘルプ'}</h2>
              <button onClick={() => setShowHelp(false)} style={{ fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>×</button>
            </div>
            <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '14px' }}>
                {helpContents[tab] ? (isAdmin ? helpContents[tab].admin : helpContents[tab].staff) : 'このタブのヘルプはまだ準備中です。'}
              </div>
              
              {/* 全ヘルプ一覧へのリンク */}
              <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '0.5rem' }}>📖 他の機能のヘルプ</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {Object.entries(helpContents).filter(([key, val]) => {
                    const content = isAdmin ? val.admin : val.staff
                    return content && content.length > 0 && key !== tab
                  }).map(([key, val]) => (
                    <button key={key} onClick={() => setTab(key)} style={{ 
                      fontSize: '11px', padding: '4px 8px', backgroundColor: '#f3f4f6', 
                      border: 'none', borderRadius: '4px', cursor: 'pointer' 
                    }}>
                      {val.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
              <button onClick={() => setShowHelp(false)} className="btn btn-blue w-full">閉じる</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== ホーム画面 ====================
function HomeScreen({ leaveRequests, practiceReservations, staff, setTab, isAdmin }) {
  const today = new Date()
  const todayStr = formatDate(today)
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  
  // 今日の休み
  const todayLeaves = leaveRequests.filter(r => r.leaveDate === todayStr && r.status === 'approved')
  
  // 今日の練習
  const todayPractice = practiceReservations.filter(p => p.date === todayStr)
  
  // 今週の日付を取得
  const getWeekDates = () => {
    const dates = []
    const weekStart = new Date(today)
    const day = weekStart.getDay()
    weekStart.setDate(weekStart.getDate() - day) // 日曜始まり
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart)
      d.setDate(weekStart.getDate() + i)
      dates.push(d)
    }
    return dates
  }
  
  const weekDates = getWeekDates()
  
  // スタッフの色を取得
  const getStaffColor = (staffId) => {
    const index = staff.findIndex(s => s.id === staffId)
    return staffColors[index % staffColors.length]
  }

  return (
    <div className="space-y-4">
      {/* 今日の日付 */}
      <div className="card">
        <div className="text-center">
          <p className="text-gray-500 text-sm">{today.getFullYear()}年{today.getMonth() + 1}月</p>
          <p className="text-4xl font-bold">{today.getDate()}</p>
          <p className="text-lg">{dayNames[today.getDay()]}曜日</p>
        </div>
      </div>
      
      {/* 今日のお知らせ */}
      <div className="card">
        <h3 className="font-bold mb-3">📢 今日のお知らせ</h3>
        
        {/* 今日の休み */}
        {todayLeaves.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">🏖️</span>
              <span className="font-semibold">お休み</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {todayLeaves.map(leave => (
                <span key={leave.id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {leave.staffName} ({leave.leaveType === 'paid' ? '有給' : '夏休み'}{leave.dayType !== 'full' ? ` ${leave.dayType === 'am' ? '午前' : '午後'}` : ''})
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 今日の練習 */}
        {todayPractice.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-orange-600">🎨</span>
              <span className="font-semibold">練習予約</span>
            </div>
            <div className="space-y-2">
              {todayPractice.map(p => {
                const color = getStaffColor(p.staffId)
                return (
                  <div key={p.id} className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: color.bg }}>
                    <span className="font-semibold" style={{ color: color.text }}>{p.time}</span>
                    <span style={{ color: color.text }}>{p.staffName}</span>
                    <span className="text-gray-600">- {p.menu}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        
        {todayLeaves.length === 0 && todayPractice.length === 0 && (
          <p className="text-gray-500 text-center py-2">今日の予定はありません</p>
        )}
      </div>
      
      {/* 今週のカレンダー */}
      <div className="card">
        <h3 className="font-bold mb-3">📅 今週の予定</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
          {weekDates.map((date, i) => {
            const dateStr = formatDate(date)
            const isToday = dateStr === todayStr
            const holiday = isHoliday(date)
            const dayLeaves = leaveRequests.filter(r => r.leaveDate === dateStr && r.status === 'approved')
            const dayPractice = practiceReservations.filter(p => p.date === dateStr)
            
            return (
              <div key={i} style={{
                padding: '8px 4px',
                borderRadius: '8px',
                backgroundColor: isToday ? '#eff6ff' : holiday ? '#f3f4f6' : 'white',
                border: isToday ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '10px', 
                  color: i === 0 ? '#ef4444' : i === 6 ? '#3b82f6' : holiday ? '#9ca3af' : '#6b7280'
                }}>
                  {dayNames[i]}
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: isToday ? 'bold' : 'normal',
                  color: holiday ? '#9ca3af' : '#374151'
                }}>
                  {date.getDate()}
                </div>
                {!holiday && (
                  <div style={{ marginTop: '4px', fontSize: '10px' }}>
                    {dayLeaves.length > 0 && (
                      <div style={{ backgroundColor: '#dbeafe', color: '#1d4ed8', borderRadius: '4px', padding: '1px', marginBottom: '2px' }}>
                        休{dayLeaves.length}
                      </div>
                    )}
                    {dayPractice.length > 0 && (
                      <div style={{ backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '4px', padding: '1px' }}>
                        練{dayPractice.length}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* クイックアクセス */}
      <div className="card">
        <h3 className="font-bold mb-3">⚡ クイックアクセス</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <button onClick={() => setTab('usage')} className="btn btn-gray py-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>📦</span> 使用入力
          </button>
          <button onClick={() => setTab('stockin')} className="btn btn-gray py-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>📥</span> 入荷
          </button>
          <button onClick={() => setTab('leave')} className="btn btn-gray py-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🏖️</span> 有給管理
          </button>
          <button onClick={() => setTab('practice')} className="btn btn-gray py-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>🎨</span> 練習予約
          </button>
        </div>
      </div>
    </div>
  )
}

// ==================== ミニ有給カレンダー ====================
function MiniLeaveCalendar({ leaveRequests, practiceReservations, staff }) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()
  const todayStr = formatDate(today)
  
  // 第三日曜日を計算
  let sundayCount = 0
  let thirdSunday = null
  const lastDate = new Date(year, month + 1, 0).getDate()
  for (let d = 1; d <= lastDate; d++) {
    if (new Date(year, month, d).getDay() === 0) {
      sundayCount++
      if (sundayCount === 3) { thirdSunday = d; break }
    }
  }
  
  const getStaffColor = (staffId) => {
    const index = staff.findIndex(s => s.id === staffId)
    return staffColors[index % staffColors.length]
  }
  
  // 今月の承認済み休み
  const monthRequests = leaveRequests.filter(r => {
    if (r.status !== 'approved') return false
    const d = new Date(r.leaveDate)
    return d.getFullYear() === year && d.getMonth() === month
  })
  
  // 今月の練習予約
  const monthPractice = practiceReservations.filter(p => {
    const d = new Date(p.date)
    return d.getFullYear() === year && d.getMonth() === month
  })
  
  // 今日の休み
  const todayRequests = monthRequests.filter(r => r.leaveDate === todayStr)
  // 今日の練習
  const todayPractice = monthPractice.filter(p => p.date === todayStr)
  
  const firstDay = new Date(year, month, 1).getDay()
  const dayNames = ['日', '月', '火', '水', '木', '金', '土']
  
  return (
    <div className="card mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold">📅 {month + 1}月</h3>
        <div className="flex gap-2 text-xs">
          {todayRequests.length > 0 && (
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
              休: {todayRequests.map(r => r.staffName.slice(0,2)).join(', ')}
            </span>
          )}
          {todayPractice.length > 0 && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
              練習: {todayPractice.length}件
            </span>
          )}
        </div>
      </div>
      
      {/* ミニカレンダー */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', fontSize: '11px' }}>
        {/* 曜日ヘッダー */}
        {dayNames.map((d, i) => (
          <div key={d} style={{ 
            textAlign: 'center', 
            padding: '3px 0', 
            fontWeight: 'bold',
            backgroundColor: i === 1 || i === 2 ? '#e5e7eb' : '#f9fafb',
            color: i === 0 ? '#ef4444' : i === 6 ? '#3b82f6' : i === 1 || i === 2 ? '#9ca3af' : '#374151'
          }}>{d}</div>
        ))}
        
        {/* 空白セル */}
        {[...Array(firstDay)].map((_, i) => (
          <div key={`empty-${i}`} style={{ height: '38px', backgroundColor: '#f9fafb' }}></div>
        ))}
        
        {/* 日付セル */}
        {[...Array(lastDate)].map((_, i) => {
          const date = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`
          const dayOfWeek = new Date(year, month, date).getDay()
          const isHolidayDay = dayOfWeek === 1 || dayOfWeek === 2 || date === thirdSunday
          const isToday = dateStr === todayStr
          const dayRequests = monthRequests.filter(r => r.leaveDate === dateStr)
          const dayPractice = monthPractice.filter(p => p.date === dateStr)
          
          let bgColor = '#ffffff'
          if (isHolidayDay) bgColor = '#d1d5db'
          else if (dayOfWeek === 0) bgColor = '#fef2f2'
          else if (dayOfWeek === 6) bgColor = '#eff6ff'
          
          return (
            <div key={date} style={{ 
              height: '38px', 
              backgroundColor: bgColor,
              border: isToday ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              padding: '1px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                fontWeight: isToday ? 'bold' : 'normal',
                fontSize: '10px',
                color: isHolidayDay ? '#9ca3af' : dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : '#374151'
              }}>{date}</div>
              {!isHolidayDay && (
                <div style={{ fontSize: '8px', lineHeight: '1.2' }}>
                  {dayRequests.length > 0 && (
                    <div style={{ 
                      backgroundColor: dayRequests[0].leaveType === 'paid' ? '#dbeafe' : '#dcfce7',
                      color: dayRequests[0].leaveType === 'paid' ? '#1d4ed8' : '#166534',
                      borderRadius: '2px',
                      padding: '0 2px',
                      marginBottom: '1px'
                    }}>
                      休{dayRequests.length > 1 ? dayRequests.length : ''}
                    </div>
                  )}
                  {dayPractice.slice(0, 1).map(p => {
                    const color = getStaffColor(p.staffId)
                    return (
                      <div key={p.id} style={{ 
                        backgroundColor: color.bg,
                        color: color.text,
                        borderRadius: '2px',
                        padding: '0 2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {p.staffName?.slice(0,2)}
                      </div>
                    )
                  })}
                  {dayPractice.length > 1 && (
                    <div style={{ color: '#6b7280' }}>+{dayPractice.length - 1}</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      {/* 凡例 */}
      <div className="flex gap-3 mt-2 text-xs text-gray-500 justify-center flex-wrap">
        <span><span className="inline-block w-2 h-2 bg-gray-300 rounded mr-1"></span>定休</span>
        <span><span className="inline-block w-2 h-2 bg-blue-200 rounded mr-1"></span>有給</span>
        <span><span className="inline-block w-2 h-2 bg-green-200 rounded mr-1"></span>夏休</span>
        <span><span className="inline-block w-2 h-2 bg-amber-200 rounded mr-1"></span>練習</span>
      </div>
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
  const [filterDealer, setFilterDealer] = useState('')

  const dealers = [...new Set(products.map(p => p.largeCategory).filter(Boolean))]
  const filteredProducts = filterDealer ? products.filter(p => p.largeCategory === filterDealer) : products

  const handleProductChange = (productId) => {
    setSelectedProduct(productId)
    if (productId) {
      const product = products.find(p => p.id === parseInt(productId))
      if (product) { setCustomPrice(product.purchasePrice.toString()); setSaleTag('') }
    } else { setCustomPrice(''); setSaleTag('') }
  }

  const addToCart = () => {
    if (!selectedProduct) { alert('商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return
    const finalPrice = parseInt(customPrice) || product.purchasePrice
    const tag = finalPrice !== product.purchasePrice ? (saleTag || 'セール') : ''
    setCart([...cart, { tempId: Date.now(), productId: product.id, productName: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: finalPrice, originalPrice: product.purchasePrice, quantity, saleTag: tag }])
    setSelectedProduct(''); setCustomPrice(''); setSaleTag(''); setQuantity(1)
  }

  const removeFromCart = (tempId) => { setCart(cart.filter(item => item.tempId !== tempId)) }
  const cartTotal = cart.reduce((sum, item) => sum + (item.purchasePrice * item.quantity), 0)

  const submitCart = async () => {
    if (!selectedStaff) { alert('スタッフを選択してください'); return }
    if (cart.length === 0) { alert('カートに商品がありません'); return }
    const insertData = cart.map(item => ({ staff_name: selectedStaff, product_id: item.productId, product_name: item.productName, large_category: item.largeCategory, medium_category: item.mediumCategory, purchase_price: item.purchasePrice, quantity: item.quantity, purchase_date: date, sale_tag: item.saleTag }))
    const { data, error } = await supabase.from('staff_purchases').insert(insertData).select()
    if (!error && data) {
      const newPurchases = data.map((d, i) => ({ id: d.id, staff: selectedStaff, productId: cart[i].productId, productName: cart[i].productName, largeCategory: cart[i].largeCategory, mediumCategory: cart[i].mediumCategory, purchasePrice: cart[i].purchasePrice, quantity: cart[i].quantity, date, saleTag: cart[i].saleTag }))
      setStaffPurchases([...staffPurchases, ...newPurchases]); setCart([]); alert(`${data.length}件の購入を記録しました！`)
    }
  }

  const recordSingle = async () => {
    if (!selectedStaff || !selectedProduct) { alert('スタッフと商品を選択してください'); return }
    const product = products.find(p => p.id === parseInt(selectedProduct))
    if (!product) return
    const finalPrice = parseInt(customPrice) || product.purchasePrice
    const tag = finalPrice !== product.purchasePrice ? (saleTag || 'セール') : ''
    const { data, error } = await supabase.from('staff_purchases').insert({ staff_name: selectedStaff, product_id: product.id, product_name: product.name, large_category: product.largeCategory, medium_category: product.mediumCategory, purchase_price: finalPrice, quantity, purchase_date: date, sale_tag: tag }).select()
    if (!error && data) { setStaffPurchases([...staffPurchases, { id: data[0].id, staff: selectedStaff, productId: product.id, productName: product.name, largeCategory: product.largeCategory, mediumCategory: product.mediumCategory, purchasePrice: finalPrice, originalPrice: product.purchasePrice, quantity, date, saleTag: tag }]); alert('購入を記録しました！'); setQuantity(1); setCustomPrice(''); setSaleTag(''); setSelectedProduct('') }
  }

  const deletePurchase = async (id) => { if (!confirm('この購入記録を削除しますか？')) return; const { error } = await supabase.from('staff_purchases').delete().eq('id', id); if (!error) setStaffPurchases(staffPurchases.filter(p => p.id !== id)) }
  const startEdit = (record) => { const product = products.find(p => p.id === record.productId); setEditingId(record.id); setEditData({ staff: record.staff, quantity: record.quantity, date: record.date, price: record.purchasePrice, originalPrice: product?.purchasePrice || record.purchasePrice, saleTag: record.saleTag || '' }) }
  const saveEdit = async (id) => { const finalPrice = parseInt(editData.price) || editData.originalPrice; const tag = editData.saleTag || (finalPrice !== editData.originalPrice ? 'セール' : ''); const { error } = await supabase.from('staff_purchases').update({ staff_name: editData.staff, quantity: parseInt(editData.quantity) || 1, purchase_date: editData.date, purchase_price: finalPrice, sale_tag: tag }).eq('id', id); if (!error) { setStaffPurchases(staffPurchases.map(p => p.id === id ? { ...p, staff: editData.staff, quantity: parseInt(editData.quantity) || 1, date: editData.date, purchasePrice: finalPrice, saleTag: tag } : p)); setEditingId(null) } }

  const monthlyPurchases = staffPurchases.filter(p => p.date?.startsWith(selectedMonth))
  const staffSummary = {}
  monthlyPurchases.forEach(p => { if (!staffSummary[p.staff]) staffSummary[p.staff] = { items: [], total: 0 }; staffSummary[p.staff].items.push(p); staffSummary[p.staff].total += p.purchasePrice * p.quantity })
  const grandTotal = Object.values(staffSummary).reduce((sum, s) => sum + s.total, 0)
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
        <div className="mb-4"><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>ディーラー</label><select value={filterDealer} onChange={e => { setFilterDealer(e.target.value); setSelectedProduct('') }} className="select"><option value="">すべて</option>{dealers.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
        <div className="mb-4"><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>商品 {filterDealer && `（${filteredProducts.length}件）`}</label><select value={selectedProduct} onChange={e => handleProductChange(e.target.value)} className="select"><option value="">選択</option>{filteredProducts.map(p => <option key={p.id} value={p.id}>{p.name}（通常¥{p.purchasePrice.toLocaleString()}）</option>)}</select></div>
        {selectedProductData && (
          <div className="bg-gray-50 p-3 rounded mb-4">
            <div className="grid-2 gap-4 mb-3">
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>単価</label><input type="number" value={customPrice} onChange={e => setCustomPrice(e.target.value)} className="input" placeholder={selectedProductData.purchasePrice.toString()} />{parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (<p className="text-xs text-red-500 mt-1">通常価格: ¥{selectedProductData.purchasePrice.toLocaleString()}</p>)}</div>
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>数量</label><input type="number" value={quantity} onChange={e => setQuantity(parseInt(e.target.value) || 1)} min="1" className="input" /></div>
            </div>
            {parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (<div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>タグ（任意）</label><input type="text" value={saleTag} onChange={e => setSaleTag(e.target.value)} className="input" placeholder="例: セール、キャンペーン、福袋" /></div>)}
            <div className="bg-white p-2 rounded text-center mb-3"><span className="text-gray-500">小計: </span><span className="text-xl font-bold text-blue-600">¥{((parseInt(customPrice) || selectedProductData.purchasePrice) * quantity).toLocaleString()}</span>{parseInt(customPrice) !== selectedProductData.purchasePrice && customPrice && (<span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">{saleTag || 'セール'}</span>)}</div>
            <div className="grid-2 gap-2"><button onClick={addToCart} className="btn btn-green py-2">🛒 カートに追加</button><button onClick={recordSingle} className="btn btn-blue py-2">⚡ 直接登録</button></div>
          </div>
        )}
        {cart.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-3 mt-4">
            <h4 className="font-bold mb-2">🛒 カート（{cart.length}件）</h4>
            <div className="space-y-2 mb-3">{cart.map(item => (<div key={item.tempId} className="flex justify-between items-center bg-white p-2 rounded text-sm"><div className="flex-1"><span className="font-semibold">{item.productName}</span>{item.saleTag && <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded">{item.saleTag}</span>}<span className="text-gray-500 ml-2">×{item.quantity}</span></div><div className="flex items-center gap-2"><span className="font-bold">¥{(item.purchasePrice * item.quantity).toLocaleString()}</span><button onClick={() => removeFromCart(item.tempId)} className="text-red-500 text-xs">✕</button></div></div>))}</div>
            <div className="bg-white p-3 rounded mb-3 text-center"><span className="text-gray-500">合計: </span><span className="text-2xl font-bold text-green-600">¥{cartTotal.toLocaleString()}</span></div>
            <button onClick={submitCart} className="btn btn-green w-full py-3 text-lg">✓ まとめて登録（{cart.length}件）</button>
          </div>
        )}
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2"><h3 className="text-lg font-bold">📊 月次集計</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        <div className="bg-blue-50 p-4 rounded mb-4 grid-2"><div className="summary-card"><div className="label">購入件数</div><div className="value text-blue-600">{monthlyPurchases.length}件</div></div><div className="summary-card"><div className="label">合計金額</div><div className="value text-blue-600">¥{grandTotal.toLocaleString()}</div></div></div>
        <button onClick={printMonthlyReport} className="btn btn-blue mb-4">PDF出力（印刷）</button>
        {Object.keys(staffSummary).length === 0 ? (<p className="text-gray-500 text-center py-4">この月の購入記録はありません</p>) : (
          Object.entries(staffSummary).map(([staffName, data]) => (
            <div key={staffName} className="mb-4 border rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 flex justify-between items-center"><span className="font-bold">{staffName}</span><span className="text-green-600 font-bold">¥{data.total.toLocaleString()}</span></div>
              <div className="overflow-x-auto">
                <table className="text-sm"><thead><tr><th>日付</th><th>商品</th><th className="text-right">単価</th><th className="text-center">数量</th><th className="text-right">金額</th><th className="text-center">操作</th></tr></thead>
                  <tbody>
                    {data.items.map(item => {
                      const product = products.find(p => p.id === item.productId); const originalPrice = product?.purchasePrice || item.purchasePrice; const isSale = item.purchasePrice !== originalPrice || item.saleTag
                      return editingId === item.id ? (
                        <tr key={item.id} style={{ background: '#fef9c3' }}>
                          <td><input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" style={{ width: '110px', fontSize: '12px' }} /></td>
                          <td style={{ fontSize: '12px' }}>{item.productName}<input type="text" value={editData.saleTag} onChange={e => setEditData({...editData, saleTag: e.target.value})} className="input" style={{ width: '100%', fontSize: '11px', marginTop: '4px' }} placeholder="タグ（例: セール）" /></td>
                          <td><input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} className="input" style={{ width: '70px', fontSize: '12px' }} /></td>
                          <td className="text-center"><input type="number" value={editData.quantity} onChange={e => setEditData({...editData, quantity: e.target.value})} className="input" style={{ width: '50px', fontSize: '12px' }} min="1" /></td>
                          <td className="text-right" style={{ fontSize: '12px' }}>¥{((parseInt(editData.price) || 0) * (parseInt(editData.quantity) || 1)).toLocaleString()}</td>
                          <td className="text-center"><button onClick={() => saveEdit(item.id)} className="text-green-600 text-xs mr-1">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-xs">取消</button></td>
                        </tr>
                      ) : (
                        <tr key={item.id}><td>{item.date}</td><td>{item.productName}{isSale && <span className="ml-1 text-xs bg-red-100 text-red-600 px-1 rounded">{item.saleTag || 'セール'}</span>}</td><td className="text-right">¥{item.purchasePrice.toLocaleString()}</td><td className="text-center">{item.quantity}</td><td className="text-right">¥{(item.purchasePrice * item.quantity).toLocaleString()}</td><td className="text-center"><button onClick={() => startEdit(item)} className="text-blue-500 text-xs mr-1">編集</button><button onClick={() => deletePurchase(item.id)} className="text-red-500 text-xs">削除</button></td></tr>
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
input" /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="text-sm">
            <thead><tr><th>ディーラー</th><th>種類</th><th>商品名</th><th>種別</th><th className="text-right">仕入</th><th className="text-right">販売</th><th className="text-center">操作</th></tr></thead>
            <tbody>
              {filteredProducts.map(p => (
                editingId === p.id ? (
                  <tr key={p.id} style={{ background: '#fef9c3' }}>
                    <td><select value={editData.largeCategory} onChange={e => setEditData({...editData, largeCategory: e.target.value})} className="select" style={{ width: '100px' }}>{categories.large.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}</select></td>
                    <td><select value={editData.mediumCategory} onChange={e => setEditData({...editData, mediumCategory: e.target.value})} className="select" style={{ width: '100px' }}>{categories.medium.map((c, i) => <option key={i} value={c}>{c}</option>)}</select></td>
                    <td><input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" style={{ width: '120px' }} /></td>
                    <td><select value={editData.productType} onChange={e => setEditData({...editData, productType: e.target.value})} className="select" style={{ width: '80px' }}>{productTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></td>
                    <td><input type="number" value={editData.purchasePrice} onChange={e => setEditData({...editData, purchasePrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td><input type="number" value={editData.sellingPrice} onChange={e => setEditData({...editData, sellingPrice: e.target.value})} className="input" style={{ width: '80px' }} /></td>
                    <td className="text-center"><button onClick={() => saveEdit(p.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                  </tr>
                ) : (
                  <tr key={p.id}><td>{p.largeCategory}</td><td>{p.mediumCategory}</td><td>{p.name}</td><td><span className={`badge ${p.productType === 'retail' ? 'badge-green' : p.productType === 'both' ? 'badge-purple' : 'badge-gray'}`}>{getTypeLabel(p.productType)}</span></td><td className="text-right">¥{p.purchasePrice.toLocaleString()}</td><td className="text-right">¥{p.sellingPrice.toLocaleString()}</td><td className="text-center"><button onClick={() => startEdit(p)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteProduct(p.id)} className="text-red-500 text-sm">削除</button></td></tr>
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
function StaffManagement({ staff, setStaff, isAdmin }) {
  const [newStaff, setNewStaff] = useState({ name: '', role: 'staff', password: '', hiringDate: '', leaveGrants: [] })
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const roles = [{ value: 'admin', label: '管理者' }, { value: 'staff', label: 'スタッフ' }]

  const addStaff = async () => {
    if (!newStaff.name || !newStaff.password) { alert('名前とパスワードは必須です'); return }
    const { data, error } = await supabase.from('staff').insert({ name: newStaff.name, role: newStaff.role, password: newStaff.password, hiring_date: newStaff.hiringDate || null, leave_grants: [] }).select()
    if (!error && data) { setStaff([...staff, { id: data[0].id, name: data[0].name, role: data[0].role, password: data[0].password, hiringDate: data[0].hiring_date, leaveGrants: [] }]); setNewStaff({ name: '', role: 'staff', password: '', hiringDate: '', leaveGrants: [] }) }
  }
  const deleteStaff = async (id) => { if (!confirm('このスタッフを削除しますか？')) return; const { error } = await supabase.from('staff').delete().eq('id', id); if (!error) setStaff(staff.filter(s => s.id !== id)) }
  const startEdit = (s) => { setEditingId(s.id); setEditData({ name: s.name, role: s.role, password: s.password, hiringDate: s.hiringDate || '' }) }
  const saveEdit = async (id) => { const { error } = await supabase.from('staff').update({ name: editData.name, role: editData.role, password: editData.password, hiring_date: editData.hiringDate || null }).eq('id', id); if (!error) { setStaff(staff.map(s => s.id === id ? { ...s, name: editData.name, role: editData.role, password: editData.password, hiringDate: editData.hiringDate } : s)); setEditingId(null) } }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">👥 スタッフ管理</h3>
        {isAdmin && (
          <div className="bg-blue-50 p-4 rounded mb-4">
            <h4 className="font-semibold mb-3">新規スタッフ登録</h4>
            <div className="grid-2 mb-4">
              <input type="text" value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} placeholder="名前" className="input" />
              <select value={newStaff.role} onChange={e => setNewStaff({ ...newStaff, role: e.target.value })} className="select">{roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}</select>
            </div>
            <div className="grid-2 mb-4">
              <input type="text" value={newStaff.password} onChange={e => setNewStaff({ ...newStaff, password: e.target.value })} placeholder="パスワード" className="input" />
              <input type="date" value={newStaff.hiringDate} onChange={e => setNewStaff({ ...newStaff, hiringDate: e.target.value })} className="input" />
            </div>
            <button onClick={addStaff} className="btn btn-blue"><Icons.Plus /> スタッフを追加</button>
          </div>
        )}
        <div className="overflow-x-auto">
          <table>
            <thead><tr><th>名前</th><th>権限</th><th>パスワード</th><th>入社日</th>{isAdmin && <th className="text-center">操作</th>}</tr></thead>
            <tbody>
              {staff.map(s => (
                editingId === s.id ? (
                  <tr key={s.id} style={{ background: '#fef9c3' }}>
                    <td><input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} className="input" style={{ width: '100px' }} /></td>
                    <td><select value={editData.role} onChange={e => setEditData({...editData, role: e.target.value})} className="select" style={{ width: '100px' }}>{roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}</select></td>
                    <td><input value={editData.password} onChange={e => setEditData({...editData, password: e.target.value})} className="input" style={{ width: '100px' }} /></td>
                    <td><input type="date" value={editData.hiringDate} onChange={e => setEditData({...editData, hiringDate: e.target.value})} className="input" style={{ width: '130px' }} /></td>
                    <td className="text-center"><button onClick={() => saveEdit(s.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                  </tr>
                ) : (
                  <tr key={s.id}>
                    <td className="font-semibold">{s.name}</td>
                    <td><span className={`badge ${s.role === 'admin' ? 'badge-red' : 'badge-blue'}`}>{s.role === 'admin' ? '管理者' : 'スタッフ'}</span></td>
                    <td className="text-gray-500">{s.password}</td>
                    <td>{s.hiringDate || '-'}</td>
                    {isAdmin && <td className="text-center"><button onClick={() => startEdit(s)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteStaff(s.id)} className="text-red-500 text-sm">削除</button></td>}
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

// ==================== タイムカード ====================
function TimeCard({ staff, timeRecords, setTimeRecords, currentUser, isAdmin }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [showMonthly, setShowMonthly] = useState(false)

  const myRecordsToday = timeRecords.filter(r => r.staff === currentUser && r.date === date)
  const hasClockedIn = myRecordsToday.some(r => r.clockIn && !r.clockOut)
  const lastRecord = myRecordsToday[myRecordsToday.length - 1]

  const clockIn = async () => {
    const time = new Date().toTimeString().slice(0, 5)
    const { data, error } = await supabase.from('time_records').insert({ staff_name: currentUser, record_date: date, clock_in: time, clock_out: null }).select()
    if (!error && data) { setTimeRecords([...timeRecords, { id: data[0].id, staff: currentUser, date, clockIn: time, clockOut: null }]) }
  }
  const clockOut = async () => {
    if (!lastRecord) return
    const time = new Date().toTimeString().slice(0, 5)
    const { error } = await supabase.from('time_records').update({ clock_out: time }).eq('id', lastRecord.id)
    if (!error) { setTimeRecords(timeRecords.map(r => r.id === lastRecord.id ? { ...r, clockOut: time } : r)) }
  }
  const deleteRecord = async (id) => { if (!confirm('この記録を削除しますか？')) return; const { error } = await supabase.from('time_records').delete().eq('id', id); if (!error) setTimeRecords(timeRecords.filter(r => r.id !== id)) }
  const startEdit = (r) => { setEditingId(r.id); setEditData({ clockIn: r.clockIn, clockOut: r.clockOut || '', date: r.date }) }
  const saveEdit = async (id) => { const { error } = await supabase.from('time_records').update({ clock_in: editData.clockIn, clock_out: editData.clockOut || null, record_date: editData.date }).eq('id', id); if (!error) { setTimeRecords(timeRecords.map(r => r.id === id ? { ...r, clockIn: editData.clockIn, clockOut: editData.clockOut || null, date: editData.date } : r)); setEditingId(null) } }
  const calcHours = (cin, cout) => { if (!cin || !cout) return '-'; const [h1, m1] = cin.split(':').map(Number); const [h2, m2] = cout.split(':').map(Number); const diff = (h2 * 60 + m2) - (h1 * 60 + m1); if (diff < 0) return '-'; return `${Math.floor(diff / 60)}h${diff % 60}m` }
  const monthlyRecords = timeRecords.filter(r => r.date?.startsWith(selectedMonth))
  const staffMonthlyData = {}
  monthlyRecords.forEach(r => { if (!staffMonthlyData[r.staff]) staffMonthlyData[r.staff] = { records: [], totalMinutes: 0 }; staffMonthlyData[r.staff].records.push(r); if (r.clockIn && r.clockOut) { const [h1, m1] = r.clockIn.split(':').map(Number); const [h2, m2] = r.clockOut.split(':').map(Number); const diff = (h2 * 60 + m2) - (h1 * 60 + m1); if (diff > 0) staffMonthlyData[r.staff].totalMinutes += diff } })
  const formatMinutes = (mins) => `${Math.floor(mins / 60)}h${mins % 60}m`

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">⏰ タイムカード</h3>
          <button onClick={() => setShowMonthly(!showMonthly)} className={`btn ${showMonthly ? 'btn-green' : 'btn-gray'}`}>{showMonthly ? '打刻に戻る' : '月次集計'}</button>
        </div>
        {!showMonthly ? (
          <>
            <div className="mb-4">
              <label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>日付</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" style={{ width: 'auto' }} />
            </div>
            <div className="bg-blue-50 p-6 rounded mb-4 text-center">
              <p className="text-lg mb-2">{currentUser}さん</p>
              {hasClockedIn ? (<><p className="text-sm text-gray-600 mb-2">出勤中：{lastRecord?.clockIn}</p><button onClick={clockOut} className="btn btn-red py-3 px-8 text-lg">退勤</button></>) : (<button onClick={clockIn} className="btn btn-green py-3 px-8 text-lg">出勤</button>)}
            </div>
            <h4 className="font-semibold mb-2">今日の記録</h4>
            <div className="overflow-x-auto">
              <table className="text-sm">
                <thead><tr><th>スタッフ</th><th>出勤</th><th>退勤</th><th>勤務時間</th>{isAdmin && <th className="text-center">操作</th>}</tr></thead>
                <tbody>
                  {timeRecords.filter(r => r.date === date).map(r => (
                    editingId === r.id ? (
                      <tr key={r.id} style={{ background: '#fef9c3' }}>
                        <td>{r.staff}</td>
                        <td><input type="time" value={editData.clockIn} onChange={e => setEditData({...editData, clockIn: e.target.value})} className="input" style={{ width: '100px' }} /></td>
                        <td><input type="time" value={editData.clockOut} onChange={e => setEditData({...editData, clockOut: e.target.value})} className="input" style={{ width: '100px' }} /></td>
                        <td>{calcHours(editData.clockIn, editData.clockOut)}</td>
                        <td className="text-center"><button onClick={() => saveEdit(r.id)} className="text-green-600 text-sm mr-2">保存</button><button onClick={() => setEditingId(null)} className="text-gray-500 text-sm">取消</button></td>
                      </tr>
                    ) : (
                      <tr key={r.id}><td>{r.staff}</td><td>{r.clockIn}</td><td>{r.clockOut || '-'}</td><td>{calcHours(r.clockIn, r.clockOut)}</td>{isAdmin && <td className="text-center"><button onClick={() => startEdit(r)} className="text-blue-500 text-sm mr-2">編集</button><button onClick={() => deleteRecord(r.id)} className="text-red-500 text-sm">削除</button></td>}</tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4"><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
            {Object.keys(staffMonthlyData).length === 0 ? (<p className="text-gray-500 text-center py-4">この月の記録はありません</p>) : (
              Object.entries(staffMonthlyData).map(([staffName, data]) => (
                <div key={staffName} className="mb-4 border rounded-lg overflow-hidden">
                  <div className="bg-gray-100 p-3 flex justify-between items-center"><span className="font-bold">{staffName}</span><span className="text-blue-600 font-bold">合計: {formatMinutes(data.totalMinutes)}</span></div>
                  <div className="overflow-x-auto">
                    <table className="text-sm"><thead><tr><th>日付</th><th>出勤</th><th>退勤</th><th>勤務時間</th></tr></thead>
                      <tbody>{data.records.sort((a, b) => a.date.localeCompare(b.date)).map(r => (<tr key={r.id}><td>{r.date}</td><td>{r.clockIn}</td><td>{r.clockOut || '-'}</td><td>{calcHours(r.clockIn, r.clockOut)}</td></tr>))}</tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ==================== 練習予約 ====================
function PracticeReservation({ staff, practiceReservations, setPracticeReservations, currentUser }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [time, setTime] = useState('')
  const [menu, setMenu] = useState('')
  const [model, setModel] = useState('')
  const [note, setNote] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const addReservation = async () => {
    if (!date || !time || !menu) { alert('日付・時間・メニューは必須です'); return }
    const staffData = staff.find(s => s.name === currentUser)
    const { data, error } = await supabase.from('practice_reservations').insert({ staff_id: staffData?.id, staff_name: currentUser, practice_date: date, practice_time: time, menu, model_name: model, note }).select()
    if (!error && data) { setPracticeReservations([...practiceReservations, { id: data[0].id, staffId: staffData?.id, staffName: currentUser, date, time, menu, model, note }]); setTime(''); setMenu(''); setModel(''); setNote('') }
  }
  const deleteReservation = async (id) => { if (!confirm('この予約を削除しますか？')) return; const { error } = await supabase.from('practice_reservations').delete().eq('id', id); if (!error) setPracticeReservations(practiceReservations.filter(r => r.id !== id)) }
  const startEdit = (r) => { setEditingId(r.id); setEditData({ date: r.date, time: r.time, menu: r.menu, model: r.model || '', note: r.note || '' }) }
  const saveEdit = async (id) => { const { error } = await supabase.from('practice_reservations').update({ practice_date: editData.date, practice_time: editData.time, menu: editData.menu, model_name: editData.model, note: editData.note }).eq('id', id); if (!error) { setPracticeReservations(practiceReservations.map(r => r.id === id ? { ...r, date: editData.date, time: editData.time, menu: editData.menu, model: editData.model, note: editData.note } : r)); setEditingId(null) } }
  const getStaffColor = (staffId) => { const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']; const index = staff.findIndex(s => s.id === staffId); return colors[index % colors.length] }
  const monthlyReservations = practiceReservations.filter(r => r.date?.startsWith(selectedMonth)).sort((a, b) => { if (a.date !== b.date) return a.date.localeCompare(b.date); return a.time.localeCompare(b.time) })
  const menus = ['カット', 'カラー', 'パーマ', 'トリートメント', 'ヘッドスパ', 'その他']

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">✂️ 練習予約</h3>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <h4 className="font-semibold mb-3">新規予約</h4>
          <div className="grid-2 mb-4">
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>日付</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div>
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>時間</label><input type="time" value={time} onChange={e => setTime(e.target.value)} className="input" /></div>
          </div>
          <div className="grid-2 mb-4">
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>メニュー</label><select value={menu} onChange={e => setMenu(e.target.value)} className="select"><option value="">選択</option>{menus.map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>モデル名</label><input type="text" value={model} onChange={e => setModel(e.target.value)} placeholder="任意" className="input" /></div>
          </div>
          <div className="mb-4"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>備考</label><input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="任意" className="input" /></div>
          <button onClick={addReservation} className="btn btn-blue w-full"><Icons.Plus /> 予約を追加</button>
        </div>
      </div>
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">📅 予約一覧</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        {monthlyReservations.length === 0 ? (<p className="text-gray-500 text-center py-4">この月の予約はありません</p>) : (
          <div className="space-y-3">
            {monthlyReservations.map(r => (
              editingId === r.id ? (
                <div key={r.id} className="border-2 border-yellow-400 rounded-lg p-4 bg-yellow-50">
                  <div className="grid-2 gap-2 mb-2">
                    <input type="date" value={editData.date} onChange={e => setEditData({...editData, date: e.target.value})} className="input" />
                    <input type="time" value={editData.time} onChange={e => setEditData({...editData, time: e.target.value})} className="input" />
                  </div>
                  <div className="grid-2 gap-2 mb-2">
                    <select value={editData.menu} onChange={e => setEditData({...editData, menu: e.target.value})} className="select">{menus.map(m => <option key={m} value={m}>{m}</option>)}</select>
                    <input type="text" value={editData.model} onChange={e => setEditData({...editData, model: e.target.value})} placeholder="モデル名" className="input" />
                  </div>
                  <input type="text" value={editData.note} onChange={e => setEditData({...editData, note: e.target.value})} placeholder="備考" className="input mb-2" />
                  <div className="flex gap-2"><button onClick={() => saveEdit(r.id)} className="btn btn-green">保存</button><button onClick={() => setEditingId(null)} className="btn btn-gray">取消</button></div>
                </div>
              ) : (
                <div key={r.id} className="border rounded-lg p-4" style={{ borderLeft: `4px solid ${getStaffColor(r.staffId)}` }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1"><span className="font-bold">{r.date}</span><span className="text-blue-600">{r.time}</span></div>
                      <div className="flex items-center gap-2"><span className="badge badge-blue">{r.staffName}</span><span className="font-semibold">{r.menu}</span>{r.model && <span className="text-gray-500">({r.model})</span>}</div>
                      {r.note && <p className="text-sm text-gray-600 mt-1">{r.note}</p>}
                    </div>
                    <div className="flex gap-2">{(r.staffName === currentUser) && <><button onClick={() => startEdit(r)} className="text-blue-500 text-sm">編集</button><button onClick={() => deleteReservation(r.id)} className="text-red-500 text-sm">削除</button></>}</div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ==================== 連絡帳 ====================
function ContactBook({ staff, contactNotes, setContactNotes, currentUser }) {
  const [content, setContent] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const addNote = async () => {
    if (!content.trim()) return
    const { data, error } = await supabase.from('contact_notes').insert({ staff_name: currentUser, content: content.trim(), note_date: date }).select()
    if (!error && data) { setContactNotes([...contactNotes, { id: data[0].id, staff: currentUser, content: content.trim(), date, createdAt: data[0].created_at }]); setContent('') }
  }
  const deleteNote = async (id) => { if (!confirm('この連絡を削除しますか？')) return; const { error } = await supabase.from('contact_notes').delete().eq('id', id); if (!error) setContactNotes(contactNotes.filter(n => n.id !== id)) }
  const startEdit = (note) => { setEditingId(note.id); setEditContent(note.content) }
  const saveEdit = async (id) => { const { error } = await supabase.from('contact_notes').update({ content: editContent }).eq('id', id); if (!error) { setContactNotes(contactNotes.map(n => n.id === id ? { ...n, content: editContent } : n)); setEditingId(null); setEditContent('') } }

  const sortedNotes = [...contactNotes].sort((a, b) => { if (a.date !== b.date) return b.date.localeCompare(a.date); return new Date(b.createdAt) - new Date(a.createdAt) })
  const groupedByDate = sortedNotes.reduce((acc, note) => { if (!acc[note.date]) acc[note.date] = []; acc[note.date].push(note); return acc }, {})

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📝 連絡帳</h3>
        <div className="bg-blue-50 p-4 rounded mb-4">
          <div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>日付</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
          <div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>連絡内容</label><textarea value={content} onChange={e => setContent(e.target.value)} placeholder="連絡事項を入力..." className="input" rows={3} style={{ resize: 'vertical' }} /></div>
          <button onClick={addNote} className="btn btn-blue"><Icons.Plus /> 投稿する</button>
        </div>
      </div>
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📋 連絡一覧</h3>
        {Object.keys(groupedByDate).length === 0 ? (<p className="text-gray-500 text-center py-4">連絡はありません</p>) : (
          Object.entries(groupedByDate).map(([noteDate, notes]) => (
            <div key={noteDate} className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2 sticky top-0 bg-white py-1">{noteDate}</h4>
              <div className="space-y-3">
                {notes.map(note => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="badge badge-blue">{note.staff}</span>
                      <div className="flex gap-2">
                        {note.staff === currentUser && (<><button onClick={() => startEdit(note)} className="text-blue-500 text-sm">編集</button><button onClick={() => deleteNote(note.id)} className="text-red-500 text-sm">削除</button></>)}
                      </div>
                    </div>
                    {editingId === note.id ? (
                      <div><textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="input mb-2" rows={3} /><div className="flex gap-2"><button onClick={() => saveEdit(note.id)} className="btn btn-green btn-sm">保存</button><button onClick={() => setEditingId(null)} className="btn btn-gray btn-sm">取消</button></div></div>
                    ) : (<p className="whitespace-pre-wrap">{note.content}</p>)}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// ==================== 有給管理 ====================
function LeaveManagement({ staff, setStaff, leaveRequests, setLeaveRequests, currentUser, isAdmin }) {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])
  const [leaveType, setLeaveType] = useState('paid')
  const [note, setNote] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [showGrantModal, setShowGrantModal] = useState(false)
  const [grantStaffId, setGrantStaffId] = useState(null)
  const [grantDate, setGrantDate] = useState(new Date().toISOString().split('T')[0])
  const [grantDays, setGrantDays] = useState(10)
  const [expiryDate, setExpiryDate] = useState('')

  useEffect(() => {
    if (grantDate) { const d = new Date(grantDate); d.setFullYear(d.getFullYear() + 2); setExpiryDate(d.toISOString().split('T')[0]) }
  }, [grantDate])

  const leaveTypes = [{ value: 'paid', label: '有給休暇' }, { value: 'summer', label: '夏季休暇' }, { value: 'special', label: '特別休暇' }]

  const countLeaveDays = (start, end) => { const s = new Date(start); const e = new Date(end); let count = 0; while (s <= e) { const day = s.getDay(); if (day !== 0 && day !== 6) count++; s.setDate(s.getDate() + 1) }; return count }

  const currentStaff = staff.find(s => s.name === currentUser)
  const getStaffLeaveBalance = (staffMember) => {
    const grants = staffMember.leaveGrants || []
    const today = new Date().toISOString().split('T')[0]
    let total = 0
    grants.forEach(g => { if (g.expiryDate >= today) total += g.remainingDays })
    return total
  }

  const submitRequest = async () => {
    if (!startDate || !endDate) { alert('開始日と終了日を入力してください'); return }
    if (startDate > endDate) { alert('終了日は開始日以降にしてください'); return }
    const days = countLeaveDays(startDate, endDate)
    const staffData = staff.find(s => s.name === currentUser)
    const balance = getStaffLeaveBalance(staffData)
    if (leaveType === 'paid' && days > balance) { alert(`有給残日数が足りません（残: ${balance}日、申請: ${days}日）`); return }
    const { data, error } = await supabase.from('leave_requests').insert({ staff_id: staffData?.id, staff_name: currentUser, start_date: startDate, end_date: endDate, leave_type: leaveType, days, status: 'pending', note }).select()
    if (!error && data) { setLeaveRequests([...leaveRequests, { id: data[0].id, staffId: staffData?.id, staffName: currentUser, startDate, endDate, leaveType, days, status: 'pending', note }]); setNote(''); alert('休暇申請を提出しました') }
  }

  const approveRequest = async (req) => {
    const { error } = await supabase.from('leave_requests').update({ status: 'approved' }).eq('id', req.id)
    if (!error) {
      setLeaveRequests(leaveRequests.map(r => r.id === req.id ? { ...r, status: 'approved' } : r))
      if (req.leaveType === 'paid') {
        const targetStaff = staff.find(s => s.id === req.staffId)
        if (targetStaff) {
          let remaining = req.days
          const updatedGrants = [...(targetStaff.leaveGrants || [])].sort((a, b) => a.expiryDate.localeCompare(b.expiryDate))
          updatedGrants.forEach(g => { if (remaining > 0 && g.remainingDays > 0) { const deduct = Math.min(remaining, g.remainingDays); g.remainingDays -= deduct; remaining -= deduct } })
          await supabase.from('staff').update({ leave_grants: updatedGrants }).eq('id', targetStaff.id)
          setStaff(staff.map(s => s.id === targetStaff.id ? { ...s, leaveGrants: updatedGrants } : s))
        }
      }
    }
  }
  const rejectRequest = async (id) => { const { error } = await supabase.from('leave_requests').update({ status: 'rejected' }).eq('id', id); if (!error) setLeaveRequests(leaveRequests.map(r => r.id === id ? { ...r, status: 'rejected' } : r)) }
  const deleteRequest = async (id) => { if (!confirm('この申請を削除しますか？')) return; const { error } = await supabase.from('leave_requests').delete().eq('id', id); if (!error) setLeaveRequests(leaveRequests.filter(r => r.id !== id)) }

  const openGrantModal = (staffId) => { setGrantStaffId(staffId); setShowGrantModal(true) }
  const grantLeave = async () => {
    const targetStaff = staff.find(s => s.id === grantStaffId)
    if (!targetStaff) return
    const newGrant = { grantDate, days: grantDays, remainingDays: grantDays, expiryDate }
    const updatedGrants = [...(targetStaff.leaveGrants || []), newGrant]
    const { error } = await supabase.from('staff').update({ leave_grants: updatedGrants }).eq('id', grantStaffId)
    if (!error) { setStaff(staff.map(s => s.id === grantStaffId ? { ...s, leaveGrants: updatedGrants } : s)); setShowGrantModal(false); alert('有給を付与しました') }
  }

  const getStatusBadge = (status) => { const styles = { pending: 'badge-yellow', approved: 'badge-green', rejected: 'badge-red' }; const labels = { pending: '申請中', approved: '承認', rejected: '却下' }; return <span className={`badge ${styles[status]}`}>{labels[status]}</span> }
  const getTypeLabel = (type) => { const found = leaveTypes.find(t => t.value === type); return found ? found.label : type }
  const monthlyRequests = leaveRequests.filter(r => r.startDate?.startsWith(selectedMonth) || r.endDate?.startsWith(selectedMonth)).sort((a, b) => a.startDate.localeCompare(b.startDate))

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">🏖️ 有給管理</h3>
        {currentStaff && (<div className="bg-blue-50 p-4 rounded mb-4 text-center"><p className="text-gray-600">あなたの有給残日数</p><p className="text-3xl font-bold text-blue-600">{getStaffLeaveBalance(currentStaff)}日</p></div>)}
        <div className="bg-gray-50 p-4 rounded">
          <h4 className="font-semibold mb-3">休暇申請</h4>
          <div className="grid-2 mb-3">
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>開始日</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" /></div>
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>終了日</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input" /></div>
          </div>
          <div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>休暇種別</label><select value={leaveType} onChange={e => setLeaveType(e.target.value)} className="select">{leaveTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
          <div className="mb-3"><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>備考</label><input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="任意" className="input" /></div>
          <button onClick={submitRequest} className="btn btn-blue w-full">申請する</button>
        </div>
      </div>
      {isAdmin && (
        <div className="card">
          <h3 className="text-lg font-bold mb-4">👥 スタッフ有給状況</h3>
          <div className="overflow-x-auto">
            <table><thead><tr><th>スタッフ</th><th className="text-center">残日数</th><th className="text-center">操作</th></tr></thead>
              <tbody>{staff.map(s => (<tr key={s.id}><td>{s.name}</td><td className="text-center font-bold text-blue-600">{getStaffLeaveBalance(s)}日</td><td className="text-center"><button onClick={() => openGrantModal(s.id)} className="btn btn-green btn-sm">付与</button></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      )}
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">📋 申請一覧</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        {monthlyRequests.length === 0 ? (<p className="text-gray-500 text-center py-4">この月の申請はありません</p>) : (
          <div className="space-y-3">
            {monthlyRequests.map(r => (
              <div key={r.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2"><div className="flex items-center gap-2"><span className="badge badge-blue">{r.staffName}</span>{getStatusBadge(r.status)}</div><span className="text-sm text-gray-500">{getTypeLabel(r.leaveType)}</span></div>
                <div className="mb-2"><span className="font-semibold">{r.startDate}</span>{r.startDate !== r.endDate && <span> 〜 {r.endDate}</span>}<span className="ml-2 text-gray-600">({r.days}日間)</span></div>
                {r.note && <p className="text-sm text-gray-600 mb-2">{r.note}</p>}
                <div className="flex gap-2 justify-end">
                  {isAdmin && r.status === 'pending' && (<><button onClick={() => approveRequest(r)} className="btn btn-green btn-sm">承認</button><button onClick={() => rejectRequest(r.id)} className="btn btn-red btn-sm">却下</button></>)}
                  {(r.staffName === currentUser || isAdmin) && <button onClick={() => deleteRequest(r.id)} className="btn btn-gray btn-sm">削除</button>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showGrantModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="text-lg font-bold mb-4">有給付与</h3>
            <p className="mb-4">対象: <span className="font-semibold">{staff.find(s => s.id === grantStaffId)?.name}</span></p>
            <div className="space-y-3">
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>付与日</label><input type="date" value={grantDate} onChange={e => setGrantDate(e.target.value)} className="input" /></div>
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>付与日数</label><input type="number" value={grantDays} onChange={e => setGrantDays(parseInt(e.target.value) || 0)} className="input" min="1" /></div>
              <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>有効期限</label><input type="date" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} className="input" /></div>
            </div>
            <div className="flex gap-2 mt-4"><button onClick={grantLeave} className="btn btn-green">付与する</button><button onClick={() => setShowGrantModal(false)} className="btn btn-gray">キャンセル</button></div>
          </div>
        </div>
      )}
    </div>
  )
}

// ==================== 材料費達成率（賞与管理） ====================
function BonusManagement({ staff, usage, dealerBudgets, isAdmin }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))
  const [targetRate] = useState(20)

  const budget = dealerBudgets.find(b => b.yearMonth === selectedMonth)
  const targetSales = budget?.targetSales || 0
  const monthlyUsage = usage.filter(u => u.date?.startsWith(selectedMonth))
  const totalUsage = monthlyUsage.reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0)
  const actualRate = targetSales > 0 ? (totalUsage / targetSales * 100) : 0
  const achievement = targetRate > 0 ? Math.max(0, ((targetRate - actualRate) / targetRate * 100)) : 0
  const getRank = (rate) => { if (rate >= 30) return { rank: 'S', color: 'text-purple-600', bg: 'bg-purple-100' }; if (rate >= 20) return { rank: 'A', color: 'text-blue-600', bg: 'bg-blue-100' }; if (rate >= 10) return { rank: 'B', color: 'text-green-600', bg: 'bg-green-100' }; if (rate >= 0) return { rank: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' }; return { rank: 'D', color: 'text-red-600', bg: 'bg-red-100' } }
  const { rank, color, bg } = getRank(achievement)

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🎯 材料費達成率</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        <div className="grid-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded text-center"><div className="text-sm text-gray-600">売上目標</div><div className="text-xl font-bold">¥{targetSales.toLocaleString()}</div></div>
          <div className="bg-gray-50 p-4 rounded text-center"><div className="text-sm text-gray-600">目標仕入率</div><div className="text-xl font-bold">{targetRate}%</div></div>
        </div>
        <div className="grid-2 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded text-center"><div className="text-sm text-gray-600">今月の材料使用</div><div className="text-xl font-bold text-blue-600">¥{totalUsage.toLocaleString()}</div></div>
          <div className={`p-4 rounded text-center ${actualRate <= targetRate ? 'bg-green-50' : 'bg-red-50'}`}><div className="text-sm text-gray-600">実績仕入率</div><div className={`text-xl font-bold ${actualRate <= targetRate ? 'text-green-600' : 'text-red-600'}`}>{actualRate.toFixed(1)}%</div></div>
        </div>
        <div className={`${bg} p-6 rounded text-center`}><div className="text-sm text-gray-600 mb-2">達成ランク</div><div className={`text-5xl font-bold ${color}`}>{rank}</div><div className="text-lg mt-2">{achievement.toFixed(1)}%達成</div></div>
      </div>
      <div className="card">
        <h4 className="font-bold mb-4">ランク基準</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between p-2 bg-purple-50 rounded"><span className="font-bold text-purple-600">Sランク</span><span>30%以上削減</span></div>
          <div className="flex justify-between p-2 bg-blue-50 rounded"><span className="font-bold text-blue-600">Aランク</span><span>20-30%削減</span></div>
          <div className="flex justify-between p-2 bg-green-50 rounded"><span className="font-bold text-green-600">Bランク</span><span>10-20%削減</span></div>
          <div className="flex justify-between p-2 bg-yellow-50 rounded"><span className="font-bold text-yellow-600">Cランク</span><span>0-10%削減</span></div>
          <div className="flex justify-between p-2 bg-red-50 rounded"><span className="font-bold text-red-600">Dランク</span><span>目標未達</span></div>
        </div>
      </div>
    </div>
  )
}

// ==================== 月次レポート ====================
function MonthlyReport({ products, usage, stockIn, inventoryHistory, dealerBudgets }) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  const monthlyUsage = usage.filter(u => u.date?.startsWith(selectedMonth))
  const monthlyStockIn = stockIn.filter(s => s.date?.startsWith(selectedMonth))
  const totalUsage = monthlyUsage.reduce((sum, u) => sum + u.purchasePrice * u.quantity, 0)
  const totalStockIn = monthlyStockIn.reduce((sum, s) => { const p = products.find(pr => pr.id === s.productId); return sum + (p ? s.quantity * p.purchasePrice : 0) }, 0)
  const budget = dealerBudgets.find(b => b.yearMonth === selectedMonth)
  const targetSales = budget?.targetSales || 0
  const targetRate = budget?.targetRate || 20
  const targetBudget = Math.round(targetSales * targetRate / 100)
  const usageByDealer = {}; monthlyUsage.forEach(u => { if (!usageByDealer[u.largeCategory]) usageByDealer[u.largeCategory] = 0; usageByDealer[u.largeCategory] += u.purchasePrice * u.quantity })
  const stockInByDealer = {}; monthlyStockIn.forEach(s => { const p = products.find(pr => pr.id === s.productId); if (p) { if (!stockInByDealer[s.largeCategory]) stockInByDealer[s.largeCategory] = 0; stockInByDealer[s.largeCategory] += s.quantity * p.purchasePrice } })

  const printReport = () => {
    const content = `<h1 style="text-align: center;">${selectedMonth.replace('-', '年')}月 月次レポート</h1><h2>サマリー</h2><table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;"><tr><td style="border: 1px solid #ddd; padding: 8px;">売上目標</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right;">¥${targetSales.toLocaleString()}</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">仕入れ目標</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right;">¥${targetBudget.toLocaleString()}</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">材料使用額</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right; color: blue;">¥${totalUsage.toLocaleString()}</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">入荷額</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right; color: purple;">¥${totalStockIn.toLocaleString()}</td></tr></table><h2>ディーラー別</h2><table style="width: 100%; border-collapse: collapse;"><tr style="background: #f0f0f0;"><th style="border: 1px solid #ddd; padding: 8px;">ディーラー</th><th style="border: 1px solid #ddd; padding: 8px; text-align: right;">使用額</th><th style="border: 1px solid #ddd; padding: 8px; text-align: right;">入荷額</th></tr>${Object.keys({...usageByDealer, ...stockInByDealer}).map(d => `<tr><td style="border: 1px solid #ddd; padding: 8px;">${d}</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right;">¥${(usageByDealer[d] || 0).toLocaleString()}</td><td style="border: 1px solid #ddd; padding: 8px; text-align: right;">¥${(stockInByDealer[d] || 0).toLocaleString()}</td></tr>`).join('')}</table>`
    const w = window.open('', '_blank'); w.document.write(`<!DOCTYPE html><html><head><title>月次レポート ${selectedMonth}</title><style>body { font-family: sans-serif; padding: 20px; }</style></head><body>${content}</body></html>`); w.document.close(); w.print()
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">📊 月次レポート</h3><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
        <div className="grid-2 gap-4 mb-4">
          <div className="bg-gray-50 p-4 rounded text-center"><div className="text-sm text-gray-600">売上目標</div><div className="text-xl font-bold">¥{targetSales.toLocaleString()}</div></div>
          <div className="bg-gray-50 p-4 rounded text-center"><div className="text-sm text-gray-600">仕入れ目標</div><div className="text-xl font-bold">¥{targetBudget.toLocaleString()}</div></div>
        </div>
        <div className="grid-2 gap-4 mb-4">
          <div className="bg-blue-50 p-4 rounded text-center"><div className="text-sm text-gray-600">材料使用額</div><div className="text-xl font-bold text-blue-600">¥{totalUsage.toLocaleString()}</div></div>
          <div className="bg-purple-50 p-4 rounded text-center"><div className="text-sm text-gray-600">入荷額</div><div className="text-xl font-bold text-purple-600">¥{totalStockIn.toLocaleString()}</div></div>
        </div>
        <button onClick={printReport} className="btn btn-blue w-full">PDF出力（印刷）</button>
      </div>
      <div className="card">
        <h4 className="font-bold mb-4">ディーラー別集計</h4>
        <div className="overflow-x-auto">
          <table><thead><tr><th>ディーラー</th><th className="text-right">使用額</th><th className="text-right">入荷額</th></tr></thead>
            <tbody>{Object.keys({...usageByDealer, ...stockInByDealer}).map(d => (<tr key={d}><td>{d}</td><td className="text-right text-blue-600">¥{(usageByDealer[d] || 0).toLocaleString()}</td><td className="text-right text-purple-600">¥{(stockInByDealer[d] || 0).toLocaleString()}</td></tr>))}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ==================== データ出力 ====================
function DataExport({ products, usage, stockIn, inventoryHistory, staff, timeRecords, leaveRequests, practiceReservations, contactNotes, staffPurchases, categories, dealerBudgets, dealerAllocations }) {
  const [exportType, setExportType] = useState('usage')
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

  const exportTypes = [
    { value: 'usage', label: '使用記録' },
    { value: 'stockIn', label: '入荷記録' },
    { value: 'inventory', label: '棚卸履歴' },
    { value: 'timeRecords', label: 'タイムカード' },
    { value: 'leaveRequests', label: '有給申請' },
    { value: 'practiceReservations', label: '練習予約' },
    { value: 'staffPurchases', label: 'スタッフ購入' },
    { value: 'products', label: '商品マスター' },
    { value: 'staff', label: 'スタッフマスター' }
  ]

  const filterByDate = (data, dateField) => data.filter(item => { const d = item[dateField]; return d && d >= startDate && d <= endDate })

  const generateCSV = (data, headers) => {
    if (data.length === 0) return ''
    const headerRow = headers.join(',')
    const rows = data.map(item => headers.map(h => { const v = item[h]; return typeof v === 'string' && v.includes(',') ? `"${v}"` : v ?? '' }).join(','))
    return [headerRow, ...rows].join('\n')
  }

  const downloadCSV = (csv, filename) => {
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    const blob = new Blob([bom, csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  const handleExport = () => {
    let data, headers, filename
    switch (exportType) {
      case 'usage':
        data = filterByDate(usage, 'date').map(u => ({ date: u.date, productName: u.productName, largeCategory: u.largeCategory, mediumCategory: u.mediumCategory, quantity: u.quantity, purchasePrice: u.purchasePrice, total: u.quantity * u.purchasePrice }))
        headers = ['date', 'productName', 'largeCategory', 'mediumCategory', 'quantity', 'purchasePrice', 'total']; filename = `usage_${startDate}_${endDate}.csv`; break
      case 'stockIn':
        data = filterByDate(stockIn, 'date').map(s => { const p = products.find(pr => pr.id === s.productId); return { date: s.date, productName: s.productName, largeCategory: s.largeCategory, quantity: s.quantity, purchasePrice: p?.purchasePrice || 0, total: s.quantity * (p?.purchasePrice || 0) } })
        headers = ['date', 'productName', 'largeCategory', 'quantity', 'purchasePrice', 'total']; filename = `stockin_${startDate}_${endDate}.csv`; break
      case 'inventory':
        data = inventoryHistory.flatMap(h => h.data.filter(d => d.quantity > 0).map(d => ({ date: h.date, staff: h.staff, productName: d.name, quantity: d.quantity, purchasePrice: d.purchasePrice, total: d.quantity * d.purchasePrice })))
        headers = ['date', 'staff', 'productName', 'quantity', 'purchasePrice', 'total']; filename = `inventory_${startDate}_${endDate}.csv`; break
      case 'timeRecords':
        data = filterByDate(timeRecords, 'date').map(r => ({ date: r.date, staff: r.staff, clockIn: r.clockIn, clockOut: r.clockOut || '' }))
        headers = ['date', 'staff', 'clockIn', 'clockOut']; filename = `timerecords_${startDate}_${endDate}.csv`; break
      case 'leaveRequests':
        data = leaveRequests.filter(r => r.startDate >= startDate && r.startDate <= endDate).map(r => ({ staffName: r.staffName, startDate: r.startDate, endDate: r.endDate, leaveType: r.leaveType, days: r.days, status: r.status, note: r.note || '' }))
        headers = ['staffName', 'startDate', 'endDate', 'leaveType', 'days', 'status', 'note']; filename = `leave_${startDate}_${endDate}.csv`; break
      case 'practiceReservations':
        data = filterByDate(practiceReservations, 'date').map(r => ({ date: r.date, time: r.time, staffName: r.staffName, menu: r.menu, model: r.model || '', note: r.note || '' }))
        headers = ['date', 'time', 'staffName', 'menu', 'model', 'note']; filename = `practice_${startDate}_${endDate}.csv`; break
      case 'staffPurchases':
        data = filterByDate(staffPurchases, 'date').map(p => ({ date: p.date, staff: p.staff, productName: p.productName, quantity: p.quantity, purchasePrice: p.purchasePrice, total: p.quantity * p.purchasePrice, saleTag: p.saleTag || '' }))
        headers = ['date', 'staff', 'productName', 'quantity', 'purchasePrice', 'total', 'saleTag']; filename = `staffpurchases_${startDate}_${endDate}.csv`; break
      case 'products':
        data = products.map(p => ({ id: p.id, name: p.name, largeCategory: p.largeCategory, mediumCategory: p.mediumCategory, purchasePrice: p.purchasePrice, sellingPrice: p.sellingPrice, productType: p.productType }))
        headers = ['id', 'name', 'largeCategory', 'mediumCategory', 'purchasePrice', 'sellingPrice', 'productType']; filename = `products_${new Date().toISOString().split('T')[0]}.csv`; break
      case 'staff':
        data = staff.map(s => ({ id: s.id, name: s.name, role: s.role, hiringDate: s.hiringDate || '' }))
        headers = ['id', 'name', 'role', 'hiringDate']; filename = `staff_${new Date().toISOString().split('T')[0]}.csv`; break
      default: return
    }
    if (data.length === 0) { alert('出力するデータがありません'); return }
    const csv = generateCSV(data, headers); downloadCSV(csv, filename); alert(`${data.length}件のデータを出力しました`)
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">📤 データ出力</h3>
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>出力データ</label><select value={exportType} onChange={e => setExportType(e.target.value)} className="select">{exportTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
          {!['products', 'staff'].includes(exportType) && (
            <div className="grid-2"><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>開始日</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" /></div><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>終了日</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input" /></div></div>
          )}
          <button onClick={handleExport} className="btn btn-green w-full py-3"><Icons.Download /> CSVダウンロード</button>
        </div>
      </div>
    </div>
  )
}

// ==================== ロス入力 ====================
function LossInput({ products, lossRecords, setLossRecords, lossPrices, currentUser }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [lossType, setLossType] = useState('color')
  const [staffName, setStaffName] = useState(currentUser)
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  const lossTypes = [{ value: 'color', label: 'カラーロス' }, { value: 'perm', label: 'パーマロス' }, { value: 'treatment', label: 'トリートメントロス' }, { value: 'other', label: 'その他' }]

  const addLoss = async () => {
    if (!amount || parseFloat(amount) <= 0) { alert('量を入力してください'); return }
    const priceInfo = lossPrices.find(p => p.lossType === lossType)
    const unitPrice = priceInfo?.unitPrice || 0
    const totalPrice = parseFloat(amount) * unitPrice
    const { data, error } = await supabase.from('loss_records').insert({ loss_date: date, loss_type: lossType, staff_name: staffName, amount: parseFloat(amount), unit_price: unitPrice, total_price: totalPrice, note }).select()
    if (!error && data) { setLossRecords([...lossRecords, { id: data[0].id, date, lossType, staffName, amount: parseFloat(amount), unitPrice, totalPrice, note }]); setAmount(''); setNote(''); alert('ロスを記録しました') }
  }
  const deleteLoss = async (id) => { if (!confirm('この記録を削除しますか？')) return; const { error } = await supabase.from('loss_records').delete().eq('id', id); if (!error) setLossRecords(lossRecords.filter(r => r.id !== id)) }
  const getTypeLabel = (type) => { const found = lossTypes.find(t => t.value === type); return found ? found.label : type }
  const monthlyLoss = lossRecords.filter(r => r.date?.startsWith(selectedMonth))
  const totalLoss = monthlyLoss.reduce((sum, r) => sum + r.totalPrice, 0)
  const lossByType = {}; monthlyLoss.forEach(r => { if (!lossByType[r.lossType]) lossByType[r.lossType] = 0; lossByType[r.lossType] += r.totalPrice })
  const currentPrice = lossPrices.find(p => p.lossType === lossType)?.unitPrice || 0

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">🗑️ ロス入力</h3><button onClick={() => setShowHistory(!showHistory)} className={`btn ${showHistory ? 'btn-blue' : 'btn-gray'}`}>{showHistory ? '入力に戻る' : '履歴'}</button></div>
        {!showHistory ? (
          <div className="space-y-4">
            <div className="grid-2"><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>日付</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" /></div><div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>種類</label><select value={lossType} onChange={e => setLossType(e.target.value)} className="select">{lossTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div></div>
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>量（g）</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="例: 50" className="input" min="0" step="0.1" /></div>
            {currentPrice > 0 && amount && (<div className="bg-blue-50 p-3 rounded text-center"><span className="text-gray-600">金額: </span><span className="text-xl font-bold text-blue-600">¥{(parseFloat(amount) * currentPrice).toLocaleString()}</span><span className="text-sm text-gray-500 ml-2">(@¥{currentPrice}/g)</span></div>)}
            <div><label className="text-sm font-semibold mb-1" style={{ display: 'block' }}>備考</label><input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="任意" className="input" /></div>
            <button onClick={addLoss} className="btn btn-blue w-full"><Icons.Plus /> 記録する</button>
          </div>
        ) : (
          <>
            <div className="mb-4"><input type="month" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)} className="input" style={{ width: 'auto' }} /></div>
            <div className="bg-red-50 p-4 rounded mb-4 text-center"><div className="text-sm text-gray-600">今月のロス合計</div><div className="text-2xl font-bold text-red-600">¥{totalLoss.toLocaleString()}</div></div>
            <div className="grid-2 gap-2 mb-4">{Object.entries(lossByType).map(([type, total]) => (<div key={type} className="bg-gray-50 p-2 rounded text-center"><div className="text-xs text-gray-500">{getTypeLabel(type)}</div><div className="font-bold">¥{total.toLocaleString()}</div></div>))}</div>
            <div className="overflow-x-auto">
              <table className="text-sm"><thead><tr><th>日付</th><th>種類</th><th>スタッフ</th><th className="text-right">量</th><th className="text-right">金額</th><th>操作</th></tr></thead>
                <tbody>{monthlyLoss.sort((a, b) => b.date.localeCompare(a.date)).map(r => (<tr key={r.id}><td>{r.date}</td><td>{getTypeLabel(r.lossType)}</td><td>{r.staffName}</td><td className="text-right">{r.amount}g</td><td className="text-right">¥{r.totalPrice.toLocaleString()}</td><td><button onClick={() => deleteLoss(r.id)} className="text-red-500 text-sm">削除</button></td></tr>))}</tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ==================== ロス単価設定 ====================
function LossPriceSettings({ lossPrices, setLossPrices, isAdmin }) {
  const [editingType, setEditingType] = useState(null)
  const [editPrice, setEditPrice] = useState('')

  const lossTypes = [{ value: 'color', label: 'カラーロス' }, { value: 'perm', label: 'パーマロス' }, { value: 'treatment', label: 'トリートメントロス' }, { value: 'other', label: 'その他' }]

  const startEdit = (type, currentPrice) => { setEditingType(type); setEditPrice(currentPrice?.toString() || '0') }
  const saveEdit = async (type) => {
    const existing = lossPrices.find(p => p.lossType === type)
    if (existing) { const { error } = await supabase.from('loss_prices').update({ unit_price: parseFloat(editPrice) || 0 }).eq('id', existing.id); if (!error) setLossPrices(lossPrices.map(p => p.lossType === type ? { ...p, unitPrice: parseFloat(editPrice) || 0 } : p)) }
    else { const { data, error } = await supabase.from('loss_prices').insert({ loss_type: type, unit_price: parseFloat(editPrice) || 0 }).select(); if (!error && data) setLossPrices([...lossPrices, { id: data[0].id, lossType: type, unitPrice: parseFloat(editPrice) || 0 }]) }
    setEditingType(null)
  }
  const getPrice = (type) => { const found = lossPrices.find(p => p.lossType === type); return found ? found.unitPrice : 0 }

  return (
    <div className="space-y-4">
      <div className="card">
        <h3 className="text-lg font-bold mb-4">⚙️ ロス単価設定</h3>
        <p className="text-sm text-gray-600 mb-4">各ロスタイプの1gあたりの単価を設定します</p>
        <div className="space-y-3">
          {lossTypes.map(t => (
            <div key={t.value} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-semibold">{t.label}</span>
              {editingType === t.value ? (
                <div className="flex items-center gap-2">
                  <span>¥</span><input type="number" value={editPrice} onChange={e => setEditPrice(e.target.value)} className="input" style={{ width: '100px' }} min="0" /><span>/g</span>
                  <button onClick={() => saveEdit(t.value)} className="btn btn-green btn-sm">保存</button><button onClick={() => setEditingType(null)} className="btn btn-gray btn-sm">取消</button>
                </div>
              ) : (
                <div className="flex items-center gap-2"><span className="text-lg font-bold">¥{getPrice(t.value).toLocaleString()}/g</span>{isAdmin && <button onClick={() => startEdit(t.value, getPrice(t.value))} className="btn btn-blue btn-sm">編集</button>}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ==================== アプリ設定 ====================
function AppSettings({ appSettings, setAppSettings, isAdmin }) {
  const [editSettings, setEditSettings] = useState({ ...appSettings })
  const [isEditing, setIsEditing] = useState(false)

  const saveSettings = async () => {
    const { error } = await supabase.from('app_settings').upsert({ id: 1, salon_name: editSettings.salonName, regular_holidays: editSettings.regularHolidays, business_hours_start: editSettings.businessHoursStart, business_hours_end: editSettings.businessHoursEnd })
    if (!error) { setAppSettings(editSettings); setIsEditing(false); alert('設定を保存しました') }
  }

  const holidays = [{ value: 'monday', label: '月曜' }, { value: 'tuesday', label: '火曜' }, { value: 'wednesday', label: '水曜' }, { value: 'thursday', label: '木曜' }, { value: 'friday', label: '金曜' }, { value: 'saturday', label: '土曜' }, { value: 'sunday', label: '日曜' }]

  const toggleHoliday = (day) => { const current = editSettings.regularHolidays || []; if (current.includes(day)) setEditSettings({ ...editSettings, regularHolidays: current.filter(d => d !== day) }); else setEditSettings({ ...editSettings, regularHolidays: [...current, day] }) }

  return (
    <div className="space-y-4">
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">⚙️ アプリ設定</h3>
          {isAdmin && (!isEditing ? (<button onClick={() => setIsEditing(true)} className="btn btn-blue">編集</button>) : (<div className="flex gap-2"><button onClick={saveSettings} className="btn btn-green">保存</button><button onClick={() => { setIsEditing(false); setEditSettings({ ...appSettings }) }} className="btn btn-gray">取消</button></div>))}
        </div>
        <div className="space-y-4">
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>サロン名</label>{isEditing ? (<input type="text" value={editSettings.salonName || ''} onChange={e => setEditSettings({ ...editSettings, salonName: e.target.value })} className="input" />) : (<p className="text-lg">{appSettings.salonName || '未設定'}</p>)}</div>
          <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>定休日</label>{isEditing ? (<div className="flex flex-wrap gap-2">{holidays.map(h => (<button key={h.value} onClick={() => toggleHoliday(h.value)} className={`btn btn-sm ${(editSettings.regularHolidays || []).includes(h.value) ? 'btn-blue' : 'btn-gray'}`}>{h.label}</button>))}</div>) : (<p>{(appSettings.regularHolidays || []).map(d => holidays.find(h => h.value === d)?.label).join('、') || '未設定'}</p>)}</div>
          <div className="grid-2">
            <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>営業開始</label>{isEditing ? (<input type="time" value={editSettings.businessHoursStart || ''} onChange={e => setEditSettings({ ...editSettings, businessHoursStart: e.target.value })} className="input" />) : (<p>{appSettings.businessHoursStart || '未設定'}</p>)}</div>
            <div><label className="text-sm font-semibold mb-2" style={{ display: 'block' }}>営業終了</label>{isEditing ? (<input type="time" value={editSettings.businessHoursEnd || ''} onChange={e => setEditSettings({ ...editSettings, businessHoursEnd: e.target.value })} className="input" />) : (<p>{appSettings.businessHoursEnd || '未設定'}</p>)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
