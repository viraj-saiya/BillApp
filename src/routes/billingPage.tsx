import { createFileRoute } from '@tanstack/react-router'
import { BillingPage } from '../feature/BillingPage/BillingPage'

export const Route = createFileRoute('/billingPage')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BillingPage />
}
