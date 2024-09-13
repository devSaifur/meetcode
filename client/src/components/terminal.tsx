import { FitAddon } from '@xterm/addon-fit'
import { WebLinksAddon } from '@xterm/addon-web-links'
import { Terminal as XTerm } from '@xterm/xterm'

import '@xterm/xterm/css/xterm.css'

import { useEffect, useRef, type ComponentProps } from 'react'

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
    const webLinksAddon = new WebLinksAddon()

    const terminal = new XTerm({
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
    })

    terminalRef.current = terminal

    terminal.loadAddon(fitAddon)
    terminal.loadAddon(webLinksAddon)
    terminal.open(element)

    fitAddon.fit()

    const resizeObserver = new ResizeObserver(() => {
      fitAddon.fit()
      onTerminalResize?.(terminal.cols, terminal.rows)
    })

    resizeObserver.observe(element)

    onTerminalReady?.(terminal)

    terminal.onData((data) => {
      if (data === '\r') {
        terminal.write('\n')
      } else {
        terminal.write(data)
      }
    })

    return () => {
      resizeObserver.disconnect()
      terminal.dispose()
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
