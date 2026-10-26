import { useState, useEffect, type FormEvent } from 'react'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '@/lib/firebase'
import {
  getAllRolesAdmin,
  createJobRole,
  updateJobRole,
  deleteJobRole,
  type ManagedJobRole,
} from '@/lib/careersService'
import {
  Briefcase,
  Plus,
  Trash2,
  Edit3,
  LogOut,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Building2,
  MapPin,
  Clock,
  Layers,
  Lock,
  Mail,
  Key,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const COMMON_DEPTS = ['Engineering', 'Design', 'Growth', 'Product', 'Marketing', 'Operations', 'Sales']
const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']

interface RoleFormState {
  id?: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  responsibilitiesText: string
  requirementsText: string
  active: boolean
}

const emptyForm: RoleFormState = {
  title: '',
  department: 'Engineering',
  location: 'Coimbatore / Remote',
  type: 'Full-time',
  experience: '3+ years',
  description: '',
  responsibilitiesText: '',
  requirementsText: '',
  active: true,
}

export default function AdminPage() {
  const isConfigured = isFirebaseConfigured()
  const [user, setUser] = useState<User | null>(null)
  const [authChecking, setAuthChecking] = useState<boolean>(true)

  // Login form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [resetSent, setResetSent] = useState(false)

  // Roles management state
  const [roles, setRoles] = useState<ManagedJobRole[]>([])
  const [loadingRoles, setLoadingRoles] = useState(false)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [formState, setFormState] = useState<RoleFormState>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  // Auth state listener
  useEffect(() => {
    if (!isConfigured || !auth) {
      setAuthChecking(false)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setAuthChecking(false)
    })

    return () => unsubscribe()
  }, [isConfigured])

  // Load roles whenever user is authenticated
  const fetchRoles = async () => {
    setLoadingRoles(true)
    try {
      const data = await getAllRolesAdmin()
      setRoles(data)
    } catch (err) {
      console.error(err)
      showToast('Failed to load roles')
    } finally {
      setLoadingRoles(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRoles()
    }
  }, [user])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  // Handle Login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    if (!auth) return
    setLoginLoading(true)
    setLoginError(null)

    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Invalid credentials. Please verify your email and password.'
      setLoginError(errorMsg)
    } finally {
      setLoginLoading(false)
    }
  }

  // Handle Logout
  const handleLogout = async () => {
    if (auth) {
      await signOut(auth)
      setUser(null)
    }
  }

  // Handle Password Reset
  const handleResetPassword = async () => {
    if (!email) {
      setLoginError('Please enter your email address to reset password.')
      return
    }
    if (!auth) return

    try {
      await sendPasswordResetEmail(auth, email)
      setResetSent(true)
      showToast('Password reset link sent to your email.')
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Could not send reset email.')
    }
  }

  // Open modal to add a new role
  const handleOpenAdd = () => {
    setFormState(emptyForm)
    setRoleModalOpen(true)
  }

  // Open modal to edit an existing role
  const handleOpenEdit = (role: ManagedJobRole) => {
    setFormState({
      id: role.id,
      title: role.title,
      department: role.department,
      location: role.location,
      type: role.type,
      experience: role.experience,
      description: role.description,
      responsibilitiesText: (role.responsibilities || []).join('\n'),
      requirementsText: (role.requirements || []).join('\n'),
      active: role.active !== false,
    })
    setRoleModalOpen(true)
  }

  // Save role (Create or Update)
  const handleSaveRole = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const responsibilities = formState.responsibilitiesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const requirements = formState.requirementsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)

    const payload = {
      title: formState.title.trim(),
      department: formState.department.trim(),
      location: formState.location.trim(),
      type: formState.type.trim(),
      experience: formState.experience.trim(),
      description: formState.description.trim(),
      responsibilities,
      requirements,
      active: formState.active,
    }

    try {
      if (formState.id) {
        await updateJobRole(formState.id, payload)
        showToast(`Role "${payload.title}" updated successfully!`)
      } else {
        await createJobRole(payload)
        showToast(`Role "${payload.title}" created successfully!`)
      }
      setRoleModalOpen(false)
      fetchRoles()
    } catch (err) {
      console.error(err)
      showToast('Failed to save role. Please check console.')
    } finally {
      setSaving(false)
    }
  }

  // Toggle active status
  const handleToggleActive = async (role: ManagedJobRole) => {
    const nextStatus = !role.active
    try {
      await updateJobRole(role.id, { active: nextStatus })
      showToast(`Position is now ${nextStatus ? 'Live on Careers page' : 'Hidden (Draft)'}`)
      fetchRoles()
    } catch (err) {
      console.error(err)
      showToast('Failed to update status')
    }
  }

  // Delete role
  const handleDeleteRole = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete the position "${title}"?`)) {
      return
    }

    try {
      await deleteJobRole(id)
      showToast(`Role "${title}" deleted.`)
      fetchRoles()
    } catch (err) {
      console.error(err)
      showToast('Failed to delete role')
    }
  }

  if (authChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c100e] text-white">
        <div className="flex items-center gap-3 text-white/70">
          <RefreshCw className="size-5 animate-spin text-brand" />
          <span>Loading portal...</span>
        </div>
      </div>
    )
  }

  const isAuthenticated = Boolean(user)

  return (
    <div className="min-h-screen bg-[#0c100e] text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-brand/30 bg-[#131915]/95 px-5 py-3 shadow-2xl backdrop-blur-md">
          <CheckCircle2 className="size-5 text-brand" />
          <span className="text-sm font-medium text-white">{toastMessage}</span>
        </div>
      )}

      {/* LOGIN VIEW */}
      {!isAuthenticated ? (
        <div className="container-x flex min-h-screen flex-col items-center justify-center py-16">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#131915] p-8 shadow-2xl md:p-10">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/20">
                <Lock className="size-6" />
              </div>
              <h1 className="font-display text-2xl font-bold tracking-tight">Akodefy HR Portal</h1>
              <p className="mt-2 text-sm text-white/50">
                Sign in with your HR credentials to manage hiring positions.
              </p>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-sm text-red-400">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {resetSent && (
              <div className="mb-6 flex items-start gap-3 rounded-lg border border-brand/20 bg-brand/10 p-3.5 text-sm text-brand">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                <span>Password reset link sent! Check your inbox.</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                  Email address
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hr@akodefy.com"
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 transition focus:border-brand focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/50">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-xs text-brand hover:underline"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Key className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/30" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-10 text-sm text-white placeholder-white/20 transition focus:border-brand focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-[#0c100e] transition hover:bg-brand/90 disabled:opacity-50"
              >
                {loginLoading ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Sign In to Portal</span>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <a
                href="/careers"
                className="inline-flex items-center gap-1.5 text-xs text-white/40 transition hover:text-white"
              >
                <span>Back to public website</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* AUTHENTICATED PORTAL VIEW */
        <div className="min-h-screen">
          {/* Top Bar */}
          <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0c100e]/85 backdrop-blur-md">
            <div className="container-x flex h-16 items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/20">
                  <Briefcase className="size-5" />
                </span>
                <div>
                  <h1 className="font-display text-base font-semibold leading-none">
                    Akodefy Careers
                  </h1>
                  <span className="text-[11px] text-white/50">HR Hiring Management Portal</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user?.email && (
                  <span className="hidden text-xs text-white/60 sm:inline-block">
                    {user.email}
                  </span>
                )}
                <a
                  href="/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  <Eye className="size-3.5" />
                  <span>View Careers Page</span>
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 hover:border-red-500/30"
                >
                  <LogOut className="size-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </header>

          <main className="container-x py-10">
            {/* Quick Stats & Actions Banner */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
                <div className="flex items-center justify-between text-white/50">
                  <span className="text-xs font-medium uppercase tracking-wider">Total Positions</span>
                  <Layers className="size-4" />
                </div>
                <p className="mt-3 font-display text-3xl font-bold">{roles.length}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
                <div className="flex items-center justify-between text-white/50">
                  <span className="text-xs font-medium uppercase tracking-wider">Live & Active</span>
                  <CheckCircle2 className="size-4 text-brand" />
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-brand">
                  {roles.filter((r) => r.active !== false).length}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#131915] p-5">
                <div className="flex items-center justify-between text-white/50">
                  <span className="text-xs font-medium uppercase tracking-wider">Draft / Hidden</span>
                  <EyeOff className="size-4 text-white/40" />
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-white/60">
                  {roles.filter((r) => r.active === false).length}
                </p>
              </div>

              <div className="flex flex-col justify-center rounded-2xl border border-brand/20 bg-brand/5 p-5">
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3 text-sm font-semibold text-[#0c100e] transition hover:bg-white"
                >
                  <Plus className="size-4 stroke-[2.5]" />
                  <span>Post New Role</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/40 mr-1">
                  Department:
                </span>
                {['All', ...Array.from(new Set(roles.map((r) => r.department)))].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDeptFilter(d)}
                    className={cn(
                      'rounded-full px-3.5 py-1 text-xs font-medium transition',
                      deptFilter === d
                        ? 'bg-brand text-[#0c100e]'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search positions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#131915] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-brand focus:outline-none"
                />
              </div>
            </div>

            {/* Roles List */}
            {loadingRoles ? (
              <div className="flex h-64 items-center justify-center rounded-2xl border border-white/10 bg-[#131915]">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <RefreshCw className="size-4 animate-spin text-brand" />
                  <span>Fetching roles from Firestore...</span>
                </div>
              </div>
            ) : roles.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#131915] p-8 text-center">
                <Briefcase className="size-10 text-white/20" />
                <h3 className="mt-4 font-display text-base font-semibold">No job roles posted yet</h3>
                <p className="mt-1 text-xs text-white/50">
                  Click the "Post New Role" button above to add your first position.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {roles
                  .filter((r) => {
                    const matchesDept = deptFilter === 'All' || r.department === deptFilter
                    const matchesSearch =
                      !searchQuery ||
                      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      r.location.toLowerCase().includes(searchQuery.toLowerCase())
                    return matchesDept && matchesSearch
                  })
                  .map((role) => (
                    <div
                      key={role.id}
                      className="group flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-[#131915] p-6 transition-all hover:border-white/20 md:flex-row md:items-center"
                    >
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="font-display text-lg font-semibold tracking-tight text-white group-hover:text-brand transition-colors">
                            {role.title}
                          </h3>
                          <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60 ring-1 ring-white/10">
                            {role.type}
                          </span>
                          <span
                            className={cn(
                              'rounded-full px-2.5 py-0.5 text-xs font-medium ring-1',
                              role.active !== false
                                ? 'bg-brand/10 text-brand ring-brand/20'
                                : 'bg-white/5 text-white/40 ring-white/10'
                            )}
                          >
                            {role.active !== false ? 'Live' : 'Draft'}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-white/50">
                          <span className="flex items-center gap-1.5">
                            <Building2 className="size-3.5 text-brand" />
                            {role.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="size-3.5" />
                            {role.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {role.experience}
                          </span>
                        </div>

                        <p className="line-clamp-2 max-w-2xl text-xs text-white/60 leading-relaxed">
                          {role.description}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(role)}
                          title={role.active !== false ? 'Pause/Hide Position' : 'Publish Position'}
                          className={cn(
                            'rounded-xl border p-2.5 text-xs transition',
                            role.active !== false
                              ? 'border-brand/30 bg-brand/10 text-brand hover:bg-brand/20'
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                          )}
                        >
                          {role.active !== false ? (
                            <Eye className="size-4" />
                          ) : (
                            <EyeOff className="size-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(role)}
                          title="Edit Position"
                          className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-xs text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                          <Edit3 className="size-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteRole(role.id, role.title)}
                          title="Delete Position"
                          className="rounded-xl border border-red-500/20 bg-red-500/5 p-2.5 text-xs text-red-400 transition hover:bg-red-500/20 hover:border-red-500/40"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </main>

          {/* CREATE / EDIT ROLE MODAL */}
          {roleModalOpen && (
            <div
              data-lenis-prevent
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-sm"
            >
              <div
                data-lenis-prevent
                className="relative flex flex-col h-[90vh] max-h-[820px] w-full max-w-2xl rounded-3xl border border-white/15 bg-[#131915] shadow-2xl overflow-hidden"
              >
                {/* Fixed Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">
                      {formState.id ? 'Edit Position' : 'Post New Position'}
                    </h2>
                    <p className="text-xs text-white/50">
                      Fill in the details below. This will update the live careers page instantly.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRoleModalOpen(false)}
                    className="rounded-full bg-white/5 p-2 text-white/50 transition hover:bg-white/10 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Form with Scrollable Content and Pinned Footer */}
                <form onSubmit={handleSaveRole} className="flex flex-col flex-1 overflow-hidden min-h-0">
                  {/* Scrollable Form Body (hidden scrollbar) */}
                  <div
                    data-lenis-prevent
                    className="flex-1 overflow-y-auto px-6 py-5 space-y-4 md:px-8 no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {/* Title & Department */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Position Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.title}
                          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                          placeholder="e.g. Senior Frontend Engineer"
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Department *
                        </label>
                        <input
                          type="text"
                          required
                          list="depts-list"
                          value={formState.department}
                          onChange={(e) =>
                            setFormState({ ...formState, department: e.target.value })
                          }
                          placeholder="e.g. Engineering, Design"
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                        />
                        <datalist id="depts-list">
                          {COMMON_DEPTS.map((d) => (
                            <option key={d} value={d} />
                          ))}
                        </datalist>
                      </div>
                    </div>

                    {/* Type, Location, Experience */}
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Employment Type
                        </label>
                        <select
                          value={formState.type}
                          onChange={(e) => setFormState({ ...formState, type: e.target.value })}
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-brand focus:outline-none"
                        >
                          {JOB_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-[#131915]">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Location
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.location}
                          onChange={(e) =>
                            setFormState({ ...formState, location: e.target.value })
                          }
                          placeholder="Coimbatore / Remote"
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Experience
                        </label>
                        <input
                          type="text"
                          required
                          value={formState.experience}
                          onChange={(e) =>
                            setFormState({ ...formState, experience: e.target.value })
                          }
                          placeholder="3+ years"
                          className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                        Role Overview / Summary *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({ ...formState, description: e.target.value })
                        }
                        placeholder="Give candidates a 2-3 sentence overview of this position and what they will build..."
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-sm text-white placeholder-white/20 focus:border-brand focus:outline-none"
                      />
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Key Responsibilities
                        </label>
                        <span className="text-[11px] text-white/40">Enter 1 item per line</span>
                      </div>
                      <textarea
                        rows={4}
                        value={formState.responsibilitiesText}
                        onChange={(e) =>
                          setFormState({ ...formState, responsibilitiesText: e.target.value })
                        }
                        placeholder="Lead architecture decisions&#10;Mentor engineers&#10;Uphold code quality..."
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs text-white placeholder-white/20 focus:border-brand focus:outline-none font-mono"
                      />
                    </div>

                    {/* Requirements */}
                    <div>
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-white/60">
                          Requirements / Qualifications
                        </label>
                        <span className="text-[11px] text-white/40">Enter 1 item per line</span>
                      </div>
                      <textarea
                        rows={4}
                        value={formState.requirementsText}
                        onChange={(e) =>
                          setFormState({ ...formState, requirementsText: e.target.value })
                        }
                        placeholder="Deep expertise in TypeScript & React&#10;Experience with Next.js App Router&#10;Strong communication skills..."
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs text-white placeholder-white/20 focus:border-brand focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Pinned Bottom Footer with Draft/Live switch and Actions */}
                  <div className="shrink-0 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#0e1410] px-6 py-4 md:px-8">
                    {/* Publish / Draft Toggle */}
                    <label
                      htmlFor="role-active-check"
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        id="role-active-check"
                        checked={formState.active}
                        onChange={(e) =>
                          setFormState({ ...formState, active: e.target.checked })
                        }
                        className="size-4 rounded border-white/20 bg-black accent-brand cursor-pointer"
                      />
                      <span className="text-xs font-medium">
                        {formState.active ? (
                          <span className="text-brand flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-brand" />
                            Live on Careers page
                          </span>
                        ) : (
                          <span className="text-white/50 flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-white/40" />
                            Save as Draft (Hidden)
                          </span>
                        )}
                      </span>
                    </label>

                    {/* Buttons */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setRoleModalOpen(false)}
                        className="rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 rounded-xl bg-brand px-5 py-2 text-xs font-semibold text-[#0c100e] transition hover:bg-white disabled:opacity-50"
                      >
                        {saving ? (
                          <>
                            <RefreshCw className="size-3.5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>{formState.id ? 'Save Changes' : 'Create Position'}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
