import React, { Fragment } from 'react'
import { contexts } from 'react-aldebarion'
import ReactPlayer from 'react-player'

import Page from '../../../../../Page'
import Section from '../../../../../Section'
import Link from '../../../../../Link'

import style from './Inspirations.style'

import table2 from './assets/table2.jpg'
import table3 from './assets/table3.jpg'
import ironManHud from './assets/ironman_hud.png'
import ironManHud2 from './assets/ironman_hud2.png'
import westworld from './assets/westworld.jpg'

// https://scifiinterfaces.com/2015/07/21/iron-man-hud-1-person-view/

const Inspirations = () => (
  <contexts.Theme.Consumer>
    {(/* { theme } */) => (
      <Page title="Inspirations" className={`${style.page}`} description="Aldebarion is inspired by a lot of movies and series.">
        <Section
          title="Oblivion"
          description="Oblivion movie contains a lot of very detailed user interfaces.
          Even if this kind of heavy detailed interfaces are not the priority of Aldebarion,
          it is
          a goal to keep in mind since the minimalism of Aldebarion design may be used for high
          productivity user interfaces."
        >
          <img src={table2} className={style.img} alt="Oblivion table" />
          <img src={table3} className={style.img} alt="Oblivion table" />
          <p>
            A great article about the Oblivion user interfaces is available <Link href="https://gmunk.com/OBLIVION-GFX">here</Link>.
          </p>
        </Section>
        <Section
          title="Iron Man"
          description="Iron is maybe one of the first movie to show futuristic HUDs. This movie is very
          important for Aldebarion since it addresses key points about user interfaces.
          First of all, it shows HUDs which are something totally new that Aldebarion is
          built for. Moreover, Tony Stark talks about Ui preferences and Ui modes, two points
          that Aldebarion is planned to handle."
        >
          <img src={ironManHud} className={style.img} alt="Iron Man HUD in garage" />
          <img src={ironManHud2} className={style.img} alt="Iron Man HUD in fight" />
          <p>
            A detailed article about the Iron Man user interfaces is available <Link href="https://scifiinterfaces.com/2015/07/21/iron-man-hud-1-person-view/">here</Link>.
          </p>
        </Section>
        <Section
          title="Westworld"
          description="Westworld represent very well what Aldebarion is designed for: user interfaces built for productivity and to be timeless."
        >
          <img src={westworld} className={style.img} alt="Oblivion table" />


        </Section>
        <Section
          title="Anon"
          description={(
            <Fragment>
              Anon is a Netflix Movie where HUDs take a very significant place since most of
              the scenes are shot from a first person point of view.
              Aldebarion is inspired by the
              minimalism of its user interfaces.
            </Fragment>
          )}
        >
          <ReactPlayer
            className={style.video}
            url="https://www.youtube.com/embed/Xnc17atwaII"
            muted
            loop
            playing
            config={{
              youtube: {
                showinfo: 0,
                playerVars: {
                  playlist: '',
                  showinfo: 0,
                  rel: 0,
                  modestbranding: 1,
                  wmode: 'transparent',
                  autohide: 1,
                  mode: 'opaque',
                  fs: 1,
                  iv_load_policy: 3,
                },
              },
            }}
          />
          <p>
            If you don't know Anon, this is a critic about the movie: <Link href="https://io9.gizmodo.com/anon-is-a-scifi-movie-that-shows-how-the-singularity-is-1825690871">here</Link>.
          </p>
        </Section>
      </Page>
    )}
  </contexts.Theme.Consumer>
)

export default Inspirations
