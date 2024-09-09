import * as React from 'react'
import { File, FileText, Folder, FolderOpen, Image } from 'lucide-react'

import { Icons } from './ui/icons'

function getIconHelper() {
  const cache = new Map<string, React.ReactNode>()

  cache.set('js', <Icons.javascript />)
  cache.set('jsx', <Icons.react />)
  cache.set('ts', <Icons.typescript />)
  cache.set('tsx', <Icons.react color="#378baa" />)
  cache.set('css', <Icons.css />)
  cache.set('json', <Icons.json />)
  cache.set('html', <Icons.html />)
  cache.set('png', <Image />)
  cache.set('jpg', <Image />)
  cache.set('ico', <Image />)
  cache.set('txt', <FileText />)
  cache.set('closedDirectory', <Folder />)
  cache.set('openDirectory', <FolderOpen />)

  return function (extension: string, name: string): React.ReactNode {
    if (cache.has(extension)) return cache.get(extension)
    else if (cache.has(name)) return cache.get(name)
    else return <File />
  }
}

export const getCachedIcons = getIconHelper()
