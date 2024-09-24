import fs from 'node:fs'

interface File {
    type: 'file' | 'dir'
    name: string
}

export function fetchDirectory(path: string, basePath: string): Promise<File[]> {
    return new Promise((resolve, reject) => {
        fs.readdir(path, { withFileTypes: true }, (err, files) => {
            if (err) {
                reject(err)
            }
            resolve(
                files.map((file) => ({
                    type: file.isDirectory() ? 'dir' : 'file',
                    name: file.name,
                    path: `${basePath}/${file.name}`
                }))
            )
        })
    })
}

export function fetchFile(file: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err)
            }
            resolve(data)
        })
    })
}

export function writeFile(file: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}
