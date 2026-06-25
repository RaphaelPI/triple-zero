import { getTranslations } from "next-intl/server"
import { ContactSection } from "../_components/contact-section"
import { Stepper } from "./_components/stepper"

interface Props {
  children: React.ReactNode
}

export default async ({ children }: Props) => {
  const t = await getTranslations()
  const STEPS = [
    {
      label: t("checkout.step1"),
      href: "/panier",
    },
    {
      label: t("checkout.step2"),
      href: "/coordonnees",
    },
    {
      label: t("checkout.step3"),
      href: "/paiement",
      disabled: true,
    },
  ]

  return (
    <div>
      <Stepper steps={STEPS} />
      {children}
      <ContactSection />
    </div>
  )
}
