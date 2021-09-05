import React, { FC, Fragment } from 'react'

const isRunningLocally = process.env.NODE_ENV !== 'production'

export const GtagHeadScripts: FC<{ id: string }> = ({ id }) =>
  isRunningLocally ? null : (
    <Fragment>
      <link rel='dns-pretech' href='https://www.googletagmanager.com' />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`}></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${id}');
          `
        }}
      />
    </Fragment>
  )
