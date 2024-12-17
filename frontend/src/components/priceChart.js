import './priceChart.css';

export const createPriceChart = (data) => {
    const isDarkMode = document.body.style.backgroundColor === 'black';
    
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');

    const canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);

    const ctx = canvas.getContext('2d');

    // Obtenemos solo los datos PVPC
    const pvpcData = data.included.find(item => item.type === 'PVPC');
    if (!pvpcData?.attributes?.values) {
        console.error('No se encontraron valores PVPC');
        return chartContainer;
    }

    // Filtramos los valores por el rango de horas seleccionado y ordenamos
    const filteredValues = pvpcData.attributes.values
        .filter(item => {
            const hour = new Date(item.datetime).getHours();
            // Extraemos las horas del título para filtrar
            const startHour = parseInt(item.datetime.slice(11, 13));
            const endHour = startHour + 6;
            return hour >= startHour && hour < endHour;
        })
        .sort((a, b) => {
            const hourA = new Date(a.datetime).getHours();
            const hourB = new Date(b.datetime).getHours();
            return hourA - hourB;
        });

    const chartData = {
        labels: filteredValues.map(item => {
            const date = new Date(item.datetime);
            const hour = date.getHours();
            return `${hour.toString().padStart(2, '0')}:00`;
        }),
        datasets: [{
            label: 'Precio (€/MWh)',
            data: filteredValues.map(item => item.value),
            borderColor: '#2196F3',
            backgroundColor: '#2196F3',
            pointBackgroundColor: '#2196F3',
            pointBorderColor: isDarkMode ? '#1a1a1a' : 'white',
            pointRadius: 6,
            pointHoverRadius: 8,
            tension: 0.4,
            borderWidth: 3
        }]
    };

    const config = {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Evolución del precio de la luz (${filteredValues[0]?.datetime.slice(11,16)} - ${filteredValues[filteredValues.length-1]?.datetime.slice(11,16)})`,
                    color: isDarkMode ? '#fff' : '#333',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                },
                tooltip: {
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)',
                    titleColor: isDarkMode ? '#000' : '#fff',
                    bodyColor: isDarkMode ? '#000' : '#fff',
                    padding: 12,
                    titleFont: { size: 14 },
                    bodyFont: { size: 14 },
                    callbacks: {
                        label: function(context) {
                            return `${context.parsed.y.toFixed(2)} €/MWh`;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        color: isDarkMode ? '#fff' : '#666',
                        callback: function(value) {
                            return value + '€';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: isDarkMode ? '#fff' : '#666',
                        maxRotation: 0,
                        autoSkip: false
                    }
                }
            }
        }
    };

    const chart = new Chart(ctx, config);

    // Actualizar el gráfico cuando cambie el modo
    const updateChart = () => {
        const newIsDarkMode = document.body.style.backgroundColor === 'black';
        chartContainer.style.background = newIsDarkMode ? '#1a1a1a' : 'white';
        
        chart.options.plugins.title.color = newIsDarkMode ? '#fff' : '#333';
        chart.options.plugins.tooltip.backgroundColor = newIsDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.8)';
        chart.options.plugins.tooltip.titleColor = newIsDarkMode ? '#000' : '#fff';
        chart.options.plugins.tooltip.bodyColor = newIsDarkMode ? '#000' : '#fff';
        chart.options.scales.y.grid.color = newIsDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
        chart.options.scales.y.ticks.color = newIsDarkMode ? '#fff' : '#666';
        chart.options.scales.x.ticks.color = newIsDarkMode ? '#fff' : '#666';
        chart.data.datasets[0].pointBorderColor = newIsDarkMode ? '#1a1a1a' : 'white';
        
        chart.update();
    };

    // Observar cambios en el modo oscuro
    const observer = new MutationObserver(() => {
        updateChart();
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style']
    });

    // Establecer estilo inicial
    chartContainer.style.background = isDarkMode ? '#1a1a1a' : 'white';
    chartContainer.style.padding = '20px';
    chartContainer.style.borderRadius = '10px';
    chartContainer.style.marginTop = '20px';
    chartContainer.style.height = '400px';
    chartContainer.style.width = '100%';
    chartContainer.style.maxWidth = '800px';
    chartContainer.style.margin = '20px auto';
    chartContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    return chartContainer;
}; 