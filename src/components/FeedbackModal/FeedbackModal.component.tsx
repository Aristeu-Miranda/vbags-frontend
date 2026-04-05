import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { FeedbackModalProps } from './FeedbackModal.types'

export const FeedbackModal = ({ open, onOpenChange, email, onContinue }: FeedbackModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="font-poppins sm:max-w-md text-center"
        showCloseButton={false}
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-[#2a1810]">Pedido realizado com sucesso!</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="rounded-full bg-[#f0e8e0] p-3 text-[#5c3d2e]">
            <svg className="h-8 w-8 text-pink-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <DialogDescription className="text-center text-base text-[#6b5344]">
            Sua ordem foi submetida com sucesso! <br />
            As informações de pagamento serão enviadas para o email: <br />
            <span className="font-semibold text-[#2a1810] mt-2 block w-full truncate max-w-full">{email}</span>
          </DialogDescription>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            className="bg-pink-light hover:bg-pink-dark text-white cursor-pointer w-full sm:w-auto font-poppins"
            onClick={onContinue}
          >
            Continuar comprando
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
