const shadowPlugin = {
    id: 'shadowPlugin',
    beforeDraw(chart) {
        const ctx = chart.ctx;
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
        ctx.shadowBlur = 17;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 10;
    },
    afterDraw(chart) {
        chart.ctx.restore();
    }
};


let myChart;

function updateChart(income, expense) {
    if (myChart) {
        myChart.data.datasets[0].data = [income, expense];
        myChart.update();
    } else {
        const ctx = document.getElementById('myChart');

        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [income, expense],
                    backgroundColor: [
                        'rgb(0, 221, 0)',
                        'rgb(231, 0, 0)'
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                radius: '80%',
                responsive: true,
                maintainAspectRatio: false
            },

            plugins:[shadowPlugin]
        });
    }
}
