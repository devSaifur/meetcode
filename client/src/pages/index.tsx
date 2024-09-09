import Editor from '@monaco-editor/react'
import { Tree } from 'react-arborist'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { FilesNode } from '@/components/files-node'

const data = [
  {
    id: '1',
    name: 'public',
    children: [{ id: 'c1-1', name: 'index.html' }]
  },
  {
    id: '2',
    name: 'src',
    children: [
      { id: 'c2-1', name: 'App.js' },
      { id: 'c2-2', name: 'index.js' },
      { id: 'c2-3', name: 'styles.css' }
    ]
  },
  { id: '3', name: 'package.json' },
  { id: '4', name: 'README.md' }
]

export default function HomePage() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={20}>
        <div className="flex h-full items-center justify-center p-6">
          <Tree initialData={data} height={1000} indent={24} rowHeight={32}>
            {FilesNode}
          </Tree>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
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
      <ResizablePanel defaultSize={25}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
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
