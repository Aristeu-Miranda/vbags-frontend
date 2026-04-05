import { type FormEvent, useEffect, useMemo, useRef, useState } from "react"
import { useAuth } from "@/contexts/AuthContext/AuthContext"
import { useCreateAddress, useGetAddressByCep } from "@/services/address/address.hooks"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const CEP_DIGITS = 8

const formatCepInput = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, CEP_DIGITS)
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

export type AddressComponentProps = {
  open: boolean
  onClose: () => void
  onCalculateSuccess?: () => void
}

export const AddressComponent = ({ open, onClose, onCalculateSuccess }: AddressComponentProps) => {
  const { token, user, isAuthenticated } = useAuth()
  const { mutateAsync: saveAddress, isPending: isSaving } = useCreateAddress()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [cep, setCep] = useState("")
  const [logradouro, setLogradouro] = useState("")
  const [numero, setNumero] = useState("")
  const [complemento, setComplemento] = useState("")
  const [bairro, setBairro] = useState("")
  const [localidade, setLocalidade] = useState("")
  const [uf, setUf] = useState("")

  const lastFilledCepRef = useRef<string>("")

  const cepDigits = useMemo(() => cep.replace(/\D/g, ""), [cep])

  const { data, isFetching, isError } = useGetAddressByCep(cepDigits)

  const lookupOk =
    cepDigits.length === CEP_DIGITS && Boolean(data) && !data?.erro

  useEffect(() => {
    if (!open) return
    setSubmitError(null)
    lastFilledCepRef.current = ""
    setCep("")
    setLogradouro("")
    setNumero("")
    setComplemento("")
    setBairro("")
    setLocalidade("")
    setUf("")
  }, [open])

  useEffect(() => {
    if (cepDigits.length < CEP_DIGITS) {
      lastFilledCepRef.current = ""
      setLogradouro("")
      setNumero("")
      setComplemento("")
      setBairro("")
      setLocalidade("")
      setUf("")
      return
    }

    if (!data) {
      setLogradouro("")
      setNumero("")
      setComplemento("")
      setBairro("")
      setLocalidade("")
      setUf("")
      return
    }

    if (data.erro) {
      lastFilledCepRef.current = ""
      setLogradouro("")
      setNumero("")
      setComplemento("")
      setBairro("")
      setLocalidade("")
      setUf("")
      return
    }

    const cepChanged = lastFilledCepRef.current !== cepDigits
    lastFilledCepRef.current = cepDigits

    setLogradouro(data.logradouro ?? "")
    if (cepChanged) {
      setComplemento("")
      setNumero("")
    }
    setBairro(data.bairro ?? "")
    setLocalidade(data.localidade ?? "")
    setUf(data.uf ?? "")
  }, [data, cepDigits])

  const handleCepChange = (value: string) => {
    setCep(formatCepInput(value))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError(null)

    if (!lookupOk || !numero.trim()) {
      return
    }

    if (!isAuthenticated || !token || !user) {
      setSubmitError("Faça login para salvar o endereço.")
      return
    }

    try {
      await saveAddress({
        token,
        payload: {
          cep,
          street: logradouro,
          number: numero.trim(),
          ...(complemento.trim() ? { complement: complemento.trim() } : {}),
          neighborhood: bairro,
            state: uf,
        },
      })
      onCalculateSuccess?.()
      onClose()
    } catch {
      setSubmitError("Não foi possível salvar o endereço. Tente novamente.")
    }
  }

  const showViaCepError =
    cepDigits.length === CEP_DIGITS && !isFetching && Boolean(data?.erro)

  const fieldShell = "rounded-xl border border-[#e8dfd4]/90 bg-[#faf7f4]/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-1">
      <div className="space-y-2">
        <Label htmlFor="address-cep" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
          CEP
        </Label>
        <Input
          id="address-cep"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="00000-000"
          maxLength={9}
          value={cep}
          onChange={(e) => handleCepChange(e.target.value)}
          className={cn(
            fieldShell,
            "h-11 font-poppins text-[#2a1810] placeholder:text-[#c4b5a8]",
            "focus-visible:border-[#c9a896]/80 focus-visible:ring-[#e8b4a8]/35",
          )}
          aria-invalid={showViaCepError || isError}
        />
        {isFetching && cepDigits.length === CEP_DIGITS && (
          <p className="font-poppins text-xs text-[#8a7568]">Buscando endereço…</p>
        )}
        {(showViaCepError || isError) && (
          <p className="font-poppins text-xs text-red-600" role="alert">
            CEP não encontrado. Verifique e tente novamente.
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_minmax(5rem,7.5rem)]">
        <div className="space-y-2">
          <Label htmlFor="address-logradouro" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
            Logradouro
          </Label>
          <Input
            id="address-logradouro"
            type="text"
            autoComplete="street-address"
            value={logradouro}
            disabled
            className={cn(fieldShell, "h-11 font-poppins text-[#2a1810]")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-numero" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
            Número
          </Label>
          <Input
            id="address-numero"
            type="text"
            inputMode="text"
            name="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            disabled={!lookupOk}
            required={lookupOk}
            placeholder="Nº"
            className={cn(
              fieldShell,
              "h-11 font-poppins text-[#2a1810] placeholder:text-[#c4b5a8]",
              "disabled:opacity-60",
              lookupOk && "bg-white/90",
            )}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address-complemento" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
          Complemento <span className="font-normal normal-case tracking-normal text-[#a08f82]">(opcional)</span>
        </Label>
        <Input
          id="address-complemento"
          type="text"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
          disabled={!lookupOk}
          placeholder="Apto, bloco, referência…"
          className={cn(
            fieldShell,
            "h-11 font-poppins text-[#2a1810] placeholder:text-[#c4b5a8]",
            "disabled:opacity-60",
            lookupOk && "bg-white/90",
          )}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address-bairro" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
          Bairro
        </Label>
        <Input
          id="address-bairro"
          type="text"
          value={bairro}
          disabled
          className={cn(fieldShell, "h-11 font-poppins text-[#2a1810]")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_minmax(4rem,5rem)]">
        <div className="space-y-2">
          <Label htmlFor="address-localidade" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
            Localidade
          </Label>
          <Input
            id="address-localidade"
            type="text"
            autoComplete="address-level2"
            value={localidade}
            disabled
            className={cn(fieldShell, "h-11 font-poppins text-[#2a1810]")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address-uf" className="font-poppins text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#8a7568]">
            UF
          </Label>
          <Input
            id="address-uf"
            type="text"
            inputMode="text"
            maxLength={2}
            value={uf}
            disabled
            className={cn(fieldShell, "h-11 font-poppins uppercase text-[#2a1810]")}
          />
        </div>
      </div>

      {submitError && (
        <p className="font-poppins text-xs text-red-600" role="alert">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={!lookupOk || isSaving}
        className={cn(
          "h-11 w-full rounded-xl font-poppins font-medium",
          "bg-[#5c3d2e] text-white hover:bg-[#4a3225]",
          "focus-visible:ring-2 focus-visible:ring-pink-light/40",
        )}
      >
        {isSaving ? "Salvando…" : "Salvar endereço"}
      </Button>
    </form>
  )
}
