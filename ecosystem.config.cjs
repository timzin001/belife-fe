module.exports = {
    apps: [
        {
            name: 'SOIVIP-FE',
            exec_mode: 'cluster', // Optional: If you want it run multiple instances.
            instances: '2', // Or a number of instances.
            // 'max' auto detects how many CPU cores there are.
            // The previous option must exist to use the 'instances' option.
            script: '.output/server/index.mjs', // Nuxt v3
            // script: './node_modules/nuxt/bin/nuxt.js', // Nuxt v2
            args: 'start',
            port: 3000, // Optional: If you have multiple apps running,
            // that each need a specific port.
        },
    ],
}