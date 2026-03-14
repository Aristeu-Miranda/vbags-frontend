import { Container } from '@/components/Container'
import { useAuth } from '@/contexts/AuthContext'

export const OrdersPage = () => {
    const { user } = useAuth()

    return (
        <main className="min-h-screen bg-neutral-50 pt-28 pb-12">
            <Container>
                <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Area autenticada</p>
                    <h1 className="mt-3 text-3xl font-light text-neutral-900">Minhas ordens</h1>
                    <p className="mt-4 text-neutral-600">
                        Sessao ativa para <strong>{user?.name ?? user?.email ?? 'cliente'}</strong>.
                    </p>
                    <p className="mt-2 text-sm text-neutral-500">
                        Esta pagina e um placeholder para as rotas protegidas que voce vai adicionar em seguida.
                    </p>
                </section>
            </Container>
        </main>
    )
}
