import React from 'react'
import { buildFileTree, Directory } from '@/utils/file-manager'

export const useFilesFromSandbox = (callback: (dir: Directory) => void) => {
  React.useEffect(() => {
    fetch('http://localhost:3000/api/files')
      .then((response) => response.json())
      .then((data) => {
        const rootDir = buildFileTree(data)
        callback(rootDir)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
