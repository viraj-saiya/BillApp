import { createFileRoute } from '@tanstack/react-router'
import CreateBusiness from '../feature/CreateBusiness/CreateBusiness'

export const Route = createFileRoute('/createBusiness')({
  component: CreateBusiness,
})


