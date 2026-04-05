export type FeedbackModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email?: string;
  onContinue: () => void;
}
