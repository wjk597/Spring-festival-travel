const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// 启用CORS和JSON解析
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 保存数据的路由
app.post('/saveData', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'data.json');
    
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.json({ success: true });
    } catch (error) {
        console.error('保存数据失败:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// 读取数据的路由
app.get('/getData', (req, res) => {
    const filePath = path.join(__dirname, 'data.json');
    
    try {
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            res.json(JSON.parse(data));
        } else {
            res.json([]);
        }
    } catch (error) {
        console.error('读取数据失败:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
}); 