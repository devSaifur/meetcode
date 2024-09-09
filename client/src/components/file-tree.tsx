import React, { useState } from 'react'
import { Directory, File, sortDir, sortFile } from '@/utils/file-manager'

import { cn } from '@/lib/utils'

import { getCachedIcons } from './icon-cache'

interface FileTreeProps {
  rootDir: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}

export const FileTree = ({
  rootDir,
  selectedFile,
  onSelect
}: FileTreeProps) => {
  return (
    <div>
      {rootDir.dirs.sort(sortDir).map((dir) => (
        <React.Fragment key={dir.id}>
          <DirDiv
            directory={dir}
            selectedFile={selectedFile}
            onSelect={onSelect}
          />
        </React.Fragment>
      ))}
      {rootDir.files.sort(sortFile).map((file) => (
        <React.Fragment key={file.id}>
          <FileDiv
            file={file}
            selectedFile={selectedFile}
            onClick={() => onSelect(file)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

interface SubTreeProps {
  directory: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}

const SubTree = (props: SubTreeProps) => {
  return (
    <div>
      {props.directory.dirs.sort(sortDir).map((dir) => (
        <React.Fragment key={dir.id}>
          <DirDiv
            directory={dir}
            selectedFile={props.selectedFile}
            onSelect={props.onSelect}
          />
        </React.Fragment>
      ))}
      {props.directory.files.sort(sortFile).map((file) => (
        <React.Fragment key={file.id}>
          <FileDiv
            file={file}
            selectedFile={props.selectedFile}
            onClick={() => props.onSelect(file)}
          />
        </React.Fragment>
      ))}
    </div>
  )
}

const FileDiv = ({
  file,
  icon,
  selectedFile,
  onClick
}: {
  file: File | Directory
  icon?: string
  selectedFile: File | undefined
  onClick: () => void
}) => {
  const isSelected = (selectedFile && selectedFile.id === file.id) as boolean

  const depth = file.depth
  return (
    <div
      className={cn(
        'flex items-center hover:cursor-pointer hover:bg-[#242424]',
        isSelected ? 'bg-[#242424]' : 'bg-transparent'
      )}
      style={{
        paddingLeft: `${depth * 16}px`
      }}
      onClick={onClick}
    >
      <FileIcon name={icon} extension={file.name.split('.').pop() || ''} />
      <span style={{ marginLeft: 1 }}>{file.name}</span>
    </div>
  )
}

const DirDiv = ({
  directory,
  selectedFile,
  onSelect
}: {
  directory: Directory
  selectedFile: File | undefined
  onSelect: (file: File) => void
}) => {
  let defaultOpen = false

  if (selectedFile) defaultOpen = isChildSelected(directory, selectedFile)

  const [open, setOpen] = useState(defaultOpen)

  return (
    <>
      <FileDiv
        file={directory}
        icon={open ? 'openDirectory' : 'closedDirectory'}
        selectedFile={selectedFile}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <SubTree
          directory={directory}
          selectedFile={selectedFile}
          onSelect={onSelect}
        />
      )}
    </>
  )
}

const FileIcon = ({
  extension,
  name
}: {
  name?: string
  extension?: string
}) => {
  const icon = getCachedIcons(extension || '', name || '')
  return <span className="align-center flex size-8 justify-center">{icon}</span>
}

const isChildSelected = (directory: Directory, selectedFile: File) => {
  let res: boolean = false

  function isChild(dir: Directory, file: File) {
    if (selectedFile.parentId === dir.id) {
      res = true
      return
    }
    if (selectedFile.parentId === '0') {
      res = false
      return
    }
    dir.dirs.forEach((item) => {
      isChild(item, file)
    })
  }

  isChild(directory, selectedFile)
  return res
}
