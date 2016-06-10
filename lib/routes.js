import express from 'express';
import path from 'path';

const router = express.Router();

function log(argument) {
	console.log(argument)
}


router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'static/index.html'))
});

router.get('/health', (req, res) => {
	// IMPORTANT: Your application HAS to respond to GET /health with status 200 for OpenShift health monitoring
	res.status(200);
    res.send();
})

export default router;