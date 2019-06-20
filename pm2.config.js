module.exports = {
	apps: [{
		name: 'koach',
		script: './index.js',
		watch: true,
		instances: 1,
		exec_mode: 'cluster',
		autorestart: true,
		max_memory_restart: '500M',
		restart_delay: 3000
	}]
}
