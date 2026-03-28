import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema, registerSchema, type LoginFormData, type RegisterFormData } from './Auth.schemas'
import logo from '@/assets/logo.png'
import { Mail, Lock, User, ArrowLeft, ShoppingBag, Sparkles, Heart } from 'lucide-react'
import { useLogin } from '@/services/auth/auth.hooks'
import { register } from '@/services/auth/auth'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

type FieldErrors = Record<string, string>

function useIsLgBreakpoint() {
    const [isLg, setIsLg] = useState(() =>
        typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : false,
    )

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)')
        const onChange = () => setIsLg(mq.matches)
        mq.addEventListener('change', onChange)
        return () => mq.removeEventListener('change', onChange)
    }, [])

    return isLg
}

function getZodErrors(error: unknown): FieldErrors {
    const errors: FieldErrors = {}
    if (error && typeof error === 'object' && 'issues' in error) {
        const zodError = error as { issues: Array<{ path: (string | number)[]; message: string }> }
        for (const issue of zodError.issues) {
            const key = issue.path.join('.')
            if (!errors[key]) {
                errors[key] = issue.message
            }
        }
    }
    return errors
}

export const AuthPage = () => {
    const isLg = useIsLgBreakpoint()
    const navigate = useNavigate()
    const { mutateAsync: loginMutation } = useLogin()
    const { setSession, isAuthenticated } = useAuth()
    const [searchParams, setSearchParams] = useSearchParams()
    const mode = searchParams.get('mode') === 'register' ? 'register' : 'login'
    const isRegister = mode === 'register'

    const [loginData, setLoginData] = useState<LoginFormData>({ identifier: '', password: '' })
    const [registerData, setRegisterData] = useState<RegisterFormData>({
        username: '', email: '', password: '', confirmPassword: '',
    })
    const [loginErrors, setLoginErrors] = useState<FieldErrors>({})
    const [registerErrors, setRegisterErrors] = useState<FieldErrors>({})

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true })
        }
    }, [isAuthenticated, navigate])

    const switchToRegister = () => {
        setSearchParams({ mode: 'register' }, { replace: true })
        setLoginErrors({})
    }

    const switchToLogin = () => {
        setSearchParams({}, { replace: true })
        setRegisterErrors({})
    }

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const result = loginSchema.safeParse(loginData)
        if (!result.success) {
            setLoginErrors(getZodErrors(result.error))
            return
        }
        setLoginErrors({})
        try {
            const response = await loginMutation({ identifier: result.data.identifier, password: result.data.password })
            if (!response.user.confirmed) {
                setLoginErrors({ root: 'Conta não confirmada. Verifique seu email para confirmar.' })
                return
            }
            setSession(response)
            navigate('/')
        } catch (error) {
            setLoginErrors({ root: 'Credenciais inválidas.' })
        } finally {
            setLoginData({ identifier: '', password: '' })
        }
    }

    const handleRegisterSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const result = registerSchema.safeParse(registerData)
        if (!result.success) {
            setRegisterErrors(getZodErrors(result.error))
            return
        }
        setRegisterErrors({})
        try {
            const response = await register({ username: result.data.username, email: result.data.email, password: result.data.password })
            if (!response.user.confirmed) {
                setRegisterErrors({ root: 'Conta não confirmada. Verifique seu email para confirmar.' })
                return
            }
            setSession(response)
            navigate('/')
        } catch (error) {
            setRegisterErrors({ root: 'Erro ao criar conta.' })
        } finally {
            setRegisterData({ username: '', email: '', password: '', confirmPassword: '' })
        }
        setRegisterData({ username: '', email: '', password: '', confirmPassword: '' })
    }

    return (
        <div className="min-h-screen w-full flex max-lg:items-start lg:items-center justify-center bg-gradient-to-br from-rose-50 via-white to-pink-50 font-poppins px-3 sm:px-4 py-8 pt-16 sm:pt-8 pb-10 sm:pb-8 overflow-x-hidden">

            <Link
                to="/"
                className="absolute top-4 left-4 z-50 flex items-center gap-2 text-sm text-gray-500 hover:text-pink-light transition-colors duration-300 sm:top-6 sm:left-6"
            >
                <ArrowLeft className="w-4 h-4" />
                Voltar
            </Link>


            <div
                className="relative w-full max-w-[900px] bg-white rounded-2xl shadow-2xl shadow-pink-light/10 overflow-hidden flex flex-col lg:flex-row lg:min-h-[560px] min-w-0"
            >

                <div
                    className={cn(
                        'w-full min-w-0 lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 transition-all duration-700 ease-in-out',
                        isRegister && 'max-lg:hidden',
                    )}
                    style={
                        isLg
                            ? {
                                  opacity: isRegister ? 0 : 1,
                                  pointerEvents: isRegister ? 'none' : 'auto',
                                  transform: isRegister ? 'translateX(-20%)' : 'translateX(0)',
                              }
                            : undefined
                    }
                >
                    <div className="w-full max-w-sm space-y-6">
                        <div className="flex flex-col items-center gap-2">
                            <img src={logo} alt="V-Bags Logo" className="w-12 h-12" />
                            <h1 className="text-2xl font-light tracking-tight text-gray-900">
                                Bem-vinda de volta
                            </h1>
                            <p className="text-gray-400 text-xs">Entre na sua conta para continuar</p>
                        </div>

                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            {loginErrors.root && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center">
                                    {loginErrors.root}
                                </div>
                            )}
                            <div className="space-y-1.5">
                                <Label htmlFor="login-email" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={loginData.identifier}
                                        onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })}
                                        className="pl-10 h-11 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                    />
                                </div>
                                {loginErrors.identifier && (
                                    <p className="text-xs text-red-500 mt-0.5">{loginErrors.identifier}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="login-password" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="pl-10 h-11 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                    />
                                </div>
                                {loginErrors.password && (
                                    <p className="text-xs text-red-500 mt-0.5">{loginErrors.password}</p>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button type="button" className="text-xs text-pink-light hover:text-pink-dark transition-colors cursor-pointer">
                                    Esqueceu a senha?
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-light to-pink-dark hover:from-pink-dark hover:to-pink-light text-white font-medium shadow-lg shadow-pink-light/25 transition-all duration-500 cursor-pointer text-sm"
                            >
                                Entrar
                            </Button>
                        </form>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Não tem conta?{' '}
                                <button
                                    type="button"
                                    onClick={switchToRegister}
                                    className="text-pink-light hover:text-pink-dark font-semibold transition-colors cursor-pointer"
                                >
                                    Cadastre-se
                                </button>
                            </p>
                        </div>
                    </div>
                </div>


                <div
                    className={cn(
                        'w-full min-w-0 lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 transition-all duration-700 ease-in-out',
                        !isRegister && 'max-lg:hidden',
                    )}
                    style={
                        isLg
                            ? {
                                  opacity: isRegister ? 1 : 0,
                                  pointerEvents: isRegister ? 'auto' : 'none',
                                  transform: isRegister ? 'translateX(0)' : 'translateX(20%)',
                              }
                            : undefined
                    }
                >
                    <div className="w-full max-w-sm space-y-5">
                        <div className="flex flex-col items-center gap-2">
                            <img src={logo} alt="V-Bags Logo" className="w-12 h-12" />
                            <h1 className="text-2xl font-light tracking-tight text-gray-900">
                                Crie sua conta
                            </h1>
                            <p className="text-gray-400 text-xs">Junte-se à V-Bags</p>
                        </div>

                        <form onSubmit={handleRegisterSubmit} className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="register-name" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                    Nome
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="register-name"
                                        type="text"
                                        placeholder="Seu nome completo"
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                        className="pl-10 h-10 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                    />
                                </div>
                                {registerErrors.name && (
                                    <p className="text-xs text-red-500">{registerErrors.name}</p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="register-email" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        id="register-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                        className="pl-10 h-10 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                    />
                                </div>
                                {registerErrors.email && (
                                    <p className="text-xs text-red-500">{registerErrors.email}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                    <Label htmlFor="register-password" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                        Senha
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="register-password"
                                            type="password"
                                            placeholder="••••••"
                                            value={registerData.password}
                                            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                            className="pl-10 h-10 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                        />
                                    </div>
                                    {registerErrors.password && (
                                        <p className="text-xs text-red-500">{registerErrors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="register-confirm" className="text-gray-600 text-xs uppercase tracking-wider font-medium">
                                        Confirmar
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            id="register-confirm"
                                            type="password"
                                            placeholder="••••••"
                                            value={registerData.confirmPassword}
                                            onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                                            className="pl-10 h-10 rounded-xl border-gray-200 focus-visible:border-pink-light focus-visible:ring-pink-light/20 transition-all duration-300"
                                        />
                                    </div>
                                    {registerErrors.confirmPassword && (
                                        <p className="text-xs text-red-500">{registerErrors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-dark to-pink-light hover:from-pink-light hover:to-pink-dark text-white font-medium shadow-lg shadow-pink-light/25 transition-all duration-500 cursor-pointer text-sm"
                            >
                                Criar Conta
                            </Button>
                        </form>

                        <div className="text-center">
                            <p className="text-sm text-gray-400">
                                Já tem conta?{' '}
                                <button
                                    type="button"
                                    onClick={switchToLogin}
                                    className="text-pink-light hover:text-pink-dark font-semibold transition-colors cursor-pointer"
                                >
                                    Faça login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>


                <div
                    className={cn(
                        'z-20 shrink-0 transition-transform duration-700 ease-in-out',
                        'relative w-full max-lg:min-h-0 max-lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:w-1/2 lg:h-full lg:min-h-0',
                    )}
                    style={
                        isLg
                            ? {
                                  right: 0,
                                  transform: isRegister ? 'translateX(-100%)' : 'translateX(0)',
                              }
                            : undefined
                    }
                >
                    <div className="relative w-full max-lg:min-h-0 max-lg:h-auto max-lg:overflow-visible lg:h-full lg:overflow-hidden lg:rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-light via-rose-400 to-pink-dark" />


                        <div className="absolute inset-0">
                            <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/10 blur-2xl animate-pulse" />
                            <div className="absolute bottom-16 right-8 w-48 h-48 rounded-full bg-white/8 blur-3xl" />
                            <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/5 blur-xl" />
                            <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white/10 blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
                        </div>


                        <div
                            className={cn(
                                'flex items-center justify-center transition-all duration-700 ease-in-out px-4 py-8 sm:px-8',
                                'max-lg:relative max-lg:inset-auto max-lg:min-h-0 max-lg:w-full max-lg:pb-2',
                                'lg:absolute lg:inset-0',
                            )}
                            style={
                                isLg
                                    ? {
                                          opacity: isRegister ? 0 : 1,
                                          transform: isRegister ? 'translateX(30%)' : 'translateX(0)',
                                          pointerEvents: isRegister ? 'none' : 'auto',
                                      }
                                    : {
                                          display: isRegister ? 'none' : 'flex',
                                      }
                            }
                        >
                            <div className="relative z-10 text-center text-white px-2 sm:px-8 space-y-4 sm:space-y-6 max-w-md mx-auto w-full">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-light leading-tight">
                                        Descubra sua <br />
                                        <span className="font-semibold">bolsa perfeita</span>
                                    </h2>
                                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                                        Explore nossa coleção exclusiva com designs únicos e materiais premium.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4 sm:gap-5 pt-1 sm:pt-2">
                                    <div className="flex flex-col items-center gap-1">
                                        <Sparkles className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Premium</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20" />
                                    <div className="flex flex-col items-center gap-1">
                                        <Heart className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Exclusivo</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20" />
                                    <div className="flex flex-col items-center gap-1">
                                        <ShoppingBag className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Estilo</span>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={switchToRegister}
                                    className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/25 rounded-xl px-8 h-10 font-medium transition-all duration-300 cursor-pointer text-sm"
                                >
                                    Criar Conta
                                </Button>
                            </div>
                        </div>


                        <div
                            className={cn(
                                'flex items-center justify-center transition-all duration-700 ease-in-out px-4 py-8 sm:px-8',
                                'max-lg:relative max-lg:inset-auto max-lg:min-h-0 max-lg:w-full max-lg:pb-2',
                                'lg:absolute lg:inset-0',
                            )}
                            style={
                                isLg
                                    ? {
                                          opacity: isRegister ? 1 : 0,
                                          transform: isRegister ? 'translateX(0)' : 'translateX(-30%)',
                                          pointerEvents: isRegister ? 'auto' : 'none',
                                      }
                                    : {
                                          display: isRegister ? 'flex' : 'none',
                                      }
                            }
                        >
                            <div className="relative z-10 text-center text-white px-2 sm:px-8 space-y-4 sm:space-y-6 max-w-md mx-auto w-full">
                                <div className="flex justify-center">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                                        <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2 sm:space-y-3">
                                    <h2 className="text-2xl sm:text-3xl font-light leading-tight">
                                        Já faz parte <br />
                                        <span className="font-semibold">da família?</span>
                                    </h2>
                                    <p className="text-white/75 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto">
                                        Faça login para acompanhar seus pedidos e descobrir novidades exclusivas.
                                    </p>
                                </div>
                                <div className="flex justify-center gap-4 sm:gap-5 pt-1 sm:pt-2">
                                    <div className="flex flex-col items-center gap-1">
                                        <ShoppingBag className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Pedidos</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20" />
                                    <div className="flex flex-col items-center gap-1">
                                        <Heart className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Favoritos</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/20" />
                                    <div className="flex flex-col items-center gap-1">
                                        <Sparkles className="w-4 h-4 text-white/60" />
                                        <span className="text-[10px] text-white/60">Ofertas</span>
                                    </div>
                                </div>
                                <Button
                                    type="button"
                                    onClick={switchToLogin}
                                    className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white border border-white/25 rounded-xl px-8 h-10 font-medium transition-all duration-300 cursor-pointer text-sm"
                                >
                                    Fazer Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
