export default {
	session: process.env.SESSION || 'testsession',
	token: process.env.JWT_SECRET || 'testsecret',
	database: process.env.DATABASE_URL || 'mongodb://localhost:27017/koach-test'
}
