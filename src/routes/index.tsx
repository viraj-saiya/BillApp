import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '../feature/LandingPage/LandingPage';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div >
      <LandingPage/>
      {/* <App/> */}
    </div>
  )
}