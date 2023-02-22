import React, { Suspense } from 'react'
import { CContainer, CSpinner } from '@coreui/react'
import Dashboard from '../components/Dashboard'

const ListStatistic = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Dashboard />
      </Suspense>
    </CContainer>
  )
}

export default ListStatistic