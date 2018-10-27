import React from 'react'

import { contexts } from 'react-aldebarion'

import Page from '../../../../../Page'

import style from './Story.style'

const Story = () => (
  <contexts.Theme.Consumer>
    {({ theme }) => (
      <Page title="Story">
        <p className={style[theme]}>
          In a close future, humanity will colonize the infinite space. Because of distances,
          the idea of time will be totally different.
        </p>
        <p className={style[theme]}>
          Aldebarion is inspired by user interfaces in science-fiction movies like Oblivion,
          Iron Man, Anon, etc.
          His main purpose is help create timeless user interfaces efficient on various
          futuristic platforms like
          virtual reality, augmented reality, HUDs, etc.
        </p>
        <p>
          Aldebarion is not just a
        </p>
        <p className={style[theme]}>
          In order to make it, Aldebarion gives the priority to efficiency and timeless design
          over emotional fashion. So it doesn't fit all applications but can help to focus on what
          really matters.
        </p>
        <p>
          Everything is Aldebarion is made to save the user time and create timeless user experiences.
        </p>
        <p>
          Besides, at the opposite of a lot of applications, applications made with Aldebarion should
          be designed
          to save user time and so should incitate the user to use them the less possible.
        </p>
        <h2 className={style.title}>Minimalism</h2>
        <p>
          Aldebarion is based on minimalist design to help the user focus on what is
          very significant.
        </p>
        <p>
          Components are designed to be minimalist from a style point of view but still contain a
          lot of features to make the user experience efficient.
        </p>
        <h2 className={style.title}>Micro animations</h2>
        <p>
          In order to make the user experience very progressive, animations are there to guide the
          user and help him understand where his attention is needed.
        </p>
        <p>
          Moreover, the features appear only when they are needed.
        </p>
        <h2 className={style.title}>Consistent</h2>
        <p>
          The user interface is implemented to work on all modern platforms
          from browser and applications to
          augmented reality. The goal is have a consistent user experience over all devices.
        </p>

        <p>
          That why Aldebarion is for example using only few colors: some platforms like augmented
          reality or projected information don't manage a lot of colors very well.
        </p>
      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Story
