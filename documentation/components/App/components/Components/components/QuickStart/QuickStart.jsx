import React from 'react'
import { AnimatedItem } from 'react-progressive-entrance'

import Page from '../../../../../Page'

export default () => (
  <Page title="Quick start" description="Aldebarion is not ready yet. Once the framework ready, it will be available for React 16.3+ and Vue2.">
    <AnimatedItem animationIndex={3}>
      <p>
        However the design of few components is already implemented. So please take a look to them
        and do not hesitate to propose improvements on the github.
      </p>
      <p>
        If you want to be kept informed about the progress of Aldebarion,
        remember to watch the github.
      </p>
    </AnimatedItem>
  </Page>
)
