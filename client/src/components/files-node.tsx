import { FileIcon, FolderIcon } from 'lucide-react'
import type { NodeRendererProps } from 'react-arborist'

export function FilesNode<T extends { name: string }>({
  node,
  style,
  dragHandle
}: NodeRendererProps<T>) {
  return (
    <div style={style} ref={dragHandle}>
      <div
        onClick={() => node.isInternal && node.toggle()}
        className="flex items-center gap-x-1 hover:cursor-pointer"
      >
        {node.isLeaf ? (
          <FileIcon className="size-4 text-cyan-600" />
        ) : (
          <FolderIcon className="size-5 text-green-600" />
        )}
        <span>
          <span>{node.data.name}</span>
        </span>
      </div>
    </div>
  )
}
