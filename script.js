document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('travelForm');
    
    // 从本地存储加载数据
    let travelData = JSON.parse(localStorage.getItem('travelData')) || [];

    // 音乐控制功能
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = true;

    // 自动播放音乐
    bgMusic.play().then(() => {
        musicBtn.style.animation = 'rotate 3s linear infinite';
    }).catch(err => {
        isMusicPlaying = false;
        console.log('自动播放被阻止，请点击按钮手动播放');
    });

    musicBtn.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.play();
            musicBtn.style.animation = 'rotate 3s linear infinite';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            submitBtn.style.transform = 'scale(1)';
        }, 100);
        
        // 获取当前时间
        const now = new Date();
        const currentTime = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        const data = {
            name: document.getElementById('name').value,
            destination: document.getElementById('destination').value,
            departureDate: document.getElementById('departureDate').value,
            returnDate: document.getElementById('returnDate').value,
            transport: document.getElementById('transport').value,
            inputTime: currentTime // 添加录入时间
        };
        
        // 检查是否存在相同姓名的记录
        const existingIndex = travelData.findIndex(item => item.name === data.name);
        let message = '提交成功！';
        
        if (existingIndex !== -1) {
            // 更新现有记录
            travelData[existingIndex] = data;
            message = '数据已更新！';
        } else {
            // 添加新记录
            travelData.push(data);
        }
        
        // 保存到本地存储
        try {
            localStorage.setItem('travelData', JSON.stringify(travelData));
            form.reset();
            alert(message);
        } catch (error) {
            console.error('保存数据失败:', error);
            alert('保存失败，请重试');
        }
    });
});

// CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 