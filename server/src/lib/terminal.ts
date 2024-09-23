import * as pty from 'node-pty'

const shell = 'bash'

export class TerminalManager {
    private sessions: { [id: string]: { terminal: pty.IPty; sessionId: string } } = {}

    constructor() {
        this.sessions = {}
    }

    createPty(id: string, sessionId: string, onData: (data: string, id: number) => void) {
        const term = pty.spawn(shell, [], {
            cols: 100,
            name: 'xterm',
            cwd: `/workspace`
        })
        term.onData((data) => {
            onData(data, term.pid)
        })
        this.sessions[id] = {
            terminal: term,
            sessionId
        }
        term.onExit(() => {
            delete this.sessions[term.pid]
        })
        return term
    }

    write(terminalId: string, data: string) {
        this.sessions[terminalId].terminal.write(data)
    }

    clear(terminalId: string) {
        this.sessions[terminalId].terminal.kill()
        delete this.sessions[terminalId]
    }
}
