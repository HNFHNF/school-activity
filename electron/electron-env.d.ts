/// <reference types="electron-vite/node" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ out
     * │ │ ├─┬ main
     * │ │ │ └── main.js
     * │ │
     * │ │ ├─┬ preload
     * │ │ │ └── preload.cjs
     * │ │ └─┬ renderer
     * │ │   └── index.html
     * │
     * ```
     */
    APP_ROOT: string
    /** /out/renderer/ or /public/ */
    VITE_PUBLIC: string
  }
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  ipcRenderer: import('electron').IpcRenderer
}
