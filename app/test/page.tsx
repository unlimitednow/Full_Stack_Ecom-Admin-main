import type { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import { getXataClient } from '../../utils/xata'

const pushDummyData = async () => {
  const response = await fetch('/api/write-links-to-xata')

  if (response.ok) {
    window?.location.reload()
  }
}

const removeDummyItem = async (id: string) => {
  const { status } = await fetch('/api/clean-xata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  })

  if (status === 200) {
    window?.location.reload()
  }
}

export default function IndexPage({
  items,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main>
      <header>
        <h1>
          Next.js with<span aria-hidden>&#8209;</span>xata
        </h1>
      </header>
      <article>
      
      
      </article>
      <footer>
        <span>
          Made by{' '}
          <a href="https://xata.io" rel="noopener noreferrer" target="_blank">
            <object data="/xatafly.svg" />
          </a>
        </span>
      </footer>
    </main>
  )
}

export const getServerSideProps = async () => {
  const xata = await getXataClient()
  const items = await xata.db.items.getAll()
  return {
    props: {
      items,
    },
  }
}