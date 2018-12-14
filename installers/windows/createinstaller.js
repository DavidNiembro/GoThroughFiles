const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
    .then(createWindowsInstaller)
    .catch((error) => {
        console.error(error.message || error)
        process.exit(1)
    })

function getInstallerConfig () {
    console.log('creating windows installer')
    const rootPath = path.join('./')


    return Promise.resolve({
        appDirectory: path.join(rootPath, 'release-gothroughfiles-windows/GoThroughFiles-win32-ia32'),
        authors: 'Dardan Iljazi, David Niembro & Anel Muminovic',
        noMsi: false,
        outputDirectory: path.join(rootPath, 'GoThroughFiles-win32-ia32/'),
        exe: 'GoThroughFiles.exe',
        setupExe: 'GoThroughFiles_setup.exe',
        version: "0.1.0",
        description: "GoThroughFiles - File Searcher Project"
    })
}