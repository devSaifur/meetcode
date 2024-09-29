import { FitAddon } from '@xterm/addon-fit'
import { Terminal as XTerm, type ITerminalOptions } from '@xterm/xterm'

import { wsClient } from '@/lib/ws'

import '@xterm/xterm/css/xterm.css'

import { useEffect, useRef, type ComponentProps } from 'react'

const TERMINAL_OPTIONS: ITerminalOptions = {
  cursorBlink: true,
  convertEol: true,
  fontSize: 13,
  theme: {
    background: '#1e1e1e',
    cursor: '#ffffff',
    foreground: '#ffffff',
    black: '#000000',
    blue: '#0000ff'
  }
}

export interface TerminalRef {
  reloadStyles: () => void
}

export interface TerminalProps extends ComponentProps<'div'> {
  theme: 'dark' | 'light'
  onTerminalReady?: (terminal: XTerm) => void
  onTerminalResize?: (cols: number, rows: number) => void
}

export const Terminal = ({
  onTerminalReady,
  onTerminalResize,
  ...props
}: TerminalProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<XTerm>()

  useEffect(() => {
    const element = divRef.current!

    const fitAddon = new FitAddon()
    const terminal = new XTerm(TERMINAL_OPTIONS)

    terminalRef.current = terminal

    terminal.loadAddon(fitAddon)
    terminal.open(element)

    fitAddon.fit()

    onTerminalReady?.(terminal)

    const ws = wsClient.ws.$ws()

    ws.onopen = () => {
      ws.send('hello')
    }

    terminal.onData((data) => {
      terminal.write(data)
    })

    return () => {
      terminal.dispose()
      ws.close()
    }
  }, [onTerminalReady, onTerminalResize])

  return (
    <div
      {...props}
      className="w-full overflow-hidden rounded-sm border border-gray-200 px-3"
      ref={divRef}
    />
  )
}
