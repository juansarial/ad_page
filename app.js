// Cambio de Pestañas
function switchTab(evt, tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  evt.currentTarget.classList.add('active');
  document.getElementById('resultSection').style.display = 'none';
}

// Disparador de Anuncio de Monetag
document.getElementById('watchAdBtn').addEventListener('click', () => {
  alert('Cargando anuncio patrocinado...');

  setTimeout(() => {
    document.querySelectorAll('input[type="file"]').forEach(i => i.multiple = true);
    document.getElementById('rewardBox').style.background = '#f0fdf4';
    document.getElementById('rewardBox').style.borderColor = '#bbf7d0';
    document.getElementById('rewardBox').innerHTML = '<div style="color:#166534; font-size:0.85rem; font-weight:600;">⚡ Modo Lote Activado (Selecciona múltiples archivos)</div>';
  }, 1200);
});

// 1. Lógica Conversor
function procesarConversion() {
  const fileInput = document.getElementById('imageInput');
  if (!fileInput || !fileInput.files.length) {
    alert('Por favor, selecciona una imagen primero.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);

      const format = document.getElementById('formatSelect').value;
      const url = canvas.toDataURL(format, 0.85);
      mostrarResultado(url, 'imagen-convertida', 'Imagen procesada exitosamente.');
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// 2. Lógica Mejorar HD (Corregida)
function mejorarImagen() {
  const fileInput = document.getElementById('enhanceInput');
  if (!fileInput || !fileInput.files.length) {
    alert('Por favor, selecciona una imagen primero.');
    return;
  }

  const file = fileInput.files[0];
  const preset = document.getElementById('enhancePreset').value;
  const reader = new FileReader();

  reader.onload = function (e) {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      // El filtro debe ir ANTES de dibujar
      if (preset === 'hd') {
        ctx.filter = 'contrast(130%) brightness(105%) saturate(115%)';
      } else {
        ctx.filter = 'contrast(110%) brightness(103%) saturate(105%)';
      }

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

      if (dataUrl && dataUrl !== 'data:,') {
        mostrarResultado(dataUrl, 'imagen-hd-mejorada.jpg', '✨ Nitidez y color optimizados correctamente.');
      } else {
        alert('Error al generar la vista previa de la imagen.');
      }
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// 3. Lógica Imagen a PDF
function crearPDF() {
  const fileInput = document.getElementById('pdfInput');
  if (!fileInput || !fileInput.files.length) {
    alert('Selecciona una imagen.');
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.addImage(e.target.result, 'JPEG', 10, 10, 190, 150);
    doc.save('documento.pdf');
  };
  reader.readAsDataURL(file);
}

// Auxiliar para mostrar resultados
function mostrarResultado(urlData, fileName, infoText) {
  const container = document.getElementById('previewContainer');
  const downloadBtn = document.getElementById('downloadBtn');
  container.innerHTML = `<img src="${urlData}">`;
  downloadBtn.href = urlData;
  downloadBtn.download = fileName;
  document.getElementById('sizeInfo').textContent = infoText;
  document.getElementById('resultSection').style.display = 'block';
}