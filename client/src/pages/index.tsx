import { useState } from 'react'
import { Directory, findFileByName, Type } from '@/utils/file-manager'
import Editor from '@monaco-editor/react'

import { useFilesFromSandbox } from '@/hooks/useFilesFromSandbox'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { FileTree } from '@/components/file-tree'

const dummyDir: Directory = {
  id: '1',
  name: 'loading...',
  type: Type.DUMMY,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: []
}

export default function HomePage() {
  const [rootDir, setRootDir] = useState(dummyDir)
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)

  useFilesFromSandbox((root) => {
    if (!selectedFile) {
      setSelectedFile(findFileByName(root, 'index.tsx'))
    }
    setRootDir(root)
  })

  const onSelect = (file: File) => setSelectedFile(file)

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[90vh]">
          <Editor
            height="auto"
            defaultLanguage="javascript"
            theme="vs-dark"
            defaultValue="// some comment"
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <FileTree
                rootDir={rootDir}
                selectedFile={selectedFile}
                onSelect={onSelect}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
