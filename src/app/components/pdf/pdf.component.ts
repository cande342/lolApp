import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-pdf',
  imports: [],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent {


  
  generatePDF() {
    const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 5;

    // Cargar imágenes desde assets
    const imgLeft = new Image();
    imgLeft.src = 'sol.png'; // Imagen izquierda (sin cambios en dimensiones)

    const imgRight = new Image();
    imgRight.src = 'logo.png'; // Imagen derecha (dimensiones modificadas a 300x155)

Promise.all([
  new Promise<void>((resolve) => { imgLeft.onload = () => resolve(); }),
  new Promise<void>((resolve) => { imgRight.onload = () => resolve(); })
]).then(() => {

  // =======================
  // HEADER CONFIGURACIÓN
  // =======================
  const headerPaddingX = 15; // margen horizontal (izquierda/derecha)
  const headerPaddingY = 3;  // margen vertical (arriba/abajo)

  // Tamaños específicos de las imágenes
  const imgLeftWidth = 30;   // Imagen izquierda
  const imgLeftHeight = 30;

  const imgRightWidth = 50;  // Imagen derecha (logo)
  const imgRightHeight = 50;

  // =======================
  // ALTURA DEL HEADER
  // =======================
  const subtitleHeight = 5; 
  const gapImageToSubtitle = 1;

  // La altura del header se ajusta automáticamente según la imagen más alta
  const contentHeight = Math.max(imgLeftHeight, imgRightHeight) + subtitleHeight + gapImageToSubtitle;
  const headerHeight = contentHeight + 2 * headerPaddingY;
  const headerWidth = pageWidth - 2 * headerPaddingX;

  // =======================
  // DIBUJAR RECUADRO
  // =======================
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3); // borde más fino
  doc.rect(headerPaddingX, headerPaddingY, headerWidth, headerHeight);

  // =======================
  // POSICIONAR IMÁGENES
  // =======================
  const topImageY = headerPaddingY + 3; // posición superior de las imágenes

  // Imagen izquierda
  doc.addImage(imgLeft, 'PNG', headerPaddingX + 5, topImageY + 8, imgLeftWidth, imgLeftHeight);

  // Imagen derecha
  doc.addImage(
    imgRight,
    'PNG',
    pageWidth - headerPaddingX - imgRightWidth - 5,
    topImageY,
    imgRightWidth,
    imgRightHeight
  );

  // =======================
  // TÍTULO CENTRAL
  // =======================
  doc.setFontSize(16); // tamaño tipo H2
  doc.setFont('helvetica', 'bold');

  // Calcular posición Y centrada verticalmente para el bloque de texto
  const titleBlockHeight = 16 + 8 + 8; // 3 líneas con separación de 8
  const titleStartY = headerPaddingY + (headerHeight - titleBlockHeight) / 2 + 4;

  doc.text('Municipalidad de Río Cuarto', pageWidth / 2, titleStartY, { align: 'center' });
  doc.text('Secretaría de Gobierno y Participación Ciudadana', pageWidth / 2, titleStartY + 10, { align: 'center' });
  doc.text('Subsecretaría de Recursos Humanos', pageWidth / 2, titleStartY + 19, { align: 'center' });

  // =======================
  // SUBTÍTULOS DEBAJO DE LAS IMÁGENES
  // =======================
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Posición Y de los subtítulos, pegados a las imágenes
  const subtitleY = topImageY + Math.max(imgLeftHeight, imgRightHeight) + gapImageToSubtitle;

  // Subtítulo debajo de la imagen izquierda
  doc.text('Salud Ocupacional', headerPaddingX + 5, subtitleY);

  // Subtítulo debajo de la imagen derecha
  const fecha = new Date();
  doc.text(
    `Fecha: ${fecha.toLocaleDateString()} - Hora: ${fecha.toLocaleTimeString()}`,
    pageWidth - headerPaddingX - 55,
    subtitleY,
    { align: 'left' }
  );

      // =======================
      // CONTENIDO
      // =======================
      let yStart = headerPaddingY + headerHeight + 12;

      // Datos mock
      const filtros: string[][] = [
        ['Filtro1', 'PROBANDO', 'Filtro3', 'Filtro4', 'Filtro5', 'Filtro6', 'Filtro7', 'Filtro8']
      ];
      const licencias = [
        [
          'Gómez, Juan',           // Apellido y Nombre
          'Activo',                // Estado Ag.
          'Vacaciones',            // Tipo Lic.
          '2025-08-01',            // Fec. Desde
          '2025-08-10',            // Fec. Hasta
          'Viaje familiar',         // Observaciones
          '10',                  
          '2025-07-28',           
          'Dr. Pérez',            
          'Sin diagnóstico',        
          'Aprobada'              
        ],
        [
          'Martínez, Laura',
          'Activo',
          'Enfermedad',
          '2025-09-05',
          '2025-09-07',
          'Gripe',
          '3',
          '2025-09-04',
          'Dra. López',
          'Gripe leve',
          'Aprobada'
        ],
        [
          'Rodríguez, Carlos',
          'Activo',
          'Maternidad',
          '2025-07-15',
          '2025-10-15',
          'Primer hijo',
          '90',
          '2025-07-10',
          'Dra. Fernández',
          'N/A',
          'Aprobada'
        ],
        [
          'Fernández, Ana',
          'Inactivo',
          'Licencia sin goce',
          '2025-06-01',
          '2025-06-30',
          'Estudios personales',
          '30',
          '2025-05-28',
          'Dr. Gómez',
          'N/A',
          'Aprobada'
        ]
      ];


      // Título centrado tabla de filtros -> Tamaño tipo H1
      doc.setFontSize(22); // H1 aproximado
      doc.setFont('helvetica', 'bold');
      doc.text('Licencias Médicas', pageWidth / 2, yStart, { align: 'center' });
      doc.text('Filtros Utilizados', pageWidth / 2, yStart + 14, { align: 'center' });

      autoTable(doc as any, {
        startY: yStart + 19,
        head: [['Legajo', 'D.N.I', 'Apellido', 'Nombre', 'Fecha Desde', 'Fecha Hasta', 'Estado Agente', 'Estado Lic.']],
        body: filtros,
        theme: 'grid',
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 10,
          lineWidth: 0.3,  
          lineColor: [0, 0, 0] 
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          cellPadding: 4,
          lineWidth: 0.3,  
          lineColor: [0, 0, 0],
          fontSize: 10, 
        },
        styles: { fontSize: 9 },
        tableWidth: pageWidth - 2 * margin,
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' }, 4: { cellWidth: 'auto' }, 5: { cellWidth: 'auto' },
          6: { cellWidth: 'auto' }, 7: { cellWidth: 'auto' }
        }
      });

      // Nueva sección Licencias Pedicas principal -> Tamaño tipo H1
      yStart = (doc as any).lastAutoTable.finalY + 18;
      doc.setFontSize(22); // H1 aproximado
      doc.setFont('helvetica', 'bold');
      doc.text('Licencias Médicas', pageWidth / 2, yStart, { align: 'center' });

      autoTable(doc as any, {
        startY: yStart + 5,
        head: [[
          'APELLIDO Y NOMBRE', 
          'ESTADO AG.', 
          'TIPO LIC.', 
          'FEC. DESDE', 
          'FEC. HASTA', 
          'OBSERVACIONES', 
          'CANT. DÍAS', 
          'FEC. REAL CERTIF.', 
          'MÉDICO', 
          'DIAG.', 
          'RESOLUCIÓN'
        ]],
        body: licencias,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 10,
          lineWidth: 0.3,  
          lineColor: [0, 0, 0] 
        },
        bodyStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          fontSize: 10,
          cellPadding: 4,
          lineWidth: 0.3,  
          lineColor: [0, 0, 0] 
        },
        tableWidth: pageWidth - 2 * margin,
        margin: { left: margin, right: margin },
        columnStyles: {
          0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 'auto' },
          3: { cellWidth: 'auto' }, 4: { cellWidth: 'auto' }, 5: { cellWidth: 'auto' },
          6: { cellWidth: 'auto' }, 7: { cellWidth: 'auto' }, 8: { cellWidth: 'auto' },
          9: { cellWidth: 'auto' }, 10: { cellWidth: 'auto' }, 11: { cellWidth: 'auto' }
        }
      });

      // =======================
      // GUARDAR PDF
      // =======================
      doc.save('Reporte_Licencias_Pedicas.pdf');
    });
  }


}
