import * as React from 'react'
import { Noto_Sans_KR } from 'next/font/google'

import { NotionPage } from '@/components/NotionPage'
import { domain } from '@/lib/config'
import { resolveNotionPage } from '@/lib/resolve-notion-page'

const notoSansKr = Noto_Sans_KR({
  preload: false, // 또는 preload: false
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr'
})

export const getStaticProps = async () => {
  try {
    const props = await resolveNotionPage(domain)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export default function NotionDomainPage(props) {
  return (
    <NotionPage
      className={`${notoSansKr.className} ${notoSansKr.variable} `}
      {...props}
    />
  )
}
